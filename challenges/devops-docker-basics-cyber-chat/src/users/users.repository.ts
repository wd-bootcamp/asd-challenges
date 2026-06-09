import { Injectable } from "@nestjs/common";
import type { User } from "./users.interface";
import { users } from "../../db/data";

@Injectable()
export class UsersRepository {
  private users: User[] = users;
  findById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
