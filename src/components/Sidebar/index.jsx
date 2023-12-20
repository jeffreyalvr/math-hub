import logo_img from "../../assets/images/logo.png";

import Footer from "../Footer";

const Sidebar = ({ operacoes, operacaoSelecionada, handleOperacao }) => {
  return (
    <aside className="flex flex-col w-[350px] h-screen px-4 gap-8 bg-[#333333] text-white">
      <div className="flex justify-center py-16 border-b border-[#535353]">
        <h1 className="flex flex-row gap-4 items-center text-3xl font-bold text-white">
          <img src={logo_img} alt="Logo" />
          Math :: Hub
        </h1>
      </div>
      <nav className="flex flex-col gap-1">
        {Object.values(operacoes).map((operacao) => (
          <a
            href="#"
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
