import { Expose, Type } from "class-transformer";

export class CommentResponseDto {
  @Expose()
  id!: number;

  @Expose()
  threadId!: number;

  @Expose()
  author!: string;

  @Expose()
  body!: string;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;
}
