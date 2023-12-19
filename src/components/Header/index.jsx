import logo_img from "../../assets/images/logo.png";

const Header = ({ operacoes, operacaoSelecionada, handleOperacao }) => {
  return (
    <header className="container flex flex-col rounded-lg overflow-hidden mt-8">
      <div className="bg-gray-100 p-16">
        <h1 className="flex flex-row gap-4 text-4xl font-bold text-slate-600">
          <img src={logo_img} alt="Logo" />
          Math : : Hub
        </h1>
      </div>
      <div className="bg-gray-300 flex flex-row">
        {Object.values(operacoes).map((operacao) => (
          <a
            href="#"
            className={`p-4 hover:bg-opacity-75 ${
              operacaoSelecionada.nome === operacao.nome
                ? "bg-emerald-500 text-white font-bold"
                : null
            }`}
            onClick={() => handleOperacao(operacao.id)}
            key={operacao.id}
          >
            {operacao.nome}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
