import { Controller, Get, Body, Patch, Param, Delete, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/utils/parse-object-id-pipe.pipe';
import { CreateCardDto } from './dto/create-card.dto';
import { Request } from 'express';

//API TAGS es para la documentacion con swagger
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Req() request: Request) {
    return this.usersService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    console.log(id);
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.remove(id);
  }

  ///////// CARDS
  @Post(':id/card') 
  async addCard(
    @Param('id', ParseObjectIdPipe) id: string, 
    @Body() card: CreateCardDto, 
  ) {
    return this.usersService.addCard(id, card); 
  }
}
