import { CreateProductDto } from './dto/create-product.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './product.service';

describe('productService', () => {
  let productservice: ProductService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    //instânciação da classe
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: {
            save: () => {},
          },
        },
      ],
    }).compile();

    productservice = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  test('productService deve estar definido', () => {
    expect(productservice).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um produto', async () => {
      const createProductDto: CreateProductDto = {
        name: 'produto-test',
        sku: 'teste123',
        quantity: 4,
        minStock: 100,
        price: '99.99',
        category: 'mock',
        user: {
          id: 19,
        },
      };

      await productservice.createProduct(createProductDto);
    });
  });
  describe('findOne', () => {});
  describe('findAll', () => {});
  describe('update', () => {});
  describe('delete', () => {});
});
