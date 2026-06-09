import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Request as ExpressRequest } from "express";
import { AuthGuard } from "@nestjs/passport";
import type { ValidatedUser } from "../users/users.interface";
import { LoginDto } from "./LoginDto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local")) // calls validate(), uses local strategy to append user to request
  @Post("login")
  login(
    @Request() request: ExpressRequest & { user: ValidatedUser },
    @Body() _loginDto: LoginDto,
  ): { access_token: string } {
    return this.authService.login(request.user);
  }
}
