import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Song } from './song.entity';

@Entity() //sql table === 'user';
export class User {
  @PrimaryGeneratedColumn()//auto generate unique incremented nos.
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @OneToMany(() => Song, (song) => song.user) // One-to-Many relation
  songs: Song[];
}
