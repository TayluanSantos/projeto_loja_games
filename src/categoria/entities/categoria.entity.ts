import { Transform, TransformFnParams } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";
import { IsNotEmpty } from "class-validator";

@Entity({name:"tb_categoria"})
export class Categoria {

    @PrimaryGeneratedColumn()
    id:number

    @IsNotEmpty({message: "O campo 'tipo' não pode ser nulo ou vazio."})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column({length:255,nullable:false})
    tipo:string

    @OneToMany(() => Produto,(produto) => produto.categoria)
    produto: Produto[]

}
