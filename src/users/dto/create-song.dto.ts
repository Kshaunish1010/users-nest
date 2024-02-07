import { IsString} from "class-validator";

export class SongDto { // Example related song DTO
    @IsString()
    title: string;
    @IsString()
    artist: string;
    // Add other song properties as needed
  }