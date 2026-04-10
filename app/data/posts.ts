// ============================================================
// POSTS DATA
// ============================================================
// To add real images:
//   1. Drop post images into:    /public/images/posts/
//   2. Drop avatar images into:  /public/images/avatars/
//   3. Set `image` to the path, e.g. "/images/posts/my-photo.jpg"
//   4. Set `avatar` to the path, e.g. "/images/avatars/julian.jpg"
//   5. Set `hasImage: true` and `hasAvatar: true`
// ============================================================

export interface Profile {
  username: string;
  displayName: string;
  avatar: string | null;       // null = show placeholder circle
  hasAvatar: boolean;
  bio: string;
  posts: number;
  followers: number;
  following: number;
  // slug used in the URL: /profile/[slug]
  slug: string;
}

export interface Post {
  id: string;
  username: string;
  profileSlug: string;         // matches Profile.slug for linking
  handle: string;
  avatar: string | null;       // null = show placeholder circle
  hasAvatar: boolean;
  image: string | null;        // null = show placeholder rectangle
  hasImage: boolean;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  location?: string;
}

export interface Story {
  id: string;
  username: string;
  avatar: string | null;
  hasAvatar: boolean;
  isOwn?: boolean;
}

// ============================================================
// PROFILES DATA
// ============================================================
export const PROFILES: Record<string, Profile> = {
  "julian-furmaster-666": {
    username: "JulianFurMaster.666",
    displayName: "Julian 🐺",
    avatar: null,              // Replace with: "/images/avatars/julian.jpg"
    hasAvatar: false,
    bio: "Lead fursuiter @ Occidental Furries 🐾\nBikeshare leader 🚲\nBringing feral energy to the west coast 🌊\nDMs open for collabs 🔥",
    posts: 3,
    followers: 12400,
    following: 387,
    slug: "julian-furmaster-666",
  },
};

export const STORIES: Story[] = [
  {
    id: "own",
    username: "Your Story",
    avatar: null,
    hasAvatar: false,
    isOwn: true,
  },
  {
    id: "story-1",
    username: "Julian",
    avatar: null,        // Replace with: "/images/avatars/julian.jpg"
    hasAvatar: false,
  },
  {
    id: "story-2",
    username: "FurFest",
    avatar: null,
    hasAvatar: false,
  },
  {
    id: "story-3",
    username: "WolfPack",
    avatar: null,
    hasAvatar: false,
  },
  {
    id: "story-4",
    username: "PawsUp",
    avatar: null,
    hasAvatar: false,
  },
  {
    id: "story-5",
    username: "TailWag",
    avatar: null,
    hasAvatar: false,
  },
];

export const POSTS: Post[] = [
  {
    id: "post-1",
    username: "JulianFurMaster.666",
    profileSlug: "julian-furmaster-666",
    handle: "@JulianFurMaster.666",
    avatar: null,
    hasAvatar: false,
    image: "/images/posts/post1.png",
    hasImage: true,
    caption: "Just vibing at the meet-up tonight 🐺✨ The energy was absolutely feral. See you all at the next one! #OccidentalFurries #FurLife #FurFam",
    likes: 1247,
    comments: 89,
    timeAgo: "2 hours ago",
    location: "Occidental, CA",
  },
  {
    id: "post-2",
    username: "JulianFurMaster.666",
    profileSlug: "julian-furmaster-666",
    handle: "@JulianFurMaster.666",
    avatar: null,
    hasAvatar: false,
    image: "/images/posts/post2.png",
    hasImage: true,
    caption: "New suit reveal 🔥🦊 Three months in the making. Worth every single stitch. What do you think? Drop your rating in the comments 👇 #FursuitFriday #NewSuit #Fursuit",
    likes: 3891,
    comments: 214,
    timeAgo: "1 day ago",
    location: "Occidental Furries HQ",
  },
  {
    id: "post-3",
    username: "JulianFurMaster.666",
    profileSlug: "julian-furmaster-666",
    handle: "@JulianFurMaster.666",
    avatar: null,
    hasAvatar: false,
    image: "/images/posts/post3.png",
    hasImage: true,
    caption: "Golden hour hits different when you're in full suit 🌅🐾 Throwback to last weekend's outdoor shoot. Nature never judges 💛 #GoldenHour #FurryPhotography #Outdoors",
    likes: 2156,
    comments: 132,
    timeAgo: "3 days ago",
  },
];
