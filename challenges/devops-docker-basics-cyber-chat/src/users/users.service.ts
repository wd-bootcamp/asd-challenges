import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findById(id: number) {
    return this.usersRepository.findById(id);
  }

  findByUsername(username: string) {
    return this.usersRepository.findByUsername(username);
  }
}
