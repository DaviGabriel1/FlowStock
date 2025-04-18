/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import User from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/UserRepository.repository';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async create(createUserDTO: CreateUserDto): Promise<User> {
    if (!createUserDTO) {
      throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: 'senha inválida'
                }
      })
    }

    const saltRounds = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDTO.password, saltRounds);

    if(createUserDTO.email){
        const userObject = await this.userRepository.findByEmail(createUserDTO.email);

        if (userObject) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: 'este E-mail já está cadastrado em outra conta'
                }
            })
        }
    }
    else {
        throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: 'o campo E-mail é obrigatório'
                }
            })
    }
    const user = this.userRepository.create({
      ...createUserDTO,
      password: hashPassword,
      rememberToken: crypto.randomBytes(32).toString('hex'),
    }); // Atribui o hash da senha diretamente
    return await this.userRepository.save(user);
  }

  async update(id:number,updateUserDTO: UpdateUserDTO): Promise<any> {
    return await this.userRepository.update(id,updateUserDTO);
  }

  async findBySocialIdAndProvider({
    socialId,
    provider,
  }: {
      socialId: User['socialId'];
      provider: User['provider'];
    }): Promise<User | null> {
    return await this.userRepository.findBySocialIdAndProvider({socialId,provider})
  }
}
