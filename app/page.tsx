import Header from "./components/Header";
import Stories from "./components/Stories";
import Post from "./components/Post";
import BottomNav from "./components/BottomNav";
import { POSTS } from "./data/posts";

export default function Home() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100dvh" }}>
      <Header />

      {/* Scrollable feed */}
      <main
        style={{
          paddingTop: 44,
          paddingBottom: 50,
          maxWidth: 470,
          margin: "0 auto",
          background: "#0d0d0d",
          minHeight: "100dvh",
        }}
      >
        <Stories />

        <div>
          {POSTS.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
