import { useContext, useState } from "react";
import { OperacaoSelecionadaContext } from "../../Contexts/OperacaoSelecionadaContext";

import logo_img from "../../assets/images/logo.png";
import icon_menu from "../../assets/images/menu.png";
import icon_collapse_menu from "../../assets/images/collapse.png";

import Footer from "../Footer";

const Sidebar = ({ operacoes, handleOperacao }) => {
  const { operacaoSelecionada } = useContext(OperacaoSelecionadaContext);
  const [menuOpened, setMenuOpened] = useState(true);

  const handleMenuToggler = () => {
    setMenuOpened(!menuOpened);
  };

  return menuOpened ? (
    <aside className="flex flex-col py-6 px-4 gap-8 w-full h-full mb-8 bg-[#333333] text-white lg:w-[350px] lg:mb-0 lg:py-0">
      <div className="flex flex-col gap-8 items-center justify-center pt-16 pb-8 border-b border-[#535353]">
        <h1 className="flex flex-row gap-4 items-center text-3xl font-bold text-white">
          <img src={logo_img} alt="Logo" />
          Math :: Hub
        </h1>
        <button
          className="flex flex-row gap-2 items-center border-2 border-[#3F3F3F] px-4 py-2 text-white cursor-pointer hover:bg-[#3F3F3F]"
          onClick={handleMenuToggler}
        >
          <img src={icon_collapse_menu} className="invert" />
          Colapsar menu
        </button>
      </div>
      <nav className="flex flex-col gap-1">
        {Object.values(operacoes).map((operacao) => (
          <a
            role="button"
            className={`p-4 font-bold ${
              operacaoSelecionada.nome === operacao.nome
                ? "bg-emerald-500 hover:bg-emerald-500/75 text-white"
                : "bg-[#3F3F3F] hover:bg-[#3F3F3F]/75 "
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
  ) : (
    <aside className="flex flex-col items-center py-8 px-4 gap-8 w-full h-fit lg:h-full mb-8 bg-[#333333] text-white lg:w-[350px] lg:mb-0">
      <button
        className="flex flex-row gap-2 items-center border-2 border-[#3F3F3F] px-4 py-2 text-white cursor-pointer hover:bg-[#3F3F3F]"
        onClick={handleMenuToggler}
      >
        <img src={icon_menu} className="invert" />
        Expandir menu
      </button>
    </aside>
  );
};

export default Sidebar;
