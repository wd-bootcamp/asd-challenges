import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import type { CommentResponseDto } from "./CommentResponseDto";
import { AuthGuard } from "@nestjs/passport";
import type { RequestWith } from "../auth/RequestWith";
import type { ValidatedUser } from "../users/users.interface";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number): CommentResponseDto {
    return this.commentsService.getById(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  delete(
    @Param("id", ParseIntPipe) id: number,
    @Request() request: RequestWith<ValidatedUser>,
  ): boolean {
    return this.commentsService.softDelete(id, request.user);
  }
}
