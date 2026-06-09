import type { CreateCommentDto } from "./CreateCommentDto";

export interface Comment {
  id: number;
  threadId: number;
  author: string;
  body: string;
  createdAt: Date;
}

export type CreateCommentPayload = CreateCommentDto & {
  threadId: number;
  author: string;
};
export type PatchCommentPayload = Partial<CreateCommentPayload>;
