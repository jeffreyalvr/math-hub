import { useState } from "react";

import "./styles/global.css";

import { OperacaoSelecionadaContext } from "./Contexts/OperacaoSelecionadaContext";

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
  };

  const [operacaoSelecionada, setOperacaoSelecionada] = useState(
    operacoes.soma
  );

  const handleOperacao = (operacaoId) => {
    const selecionada = Object.values(operacoes).find(
      (operacao) => operacao.id === operacaoId
    );
    setOperacaoSelecionada(selecionada);
  };

  return (
    <OperacaoSelecionadaContext.Provider
      value={{ operacaoSelecionada, setOperacaoSelecionada }}
    >
      <div className="flex flex-col w-full h-full bg-[#D9D9D9] lg:flex-row">
        <Sidebar operacoes={operacoes} handleOperacao={handleOperacao} />
        <Main />
      </div>
    </OperacaoSelecionadaContext.Provider>
  );
};

export default App;
