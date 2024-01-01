import { useContext } from "react";
import { OperacaoSelecionadaContext } from "../../Contexts/OperacaoSelecionadaContext";

import logo_img from "../../assets/images/logo.png";

import Footer from "../Footer";

const Sidebar = ({ operacoes, handleOperacao }) => {
  const { operacaoSelecionada } = useContext(OperacaoSelecionadaContext);

  return (
    <aside className="flex flex-col py-6 px-4 gap-8 w-full h-full mb-8 bg-[#333333] text-white lg:w-[350px] lg:mb-0 lg:h-screen lg:py-0">
      <div className="flex justify-center py-16 border-b border-[#535353]">
        <h1 className="flex flex-row gap-4 items-center text-3xl font-bold text-white">
          <img src={logo_img} alt="Logo" />
          Math :: Hub
        </h1>
      </div>
      <nav className="flex flex-col gap-1">
        {Object.values(operacoes).map((operacao) => (
          <a
            role="button"
            className={`p-4 hover:bg-opacity-75 font-bold ${
              operacaoSelecionada.nome === operacao.nome
                ? "bg-emerald-500 text-white"
                : "bg-[#3F3F3F]"
            }`}
            onClick={() => handleOperacao(operacao.id)}
            key={operacao.id}
          >
            {operacao.nome}
          </a>
        ))}
      </nav>

      <Footer />
    </aside>
  );
};

export default Sidebar;
