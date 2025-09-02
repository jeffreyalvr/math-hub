import { useState } from "react";

const Tabs = ({ abas }) => {
  const [abaSelecionada, setAbaSelecionada] = useState(0);

  const handleAbaSelecionada = (abaId) => {
    setAbaSelecionada(abaId);
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto my-10 px-4 pb-4 lg:pb-0">
      <div className="flex flex-row gap-8 mb-8 justify-center border-b border-[#B7B7B7] md:justify-start">
        {abas.length > 0 &&
          abas.map((aba) => (
            <h1
              key={aba.id}
              role="button"
              className={`pb-4 text-2xl font-bold capitalize ${
                abaSelecionada === aba.id
                  ? "text-emerald-500"
                  : "text-[#6B7280]"
              } sm:text-3xl`}
              onClick={() => handleAbaSelecionada(aba.id)}
            >
              {aba.nome || "Sem_nome"}
            </h1>
          ))}
      </div>

      {abas.length > 0 && (
        <div>
          {abas.map((aba) => (
            <div
              key={aba.id}
              style={{ display: abaSelecionada === aba.id ? "block" : "none" }}
            >
              {aba.componente}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tabs;
