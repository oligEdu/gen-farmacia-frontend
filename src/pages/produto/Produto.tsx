/* eslint-disable prefer-const */
import { useEffect, useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  qtd_estoque: number;
  data_fornecimento: string;
  categoria: {
    id: number;
    descricao: string;
  };
}

interface Categoria {
  id: number;
  descricao: string;
}

const estadoInicialForm = {
  nome: "",
  preco: "",
  qtd_estoque: "",
  categoria: "",
};

// Importar sua API
import { api } from "../../services/Service";

function ProdutoPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formData, setFormData] = useState(estadoInicialForm);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(null);

  useEffect(() => {
    buscarProdutos();
    buscarCategorias();
  }, []);

  async function buscarProdutos() {
    try {
      setLoading(true);
      const res = await api.get("/produtos");
      setProdutos(res.data);
    } catch {
      setError("Erro ao buscar produtos");
    } finally {
      setLoading(false);
    }
  }

  async function buscarCategorias() {
    try {
      const res = await api.get("/categorias");
      setCategorias(res.data);
    } catch {
      setError("Erro ao buscar categorias");
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const camposObrigatorios = ["nome", "preco", "qtd_estoque", "categoria"];

    const campoVazio = camposObrigatorios.some(
      (campo) => !formData[campo as keyof typeof formData]?.toString().trim()
    );

    if (campoVazio) {
      alert("Por favor preencha todos os campos obrigatórios");
      return;
    }

    const produtoPayload = {
      nome: formData.nome,
      preco: parseFloat(formData.preco.replace(",", ".")),
      qtd_estoque: Math.max(0, parseInt(formData.qtd_estoque, 10)),
      categoria: { id: parseInt(formData.categoria, 10) },
    };

    try {
      if (produtoEmEdicao) {
        await api.put(`/produtos/${produtoEmEdicao.id}`, produtoPayload);
      } else {
        await api.post("/produtos", produtoPayload);
      }

      setFormData(estadoInicialForm);
      setProdutoEmEdicao(null);
      buscarProdutos();
    } catch (error) {
      alert("Erro ao salvar produto");
      console.error(error);
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`/produtos/${id}`);
        setProdutos(produtos.filter((produto) => produto.id !== id));
      } catch (error) {
        alert("Erro ao excluir produto");
        console.error(error);
      }
    }
  }

  function handleEdit(produto: Produto) {
    setProdutoEmEdicao(produto);
    setFormData({
      nome: produto.nome,
      preco: produto.preco.toString().replace(".", ","),
      qtd_estoque: produto.qtd_estoque.toString(),
      categoria: produto.categoria.id.toString(),
    });
  }

  function handleCancel() {
    setProdutoEmEdicao(null);
    setFormData(estadoInicialForm);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    let { name, value } = event.target;

    if (name === "preco") {
      value = value.replace(",", ".");
    }

    if (name === "qtd_estoque") {
      if (value === "") {
        setFormData((prevData) => ({ ...prevData, [name]: "" }));
        return;
      }
      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= 0) {
        setFormData((prevData) => ({ ...prevData, [name]: num.toString() }));
      }
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function formatarPreco(preco: number): string {
    return preco.toFixed(2).replace(".", ",");
  }

  function formatarData(data: string | Date): string {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  if (loading && produtos.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-green-400 text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-8">
      <div className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <span className="text-green-400">💊</span>
            Gerenciar Produtos
          </h1>
          <p className="text-gray-400 text-lg">Controle completo do seu estoque farmacêutico</p>
        </div>

        {/* Formulário */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">
              {produtoEmEdicao ? "✏️ Editar Produto" : "➕ Novo Produto"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="nome" className="block text-green-400 font-medium text-sm">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Ex: Dipirona 500mg"
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-lg px-4 py-3 text-white
                            placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20
                            transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="preco" className="block text-green-400 font-medium text-sm">
                  Preço (R$) *
                </label>
                <input
                  type="text"
                  name="preco"
                  id="preco"
                  value={formData.preco.replace(".", ",")}
                  onChange={handleInputChange}
                  placeholder="Ex: 15,50"
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-lg px-4 py-3 text-white
                            placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20
                            transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="qtd_estoque" className="block text-green-400 font-medium text-sm">
                  Quantidade em Estoque *
                </label>
                <input
                  type="number"
                  name="qtd_estoque"
                  id="qtd_estoque"
                  value={formData.qtd_estoque}
                  onChange={handleInputChange}
                  placeholder="Ex: 100"
                  min="0"
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-lg px-4 py-3 text-white
                            placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20
                            transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="categoria" className="block text-green-400 font-medium text-sm">
                  Categoria *
                </label>
                <select
                  name="categoria"
                  id="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-lg px-4 py-3 text-white
                            focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20
                            transition-all duration-300"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-gray-800">
                      {cat.descricao}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 flex gap-4 mt-6">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 
                            text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 
                            transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400/50"
                >
                  {produtoEmEdicao ? "💾 Salvar Alterações" : "➕ Adicionar Produto"}
                </button>
                {produtoEmEdicao && (
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg 
                              transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-400/50"
                  >
                    ❌ Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Lista de Produtos ({produtos.length})
          </h2>

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-300 p-4 rounded-lg mb-6 text-center">
              ❌ {error}
            </div>
          )}

          {produtos.length === 0 && !loading ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">💊</div>
              <h3 className="text-2xl text-gray-400 mb-4">Nenhum produto encontrado.</h3>
              <p className="text-gray-500">Adicione seu primeiro produto usando o formulário acima!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-green-400/50 
                            hover:bg-gray-800/50 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-green-400 text-xl">💊</span>
                        <h3 className="text-white font-bold text-lg">{produto.nome}</h3>
                        <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                          ID: {produto.id}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">💰</span>
                          <span className="text-green-400 font-semibold">R$ {formatarPreco(produto.preco)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">📦</span>
                          <span className={`font-semibold ${produto.qtd_estoque < 10 ? 'text-red-400' : 'text-white'}`}>
                            {produto.qtd_estoque} unidades
                          </span>
                          {produto.qtd_estoque < 10 && (
                            <span className="text-red-400 text-xs">⚠️ Baixo</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">📁</span>
                          <span className="text-blue-400">{produto.categoria.descricao}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500">
                        📅 Cadastrado em: {formatarData(produto.data_fornecimento)}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(produto)}
                        className="bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-500/50 
                                  hover:border-yellow-400 px-4 py-2 rounded-lg font-medium transition-all duration-300
                                  focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(produto.id)}
                        className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/50 
                                  hover:border-red-400 px-4 py-2 rounded-lg font-medium transition-all duration-300
                                  focus:outline-none focus:ring-2 focus:ring-red-400/50"
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProdutoPage;