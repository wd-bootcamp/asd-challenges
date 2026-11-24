import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { User, type UserPayload } from "./user.entity.js";
import { UsersService } from "./users.service.js";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(":id")
  getOne(@Param("id") id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  create(@Body() body: UserPayload): Promise<User> {
    return this.usersService.addNewUser(body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
