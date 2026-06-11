import { Type } from "class-transformer";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  threadId!: number;

  @Column()
  author!: string;

  @Column()
  body!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Type(() => Date)
  createdAt!: Date;
}

export type CreateCommentPayload = Omit<Comment, "id" | "createdAt">;
