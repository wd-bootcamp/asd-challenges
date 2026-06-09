import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import type { ValidatedUser } from "../users/users.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(username: string, password: string): ValidatedUser | null {
    const user = this.usersService.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  login(user: ValidatedUser): { access_token: string } {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
