import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";
import { Product } from "./product.entity.js";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
    private readonly usersService: UsersService,
  ) {}

  async getProductsWithOwners(): Promise<Product[]> {
    return this.products.find({
      relations: { owner: true },
      order: { name: "ASC" },
    });
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.products.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID '${id}' not found`);
    }
    return product;
  }

  async getProductsOfUser(ownerId: string): Promise<Product[]> {
    await this.usersService.getUserById(ownerId);
    return this.products.find({ where: { ownerId }, order: { name: "ASC" } });
  }

  async addProduct(ownerId: string, data: CreateProductDto): Promise<Product> {
    await this.usersService.getUserById(ownerId);
    const product = this.products.create({ ...data, ownerId });
    return this.products.save(product);
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.getProductById(id);
    this.products.merge(product, dto);
    return this.products.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.products.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID '${id}' not found`);
    }
  }
}
