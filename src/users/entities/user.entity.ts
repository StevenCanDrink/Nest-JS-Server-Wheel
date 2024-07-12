import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  username: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false })
  name: string;
  @Column({ default: 'USER' })
  role: 'ADMIN' | 'USER';
  @Column({ default: 0 })
  point: number;
  @Column({ default: 0 })
  turn: number;
  @Column({ default: 1 })
  privilege: number;
}
