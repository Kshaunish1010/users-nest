import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @ManyToOne(() => User, (user) => user.song) // Many-to-One relation
  user: User;
}
