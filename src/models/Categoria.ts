export interface Categoria {
  id: number;
  descricao: string;
  produto?: Produto[];
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  qtd_estoque: number;
  data_fornecimento: Date;
  categoria: Categoria;
}