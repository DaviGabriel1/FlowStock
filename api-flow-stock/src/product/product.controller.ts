import { UploadService } from '../upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import Product from './entities/product.entity';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { FileSizeValidationPipe } from './pipes/max-size-photo.pipe';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private uploadService: UploadService
  ) {}

  @Get()
  async getFindAll() {
    return this.productService.findAll();
  }

  @Get('by-user')
  async getProductByUserId(
    @Query('userId', ParseIntPipe) userId: number
  ): Promise<Product[] | null> {
    return await this.productService.findProductsByUserId(userId);
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
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDto
  ): Promise<any> {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string): Promise<any> {
    return this.productService.softDelete(id);
  }

  @Post('upload-photo/:id')
  @UseInterceptors(FileInterceptor('product-photo'))
  async uploadPhoto(
    @UploadedFile(
      new FileSizeValidationPipe(),
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(image\/png|image\/jpeg)/ }),
        ],
      })
    )
    file: Express.Multer.File,
    @Param('id') id: string
  ): Promise<any> {
    const user = await this.productService.findOne(id);
    if (!user) {
      throw new UnprocessableEntityException('usuário não encontrado');
    }
    const uploadUrl = await this.uploadService.upload(
      file.originalname,
      file.buffer
    );
    await this.productService.updateProduct(id, { ...user, imgUrl: uploadUrl });
    return {
      message: 'upload concluido',
    };
  }
}
