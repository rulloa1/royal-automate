import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Mic, MicOff, Phone, Loader2 } from "lucide-react";
import { useConversation } from "@elevenlabs/react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SystemsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log("NOVA connected");
      toast.success("NOVA is now listening");
    },
    onDisconnect: () => {
      console.log("NOVA disconnected");
    },
    onError: (error) => {
      console.error("NOVA error:", error);
      toast.error("Connection error. Please try again.");
    },
  });

  const isCallActive = conversation.status === "connected";

  const startCall = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get token from edge function
      const { data, error } = await supabase.functions.invoke("elevenlabs-voice-token");

      if (error || !data?.token) {
        throw new Error(error?.message || "Failed to get voice token");
      }

      // Start conversation with WebRTC
      await conversation.startSession({
        conversationToken: data.token,
        connectionType: "webrtc",
      });
    } catch (err) {
      console.error("Failed to start NOVA:", err);
      toast.error("Could not start voice call. Check microphone permissions.");
    } finally {
      setIsConnecting(false);
    }
  }, [conversation]);

  const endCall = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);
  const capabilities = [
    {
      code: "INTELLIGENT_WORKFLOWS:",
      description:
        "Make.com & n8n node integration for automated redundancy elimination",
    },
    {
      code: "CONVERSATIONAL_AI:",
      description:
        "24/7 autonomous communication units with real-time CRM integration",
    },
    {
      code: "PIPELINE_BUILDER:",
      description: "High-volume data processing for automated lead acquisition",
    },
    {
      code: "WEB_ARCHITECTURE:",
      description:
        "High-performance interfaces built with React, TypeScript, and Vite",
    },
  ];

  return (
    <section id="systems" ref={ref} className="py-32 px-6 relative bg-card/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm mb-4">
            // SYSTEM_OVERVIEW
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight">
            <span className="text-foreground">NEURAL </span>
            <span className="text-primary">INFRASTRUCTURE</span>
          </h2>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Voice Agent Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-muted/50 bg-card/50 backdrop-blur-sm p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-mono text-primary mb-1">
                  ### VOICE_AI_AGENT // NOVA
                </p>
                <h3 className="font-display text-2xl text-foreground">
                  NOVA Voice Agent
                </h3>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                Interactive Demo
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Real-time audio interaction powered by Gemini 2.5 Flash Native
              Audio API. NOVA captures microphone input at 16kHz, encodes PCM to
              base64, and streams bidirectionally with the model.
            </p>

            {/* Demo Interface */}
            <div className="bg-background/50 border border-muted/30 p-4 mb-6">
              {/* Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isCallActive ? "bg-green-500 animate-pulse" : isConnecting ? "bg-amber-500 animate-pulse" : "bg-primary"
                    }`}
                  />
                  <span className="font-mono text-xs">
                    NOVA //{" "}
                    {isConnecting ? "CONNECTING" : isCallActive ? "ACTIVE" : "STANDBY"}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {isConnecting ? "Initializing..." : isCallActive ? (conversation.isSpeaking ? "Speaking..." : "Listening...") : "Ready for voice input"}
                </span>
              </div>

              {/* Audio Visualizer */}
              <div className="h-16 flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    animate={{
                      height: isCallActive || isConnecting
                        ? [8, 24 + Math.random() * 16, 8]
                        : 8,
                    }}
                    transition={{
                      repeat: isCallActive || isConnecting ? Infinity : 0,
                      duration: 0.3 + Math.random() * 0.2,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <button
                onClick={isCallActive ? endCall : startCall}
                disabled={isConnecting}
                className={`w-full py-3 font-mono text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isCallActive
                    ? "bg-red-500/20 text-red-500 border border-red-500/50"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> CONNECTING...
                  </>
                ) : isCallActive ? (
                  <>
                    <MicOff className="w-4 h-4" /> END DISCOVERY CALL
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4" /> START DISCOVERY CALL
                  </>
                )}
              </button>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-muted/20">
                <p className="text-xs text-muted-foreground font-mono">INPUT</p>
                <p className="text-sm text-primary font-mono">16kHz</p>
              </div>
              <div className="p-2 bg-muted/20">
                <p className="text-xs text-muted-foreground font-mono">
                  OUTPUT
                </p>
                <p className="text-sm text-primary font-mono">24kHz</p>
              </div>
              <div className="p-2 bg-muted/20">
                <p className="text-xs text-muted-foreground font-mono">CODEC</p>
                <p className="text-sm text-primary font-mono">PCM</p>
              </div>
            </div>
          </motion.div>

          {/* Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-primary font-mono text-sm">
              ### // SYSTEM_CAPABILITIES
            </p>

            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.code}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="border-l-2 border-primary/30 pl-4 py-2 hover:border-primary transition-colors"
              >
                <p className="text-xs font-mono text-primary mb-1">
                  {cap.code}
                </p>
                <p className="text-muted-foreground text-sm">
                  {cap.description}
                </p>
              </motion.div>
            ))}

            {/* System Event */}
            <div className="mt-8 p-4 border border-muted/50 bg-card/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-muted-foreground">
                  System Event
                </span>
                <span className="text-xs font-mono text-primary px-2 py-1 bg-primary/10">
                  ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-display text-foreground">01</span>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">
                    DEC 2025
                  </p>
                  <p className="text-sm text-foreground">
                    Gemini 2.5 Flash Native Audio Integration Active
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="text-xs">
                  <span className="text-muted-foreground">Input:</span>
                  <span className="text-primary ml-1">16kHz PCM</span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">Output:</span>
                  <span className="text-primary ml-1">24kHz Mono</span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">Encoding:</span>
                  <span className="text-primary ml-1">Base64</span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">Model:</span>
                  <span className="text-primary ml-1">Gemini 2.5</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SystemsSection;
