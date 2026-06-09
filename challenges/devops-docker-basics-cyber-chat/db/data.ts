import type { Comment } from "../src/comments/Comment.interface";
import type { Thread } from "../src/threads/Thread.interface";
import type { User } from "../src/users/users.interface";

export const threads: Thread[] = [
  {
    id: 1,
    title: "Best practices for React state management in 2026?",
    author: "dev_sarah",
    body: "I've been working on a large React app and I'm torn between Zustand, Jotai, and just using Context. What are people using these days for medium-to-large applications?",
    createdAt: new Date("2026-05-20T09:14:00Z"),
  },
  {
    id: 2,
    title: "Sourdough starter died after 3 years :(",
    author: "breadhead42",
    body: "I left for vacation and my roommate forgot to feed Gertrude. She's gone moldy and smells like acetone. Is there any saving her or do I need to start over?",
    createdAt: new Date("2026-05-21T15:42:00Z"),
  },
  {
    id: 3,
    title: "First marathon next month — what do I wish I knew?",
    author: "running_rookie",
    body: "Training has gone well, longest run was 32km last weekend. Looking for tips on race day pacing, nutrition, and mental tricks for the wall.",
    createdAt: new Date("2026-05-26T07:11:00Z"),
  },
];

export const comments: Comment[] = [
  {
    id: 1,
    threadId: 1,
    author: "hooked_on_hooks",
    body: "Zustand for me. The API is tiny and it scales surprisingly well. Avoid Redux unless you specifically need time-travel debugging.",
    createdAt: new Date("2026-05-20T10:02:00Z"),
  },
  {
    id: 2,
    threadId: 1,
    author: "jotai_jane",
    body: "Jotai's atomic model is way more ergonomic once you have lots of derived state. Stick with Context only for truly global stuff like theme and auth.",
    createdAt: new Date("2026-05-20T10:45:00Z"),
  },
  {
    id: 3,
    threadId: 2,
    author: "bakery_betty",
    body: "Mold means it's done, I'm sorry. But sourdough starters are easy to restart — you'll have a usable one in 7–10 days. RIP Gertrude.",
    createdAt: new Date("2026-05-21T16:20:00Z"),
  },
  {
    id: 4,
    threadId: 2,
    author: "yeast_whisperer",
    body: "Acetone smell alone is fine (just hooch), but mold means toss it. The new one will be its own piece of your kitchen.",
    createdAt: new Date("2026-05-21T17:03:00Z"),
  },
  {
    id: 5,
    threadId: 3,
    author: "marathon_vet",
    body: "Go out SLOWER than feels right for the first 10k. Everyone says this and everyone ignores it. Your future self at km 32 will thank you.",
    createdAt: new Date("2026-05-26T08:25:00Z"),
  },
  {
    id: 6,
    threadId: 3,
    author: "ultrarunner_kate",
    body: "Take gels every 30–40 min from km 8 onward, even if you don't feel like you need them. By the time you feel like you need one, it's already too late.",
    createdAt: new Date("2026-05-26T09:17:00Z"),
  },
];

export const users: User[] = [
  {
    id: 1,
    username: "dev_sarah",
    password: "dev_sarah_pass123",
    roles: ["ADMIN"],
  },
  {
    id: 2,
    username: "breadhead42",
    password: "breadhead42_pass123",
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    id: 3,
    username: "running_rookie",
    password: "running_rookie_pass123",
    roles: ["USER"],
  },
  {
    id: 4,
    username: "hooked_on_hooks",
    password: "hooked_on_hooks_pass123",
    roles: ["USER"],
  },
  {
    id: 5,
    username: "jotai_jane",
    password: "jotai_jane_pass123",
    roles: ["USER"],
  },
  {
    id: 6,
    username: "bakery_betty",
    password: "bakery_betty_pass123",
    roles: ["USER"],
  },
  {
    id: 7,
    username: "yeast_whisperer",
    password: "yeast_whisperer_pass123",
    roles: ["USER"],
  },
  {
    id: 8,
    username: "marathon_vet",
    password: "marathon_vet_pass123",
    roles: ["USER"],
  },
  {
    id: 9,
    username: "ultrarunner_kate",
    password: "ultrarunner_kate_pass123",
    roles: ["USER"],
  },
  { id: 10, username: "felix", password: "felix_pass123", roles: ["USER"] },
];
