import { Transform, TransformFnParams } from 'class-transformer';
import { IsDate, IsEmail, IsEmpty, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"tb_usuario"})
export class Usuario {

    @PrimaryGeneratedColumn()
    id:number;

    @Transform(({value}:TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length:255, nullable:false})
    nome:string;

    @IsEmail()
    @IsNotEmpty()
    @Column({length:255,nullable:false})
    usuario:string

    @Transform(({value}:TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length:255, nullable:false})
    senha:string;

    @Column({length:5000})
    foto:string;

    @IsNotEmpty()
    @Column()
    dataNascimento:Date;

}