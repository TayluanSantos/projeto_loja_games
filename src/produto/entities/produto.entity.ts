import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({name:"tb_produto"})
export class Produto {

    @PrimaryGeneratedColumn()
    id:number;

    @IsNotEmpty({message: "O campo 'nome' não pode ser nulo ou vazio."})
    @Column({length:150,nullable:false})
    nome:string;

    @Column({length:500})
    descricao:string;

    @Column({nullable:false})
    quantidade:number;


    @IsNumber({maxDecimalPlaces:2})
    @Column({ type: "decimal", precision: 10, scale: 2 , nullable: false})
    preco:number;

    foto:string;

    @ManyToOne(() => Categoria,(categoria) => categoria.produto,{
        onDelete: "CASCADE"
    })
    categoria: Categoria;
}