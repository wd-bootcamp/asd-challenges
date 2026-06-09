import { Module } from "@nestjs/common";
import { CommentsModule } from "../comments/comments.module";
import { ThreadsModule } from "../threads/threads.module";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    CommentsModule,
    ThreadsModule,
    AuthModule,
  ],
})
export class AppModule {}
