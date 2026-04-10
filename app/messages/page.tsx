import Link from "next/link";
import { INBOX } from "../data/messages";

function AvatarPlaceholder({ username }: { username: string }) {
  const initials = username.slice(0, 2).toUpperCase();
  return (
    <div
      className="w-full h-full rounded-full flex items-center justify-center text-white text-sm font-bold select-none"
      style={{ background: "linear-gradient(135deg, #ff6a00, #ff4500)" }}
    >
      {initials}
    </div>
  );
}

export default function MessagesPage() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100dvh", color: "#f0f0f0" }}>
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 h-[44px] border-b"
        style={{ background: "#111111", borderColor: "#2a2a2a", maxWidth: 470, margin: "0 auto" }}
      >
        <Link href="/" aria-label="Back" className="mr-3 flex items-center" style={{ color: "#f0f0f0" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <span className="font-semibold text-[16px]">Messages</span>
      </header>

      <main style={{ paddingTop: 44, maxWidth: 470, margin: "0 auto" }}>
        {INBOX.map((msg) => (
          <Link
            key={msg.id}
            href={`/messages/${msg.id}`}
            className="flex items-center gap-3 px-4 py-3 border-b active:opacity-70 transition-opacity"
            style={{ borderColor: "#2a2a2a" }}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0" style={{ width: 56, height: 56 }}>
              <div className="w-full h-full rounded-full overflow-hidden">
                <AvatarPlaceholder username={msg.fromUsername} />
              </div>
              {/* Unread dot */}
              {!msg.read && (
                <span
                  className="absolute rounded-full"
                  style={{ background: "#ff6a00", width: 12, height: 12, bottom: 1, right: 1, border: "2px solid #0d0d0d" }}
                />
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-[2px]">
                <span
                  className="text-[14px]"
                  style={{ fontWeight: msg.read ? 400 : 700, color: "#f0f0f0" }}
                >
                  {msg.fromUsername}
                </span>
                <span className="text-[12px] flex-shrink-0 ml-2" style={{ color: "#888888" }}>
                  {msg.timeAgo}
                </span>
              </div>
              <p
                className="text-[13px] truncate"
                style={{ color: msg.read ? "#888888" : "#f0f0f0", fontWeight: msg.read ? 400 : 500 }}
              >
                {msg.text}
              </p>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
