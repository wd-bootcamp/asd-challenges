import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  ParseIntPipe,
} from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import type { Thread } from "./Thread.interface";
import { CommentsService } from "../comments/comments.service";
import { CreateCommentDto } from "../comments/CreateCommentDto";
import { CommentResponseDto } from "../comments/CommentResponseDto";
import { ThreadResponseDto } from "./ThreadResponseDto";
import { ThreadWithCommentsResponseDto } from "./ThreadWithCommentsResponseDto";
import { CreateThreadDto } from "./CreateThreadDto";
import { AuthGuard } from "@nestjs/passport";
import type { ValidatedUser } from "../users/users.interface";
import type { RequestWith } from "../auth/RequestWith";

@Controller("threads")
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get("/")
  getAll(): ThreadResponseDto[] {
    return this.threadsService.getAll();
  }

  @Get(":id")
  getById(
    @Param("id", ParseIntPipe) id: number,
  ): ThreadWithCommentsResponseDto {
    return this.threadsService.getById(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  create(
    @Body() thread: CreateThreadDto,
    @Request() request: RequestWith<ValidatedUser>,
  ): Thread {
    return this.threadsService.create({
      ...thread,
      author: request.user.username,
    });
  }

  @UseGuards(AuthGuard("jwt"))
  @Post(":id/comments")
  createComment(
    @Param("id", ParseIntPipe) threadId: number,
    @Body() body: CreateCommentDto,
    @Request() request: RequestWith<ValidatedUser>,
  ): CommentResponseDto {
    // Ensure the thread exists before creating a comment for it
    this.threadsService.getById(threadId);
    return this.commentsService.create({
      ...body,
      threadId: threadId,
      author: request.user.username,
    });
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  deleteById(
    @Param("id", ParseIntPipe) id: number,
    @Request() request: RequestWith<ValidatedUser>,
  ): boolean {
    return this.threadsService.delete(id, request.user);
  }
}
