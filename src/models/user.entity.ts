import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Index()
  @Column({ type: 'varchar', default: null, unique: true })
  public email: string | null;

  @Index()
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

  @Column({ type: 'varchar', default: null, select: false })
  public refreshToken: string | null;
  //@Column({ type: 'varchar', nullable: true, default: null })
  //public resetPasswordHash: string;

  //@Exclude()
  //@Column({
  //  type: 'varchar',
  //  nullable: true,
  //  default: null,
  //  select: false,
  //})
  //public activationHash: string;

  ////@Exclude()
  ////@Column({
  ////  type: 'time with time zone',
  ////  name: 'reset_password_expire',
  ////  nullable: true,
  ////  default: null,
  ////})
  ////public resetPasswordExpire: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    default: null,
  })
  public userLastLogin: Date;

  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  public deletedAt: Date;
}
