import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './repositories/product.repository';
import Product from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DefaultResponseDto } from './dto/default-response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ where: { deleted: 0 } });
  }
  /*
  async findAllWithUsers(): Promise<any> { 
    return await this.productRepository.find({ relations: ['user'] });
  }*/

  async findProductsByUserId(userId: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: string): Promise<Product | null> {
    return await this.productRepository.findOne({ where: { id, deleted: 0 } });
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async updateProduct(
    id: string,
    product: UpdateProductDto
  ): Promise<DefaultResponseDto> {
    const { affected } = await this.productRepository.update(id, product);
    if (affected == 0 || !affected) {
      throw new UnprocessableEntityException({
        status: 422,
        errors: {
          id: 'Produto não encontrado',
        },
      });
    }
    return {
      status: 200,
      message: 'Produto atualizado com sucesso',
    };
  }

  async softDelete(id: string): Promise<DefaultResponseDto> {
    const { affected } = await this.productRepository.update(id, {
      deleted: 1,
    });

    if (affected == 0) {
      throw new UnprocessableEntityException({
        status: 422,
        errors: {
          id: 'Produto não encontrado',
        },
      });
    }
    return {
      status: 200,
      message: 'Produto deletado com sucesso',
    };
  }
}
