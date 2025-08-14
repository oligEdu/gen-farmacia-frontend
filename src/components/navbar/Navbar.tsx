
import { Link } from "react-router-dom";

function Navbar() {

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-green-800/50 fixed w-full top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group"
            >
              <div className="container flex items-center justify-between w-full">
                <div className="flex flex-1 justify-start">
                  <div className="text-green-400 font-bold text-xl">
                    ⚕️ Pharmacy Cadmus
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-green-800/20 ${
                  isActivePage('/') || isActivePage('/home')
                    ? 'text-green-400 bg-green-800/20' 
                    : 'text-gray-300 hover:text-green-400'
                }`}
              >
                🏠 Home
              </Link>
              <Link
                to="/categorias"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-green-800/20 ${
                  isActivePage('/categorias')
                    ? 'text-green-400 bg-green-800/20' 
                    : 'text-gray-300 hover:text-green-400'
                }`}
              >
                📁 Categorias
              </Link>
              <Link
                to="/produtos"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-green-800/20 ${
                  isActivePage('/produtos')
                    ? 'text-green-400 bg-green-800/20' 
                    : 'text-gray-300 hover:text-green-400'
                }`}
              >
                💊 Produtos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;