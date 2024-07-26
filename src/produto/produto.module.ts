import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { Module } from "@nestjs/common";
import { CategoriaModule } from "../categoria/categoria.module";
import { ProdutoService } from "./services/produto.service";
import { ProdutoController } from "./controllers/produto.controller";
import { CategoriaService } from "../categoria/services/categoria.service";

@Module({
    imports:[TypeOrmModule.forFeature([Produto]),CategoriaModule],
    providers:[ProdutoService,CategoriaService], // Não esquecer de incluir o serviço do outro recurso também,além de importar apenas o módulo
    controllers:[ProdutoController],
    exports:[TypeOrmModule]
})
export class ProdutoModule{}