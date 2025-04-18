import { CreateProductDto } from './dto/create-product.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { UnprocessableEntityException } from '@nestjs/common';
import Product from './entities/product.entity';

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
            save: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
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

      // asserts
      expect(productRepository.save).toHaveBeenCalledTimes(1);
      expect(productRepository.save).toHaveBeenCalledWith(createProductDto);
    });
  });
  describe('findOne', () => {
    test('deve retornar um produto', async () => {
      const id = '6c9dc614-0972-4067-95f3-163b38d9e09a';
      await productservice.findOne(id);

      expect(productRepository.findOne).toHaveBeenCalledTimes(1);
      expect(productRepository.findOne).toHaveBeenLastCalledWith({
        where: { id, deleted: 0 },
      });
    });
  });
  describe('findAll', () => {
    it('deve retornar todos os produtos', async () => {
      const mockProducts = [
        {
          id: '74fcd014-6d23-4d00-9350-8159bbf170ac',
          name: 'Camisa PRETA',
          sku: 'cam-WHITE-123',
          quantity: 1200,
          minStock: 100,
          price: '29.99',
          category: 'camisa',
          createdAt: new Date('2025-04-13T23:02:17.649Z'),
          updatedAt: new Date('2025-04-13T23:02:17.649Z'),
          deleted: 0,
          imgUrl: '',
        },
        {
          id: '74fcd014-6d23-4d00-9350-8159bbf170ac',
          name: 'Camisa PRETA',
          sku: 'cam-WHITE-123',
          quantity: 1200,
          minStock: 100,
          price: '29.99',
          category: 'camisa',
          createdAt: new Date('2025-04-13T23:02:17.649Z'),
          updatedAt: new Date('2025-04-13T23:02:17.649Z'),
          deleted: 0,
          imgUrl: '',
        },
      ];

      jest
        .spyOn(productRepository, 'find')
        .mockResolvedValue(mockProducts as Product[]);

      const result = await productservice.findAll();

      expect(productRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProducts);
    });
  });
  describe('update', () => {
    test('deve atualizar o produto', async () => {
      const updateProduct: UpdateProductDto = {
        name: 'teste',
        quantity: 199,
        minStock: 1,
        sku: 'tes-123',
        price: '129.21',
        category: 'teste',
        imgUrl: 'teste',
        deleted: 0,
      };

      const affected = 1;

      jest
        .spyOn(productRepository, 'update')
        .mockResolvedValue({ affected } as any);
      await productservice.updateProduct('20', updateProduct);

      //asserts
      /*expect(productRepository.update).toHaveBeenCalledTimes(1);
      expect(productRepository.update).toHaveBeenLastCalledWith(
        '20',
        updateProduct
      );*/
    });

    it('deve lançar uma exceção UnprocessableEntityException de produto não encontrado', async () => {
      const affected = 0;

      jest
        .spyOn(productRepository, 'update')
        .mockResolvedValue(affected as any);

      await expect(
        productservice.updateProduct('20', {
          name: 'teste',
          quantity: 199,
          minStock: 1,
          sku: 'tes-123',
          price: '129.21',
          category: 'teste',
          imgUrl: 'teste',
          deleted: 0,
        })
      ).rejects.toThrow(
        new UnprocessableEntityException({
          status: 422,
          errors: {
            id: 'Produto não encontrado',
          },
        })
      );
    });
  });
  describe('delete', () => {
    const id = '74fcd014-6d23-4d00-9350-8159bbf170ac';

    test('usuário deve retornar sucesso após deletado', async () => {
      const sucessReturn = {
        status: 200,
        message: 'Produto deletado com sucesso',
      };
      const affected = 1;

      jest
        .spyOn(productRepository, 'update')
        .mockResolvedValue({ affected } as any);

      const result = await productservice.softDelete(id);

      expect(result).toEqual(sucessReturn);
    });

    test('deve retornar um erro UnprocessableEntityException ao tentar deletar', async () => {
      const affected = 0;

      jest
        .spyOn(productRepository, 'update')
        .mockResolvedValue({ affected } as any);

      await expect(productservice.softDelete(id)).rejects.toThrow(
        new UnprocessableEntityException({
          status: 422,
          errors: {
            id: 'Produto não encontrado',
          },
        })
      );
    });
  });
});
