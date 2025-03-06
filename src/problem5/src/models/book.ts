import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsOptional } from 'class-validator';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty()
    name!: string;

    @Column()
    @IsNotEmpty()
    authorName!: string;

    @Column({ nullable: true })
    @IsOptional()
    description?: string;
}
