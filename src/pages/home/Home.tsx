import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div id='home' className="min-h-screen bg-black flex justify-center items-center scroll-mt-20 pt-16">
        <div className='container max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          
          <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left">
            <div>
              <h1 className='text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight'>
                <span className="text-green-400">Pharmacy</span>
                <br />
                Cadmus
              </h1>
              <h2 className='text-2xl lg:text-3xl font-medium text-gray-300 mb-6'>
                Sistema de Gerenciamento
              </h2>
              <p className='text-lg text-gray-400 leading-relaxed max-w-2xl'>
                Gerencie seu estoque farmacêutico com eficiência e segurança.
                Controle produtos, categorias, quantidades e muito mais, 
                tudo em uma plataforma integrada e confiável.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Link 
                to="/produtos"
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 
                          text-white px-8 py-4 rounded-lg font-semibold text-center transition-all duration-300 
                          transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400/50 
                          shadow-lg hover:shadow-green-500/25"
              >
                💊 Gerenciar Produtos
              </Link>
              <Link 
                to="/categorias"
                className="bg-gray-800/50 hover:bg-gray-700/50 border-2 border-green-500/50 hover:border-green-400 
                          text-green-400 hover:text-green-300 px-8 py-4 rounded-lg font-semibold text-center 
                          transition-all duration-300 transform hover:scale-[1.02] focus:outline-none 
                          focus:ring-2 focus:ring-green-400/50"
              >
                📁 Ver Categorias
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="relative">
              {/* Círculo de fundo com gradiente */}
              <div className="w-80 h-80 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full 
                            flex items-center justify-center backdrop-blur-sm border border-green-400/30">
                <div className="text-8xl text-green-400 animate-pulse">⚕️</div>
              </div>
              
              {/* Elementos decorativos flutuantes */}
              <div className="absolute -top-6 -right-6 text-4xl text-green-300 animate-bounce">💊</div>
              <div className="absolute -bottom-6 -left-6 text-3xl text-green-400 animate-bounce delay-300">🏥</div>
              <div className="absolute top-1/2 -left-12 text-2xl text-green-300 animate-bounce delay-700">💉</div>
              <div className="absolute top-1/4 -right-8 text-2xl text-green-500 animate-bounce delay-1000">🧬</div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de recursos */}
      <div className="bg-gray-900/50 py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Recursos do Sistema</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Descubra todas as funcionalidades que o Pharmacy Cadmus oferece para otimizar sua farmácia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 
                          transition-all duration-300 hover:bg-gray-700/50 text-center">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6 
                            group-hover:bg-green-600/30 transition-all duration-300">
                <span className="text-3xl text-green-400">💊</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Controle de Produtos</h4>
              <p className="text-gray-400 leading-relaxed">
                Gerencie todo seu estoque de medicamentos com controle de preços, quantidades e alertas de estoque baixo.
              </p>
            </div>

            <div className="group bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 
                          transition-all duration-300 hover:bg-gray-700/50 text-center">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6 
                            group-hover:bg-green-600/30 transition-all duration-300">
                <span className="text-3xl text-green-400">🗂️</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Gestão de Categorias</h4>
              <p className="text-gray-400 leading-relaxed">
                Organize seus medicamentos por categorias para facilitar o acesso, controle e localização rápida.
              </p>
            </div>

            <div className="group bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 
                          transition-all duration-300 hover:bg-gray-700/50 text-center">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6 
                            group-hover:bg-green-600/30 transition-all duration-300">
                <span className="text-3xl text-green-400">📊</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Relatórios e Análises</h4>
              <p className="text-gray-400 leading-relaxed">
                Acompanhe o desempenho da sua farmácia com relatórios detalhados e insights valiosos.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 
                          rounded-2xl p-8 max-w-3xl mx-auto">
              <h4 className="text-2xl font-bold text-white mb-4">Pronto para começar?</h4>
              <p className="text-gray-300 mb-6">
                Comece organizando suas categorias e depois adicione seus produtos ao sistema.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/categorias"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium 
                            transition-all duration-300 transform hover:scale-105 focus:outline-none 
                            focus:ring-2 focus:ring-green-400/50"
                >
                  🚀 Começar com Categorias
                </Link>
                <Link 
                  to="/produtos"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium 
                            transition-all duration-300 transform hover:scale-105 focus:outline-none 
                            focus:ring-2 focus:ring-gray-400/50"
                >
                  📦 Ir para Produtos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

