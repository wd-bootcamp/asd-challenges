import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { ProductResponseDto } from "./dto/product-response.dto.js";
import { ProductsService } from "./products.service.js";

@Controller("users/:userId/products")
export class UserProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(
    @Param("userId", ParseUUIDPipe) userId: string,
  ): Promise<ProductResponseDto[]> {
    const products = await this.productsService.getProductsOfUser(userId);
    return plainToInstance(ProductResponseDto, products, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  async create(
    @Param("userId", ParseUUIDPipe) userId: string,
    @Body() dto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productsService.addProduct(userId, dto);
    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }
}
