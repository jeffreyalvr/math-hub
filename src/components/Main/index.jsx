import { useState } from "react";
import { ArrayHistoricoContext } from "../../Contexts/ArrayHistoricoContext";

import Tabs from "../Tabs";
import Operacoes from "../Operacoes";
import History from "../History";

const Main = () => {
  const [arrayHistorico, setArrayHistorico] = useState([]);

  return (
    <ArrayHistoricoContext.Provider
      value={{ arrayHistorico, setArrayHistorico }}
    >
      <Tabs
        abas={[
          { id: 0, nome: "Operações", componente: <Operacoes /> },
          {
            id: 1,
            nome: "Histórico",
            componente: <History />,
          },
        ]}
      />
    </ArrayHistoricoContext.Provider>
  );
};

export default Main;
