import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CommentsRepository } from "./comments.repository";
import type { Comment, CreateCommentPayload } from "./Comment.interface";
import { plainToInstance } from "class-transformer";
import { CommentResponseDto } from "./CommentResponseDto";
import type { CreateCommentDto } from "./CreateCommentDto";
import type { ValidatedUser } from "../users/users.interface";

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  getById(id: number): CommentResponseDto {
    const comment = this.commentsRepository.findById(id);

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    return plainToInstance(CommentResponseDto, comment, {
      excludeExtraneousValues: true,
    });
  }

  getByThreadId(threadId: number): CommentResponseDto[] {
    const comments = this.commentsRepository.findByThreadId(threadId);
    return plainToInstance(CommentResponseDto, comments, {
      excludeExtraneousValues: true,
    });
  }

  create(comment: CreateCommentPayload): CommentResponseDto {
    const newComment = this.commentsRepository.create(comment);
    return plainToInstance(CommentResponseDto, newComment, {
      excludeExtraneousValues: true,
    });
  }

  softDelete(id: number, user: ValidatedUser): boolean {
    const comment = this.commentsRepository.findById(id);

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    const isAuthor = comment.author === user.username;
    const isAdmin = user.roles.includes("ADMIN");

    if (!isAuthor && !isAdmin) {
      throw new UnauthorizedException(
        "You are not authorized to delete this comment",
      );
    }

    this.commentsRepository.update(id, { body: "[deleted]" });
    return true;
  }

  deleteByThreadId(threadId: number): boolean {
    const comments = this.commentsRepository.findByThreadId(threadId);

    return comments.every((comment) =>
      this.commentsRepository.delete(comment.id),
    );
  }
}
