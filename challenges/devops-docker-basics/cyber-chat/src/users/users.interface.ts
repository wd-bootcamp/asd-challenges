export type Role = "ADMIN" | "SUPER_ADMIN" | "USER";

export interface User {
  id: number;
  username: string;
  password: string;
  roles: Role[];
}

export interface ValidatedUser {
  id: number;
  username: string;
  roles: Role[];
}

export interface CreateUserPayload {
  username: string;
  password: string;
}

export interface LoginUserPayload {
  username: string;
  password: string;
}
