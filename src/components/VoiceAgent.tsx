import { useConversation } from "@elevenlabs/react";
import { useState, useCallback, useRef, useEffect } from "react";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TranscriptEntry {
  role: string;
  text: string;
  timestamp: string;
}

export function VoiceAgent() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const sessionIdRef = useRef<string>("");
  const conversationIdRef = useRef<string>("");
  const startTimeRef = useRef<Date | null>(null);

  const saveConversation = useCallback(async (ended: boolean = false) => {
    if (!conversationIdRef.current) return;

    const duration = startTimeRef.current
      ? Math.round((Date.now() - startTimeRef.current.getTime()) / 1000)
      : 0;

    const fullTranscript = transcripts
      .map((t) => `${t.role === "user" ? "User" : "Agent"}: ${t.text}`)
      .join("\n");

    try {
      await supabase
        .from("voice_conversations")
        .update({
          transcript: JSON.parse(JSON.stringify(transcripts)),
          full_transcript: fullTranscript,
          duration_seconds: duration,
          status: ended ? "completed" : "active",
          ended_at: ended ? new Date().toISOString() : null,
        })
        .eq("id", conversationIdRef.current);
    } catch (error) {
      console.error("Failed to save conversation:", error);
    }
  }, [transcripts]);

  // Auto-save transcripts periodically
  useEffect(() => {
    if (transcripts.length > 0 && conversationIdRef.current) {
      const timeout = setTimeout(() => saveConversation(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [transcripts, saveConversation]);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to voice agent");
      toast.success("Connected to AI Voice Agent");
    },
    onDisconnect: () => {
      console.log("Disconnected from voice agent");
      saveConversation(true);
    },
    onMessage: (message) => {
      console.log("Message:", message);
      
      // Type-safe message handling
      const msg = message as unknown as Record<string, unknown>;
      
      // Handle user transcripts
      if (msg.type === "user_transcript") {
        const event = msg.user_transcription_event as Record<string, unknown> | undefined;
        const userText = event?.user_transcript as string | undefined;
        if (userText) {
          setTranscripts((prev) => [
            ...prev,
            { role: "user", text: userText, timestamp: new Date().toISOString() },
          ]);
        }
      }
      
      // Handle agent responses
      if (msg.type === "agent_response") {
        const event = msg.agent_response_event as Record<string, unknown> | undefined;
        const agentText = event?.agent_response as string | undefined;
        if (agentText) {
          setTranscripts((prev) => [
            ...prev,
            { role: "agent", text: agentText, timestamp: new Date().toISOString() },
          ]);
        }
      }
    },
    onError: (error) => {
      console.error("Voice agent error:", error);
      toast.error("Voice connection error. Please try again.");
    },
  });

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    setTranscripts([]);
    
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Generate session ID
      sessionIdRef.current = `voice_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      startTimeRef.current = new Date();

      // Create voice conversation record
      const { data: voiceConvo, error: dbError } = await supabase
        .from("voice_conversations")
        .insert({
          session_id: sessionIdRef.current,
          status: "active",
          started_at: startTimeRef.current.toISOString(),
        })
        .select("id")
        .single();

      if (dbError) {
        console.error("Failed to create voice conversation record:", dbError);
      } else {
        conversationIdRef.current = voiceConvo.id;
      }

      // Get token from edge function
      const { data, error } = await supabase.functions.invoke(
        "elevenlabs-voice-token"
      );

      if (error || !data?.token) {
        throw new Error(error?.message || "No token received");
      }

      // Start the conversation with WebRTC
      await conversation.startSession({
        conversationToken: data.token,
        connectionType: "webrtc",
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      toast.error("Failed to connect. Please check microphone permissions.");
    } finally {
      setIsConnecting(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await saveConversation(true);
    await conversation.endSession();
    toast.success("Call ended. Transcript saved.");
  }, [conversation, saveConversation]);

  const isConnected = conversation.status === "connected";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Status indicator */}
      <div className="flex items-center gap-3">
        <div
          className={`w-3 h-3 rounded-full ${
            isConnected
              ? "bg-emerald-500 animate-pulse"
              : "bg-muted-foreground"
          }`}
        />
        <span className="text-sm text-muted-foreground">
          {isConnected
            ? conversation.isSpeaking
              ? "AI is speaking..."
              : "Listening..."
            : "Ready to connect"}
        </span>
      </div>

      {/* Live transcript preview */}
      {isConnected && transcripts.length > 0 && (
        <div className="w-full max-h-32 overflow-y-auto bg-secondary/30 rounded-lg p-3 text-xs space-y-2">
          {transcripts.slice(-3).map((t, i) => (
            <p key={i} className={t.role === "user" ? "text-primary" : "text-muted-foreground"}>
              <span className="font-medium">{t.role === "user" ? "You" : "AI"}:</span> {t.text}
            </p>
          ))}
        </div>
      )}

      {/* Voice visualizer */}
      {isConnected && (
        <div className="flex items-center justify-center gap-1 h-16">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-primary rounded-full transition-all duration-150 ${
                conversation.isSpeaking ? "animate-pulse" : ""
              }`}
              style={{
                height: conversation.isSpeaking
                  ? `${Math.random() * 40 + 20}px`
                  : "8px",
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      )}

      {/* Control buttons */}
      <div className="flex items-center gap-4">
        {!isConnected ? (
          <Button
            onClick={startConversation}
            disabled={isConnecting}
            size="lg"
            className="gap-2"
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Phone className="w-5 h-5" />
                Start Voice Chat
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={stopConversation}
            size="lg"
            variant="destructive"
            className="gap-2"
          >
            <PhoneOff className="w-5 h-5" />
            End Call
          </Button>
        )}
      </div>

      {/* Microphone status */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {isConnected ? (
          <>
            <Mic className="w-3 h-3" />
            <span>Microphone active • Recording transcript</span>
          </>
        ) : (
          <>
            <MicOff className="w-3 h-3" />
            <span>Click to enable voice</span>
          </>
        )}
      </div>
    </div>
  );
}

export default VoiceAgent;
