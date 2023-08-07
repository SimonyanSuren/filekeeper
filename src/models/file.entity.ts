import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('file')
export class File {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'integer' })
  public userId: number;

  @Column({ type: 'varchar' })
  public fileName: string;

  @Column({ type: 'varchar' })
  public originalFileName: string;

  @Column({ type: 'varchar' })
  public path: string;

  @Column({ type: 'varchar' })
  public mimetype: string;

  @Column({ type: 'varchar' })
  public extension: string;

  @Column({ type: 'int' })
  public size: number;

  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  public deletedAt: Date;

  @ManyToOne(() => User, (user) => user.files)
  @JoinColumn({ name: 'userId' })
  user: User;
}
