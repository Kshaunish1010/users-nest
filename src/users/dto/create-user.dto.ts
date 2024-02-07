import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SongDto } from './create-song.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  songs?: SongDto[];

}
