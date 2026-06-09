import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class ThreadResponseDto {
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
}
