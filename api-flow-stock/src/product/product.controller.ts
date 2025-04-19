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
  NotFoundException,
} from '@nestjs/common';
import { FileSizeValidationPipe } from './pipes/max-size-photo.pipe';
import { DefaultResponseDto } from './dto/default-response.dto';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private uploadService: UploadService
  ) {}
  //TODO: paginação de usuários
  @Get()
  @ApiOperation({
    summary:
      'busca todos os produtos salvos, independente da associação com o usuário',
  })
  async getFindAll() {
    return this.productService.findAll();
  }

  @Get('by-user')
  @ApiOperation({
    summary: 'busca produtos associados ao userId especifico',
  })
  @ApiQuery({
    name: 'userId',
    required: true,
    example: 1,
    description: 'id do usuário',
  })
  async getProductByUserId(
    @Query('userId', ParseIntPipe) userId: number
  ): Promise<Product[]> {
    return await this.productService.findProductsByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'busca o produto pelo seu id',
  })
  @ApiParam({ name: 'id', description: 'id do produto' })
  async getFindOne(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.findOne(id);

    if (!product) {
      throw new NotFoundException('produto não encontrado');
    }
    return product;
  }

  @Post()
  @ApiOperation({
    summary: 'salva o produto no banco de dados',
  })
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  @ApiOperation({
    summary:
      'atualiza o produto com base nos campos presentes no body, todos os campos são opcionais com exceção do id do produto',
  })
  @ApiResponse({
    status: 404,
    description: 'produto não encontrado', //TODO: documentar todos os erros com apiResponse
    example: new NotFoundException('produto não encontrado').getResponse(),
  })
  @ApiParam({ name: 'id', description: 'id do produto' })
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDto
  ): Promise<DefaultResponseDto> {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'faz um soft delete de um produto',
  })
  @ApiParam({ name: 'id', description: 'id do produto' })
  async softDelete(@Param('id') id: string): Promise<DefaultResponseDto> {
    return this.productService.softDelete(id);
  }

  @Post('upload-photo/:id')
  @ApiOperation({
    summary: 'faz upload da foto do produto no s3 e atualiza o imgUrl no banco',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'id do produto' })
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
  ): Promise<{ message: string }> {
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
