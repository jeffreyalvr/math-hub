const Main = ({ operacaoSelecionada }) => {
  return (
    <div className="container flex flex-col md:flex-row p-4 gap-4 rounded-lg bg-gray-200">
      <div className="container flex flex-row w-full items-center md:w-fit rounded-lg p-6 text-6xl font-bold gap-2 bg-gray-600">
        <span className="text-white">45</span>
        <span className="text-yellow-400">{operacaoSelecionada?.simbolo}</span>
        <span className="text-white">72</span>
      </div>
      <div className="container flex flex-row w-full items-center rounded-lg p-6 text-6xl font-bold gap-2 bg-gray-500">
        <span className="text-emerald-500">=</span>
        <input
          type="text"
          className="w-fit text-6xl bg-transparent border-0 outline-none text-cyan-400"
        />
      </div>
      <button className="p-4 md:px-8 rounded-lg bg-blue-500 text-white font-bold hover:bg-opacity-75">
        Verificar
      </button>
    </div>
  );
};

export default Main;
