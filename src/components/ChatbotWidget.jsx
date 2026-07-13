import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot } from "lucide-react";
import { getBotReply, SUGGESTED_PROMPTS } from "../utils/recruiterBot.js";
import { profile } from "../data/profile.js";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: `Hi, I'm ${profile.name}'s AI recruiter assistant. Ask me anything about his projects, skills, or experience.`,
    },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = getBotReply(trimmed);
    setMessages((m) => [
      ...m,
      { role: "user", text: trimmed },
      { role: "bot", text: reply },
    ]);
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        aria-label="Open AI recruiter chat"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-aqua-500 to-neon-violet text-white shadow-lg shadow-aqua-500/30 transition-transform hover:scale-105 dark:shadow-neon-violet/40"
      >
        {open ? <X size={22} /> : <Sparkles size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass fixed bottom-24 right-5 z-40 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl shadow-glass"
          >
            <div className="flex items-center gap-3 border-b border-ink-900/10 px-4 py-3.5 dark:border-white/10">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-aqua-500 to-neon-violet text-white">
                <Bot size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold">AI Recruiter Chat</p>
                <p className="text-[11px] text-ink-500 dark:text-mist-400">
                  Ask about Anuj's resume
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-gradient-to-br from-aqua-500 to-neon-violet text-white"
                      : "glass text-ink-800 dark:text-mist-200"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {messages.length < 3 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="pill !text-[10px] transition-colors hover:border-aqua-500 dark:hover:border-neon-violet"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-ink-900/10 p-3 dark:border-white/10"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-full border border-ink-900/10 bg-white/60 px-4 py-2 text-sm outline-none focus:border-aqua-500 dark:border-white/10 dark:bg-white/5 dark:focus:border-neon-violet"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-aqua-500 to-neon-violet text-white transition-transform hover:scale-105"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
