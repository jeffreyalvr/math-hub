import Tabs from "../Tabs";
import Operacoes from "../Operacoes";
import History from "../History";

const Main = () => {
  return (
    <Tabs
      abas={[
        { id: 0, nome: "Operações", componente: <Operacoes /> },
        { id: 1, nome: "Histórico", componente: <History /> },
      ]}
    />
  );
};

export default Main;
