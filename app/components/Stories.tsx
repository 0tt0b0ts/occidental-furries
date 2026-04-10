"use client";

import Image from "next/image";
import { STORIES } from "../data/posts";

function AvatarPlaceholder({ label, isOwn }: { label: string; isOwn?: boolean }) {
  const initials = label.slice(0, 2).toUpperCase();
  return (
    <div
      className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold select-none"
      style={{ background: isOwn ? "#2a2a2a" : "linear-gradient(135deg, #ff6a00, #ff4500)" }}
    >
      {isOwn ? (
        <span style={{ color: "#888888", fontSize: 22, lineHeight: 1 }}>+</span>
      ) : (
        initials
      )}
    </div>
  );
}

export default function Stories() {
  return (
    <div
      className="flex gap-3 overflow-x-auto px-3 py-3 border-b"
      style={{ borderColor: "#2a2a2a", background: "#111111" }}
    >
      {STORIES.map((story) => (
        <button
          key={story.id}
          className="flex flex-col items-center gap-1 flex-shrink-0"
          style={{ minWidth: 64 }}
          aria-label={story.username}
        >
          {/* Ring */}
          <div
            className="rounded-full p-[2px]"
            style={{
              background: story.isOwn
                ? "transparent"
                : "linear-gradient(135deg, #ff6a00, #ff4500)",
              border: story.isOwn ? "2px solid #2a2a2a" : "none",
              width: 64,
              height: 64,
            }}
          >
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: "100%",
                height: "100%",
                padding: story.isOwn ? 0 : 2,
                background: "#111111",
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden">
                {story.hasAvatar && story.avatar ? (
                  <Image
                    src={story.avatar}
                    alt={story.username}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <AvatarPlaceholder label={story.username} isOwn={story.isOwn} />
                )}
              </div>
            </div>
          </div>
          {/* Username */}
          <span
            className="text-[11px] text-center w-full truncate"
            style={{ color: "#f0f0f0", maxWidth: 64 }}
          >
            {story.username}
          </span>
        </button>
      ))}
    </div>
  );
}
