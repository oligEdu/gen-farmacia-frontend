import { useEffect, useState } from "react";

function Footer() {
  const [funcionando, setFuncionando] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    function verificaFuncionamento() {
      const agora = new Date();
      const dia = agora.getDay();
      const hora = agora.getHours();

      // Segunda a Sexta: 8h às 18h, Sábado: 8h às 14h
      const funcionaSemana = dia >= 1 && dia <= 5 && hora >= 8 && hora < 18;
      const funcionaSabado = dia === 6 && hora >= 8 && hora < 14;

      setFuncionando(funcionaSemana || funcionaSabado);
    }

    verificaFuncionamento();
    const interval = setInterval(verificaFuncionamento, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-black border-t border-green-800/50 w-full mt-20 pt-10 pb-4 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-300 text-sm md:justify-items-center">

        <div className="flex flex-col items-start gap-4">
          <div className="text-green-400 font-bold text-xl">
            ⚕️ Pharmacy Cadmus
          </div>
          <p className="leading-relaxed text-left max-w-80">
            Na <strong className="text-green-400">Pharmacy Cadmus</strong>, cuidamos da sua saúde
            com medicamentos de qualidade e atendimento especializado.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 max-w-xs">
          <h4 className="font-semibold text-lg text-left text-white">Contato</h4>
          <div className="flex items-center gap-2">
            <span>📱</span> <span>(11) 99999-8888</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span> <span>Rua da Saúde, 456 - Centro, São Paulo</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🕒</span> <span>Seg-Sex: 8h-18h | Sáb: 8h-14h</span>
          </div>
          {funcionando && (
            <span className="px-3 py-1 bg-green-900/50 w-fit text-green-400 rounded-full mt-2 shadow-sm border border-green-800/50">
              🟢 Aberto agora
            </span>
          )}
        </div>

        <div className="flex flex-col items-start gap-3 max-w-xs">
          <h4 className="font-semibold text-lg text-left text-white">Links Úteis</h4>
          <a href="#receitas" className="hover:text-green-400 transition-colors text-left w-full">Receitas Online</a>
          <a href="#entrega" className="hover:text-green-400 transition-colors text-left w-full">Entrega</a>
          <a href="#farmaceutico" className="hover:text-green-400 transition-colors text-left w-full">Fale com Farmacêutico</a>
          <a href="#politica" className="hover:text-green-400 transition-colors text-left w-full">Política de Privacidade</a>
        </div>

        <div className="flex flex-col items-start gap-3 max-w-xs">
          <h4 className="font-semibold text-lg text-left text-white">Pagamentos</h4>
          <div className="flex flex-wrap items-center gap-4 text-2xl">
            <span>💳</span>
            <span>📱</span>
            <span>💰</span>
          </div>
          <p className="text-xs text-gray-400 max-w-52 text-left">
            Aceitamos cartões de crédito/débito, Pix, dinheiro e convênios médicos.
          </p>

          <h4 className="font-semibold text-lg mt-4 text-left text-white">Certificações</h4>
          <p className="text-xs text-gray-400 max-w-52 text-left">
            CRF/SP - Conselho Regional de Farmácia
            <br />ANVISA - Agência Nacional de Vigilância Sanitária
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center text-center mt-8 border-t border-green-800/50 pt-4 text-xs text-gray-400">
        <span>© {year} Pharmacy Cadmus — Todos os direitos reservados. | Responsável Técnico: Dr. Farmacêutico CRF/SP</span>
      </div>
    </footer>
  );
}

export default Footer;