"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { THREADS } from "../../data/messages";

function AvatarPlaceholder({ username, size = 32 }: { username: string; size?: number }) {
  const initials = username.slice(0, 2).toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold select-none flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, #ff6a00, #ff4500)",
        width: size,
        height: size,
        fontSize: size * 0.32,
      }}
    >
      {initials}
    </div>
  );
}

export default function ThreadPage() {
  const { id } = useParams<{ id: string }>();
  const thread = THREADS[id];

  const [messages, setMessages] = useState(thread?.messages ?? []);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!thread) {
    return (
      <div style={{ background: "#0d0d0d", minHeight: "100dvh", color: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Thread not found.
      </div>
    );
  }

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { fromSelf: true, text, timeAgo: "now" }]);
    setDraft("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100dvh", color: "#f0f0f0", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-3 h-[54px] border-b"
        style={{ background: "#111111", borderColor: "#2a2a2a", maxWidth: 470, margin: "0 auto" }}
      >
        <Link href="/messages" aria-label="Back" className="flex items-center flex-shrink-0" style={{ color: "#f0f0f0" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <Link href={`/profile/${thread.withProfileSlug}`} className="flex items-center gap-2 flex-1 min-w-0">
          <AvatarPlaceholder username={thread.withUsername} size={34} />
          <span className="font-semibold text-[14px] truncate" style={{ color: "#f0f0f0" }}>
            {thread.withUsername}
          </span>
        </Link>
      </header>

      {/* Messages */}
      <main
        className="flex-1 overflow-y-auto px-3 flex flex-col gap-2"
        style={{ paddingTop: 70, paddingBottom: 72, maxWidth: 470, margin: "0 auto", width: "100%" }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className="flex"
            style={{ justifyContent: msg.fromSelf ? "flex-end" : "flex-start" }}
          >
            {!msg.fromSelf && (
              <div className="mr-2 mt-auto">
                <AvatarPlaceholder username={thread.withUsername} size={28} />
              </div>
            )}
            <div
              className="flex flex-col"
              style={{ maxWidth: "72%", alignItems: msg.fromSelf ? "flex-end" : "flex-start" }}
            >
              <div
                className="px-3 py-2 text-[14px] leading-5"
                style={{
                  background: msg.fromSelf ? "#ff6a00" : "#1e1e1e",
                  color: "#f0f0f0",
                  borderRadius: msg.fromSelf ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  wordBreak: "break-word",
                }}
              >
                {msg.text}
              </div>
              <span className="text-[10px] mt-1" style={{ color: "#888888" }}>
                {msg.timeAgo}
              </span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </main>

      {/* Input bar */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-2 border-t"
        style={{
          background: "#111111",
          borderColor: "#2a2a2a",
          maxWidth: 470,
          margin: "0 auto",
          paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
        }}
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
          className="flex-1 px-4 py-2 text-[14px] rounded-full outline-none"
          style={{
            background: "#1e1e1e",
            border: "1px solid #2a2a2a",
            color: "#f0f0f0",
          }}
        />
        <button
          onClick={handleSend}
          disabled={!draft.trim()}
          className="font-semibold text-[14px] flex-shrink-0"
          style={{ color: draft.trim() ? "#ff6a00" : "#444", transition: "color 0.15s" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
