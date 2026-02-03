import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export function RelevanceAIChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[400px] h-[600px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#ff6179] p-3 flex items-center justify-between">
              <span className="text-white font-semibold text-sm">AI Assistant</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
            
            {/* Iframe */}
            <iframe
              src="https://app.relevanceai.com/agents/bcbe5a/6c31007558fd-4773-b4ba-93b04e6fdc98/863c7b11-db2a-4f1d-8241-611241fe5179/embed-chat?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23ff6179&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false&hide_description=false"
              className="w-full h-[calc(100%-48px)]"
              frameBorder="0"
              allow="microphone"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 bg-[#ff6179] hover:bg-[#ff4a65] text-white rounded-full shadow-2xl flex items-center justify-center transition-colors relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
