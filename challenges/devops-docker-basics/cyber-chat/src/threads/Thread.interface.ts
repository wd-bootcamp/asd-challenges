import type { Comment } from "../comments/Comment.interface";

export interface Thread {
  id: number;
  title: string;
  author: string;
  body: string;
  createdAt: Date;
}

export type CreateThreadPayload = Omit<Thread, "id" | "createdAt">;
export type PatchThreadPayload = Partial<CreateThreadPayload>;
export type ThreadWithComments = Thread & { comments: Comment[] };
