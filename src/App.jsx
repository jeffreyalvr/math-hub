import "./styles/global.css";

import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

const App = () => {
  const operacoes = {
    soma: {
      id: 0,
      nome: "soma",
      simbolo: "+",
    },
    subtracao: {
      id: 1,
      nome: "subtração",
      simbolo: "-",
    },
    multiplicacao: {
      id: 2,
      nome: "multiplicação",
      simbolo: "×",
    },
    divisao: {
      id: 3,
      nome: "divisão",
      simbolo: "÷",
    },
    // porcentagem: {
    //   id: 4,
    //   nome: "porcentagem",
    //   simbolo: "%",
    //   maximoValores: 2,
    // },
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
    <div className="flex flex-col w-full h-screen bg-[#D9D9D9] lg:flex-row">
      <Sidebar
        operacoes={operacoes}
        operacaoSelecionada={operacaoSelecionada}
        handleOperacao={handleOperacao}
      />
      <Main operacaoSelecionada={operacaoSelecionada} />
    </div>
  );
};

export default App;
