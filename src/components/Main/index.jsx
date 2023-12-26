import { useRef, useEffect, useState } from "react";

const Main = ({ operacaoSelecionada }) => {
  const [valoresOperacao, setValoresOperacao] = useState([]);
  const [resultadoInput, setResultadoInput] = useState("");
  const [resultado, setResultado] = useState(0);
  const [visibilidadeResultadoContainer, setVisibilidadeResultadoContainer] =
    useState(false);
  const [quantidadeValores, setQuantidadeValores] = useState(2);
  const [alcanceValores, setAlcanceValores] = useState(250);

  const campoInput = useRef(null);

  const resultadoContainerCores = {
    correto: "bg-[#64ab7c]",
    errado: "bg-[#ab6464]",
    vazio: "bg-[#8f8f8f]",
  };

  useEffect(() => {
    if (campoInput.current) campoInput.current.focus();
  }, []);

  useEffect(() => {
    gerarNumerosAleatorios(quantidadeValores, alcanceValores);
  }, [quantidadeValores, alcanceValores]);

  useEffect(() => {
    handleResultadoContainer(false);
    limparInput();
  }, [quantidadeValores, alcanceValores, operacaoSelecionada, valoresOperacao]);

  const checaValidadeCaracteres = () => {
    if (!/^-?\d{1,3}(,\d{3})*(\.\d+)?$/.test(resultadoInput)) {
      alert("O valor inserido não está formatado de forma aceitável.");
      return false;
    }
    return true;
  };

  const limparInput = () => {
    setResultadoInput("");
  };

  const handleEntradaCaracteres = (e) => {
    setResultadoInput(e.target.value);
  };

  const handleSelectQuantidadeValores = (e) => {
    setQuantidadeValores(e.target.value);
  };

  const handleSelectAlcanceValores = (e) => {
    setAlcanceValores(e.target.value);
  };

  const handleResultadoContainer = (estado) => {
    setVisibilidadeResultadoContainer(estado);
  };

  const gerarNumerosAleatorios = (quantidade_valores, alcance_valores) => {
    let arrayTotal = Array.from(
      { length: quantidade_valores },
      (_, index) => index + 1
    );

    arrayTotal = arrayTotal.map(() =>
      Math.floor(Math.random() * alcance_valores)
    );

    setValoresOperacao(arrayTotal);
  };

  const validaResposta = () => {
    if (!resultadoInput) return null;
    return resultado == resultadoInput ? true : false;
  };

  const handleBotaoGerarNovoCalculo = () => {
    limparInput();
    gerarNumerosAleatorios(quantidadeValores, alcanceValores);
  };

  const handleBotaoVerificar = () => {
    let valor = resolverOperacao(valoresOperacao, operacaoSelecionada.simbolo);
    setResultado(valor);
    handleResultadoContainer(true);
  };

  const resolverOperacao = (valoresOperacao, simbolo) => {
    if (!valoresOperacao.length || !simbolo) return NaN;
    return valoresOperacao.reduce((acumulador, valorAtual) => {
      switch (simbolo) {
        case "+":
          return acumulador + valorAtual;
        case "-":
          return acumulador - valorAtual;
        case "×":
          return acumulador * valorAtual;
        case "÷":
          return acumulador / valorAtual;
        default:
          return NaN;
      }
    });
  };

  const handleKeyBindings = (e) => {
    if (e.code === "Enter") handleBotaoVerificar();
    if (e.code === "ShiftRight") handleBotaoGerarNovoCalculo();
  };

  return (
    <div className="w-full flex flex-col gap-8 max-w-3xl m-auto px-4 pb-4 lg:pb-0">
      <h1 className="pb-4 text-3xl font-bold capitalize text-[#6B7280] border-b border-[#B7B7B7]">
        {operacaoSelecionada.nome}
      </h1>

      <div className="flex flex-row flex-wrap justify-center p-4 px-10 gap-4 rounded-lg bg-[#C7C7C7] sm:justify-around">
        <span
          className="flex flex-row gap-3 items-center text-[#555555]"
          title="Determina a quantidade de valores a serem calculados"
        >
          quantidade de valores
          <select
            className="p-2 rounded-lg"
            value={quantidadeValores}
            onChange={(e) => handleSelectQuantidadeValores(e)}
          >
            <option value="2">2 valores</option>
            <option value="3">3 valores</option>
            <option value="4">4 valores</option>
            <option value="5">5 valores</option>
          </select>
        </span>

        <span
          className="flex flex-row gap-3 items-center text-[#555555]"
          title="Determina o alcance máximo de cada número calculado"
        >
          alcance dos valores
          <select
            className="p-2 rounded-lg"
            value={alcanceValores}
            onChange={(e) => handleSelectAlcanceValores(e)}
          >
            <option value="25">até 25</option>
            <option value="100">até 100</option>
            <option value="250">até 250</option>
            <option value="500">até 500</option>
            <option value="1000">até 1000</option>
            <option value="5000">até 5000</option>
            <option value="9999">até 9999</option>
          </select>
        </span>
      </div>

      <div className="flex flex-col p-4 gap-4 rounded-lg bg-[#C7C7C7]">
        <div className="flex flex-row flex-wrap min-h-[130px] w-full justify-center items-center rounded-lg p-6 text-6xl font-bold bg-gray-600">
          {valoresOperacao.map((valor, index) => (
            <div key={index}>
              <span className="text-white">{valor}</span>
              {index < valoresOperacao.length - 1 && (
                <span className="text-yellow-400 px-2">
                  {operacaoSelecionada?.simbolo}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-row min-h-[130px] w-full items-center rounded-lg p-6 text-6xl font-bold gap-2 bg-gray-500">
          <span className="text-emerald-500">=</span>
          <input
            ref={campoInput}
            className="w-fit text-6xl bg-transparent border-0 outline-none text-cyan-400"
            value={resultadoInput}
            onChange={(e) => handleEntradaCaracteres(e)}
            onKeyDown={(e) => handleKeyBindings(e)}
          />
        </div>

        <div
          className={`${visibilidadeResultadoContainer ? "flex" : "hidden"}
            ${
              validaResposta() === true
                ? resultadoContainerCores.correto
                : validaResposta() === false
                ? resultadoContainerCores.errado
                : resultadoContainerCores.vazio
            }
          } flex-row p-4 justify-between gap-4 rounded-lg text-white font-bold`}
        >
          <span>Resposta: {resultado}</span>
          <span
            className="px-2 rounded-lg bg-[#0000004f] text-white"
            role="button"
            title="Ocultar"
            onClick={() => handleResultadoContainer(false)}
          >
            X
          </span>
        </div>

        <div className="flex flex-row justify-center gap-4 my-4">
          <button
            className="py-4 px-12 rounded-lg bg-[#4984CA] text-white font-bold hover:bg-opacity-75"
            onClick={handleBotaoVerificar}
          >
            Verificar resposta
          </button>
          <button
            className="py-4 px-12 rounded-lg bg-[#636069] text-white font-bold hover:bg-opacity-75"
            onClick={handleBotaoGerarNovoCalculo}
          >
            Gerar novo cálculo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
