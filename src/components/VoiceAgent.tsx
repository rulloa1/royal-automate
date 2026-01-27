import { useState, useCallback, useRef, useEffect } from "react";
import { Mic, MicOff, Phone, PhoneOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TranscriptEntry {
  role: "user" | "agent";
  text: string;
  timestamp: string;
}

export default function VoiceAgent() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    return () => {
      // Cleanup: stop speech synthesis when component unmounts
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // 1. Send Audio to Deepgram (via Supabase Edge Function)
      const formData = new FormData();
      formData.append('file', audioBlob);

      const { data: sttData, error: sttError } = await supabase.functions.invoke("process-audio", {
        body: formData,
      });

      if (sttError) throw new Error("Transcription failed");
      const userText = sttData?.text;

      if (!userText || userText.trim().length === 0) {
        toast.info("No speech detected");
        setIsProcessing(false);
        return;
      }

      // Add User Transcript
      setTranscripts(prev => [...prev, {
        role: "user",
        text: userText,
        timestamp: new Date().toISOString()
      }]);

      // 2. Get AI Response (Re-using sales-chat function)
      // Format messages for the sales-chat point
      const conversationHistory = transcripts.map(t => ({
        role: t.role === "user" ? "user" : "assistant",
        content: t.text
      }));
      conversationHistory.push({ role: "user", content: userText });

      const { data: aiData, error: aiError } = await supabase.functions.invoke("sales-chat", {
        body: {
          messages: conversationHistory,
          sessionId: sessionIdRef.current
        },
      });

      if (aiError) throw new Error("AI processing failed");
      const agentText = aiData?.content;

      if (agentText) {
        // Add Agent Transcript
        setTranscripts(prev => [...prev, {
          role: "agent",
          text: agentText,
          timestamp: new Date().toISOString()
        }]);

        // 3. Speak Response
        speakText(agentText);
      }

    } catch (error) {
      console.error("Voice agent error:", error);
      toast.error("Process failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        processAudio(audioBlob);
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Stop speaking if playing
      window.speechSynthesis.cancel();
      setIsSpeaking(false);

    } catch (err) {
      console.error("Microphone error:", err);
      toast.error("Could not access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const startSession = () => {
    sessionIdRef.current = `voice_${Date.now()}`;
    setTranscripts([]);
    setIsSessionActive(true);
    toast.success("Voice session started - Internal Mic Ready");
  };

  const endSession = () => {
    setIsSessionActive(false);
    setIsRecording(false);
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
    toast.info("Session ended");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Status indicator */}
      <div className="flex items-center gap-3">
        <div
          className={`w-3 h-3 rounded-full ${isSessionActive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"
            }`}
        />
        <span className="text-sm text-muted-foreground">
          {isSessionActive
            ? isSpeaking
              ? "AI is speaking..."
              : isProcessing
                ? "Processing..."
                : isRecording
                  ? "Listening..."
                  : "Ready"
            : "Ready to connect"}
        </span>
      </div>

      {/* Live transcript preview */}
      {isSessionActive && transcripts.length > 0 && (
        <div className="w-full max-h-48 overflow-y-auto bg-secondary/30 rounded-lg p-3 text-xs space-y-2">
          {transcripts.map((t, i) => (
            <p key={i} className={t.role === "user" ? "text-primary" : "text-muted-foreground"}>
              <span className="font-medium">{t.role === "user" ? "You" : "AI"}:</span> {t.text}
            </p>
          ))}
        </div>
      )}

      {/* Control buttons */}
      <div className="flex flex-col items-center gap-4">
        {!isSessionActive ? (
          <Button
            onClick={startSession}
            size="lg"
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Phone className="w-5 h-5" />
            Start Voice Chat
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            {/* Push to Talk Button */}
            <Button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              disabled={isProcessing}
              size="lg"
              className={`h-16 w-16 rounded-full transition-all duration-300 ${isRecording
                ? "bg-red-500 scale-110 ring-4 ring-red-500/30"
                : isProcessing
                  ? "bg-amber-500"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isProcessing ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isRecording ? (
                <div className="h-3 w-3 bg-white rounded-sm animate-pulse" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </Button>

            <Button
              onClick={endSession}
              size="icon"
              variant="destructive"
              className="h-10 w-10 rounded-full"
              title="End Session"
            >
              <PhoneOff className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Microphone status */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {isSessionActive ? (
          <span>{isRecording ? "Release to Send" : "Hold button to speak"}</span>
        ) : (
          <span>Powered by Deepgram & Gemini</span>
        )}
      </div>
    </div>
  );
}


