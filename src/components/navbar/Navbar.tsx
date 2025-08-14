import { ListIcon } from "@phosphor-icons/react"
import { useState } from "react"
import LogoRH from "../../assets/rh-logo.svg"

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-nav-footer shadow-md py-3.5 px-6 h-20 flex items-center justify-center z-50">
      <div className="container flex items-center justify-between w-full">
        <a href="#home">
          <img src={LogoRH} alt="Logo RH" className="w-24 h-auto object-contain" />
        </a>

        <ul className="hidden md:flex items-center gap-6 text-background text-xl">
          <li className="relative group hover:brightness-105">
            <a href="#home" className="hover:text-azul-claro transition-colors duration-400">Home</a>
            <span
              className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-azul-claro scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100"
            />
          </li>
          <li className="relative group hover:brightness-105">
            <a href="#sobre" className="hover:text-azul-claro transition-colors duration-400">Sobre Nós</a>
            <span
              className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-azul-claro scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100"
            />
          </li>
          <li className="relative group hover:brightness-105">
            <a href="#servicos" className="hover:text-azul-claro transition-colors duration-400">Serviços</a>
            <span
              className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-azul-claro scale-x-0 origin-left transition-transform duration-400 ease-in-out group-hover:scale-x-100"
            />
          </li>
        </ul>

        <button
          className="md:hidden text-azul-claro text-3xl font-bold"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          <ListIcon size={40} weight="light" />
        </button>
      </div>

      {open && (
        <ul className="flex flex-col items-end gap-4 bg-nav-footer opacity-95 text-background text-xl px-6 py-4 md:hidden fixed top-20 right-0 z-40 shadow-md rounded-lg w-52">
          <li className="relative w-full group hover:brightness-105">
            <a href="#home" onClick={() => setOpen(false)} className="block hover:text-azul-claro transition-colors duration-400 text-right">Home</a>
            <span className="block border-b border-slate-300 mt-2 w-full" />
          </li>
          <li className="relative w-full group hover:brightness-105">
            <a href="#sobre" onClick={() => setOpen(false)} className="block hover:text-azul-claro transition-colors duration-400 text-right">Sobre Nós</a>
            <span className="block border-b border-slate-300 mt-2 w-full" />
          </li>
          <li className="relative w-full group hover:brightness-105">
            <a href="#servicos" onClick={() => setOpen(false)} className="block hover:text-azul-claro transition-colors duration-400 text-right">Serviços</a>
            <span className="block border-b border-slate-300 mt-2 w-full" />
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar