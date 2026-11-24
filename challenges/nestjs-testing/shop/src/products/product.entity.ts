import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { User } from "../users/user.entity.js";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column()
  priceInCents: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, (user) => user.products, { onDelete: "CASCADE" })
  @JoinColumn({ name: "ownerId" })
  owner: Relation<User>;
}

export type ProductPayload = Pick<Product, "name" | "priceInCents">;
