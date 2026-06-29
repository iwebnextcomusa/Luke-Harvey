import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Music, HelpCircle, Phone, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "bot",
      text: "Hi there! I'm Luke Harvey's Southwest AI Guide, crafted by iWebNext. Ask me about Luke's acoustic folk-rock, 'Sedona Sessions' album, upcoming Sedona shows, or booking private acoustic sets!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt suggestions to click
  const SUGGESTED_QUESTIONS = [
    "Where is Luke based?",
    "Tell me about 'Sedona Sessions'",
    "How do I book Luke Harvey?",
    "When is the next show?"
  ];

  // Auto scroll chat to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle send message
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Call secure Express backend endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          // Exclude first greeting from history to prevent duplication
          history: messages.slice(1).map((m) => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await response.json();
      setIsTyping(false);

      if (response.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: "bot",
            text: data.reply,
            timestamp: new Date()
          }
        ]);
      } else {
        throw new Error(data.error || "Failed server API response");
      }

    } catch (error) {
      console.error("Chat API Error:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: "I apologize, the desert winds are blocking my signal slightly. Please feel free to email me directly at davidrrfd@yahoo.com or call 928-300-7747!",
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end" id="chatbot-widget-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[320px] sm:w-[380px] h-[480px] max-h-[calc(100vh-140px)] bg-sedona-charcoal/95 border border-sedona-clay/35 rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-black/50 backdrop-blur-md mb-4"
            id="chat-window-panel"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sedona-clay via-sedona-red to-sedona-orange p-4 flex items-center justify-between border-b border-sedona-orange/20 shadow">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-black/20 rounded-lg border border-white/15">
                  <Music className="w-5 h-5 text-sedona-sand animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-sedona-sand font-medium tracking-wide">
                    Luke's Desert Assistant
                  </h4>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
                    <span className="text-[10px] font-mono text-sedona-sand/80 uppercase tracking-widest">
                      Active Guide
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-sedona-sand/80 hover:text-white rounded hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
                id="btn-close-chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Thread container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sedona-dark/60" id="chat-messages-container">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                  id={`chat-msg-row-${m.id}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-md border ${
                      m.sender === "user"
                        ? "bg-sedona-red border-sedona-orange/30 text-sedona-sand rounded-br-none"
                        : "bg-sedona-charcoal border-sedona-clay/20 text-sedona-sand rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    <span className={`block text-[8px] font-mono mt-1 text-right ${m.sender === "user" ? "text-sedona-sand/60" : "text-sedona-copper/70"}`}>
                      {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start" id="chat-typing-indicator">
                  <div className="bg-sedona-charcoal border border-sedona-clay/15 rounded-2xl rounded-bl-none px-4 py-3 flex items-center space-x-1.5 shadow">
                    <span className="w-1.5 h-1.5 bg-sedona-orange rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-sedona-orange rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-sedona-orange rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Question Suggestions Block */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-2 border-t border-sedona-clay/15 bg-sedona-dark/85" id="chat-suggestions">
                <p className="text-[10px] font-mono uppercase tracking-widest text-sedona-copper mb-2 flex items-center">
                  <HelpCircle className="w-3.5 h-3.5 mr-1 text-sedona-orange" /> Suggested Topics:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="px-2.5 py-1.5 bg-sedona-charcoal border border-sedona-clay/20 hover:border-sedona-orange rounded text-[10px] text-sedona-sand hover:text-sedona-orange transition-all cursor-pointer text-left"
                      id={`suggested-q-${idx}`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-sedona-charcoal border-t border-sedona-clay/20 flex items-center space-x-2"
              id="chat-input-form"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about music, bookings, or Sedona..."
                className="flex-1 px-3.5 py-2.5 bg-sedona-dark text-xs text-sedona-sand border border-sedona-clay/25 focus:border-sedona-orange rounded-xl focus:outline-none transition-colors font-sans"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 bg-sedona-red hover:bg-sedona-orange text-sedona-sand hover:scale-105 transition-all rounded-xl disabled:opacity-40 disabled:scale-100 cursor-pointer flex items-center justify-center border border-sedona-orange/10"
                id="btn-chat-send"
              >
                <Send className="w-4 h-4 fill-current" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-gradient-to-br from-sedona-clay to-sedona-red text-sedona-sand rounded-full shadow-2xl border border-sedona-orange/30 cursor-pointer flex items-center justify-center focus:outline-none relative group"
        aria-label="Toggle chat"
        id="btn-chat-toggle"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-sedona-orange" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sedona-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sedona-orange"></span>
            </span>
          </>
        )}
        {/* Hover label */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 bg-sedona-dark/90 border border-sedona-clay/30 text-sedona-sand font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none transition-all shadow-lg">
          Ask Sedona AI Guide
        </span>
      </motion.button>
    </div>
  );
}
