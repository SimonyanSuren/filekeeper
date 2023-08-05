import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'user_id' })
  public id: number;

  //@Column({ type: 'uuid', name: 'user_uuid', unique: true })
  //@Generated('uuid')
  //@Index()
  //public uuid: string;

  //@IsEmail()
  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar' })
  public firstName: string;

  @Column({ type: 'varchar' })
  public lastName: string;

  //@Exclude()
  @Column({ type: 'boolean', default: false })
  public emailConfirmed: boolean;

  @Column({ type: 'boolean', default: true })
  public active: boolean;

  //@Exclude()
  @Column({ type: 'varchar', nullable: false, select: false })
  public password: string;

  //@Exclude()
  //@Column({ type: 'varchar', name: 'reset_password_hash', nullable: true, default: null })
  //public resetPasswordHash: string;

  //@Exclude()
  //@Column({
  //  type: 'varchar',
  //  name: 'user_activation_hash',
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

  ////@Exclude()
  ////@Column({
  ////  type: 'time with time zone',
  ////  nullable: true,
  ////  default: null,
  ////})
  ////public userLastLogin: Date;

  //@CreateDateColumn({ type: 'datetime', name: 'created_on' })
  //public createdAt: Date;

  //@UpdateDateColumn({ type: 'datetime', name: 'updated_on' })
  //public updatedAt: Date;

  //@Exclude()
  //@DeleteDateColumn({ type: 'datetime', name: 'deleted_on' })
  //public deletedAt: Date;

  //static withId(id: number): User {
  //  const user = new User();
  //  user.id = id;
  //  return user;
  //}
}
