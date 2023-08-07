import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from './file.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', default: null, unique: true })
  public email: string | null;

  @Column({ type: 'varchar', default: null, unique: true })
  public phoneNumber: string | null;

  @Column({ type: 'varchar' })
  public firstName: string;

  @Column({ type: 'varchar' })
  public lastName: string;

  @Column({ type: 'boolean', default: false })
  public emailConfirmed: boolean;

  @Column({ type: 'boolean', default: true })
  public active: boolean;

  @Exclude()
  @Column({ type: 'varchar', nullable: false, select: false })
  public password: string;

  @Exclude()
  @Column({ type: 'varchar', default: null, select: false })
  public refreshToken: string | null;

  @Column({ type: 'datetime', nullable: true, default: null })
  public userLastLogin: Date;

  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  public deletedAt: Date;

  @OneToMany(() => File, (file) => file.user)
  public files: File[];
}
