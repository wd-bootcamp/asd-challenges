import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module.js";
import { Product } from "./product.entity.js";
import { ProductsController } from "./products.controller.js";
import { ProductsService } from "./products.service.js";
import { UserProductsController } from "./user-products.controller.js";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UsersModule],
  controllers: [ProductsController, UserProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
