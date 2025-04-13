import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import Product from './entities/product.entity';
import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) { }
    
    @Get()
    async getFindAll() {
        return this.productService.findAll();
    }
    @Get(':id')
    async getFindOne(@Param('id') id: string): Promise<Product | null> {
        return await this.productService.findOne(id);
    }

    @Post()
    async create(@Body() product: CreateProductDto): Promise<Product | null> {
        return this.productService.createProduct(product);
    }

    @Put(':id')
    async update(@Param('id') id: string,@Body() product: UpdateProductDto): Promise<any> {
        return this.productService.updateProduct(id, product);
    }

    @Delete(':id')
    async softDelete(@Param('id') id: string): Promise<any> {
        return this.productService.softDelete(id);
    }

}