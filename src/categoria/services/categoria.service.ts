import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class CategoriaService{

    constructor(
        @InjectRepository(Categoria) 
        private categoriaRepository:Repository<Categoria>
    ){}

    // findAll()
    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            relations:{
                produto: true
            }
        })
    }

    // findById()
    async findById(id: number): Promise<Categoria>{

        let categoria = await this.categoriaRepository.findOne({
            where:{
                id
            },
            relations: {
                produto:true
            }
        });

        if(!categoria)
            throw new HttpException("A categoria não foi encontrada",HttpStatus.NOT_FOUND)


        return categoria;
    }

    // findByTipo()
    async findByTipo(tipo:string) : Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            where: {
                tipo: ILike(`%${tipo}%`)
            },
            relations: {
                produto:true
            }
        });
    }

    // create()
    async create(categoria:Categoria){
        return await this.categoriaRepository.save(categoria);
    }

    // update()
    async update(categoria:Categoria){

        let buscaCategoria = await this.findById(categoria.id);

        if(!buscaCategoria || !categoria.id) 
            throw new HttpException("A categoria não foi encontrada", HttpStatus.NOT_FOUND);

        return await this.categoriaRepository.save(categoria);
    }

     // delete()
    async delete(id: number): Promise<DeleteResult> {

        let buscaCategoria = await this.findById(id);

        if (!buscaCategoria)
            throw new HttpException("A categoria não foi encontrada", HttpStatus.NOT_FOUND);

        return await this.categoriaRepository.delete(id);

    }
}