import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Student{

  @PrimaryGeneratedColumn('uuid')
  id: number;
  
  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  age: string;

  @Column()
  classe: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}