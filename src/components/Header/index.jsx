import logo_img from "../../assets/images/logo.png";

const Header = () => {
  const operacoes = [
    { nome: "soma", simbolo: "+" },
    { nome: "subtração", simbolo: "-" },
    { nome: "multiplicação", simbolo: "*" },
    { nome: "divisão", simbolo: "/" },
  ];
  return (
    <header className="container flex flex-col rounded-lg overflow-hidden mt-8">
      <div className="bg-gray-100 p-16">
        <h1 className="flex flex-row gap-4 text-4xl font-bold text-slate-600">
          <img src={logo_img} alt="Logo" />
          Math : : Hub
        </h1>
      </div>
      <div className="bg-gray-300 flex flex-row">
        {operacoes.map((operacao) => (
          <a href="#" className="p-4 hover:bg-slate-200">
            {operacao.nome}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
