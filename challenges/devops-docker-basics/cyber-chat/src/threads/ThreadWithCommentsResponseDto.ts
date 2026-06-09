import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { CommentResponseDto } from "../comments/CommentResponseDto";
import { Type } from "class-transformer";

export class ThreadWithCommentsResponseDto {
  @IsInt()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;

  @IsString()
  @IsNotEmpty()
  body!: string;

  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentResponseDto)
  comments!: CommentResponseDto[];
}
