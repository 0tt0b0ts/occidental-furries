export interface Message {
  id: string;
  fromUsername: string;
  fromProfileSlug: string;
  fromAvatar: string | null;
  hasAvatar: boolean;
  text: string;
  timeAgo: string;
  read: boolean;
}

export interface Thread {
  id: string;
  withUsername: string;
  withProfileSlug: string;
  withAvatar: string | null;
  hasAvatar: boolean;
  messages: { fromSelf: boolean; text: string; timeAgo: string }[];
}

export const INBOX: Message[] = [
  {
    id: "thread-julian",
    fromUsername: "JulianFurMaster.666",
    fromProfileSlug: "julian-furmaster-666",
    fromAvatar: null,
    hasAvatar: false,
    text: "Hey man, love your vibe. We should cuddle some time! #furlife am i right? 🐺",
    timeAgo: "2h",
    read: false,
  },
];

export const THREADS: Record<string, Thread> = {
  "thread-julian": {
    id: "thread-julian",
    withUsername: "JulianFurMaster.666",
    withProfileSlug: "julian-furmaster-666",
    withAvatar: null,
    hasAvatar: false,
    messages: [
      {
        fromSelf: false,
        text: "Hey man, love your vibe. We should cuddle some time! #furlife am i right? 🐺",
        timeAgo: "2h",
      },
    ],
  },
};
