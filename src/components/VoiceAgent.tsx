import { useConversation } from "@elevenlabs/react";
import { useState, useCallback } from "react";
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function VoiceAgent() {
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to voice agent");
      toast.success("Connected to AI Voice Agent");
    },
    onDisconnect: () => {
      console.log("Disconnected from voice agent");
    },
    onMessage: (message) => {
      console.log("Message:", message);
    },
    onError: (error) => {
      console.error("Voice agent error:", error);
      toast.error("Voice connection error. Please try again.");
    },
  });

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

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
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === "connected";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Status indicator */}
      <div className="flex items-center gap-3">
        <div
          className={`w-3 h-3 rounded-full ${
            isConnected
              ? "bg-emerald-500 animate-pulse"
              : "bg-neutral-500"
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

      {/* Voice visualizer placeholder */}
      {isConnected && (
        <div className="flex items-center justify-center gap-1 h-16">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-primary rounded-full transition-all duration-150 ${
                conversation.isSpeaking
                  ? "animate-pulse"
                  : ""
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
            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
            <span>Microphone active</span>
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
