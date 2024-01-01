import { createContext, useContext } from "react";

export const OperacaoSelecionadaContext = createContext({
  operacaoSelecionada: "",
  setOperacaoSelecionada: () => {},
});

export const useOperacaoSelecionadaContext = () =>
  useContext(OperacaoSelecionadaContext);
