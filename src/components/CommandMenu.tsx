"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Moon, Sun, BookOpen, FileText, CornerDownLeft, Mail, Phone, Compass, Laptop } from "lucide-react";

interface CommandMenuProps {
  onOpenCaseStudy: (projectId: number) => void;
}

export default function CommandMenu({ onOpenCaseStudy }: CommandMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [readingMode, setReadingMode] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Sync theme with DOM
  useEffect(() => {
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") as "dark" | "light" | null : null;
    const initialTheme = savedTheme || "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initialTheme);
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    setIsOpen(false);
  };

  const toggleReadingMode = () => {
    const nextMode = !readingMode;
    setReadingMode(nextMode);
    document.documentElement.setAttribute("data-reading-mode", String(nextMode));
    setIsOpen(false);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus search input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIndex(0);
      setSearch("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const items = [
    // Navigation
    {
      category: "Navigation",
      label: "View Home",
      icon: <Compass className="w-4 h-4" />,
      action: () => {
        const el = document.querySelector("main");
        el?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      category: "Navigation",
      label: "View Case Studies",
      icon: <Laptop className="w-4 h-4" />,
      action: () => {
        setIsOpen(false);
        router.push("/projects");
      },
    },
    {
      category: "Navigation",
      label: "View About Details",
      icon: <Compass className="w-4 h-4" />,
      action: () => {
        const el = document.querySelector("section:nth-of-type(2)");
        el?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      category: "Navigation",
      label: "View Contact & Socials",
      icon: <Compass className="w-4 h-4" />,
      action: () => {
        const el = document.querySelector("footer");
        el?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    // Commercial Projects
    {
      category: "Commercial Projects",
      label: "Project: Tea Country Holidays (Travel Booking)",
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      action: () => {
        onOpenCaseStudy(1);
        setIsOpen(false);
      },
    },
    {
      category: "Commercial Projects",
      label: "Project: Gym CRM (IQ Iron Fitness)",
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onOpenCaseStudy(2);
        setIsOpen(false);
      },
    },
    {
      category: "Commercial Projects",
      label: "Project: ClashVault (Escrow Marketplace)",
      icon: <FileText className="w-4 h-4 text-violet-400" />,
      action: () => {
        onOpenCaseStudy(3);
        setIsOpen(false);
      },
    },
    // Preferences
    {
      category: "Preferences",
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      icon: theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
      action: toggleTheme,
    },
    {
      category: "Preferences",
      label: readingMode ? "Disable Reading Mode (Show Animations)" : "Enable Reading Mode (Clean Serif Layout)",
      icon: <BookOpen className="w-4 h-4" />,
      action: toggleReadingMode,
    },
    // Actions
    {
      category: "Contact / Info",
      label: "Download Professional Resume (PDF)",
      icon: <FileText className="w-4 h-4" />,
      action: () => {
        const link = document.createElement("a");
        link.href = "/Rishav-Roy-Resume.pdf";
        link.download = "Rishav-Roy-Resume.pdf";
        link.target = "_blank";
        link.click();
        setIsOpen(false);
      },
    },
    {
      category: "Contact / Info",
      label: "Copy Professional Email Address",
      icon: <Mail className="w-4 h-4" />,
      action: () => {
        navigator.clipboard.writeText("rishav2000roy@gmail.com");
        alert("Email address copied to clipboard!");
        setIsOpen(false);
      },
    },
    {
      category: "Contact / Info",
      label: "Copy Phone Number / WhatsApp Link",
      icon: <Phone className="w-4 h-4" />,
      action: () => {
        navigator.clipboard.writeText("+91 60019 14771");
        alert("Phone number copied to clipboard!");
        setIsOpen(false);
      },
    },
  ];

  // Filter items by search query
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Navigate options via keyboard
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;
    const selectedEl = listEl.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Floating shortcut trigger button (hidden in reading mode) */}
      {!readingMode && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-[9999] pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-[#0f0f0f]/90 backdrop-blur-md text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all font-mono text-[10px] sm:text-xs uppercase tracking-widest shadow-2xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 cursor-pointer"
          aria-label="Open command menu"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Menu</span>
          <span className="hidden sm:inline border border-white/15 px-1.5 py-0.5 rounded text-[9px] bg-white/5">
            ⌘K
          </span>
        </button>
      )}

      {/* Main Command Menu Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col focus:outline-none"
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              onKeyDown={handleListKeyDown}
            >
              {/* Top border colored stripe */}
              <div className="h-[2px] w-full bg-accent" />

              {/* Search Bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
                <Search className="w-5 h-5 text-white/30" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="flex-1 bg-transparent text-white placeholder-white/30 border-none outline-none font-sans text-sm sm:text-base"
                  aria-autocomplete="list"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors font-mono px-2 py-1 border border-white/10 rounded"
                >
                  ESC
                </button>
              </div>

              {/* Search Results */}
              <div
                ref={listRef}
                className="max-h-[360px] overflow-y-auto py-2 divide-y divide-white/5"
                role="listbox"
                aria-label="Commands"
              >
                {filteredItems.length === 0 ? (
                  <div className="px-6 py-10 text-center text-white/30 font-mono text-xs uppercase tracking-wider">
                    No commands or matching sections found
                  </div>
                ) : (
                  Object.entries(
                    filteredItems.reduce((acc, curr) => {
                      if (!acc[curr.category]) acc[curr.category] = [];
                      acc[curr.category].push(curr);
                      return acc;
                    }, {} as Record<string, typeof items>)
                  ).map(([category, catItems]) => (
                    <div key={category} className="py-2">
                      <div className="px-4 py-1 text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 font-bold">
                        {category}
                      </div>
                      {catItems.map((item) => {
                        // Find the index of this item in the global filtered list
                        const idx = filteredItems.indexOf(item);
                        const isSelected = idx === selectedIndex;

                        return (
                          <div
                            key={item.label}
                            data-index={idx}
                            onClick={() => item.action()}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-accent text-background font-medium"
                                : "text-white/80 hover:bg-white/5 hover:text-white"
                            }`}
                            role="option"
                            aria-selected={isSelected}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <span className={isSelected ? "text-background" : "text-white/40"}>
                                {item.icon}
                              </span>
                              <span className="text-xs sm:text-sm truncate">
                                {item.label}
                              </span>
                            </div>
                            {isSelected && (
                              <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-background/60 font-bold">
                                <span>Select</span>
                                <CornerDownLeft className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Bottom status bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-t border-white/5 font-mono text-[9px] uppercase tracking-wider text-white/30">
                <div className="flex gap-4">
                  <span>↑↓ Navigate</span>
                  <span>Enter Select</span>
                </div>
                <span>Ctrl+K to toggle</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
