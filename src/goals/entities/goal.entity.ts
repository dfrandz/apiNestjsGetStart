import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Priority, Status } from '../enums';


@Entity()
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.LOW
  })
  priority: Priority;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}