import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('file')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar' })
  public fileName: string;

  @Column({ type: 'varchar' })
  public mimeType: string;

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
}
