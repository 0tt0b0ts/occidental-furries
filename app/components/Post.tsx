"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post as PostType } from "../data/posts";

// Cute fox head SVG — used both in the action bar and as the double-tap overlay
function FoxIcon({ size = 26, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left ear */}
      <polygon points="4,20 13,1 20,20" fill={color} />
      {/* Right ear */}
      <polygon points="20,20 27,1 36,20" fill={color} />
      {/* Inner left ear */}
      <polygon points="7,19 13,6 18,19" fill="#1a1a1a" opacity="0.35" />
      {/* Inner right ear */}
      <polygon points="22,19 27,6 33,19" fill="#1a1a1a" opacity="0.35" />
      {/* Head */}
      <circle cx="20" cy="24" r="14" fill={color} />
      {/* Left eye */}
      <ellipse cx="15" cy="22" rx="2.2" ry="2.4" fill="#111" />
      <circle cx="15.7" cy="21.3" r="0.7" fill="white" />
      {/* Right eye */}
      <ellipse cx="25" cy="22" rx="2.2" ry="2.4" fill="#111" />
      <circle cx="25.7" cy="21.3" r="0.7" fill="white" />
      {/* Snout */}
      <ellipse cx="20" cy="28" rx="4.5" ry="3" fill="white" opacity="0.25" />
      {/* Nose */}
      <ellipse cx="20" cy="26.5" rx="1.6" ry="1.1" fill="#111" />
    </svg>
  );
}

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

function ImagePlaceholder() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{ background: "#1a1a1a" }}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span style={{ color: "#444", fontSize: 12 }}>
        Add image to /public/images/posts/
      </span>
    </div>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toString();
}

export default function Post({ post }: { post: PostType }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showFullCaption, setShowFullCaption] = useState(false);

  // Waggle animation key — bump it to restart the animation
  const [waggleKey, setWaggleKey] = useState(0);
  const isWaggling = waggleKey > 0;

  // Double-tap overlay
  const [showPop, setShowPop] = useState(false);
  const popTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTap = useRef(0);

  const triggerLike = useCallback(() => {
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
    // Always waggle and pop when triggered
    setWaggleKey((k) => k + 1);
    setShowPop(true);
    if (popTimeout.current) clearTimeout(popTimeout.current);
    popTimeout.current = setTimeout(() => setShowPop(false), 900);
  }, [liked]);

  function handleImageTap() {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      triggerLike();
    }
    lastTap.current = now;
  }

  function handleLikeButton() {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      triggerLike();
    }
  }

  const captionWords = post.caption.split(" ");
  const isLongCaption = captionWords.length > 20;
  const shortCaption = isLongCaption ? captionWords.slice(0, 20).join(" ") + "…" : post.caption;

  return (
    <article className="border-b" style={{ borderColor: "#2a2a2a", background: "#111111" }}>
      {/* Post header */}
      <div className="flex items-center justify-between px-3 py-2">
        <Link href={`/profile/${post.profileSlug}`} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            {post.hasAvatar && post.avatar ? (
              <Image
                src={post.avatar}
                alt={post.username}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            ) : (
              <AvatarPlaceholder username={post.username} />
            )}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-[13px]" style={{ color: "#f0f0f0" }}>{post.username}</span>
            {post.location && (
              <span className="text-[11px]" style={{ color: "#888888" }}>
                {post.location}
              </span>
            )}
          </div>
        </Link>
        <button aria-label="More options" className="p-1" style={{ color: "#f0f0f0" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Post image — double-tap to like */}
      <div
        className="relative w-full select-none"
        style={{ aspectRatio: "1 / 1" }}
        onTouchEnd={handleImageTap}
        onClick={handleImageTap}
      >
        {post.hasImage && post.image ? (
          <Image
            src={post.image}
            alt={`Post by ${post.username}`}
            fill
            className="object-cover"
            sizes="100vw"
            draggable={false}
          />
        ) : (
          <ImagePlaceholder />
        )}

        {/* Double-tap fox overlay */}
        {showPop && (
          <div
            className="fox-pop pointer-events-none absolute"
            style={{ top: "50%", left: "50%", zIndex: 10 }}
          >
            <FoxIcon size={120} color="#ff6a00" />
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <div className="flex items-center gap-3">
          {/* Like — fox icon */}
          <button
            onClick={handleLikeButton}
            aria-label={liked ? "Unlike" : "Like"}
            className="flex items-center"
            style={{ color: liked ? "#ff6a00" : "#f0f0f0" }}
          >
            <span
              key={waggleKey}
              className={isWaggling ? "fox-waggle" : ""}
              style={{ display: "flex", transformOrigin: "50% 80%" }}
            >
              <FoxIcon size={26} color={liked ? "#ff6a00" : "currentColor"} />
            </span>
          </button>

          {/* Comment */}
          <button aria-label="Comment" className="flex items-center" style={{ color: "#f0f0f0" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          {/* Share */}
          <button aria-label="Share" className="flex items-center" style={{ color: "#f0f0f0" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        {/* Save */}
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label="Save"
          className="flex items-center"
          style={{ color: saved ? "#ff6a00" : "#f0f0f0" }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="19 21 12 16 5 21 5 3 19 3 19 21" />
          </svg>
        </button>
      </div>

      {/* Likes count */}
      <div className="px-3 pb-1">
        <span className="font-semibold text-[13px]" style={{ color: "#f0f0f0" }}>
          {formatCount(likeCount)} likes
        </span>
      </div>

      {/* Caption */}
      <div className="px-3 pb-1">
        <p className="text-[13px] leading-5" style={{ color: "#f0f0f0" }}>
          <Link href={`/profile/${post.profileSlug}`} className="font-semibold mr-1">{post.username}</Link>
          {showFullCaption || !isLongCaption ? post.caption : shortCaption}
          {isLongCaption && !showFullCaption && (
            <button
              onClick={() => setShowFullCaption(true)}
              className="ml-1"
              style={{ color: "#888888" }}
            >
              more
            </button>
          )}
        </p>
      </div>

      {/* Comments count */}
      {post.comments > 0 && (
        <div className="px-3 pb-1">
          <button className="text-[13px]" style={{ color: "#888888" }}>
            View all {post.comments} comments
          </button>
        </div>
      )}

      {/* Timestamp */}
      <div className="px-3 pb-3">
        <span className="text-[10px] uppercase tracking-wide" style={{ color: "#888888" }}>
          {post.timeAgo}
        </span>
      </div>
    </article>
  );
}
