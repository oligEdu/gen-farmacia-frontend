import { useEffect, useState } from "react";

interface Categoria {
  id: number;
  categoria: string;
  descricao: string;
}

const estadoInicialForm = {
  categoria: "",
  descricao: "",
};

// Importar sua API
import { api } from "../../services/Service";

function CategoriaPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formData, setFormData] = useState(estadoInicialForm);
  const [categoriaEmEdicao, setCategoriaEmEdicao] = useState<Categoria | null>(null);

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    try {
      setLoading(true);
      const res = await api.get("/categoria");
      setCategorias(res.data);
    } catch {
      setError("Erro ao buscar categorias");
    } finally {
      setLoading(false);
    }
  }


  async function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await api.delete(`/categoria/${id}`);
        setCategorias(categorias.filter((cat) => cat.id !== id));
      } catch (error) {
        alert("Erro ao excluir categoria");
        console.error(error);
      }
    }
  }

  function handleEdit(categoria: Categoria) {
    setCategoriaEmEdicao(categoria);
    setFormData({
      categoria: categoria.categoria,
      descricao: categoria.descricao,
    });
  }

  function handleCancel() {
    setCategoriaEmEdicao(null);
    setFormData(estadoInicialForm);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  if (loading && categorias.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-green-400 text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <span className="text-green-400">📁</span>
            Gerenciar Categorias
          </h1>
          <p className="text-gray-400 text-lg">Organize seus medicamentos em categorias para facilitar o controle</p>
        </div>

        {/* Formulário */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">
              {categoriaEmEdicao ? "✏️ Editar Categoria" : "➕ Nova Categoria"}
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="categoria" className="block text-green-400 font-medium text-sm">
                  Nome da Categoria *
                </label>
                <input
                  type="text"
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  placeholder="Ex: Analgésicos"
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-lg px-4 py-3 text-white
                            placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20
                            transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="descricao" className="block text-green-400 font-medium text-sm">
                  Descrição *
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Ex: Medicamentos para alívio da dor"
                  rows={4}
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-lg px-4 py-3 text-white
                            placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20
                            transition-all duration-300 resize-none"
                  required
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 
                            text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 
                            transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400/50"
                >
                  {categoriaEmEdicao ? "💾 Salvar Alterações" : "➕ Adicionar Categoria"}
                </button>
                {categoriaEmEdicao && (
                  <button
                    type="button"
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

        {/* Lista de Categorias */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Lista de Categorias ({categorias.length})
          </h2>

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-300 p-4 rounded-lg mb-6 text-center">
              ❌ {error}
            </div>
          )}

          {categorias.length === 0 && !loading ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📁</div>
              <h3 className="text-2xl text-gray-400 mb-4">Nenhuma categoria encontrada.</h3>
              <p className="text-gray-500">Adicione sua primeira categoria usando o formulário acima!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {categorias.map((categoria) => (
                <div
                  key={categoria.id}
                  className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-green-400/50 
                            hover:bg-gray-800/50 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-green-400 text-xl">📁</span>
                        <h3 className="text-white font-bold text-lg">{categoria.categoria}</h3>
                        <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                          ID: {categoria.id}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed ml-8">{categoria.descricao}</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(categoria)}
                        className="bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-500/50 
                                  hover:border-yellow-400 px-4 py-2 rounded-lg font-medium transition-all duration-300
                                  focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(categoria.id)}
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

export default CategoriaPage;