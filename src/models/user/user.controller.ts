import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query) {
    const productRelation = Boolean(query['products']);
    if (query['user-id']) {
      return this.userService.findOne(+query['user-id'], productRelation);
    } else {
      return this.userService.findAll(productRelation)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query) {
    console.log('Check  ')
    const productRelation = Boolean(query['products']);
    return this.userService.findOne(+id, productRelation)

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
