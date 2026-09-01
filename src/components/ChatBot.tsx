"use client";

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, status, sendMessage } = useChat();

  // The command-menu trigger is fixed bottom-left at z-9999. On phones the chat
  // panel spans nearly the full width, so that pill paints on top of the chat
  // input. Publish open state and let CSS pull the trigger while chat is open.
  useEffect(() => {
    document.documentElement.setAttribute("data-chat-open", String(isOpen));
    return () => document.documentElement.removeAttribute("data-chat-open");
  }, [isOpen]);
  const isLoading = status === 'submitted' || status === 'streaming';
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [btnHovered, setBtnHovered] = useState(false);
  const btnContainerRef = useRef<HTMLDivElement>(null);
  
  // Magnetic mouse tracking coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Very smooth spring physics (high damping, moderate stiffness for a "heavy fluid" feel)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  // Map mouse displacement to smooth core coordinates
  const pupilX = useTransform(springX, [-100, 100], [-6, 6]);
  const pupilY = useTransform(springY, [-100, 100], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnContainerRef.current) return;
    const rect = btnContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setBtnHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    if (sendMessage) {
      sendMessage({ text: input });
    }
    setInput('');
  };

  return (
    <>
      {/* Floating Action Button - Ultimate Lightning Reactor */}
      <motion.div
        ref={btnContainerRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isOpen ? 0 : 1, 
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto' 
        }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(true)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="fixed bottom-6 right-6 w-16 h-16 bg-zinc-950/80 border border-zinc-900 rounded-full shadow-2xl z-50 flex items-center justify-center cursor-pointer overflow-hidden backdrop-blur-md"
        aria-label="Open Psunk AI Chat"
      >
        {/* Ambient background glow */}
        <motion.div 
          className="absolute w-8 h-8 rounded-full bg-violet-600/10 blur-xl z-0"
          animate={{
            scale: btnHovered ? 1.8 : 1,
            opacity: btnHovered ? 0.8 : 0.2
          }}
        />

        <div className="w-12 h-12 flex items-center justify-center relative">
          {/* 1. Outer telemetry ring */}
          <motion.svg 
            className="w-full h-full absolute text-violet-500/20"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: btnHovered ? 8 : 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 8" fill="none" />
            <circle cx="50" cy="50" r="43" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 15" fill="none" />
          </motion.svg>

          {/* 2. Heavy shield arcs */}
          <motion.svg 
            className="w-[84%] h-[84%] absolute text-violet-400"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            animate={{ 
              rotate: btnHovered ? 180 : 0,
              scale: btnHovered ? 0.90 : 1
            }}
            transition={{ type: "spring", stiffness: 90, damping: 15 }}
          >
            <path d="M 50 10 A 40 40 0 0 1 90 50" strokeLinecap="round" />
            <path d="M 50 90 A 40 40 0 0 1 10 50" strokeLinecap="round" />
          </motion.svg>

          {/* 3. Lightning Spark path */}
          {btnHovered && (
            <svg className="w-full h-full absolute text-violet-300 opacity-90 pointer-events-none z-10" viewBox="0 0 100 100">
              <motion.path 
                d="M 50 50 L 42 35 L 53 30 L 35 15" 
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"
                animate={{ 
                  d: [
                    "M 50 50 L 42 35 L 53 30 L 35 15",
                    "M 50 50 L 46 38 L 41 28 L 33 18",
                    "M 50 50 L 38 32 L 48 24 L 38 12"
                  ],
                  opacity: [0, 1, 0, 1, 0] 
                }}
                transition={{ duration: 0.2, repeat: Infinity }}
              />
              <motion.path 
                d="M 50 50 L 58 65 L 45 74 L 62 88" 
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"
                animate={{ 
                  d: [
                    "M 50 50 L 58 65 L 45 74 L 62 88",
                    "M 50 50 L 52 60 L 60 70 L 52 82",
                    "M 50 50 L 64 68 L 50 78 L 65 92"
                  ],
                  opacity: [1, 0, 1, 0, 1] 
                }}
                transition={{ duration: 0.25, repeat: Infinity, delay: 0.05 }}
              />
            </svg>
          )}

          {/* 4. Reactor Core with smooth magnetic tracking */}
          <motion.div 
            className="w-5.5 h-5.5 rounded-full bg-violet-950 border border-violet-400 flex items-center justify-center relative shadow-[0_0_12px_rgba(139,92,246,0.6)] z-10 overflow-hidden"
            style={{ x: pupilX, y: pupilY }}
            animate={{
              scale: btnHovered ? 1.2 : 1
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none" />
            <motion.div 
              className="w-4 h-4 border border-dashed border-violet-400/60 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: btnHovered ? 1.5 : 5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_6px_white] z-10"
              animate={btnHovered ? { scale: [1, 1.35, 1] } : { scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 left-4 right-4 w-auto sm:left-auto sm:right-6 sm:w-full sm:max-w-[400px] h-[500px] max-h-[80vh] z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/60 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-violet-950/40 border border-violet-500/30 flex items-center justify-center relative w-9 h-9 overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_white] z-10 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Psunk</h3>
                  <p className="text-xs text-white/50">Ask me anything about Rishav</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
                  <Bot className="w-12 h-12 text-white/30" />
                  <p className="text-sm text-white/60 px-4">
                    Hi there! I&apos;m Psunk, an AI assistant trained on Rishav&apos;s portfolio. How can I help you today?
                  </p>
                </div>
              )}
              
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-blue-400" />
                    </div>
                  )}
                  
                  <div
                    className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white/10 text-white/90 border border-white/10 rounded-bl-sm'
                    }`}
                  >
                    {m.parts ? m.parts.map((part, i) => (
                      <span key={i}>
                        {part.type === 'text' ? part.text : null}
                      </span>
                    )) : (m as { content?: string }).content}
                  </div>

                  {m.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-white/70" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 rounded-bl-sm text-sm text-white/50 flex items-center gap-1">
                    <span className="animate-pulse">Thinking</span>
                    <span className="animate-pulse delay-75">.</span>
                    <span className="animate-pulse delay-150">.</span>
                    <span className="animate-pulse delay-300">.</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center"
              >
                <input
                  value={input || ''}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input?.trim()}
                  className="absolute right-2 p-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-white/40 text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
