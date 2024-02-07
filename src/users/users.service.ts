import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SongDto } from './dto/create-song.dto';
import { Song } from 'src/entities/song.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllWithTracks(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['songs'], // Eagerly fetch associated tracks
    });
  }

  async findOneWithTracks(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['songs'], // Eagerly fetch tracks for specific album
    });
  }

  async createWithSong(
    createUserDto: CreateUserDto,
    SongDto: SongDto,
  ): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const song = new Song(SongDto);
    song.user = user; // Set the song's user relationship
    user.songs = [song]; // Add the song to the user's song list
    await this.userRepository.save(user); // Save both user and song
    return user; // Return the created user
  }
  // findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
  //   if (role) {
  //     const roleArray = this.users.filter((user) => user.role === role);
  //     if (roleArray.length === 0)
  //       throw new NotFoundException('User role not found');
  //     return roleArray;
  //   }
  //   return this.users;
  // }

  // findOne(id: number) {
  //   const user = this.users.find((user) => user.id === id);
  //   if (!user) throw new NotFoundException('User not found');
  //   return user;
  // }

  // create(CreateUserDto: CreateUserDto) {
  //   const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
  //   const newUser = {
  //     id: usersByHighestId[0].id + 1,
  //     ...CreateUserDto,
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }

  // update(id: number, UpdateUserDto: UpdateUserDto) {
  //   this.users = this.users.map((user) => {
  //     if (user.id == id) {
  //       return { ...user, ...UpdateUserDto };
  //     }
  //     return user;
  //   });
  //   return this.findOne(id);
  // }
  // delete(id: number) {
  //   const removedUser = this.findOne(id);
  //   this.users = this.users.filter((user) => user.id !== id);
  //   return removedUser;
  // }
}
