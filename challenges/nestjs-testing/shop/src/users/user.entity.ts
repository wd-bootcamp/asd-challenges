import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Product } from "../products/product.entity.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Product, (product) => product.owner)
  products: Relation<Product[]>;
}

export type UserPayload = Pick<User, "name" | "email">;
