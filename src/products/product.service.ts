import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product';
import { UpdateProductDto } from './dto/update-product';
import { ProductI } from './interfaces/product.interfaces';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('products') private readonly productModel: Model<ProductI>,
  ) {}

  async getProducts(): Promise<ProductI[]> {
    try {
      const products = await this.productModel.find();
      return products;
    } catch (error) {}
  }

  async getProduct(id: string): Promise<ProductI> {
    try {
      const product: ProductI = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException(`not found product ${id}`);
      }
      return product;
    } catch (error) {
      console.log(error);
    }
  }
  async createProduct(productDto: CreateProductDto): Promise<ProductI> {
    const newProduct: ProductI = new this.productModel(productDto);
    return await newProduct.save();
  }

  async updateProduct(
    id: string,
    productDto: UpdateProductDto,
  ): Promise<ProductI> {
    try {
      const updateProduct: ProductI = await this.productModel.findByIdAndUpdate(
        id,
        productDto,
        { new: true },
      );
      if (!updateProduct) {
        throw new NotFoundException(`not found product ${id}`);
      }
      return await updateProduct.save();
    } catch (error) {}
  }

  async deleteProduct(id: string): Promise<ProductI> {
    try {
      const deleteProduct: ProductI = await this.productModel.findByIdAndDelete(
        id,
      );
      if (!deleteProduct) {
        throw new NotFoundException(`not found product ${id}`);
      }
      return deleteProduct;
    } catch (error) {
      console.log(error);
    }
  }
}
