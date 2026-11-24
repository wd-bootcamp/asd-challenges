import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, type UserPayload } from "./user.entity.js";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.users.find({ order: { name: "ASC" } });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.users.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.findOne({ where: { email } });
  }

  async addNewUser(data: UserPayload): Promise<User> {
    if (await this.findByEmail(data.email)) {
      throw new ConflictException(
        `User with email ${data.email} already exists`,
      );
    }
    const user = this.users.create(data);
    return this.users.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.users.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
