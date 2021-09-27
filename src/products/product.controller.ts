import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product';
import { UpdateProductDto } from './dto/update-product';
import { ProductsService } from './product.service';
import { Response } from 'express';
import { ProductI } from './interfaces/product.interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async getProducts(@Res() res: Response): Promise<ProductI[]> {
    try {
      const products: ProductI[] = await this.productsService.getProducts();
      res.status(HttpStatus.OK).json({
        message: 'Storage Product',
        products: products,
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async getProduct(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ProductI> {
    try {
      const product: ProductI = await this.productsService.getProduct(id);
      res.status(HttpStatus.OK).json({
        message: 'Storage Product',
        product: product,
      });
      return product;
    } catch (error) {
      console.log(error);
    }
  }
  @Post()
  async createProduct(
    @Body() productDto: CreateProductDto,
    @Res() res: Response,
  ): Promise<ProductI> {
    const createProduct: ProductI = await this.productsService.createProduct(
      productDto,
    );
    res.status(HttpStatus.OK).json({
      message: 'Create Product',
      product: createProduct,
    });
    return createProduct;
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: UpdateProductDto,
    @Res() res: Response,
  ): Promise<ProductI> {
    try {
      const updateProduct: ProductI = await this.productsService.updateProduct(
        id,
        productDto,
      );
      res.status(HttpStatus.OK).json({
        message: 'Update Product',
        product: updateProduct,
      });
      return updateProduct;
    } catch (error) {}
  }
  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ProductI> {
    const deleteProduct: ProductI = await this.productsService.deleteProduct(
      id,
    );
    res.status(HttpStatus.OK).json({
      message: 'Delete Product',
      product: deleteProduct,
    });
    return deleteProduct;
  }
}
