import type { Categoria } from './Categoria';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  qtd_estoque: number;
  data_fornecimento: Date;
  categoria: Categoria;
}