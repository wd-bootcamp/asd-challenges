import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ThreadsRepository } from "./threads.repository";
import type {
  CreateThreadPayload,
  PatchThreadPayload,
  Thread,
  ThreadWithComments,
} from "./Thread.interface";
import { CommentsService } from "../comments/comments.service";
import type { ValidatedUser } from "../users/users.interface";

@Injectable()
export class ThreadsService {
  constructor(
    private readonly threadsRepository: ThreadsRepository,
    private readonly commentsService: CommentsService,
  ) {}

  getAll(): Thread[] {
    return this.threadsRepository.findAll();
  }

  getById(id: number): ThreadWithComments {
    const thread = this.threadsRepository.findById(id);

    if (!thread) throw new NotFoundException("Thread not found");

    const comments = this.commentsService.getByThreadId(id);

    return {
      ...thread,
      comments,
    };
  }

  create(thread: CreateThreadPayload): Thread {
    return this.threadsRepository.create(thread);
  }

  delete(id: number, user: ValidatedUser): boolean {
    const thread = this.threadsRepository.findById(id);

    if (!thread) {
      throw new NotFoundException("Thread not found");
    }

    const isAuthor = thread.author === user.username;
    const isAdmin = user.roles.includes("ADMIN");

    if (!isAuthor && !isAdmin) {
      throw new UnauthorizedException(
        "You are not authorized to delete this thread",
      );
    }

    const deletionSuccess = this.threadsRepository.delete(id);

    if (!deletionSuccess) {
      throw new InternalServerErrorException("Thread could not be deleted");
    }

    this.commentsService.deleteByThreadId(id);

    return true;
  }

  update(id: number, thread: PatchThreadPayload): Thread {
    const updatedThread = this.threadsRepository.update(id, thread);

    if (!updatedThread) {
      throw new NotFoundException("Thread not found");
    }

    return updatedThread;
  }
}
