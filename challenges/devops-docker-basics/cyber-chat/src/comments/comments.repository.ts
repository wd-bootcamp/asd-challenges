import { Injectable } from "@nestjs/common";
import type {
  Comment,
  CreateCommentPayload,
  PatchCommentPayload,
} from "./Comment.interface";
import { comments } from "../../db/data";

@Injectable()
export class CommentsRepository {
  private comments: Map<number, Comment> = new Map(
    comments.map((comment) => [comment.id, comment]),
  );

  findAll(): Comment[] {
    return Array.from(this.comments.values());
  }

  findById(id: number): Comment | null {
    return this.comments.get(id) || null;
  }

  findByThreadId(threadId: number): Comment[] {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.threadId === threadId,
    );
  }

  create(comment: CreateCommentPayload): Comment {
    const id = Math.max(...this.comments.keys()) + 1;
    const newComment = { id, createdAt: new Date(), ...comment };
    this.comments.set(id, newComment);
    return newComment;
  }

  delete(id: number): boolean {
    return this.comments.delete(id);
  }

  update(id: number, comment: PatchCommentPayload): Comment | null {
    const existingComment = this.comments.get(id);

    if (!existingComment) return null;

    const updatedComment = {
      ...existingComment,
      ...comment,
      id: existingComment.id,
      createdAt: existingComment.createdAt,
    };

    this.comments.set(id, updatedComment);
    return updatedComment;
  }
}
