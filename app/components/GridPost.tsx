"use client";

import Image from "next/image";
import type { Post } from "../data/posts";

function GridImagePlaceholder() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "#1a1a1a" }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c7c7c7" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

export default function GridPost({ post }: { post: Post }) {
  return (
    <div className="relative" style={{ aspectRatio: "1 / 1" }}>
      {post.hasImage && post.image ? (
        <Image
          src={post.image}
          alt={`Post by ${post.username}`}
          fill
          className="object-cover"
          sizes="33vw"
        />
      ) : (
        <GridImagePlaceholder />
      )}
    </div>
  );
}
