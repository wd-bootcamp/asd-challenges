import { Module } from "@nestjs/common";
import { ThreadsController } from "./threads.controller";
import { ThreadsService } from "./threads.service";
import { ThreadsRepository } from "./threads.repository";
import { CommentsModule } from "../comments/comments.module";

@Module({
  imports: [CommentsModule],
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadsRepository],
})
export class ThreadsModule {}
