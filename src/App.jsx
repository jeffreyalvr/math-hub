import "./styles/global.css";

import { useState } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const App = () => {
  const operacoes = {
    soma: { id: 0, nome: "soma", simbolo: "+" },
    subtracao: { id: 1, nome: "subtração", simbolo: "-" },
    multiplicacao: { id: 2, nome: "multiplicação", simbolo: "*" },
    divisao: { id: 3, nome: "divisão", simbolo: "/" },
  };

  const [operacaoSelecionada, setOperacaoSelecionada] = useState(
    operacoes.soma
  );

  const handleOperacao = (operacaoId) => {
    const op = Object.values(operacoes).find(
      (operacao) => operacao.id === operacaoId
    );
    setOperacaoSelecionada(op);
  };

  return (
    <div className="container flex flex-col gap-6 mx-auto">
      <Header
        operacoes={operacoes}
        operacaoSelecionada={operacaoSelecionada}
        handleOperacao={handleOperacao}
      />
      <Main operacaoSelecionada={operacaoSelecionada} />
      <Footer />
    </div>
  );
};

export default App;
