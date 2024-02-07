import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { SongDto } from './dto/create-song.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAllWithTracks();
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number): Promise<User | undefined> {
    return await this.usersService.findOneWithTracks(id);
  }
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Body(ValidationPipe) createSongDto: SongDto,
  ): Promise<User> {
    // Delegate user creation to service
    return await this.usersService.createWithSong(createUserDto, createSongDto);
  }
  // @Get()
  // findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
  //   return this.usersService.findAll(role);
  // }
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.usersService.findOne(id);
  // }
  // @Post()
  // create(
  //   @Body(ValidationPipe)
  //   CreateUserDto: CreateUserDto,
  // ) {
  //   return this.usersService.create(CreateUserDto);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body(ValidationPipe)
  //   UpdateUserDto: UpdateUserDto,
  // ) {
  //   return this.usersService.update(id, UpdateUserDto);
  // }
  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.usersService.delete(id);
  // }
}
