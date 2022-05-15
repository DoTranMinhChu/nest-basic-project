import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async findAll(productRelation: boolean = false): Promise<User[]> {
    return await this.userRepository.find(
      {
        relations: {
          products: productRelation
        }
      }
    )
  }

  async findOne(userID: number, productRelation: boolean = false): Promise<User> {
    return await this.userRepository.findOne(
      {
        where: {
          id: userID
        },
        relations: {
          products: productRelation
        }
      }
    )
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
