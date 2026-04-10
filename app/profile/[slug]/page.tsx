import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROFILES, POSTS } from "../../data/posts";
import BottomNav from "../../components/BottomNav";
import GridPost from "../../components/GridPost";

function formatStat(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toString();
}

function AvatarPlaceholder({ username }: { username: string }) {
  const initials = username.slice(0, 2).toUpperCase();
  return (
    <div
      className="w-full h-full rounded-full flex items-center justify-center text-white font-bold select-none"
      style={{
        background: "linear-gradient(135deg, #ff6a00, #ff4500)",
        fontSize: 28,
      }}
    >
      {initials}
    </div>
  );
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = PROFILES[slug];
  if (!profile) notFound();

  const posts = POSTS.filter((p) => p.profileSlug === slug);

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100dvh", color: "#f0f0f0" }}>
      {/* Profile header bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 h-[44px] border-b"
        style={{ background: "#111111", borderColor: "#2a2a2a", color: "#f0f0f0", maxWidth: 470, margin: "0 auto" }}
      >
        <Link href="/" aria-label="Back" className="mr-3 flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <span className="font-semibold text-[15px]">{profile.username}</span>
      </header>

      <main
        style={{
          paddingTop: 44,
          paddingBottom: 50,
          maxWidth: 470,
          margin: "0 auto",
        }}
      >
        {/* Profile info section */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-6 mb-4">
            {/* Avatar */}
            <div
              className="rounded-full overflow-hidden flex-shrink-0"
              style={{ width: 86, height: 86 }}
            >
              {profile.hasAvatar && profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.username}
                  width={86}
                  height={86}
                  className="object-cover w-full h-full"
                />
              ) : (
                <AvatarPlaceholder username={profile.username} />
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-5 flex-1">
              {[
                { label: "Posts", value: profile.posts },
                { label: "Followers", value: profile.followers },
                { label: "Following", value: profile.following },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="font-bold text-[15px]">{formatStat(stat.value)}</span>
                  <span className="text-[12px]" style={{ color: "#888888" }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Display name + bio */}
          <div className="mb-3">
            <p className="font-semibold text-[13px] mb-1">{profile.displayName}</p>
            <p className="text-[13px] leading-5 whitespace-pre-line">{profile.bio}</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              className="flex-1 py-[6px] rounded-lg text-[13px] font-semibold border"
              style={{ borderColor: "#2a2a2a", background: "#1a1a1a", color: "#f0f0f0" }}
            >
              Follow
            </button>
            <button
              className="flex-1 py-[6px] rounded-lg text-[13px] font-semibold border"
              style={{ borderColor: "#2a2a2a", background: "#1a1a1a", color: "#f0f0f0" }}
            >
              Message
            </button>
            <button
              className="px-3 py-[6px] rounded-lg border flex items-center justify-center"
              style={{ borderColor: "#2a2a2a", background: "#1a1a1a", color: "#f0f0f0" }}
              aria-label="More"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="19" cy="12" r="1.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Divider + grid tab */}
        <div className="flex border-b" style={{ borderColor: "#2a2a2a" }}>
          <button
            className="flex-1 flex justify-center py-2 border-b-2"
            style={{ borderColor: "#ff6a00", color: "#ff6a00" }}
            aria-label="Posts grid"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            className="flex-1 flex justify-center py-2"
            aria-label="Tagged posts"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
          </button>
        </div>

        {/* Posts grid */}
        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}
        >
          {posts.map((post) => (
            <GridPost key={post.id} post={post} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
