import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "../../users/dto/user-response.dto.js";

export class ProductResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  priceInCents: number;

  @Expose()
  createdAt: Date;

  @Expose()
  ownerId: string;

  @Expose()
  @Type(() => UserResponseDto)
  owner?: UserResponseDto;
}
