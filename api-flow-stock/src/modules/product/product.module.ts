import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './product.service';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], 
  controllers: [ProductController],
  providers: [ProductRepository, ProductService, UploadService],
  exports: [ProductService],
})
export class ProductModule {}
