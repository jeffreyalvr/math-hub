const Main = ({ operacaoSelecionada }) => {
  return (
    <div className="flex flex-col gap-8 max-w-3xl m-auto">
      <h1 className="pb-4 text-3xl font-bold capitalize text-[#6B7280] border-b border-[#B7B7B7]">
        {operacaoSelecionada.nome}
      </h1>
      <div className="container flex flex-col p-4 gap-4 rounded-lg bg-[#C7C7C7]">
        <div className="container flex flex-row w-full items-center rounded-lg p-6 text-6xl font-bold gap-2 bg-gray-600">
          <span className="text-white">45</span>
          <span className="text-yellow-400">
            {operacaoSelecionada?.simbolo}
          </span>
          <span className="text-white">72</span>
        </div>
        <div className="container flex flex-row w-full items-center rounded-lg p-6 text-6xl font-bold gap-2 bg-gray-500">
          <span className="text-emerald-500">=</span>
          <input
            type="text"
            className="w-fit text-6xl bg-transparent border-0 outline-none text-cyan-400"
          />
        </div>
        <div className="flex flex-row justify-center gap-4 my-4">
          <button className="py-4 px-12 rounded-lg bg-[#4984CA] text-white font-bold hover:bg-opacity-75">
            Verificar
          </button>
          <button className="py-4 px-12 rounded-lg bg-[#CA7849] text-white font-bold hover:bg-opacity-75">
            Não sei
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
