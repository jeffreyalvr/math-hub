import { useRef, useEffect, useState, useContext } from "react";
import { OperacaoSelecionadaContext } from "../../Contexts/OperacaoSelecionadaContext";
import { ArrayHistoricoContext } from "../../Contexts/ArrayHistoricoContext";

const Operacoes = () => {
  const [valoresOperacao, setValoresOperacao] = useState([]);
  const [resultadoInput, setResultadoInput] = useState("");
  const [resultadoInputConfirmado, setResultadoInputConfirmado] = useState("");
  const [resultado, setResultado] = useState(0);
  const [visibilidadeResultadoContainer, setVisibilidadeResultadoContainer] =
    useState(false);

  const [quantidadeValores, setQuantidadeValores] = useState(
    localStorage.getItem("quantidadeValores") || 2
  );
  const [alcanceValores, setAlcanceValores] = useState(
    localStorage.getItem("alcanceValores") || 250
  );

  const { operacaoSelecionada } = useContext(OperacaoSelecionadaContext);
  const { arrayHistorico, setArrayHistorico } = useContext(
    ArrayHistoricoContext
  );
  const campoInput = useRef(null);

  const resultadoCores = {
    correto: "bg-[#64ab7c]",
    errado: "bg-[#ab6464]",
    normal: "bg-gray-500",
  };

  useEffect(() => {
    if (campoInput.current) campoInput.current.focus();
  }, []);

  useEffect(() => {
    gerarNumerosAleatorios(quantidadeValores, alcanceValores);
  }, [quantidadeValores, alcanceValores]);

  useEffect(() => {
    limparInput();
  }, [quantidadeValores, alcanceValores, operacaoSelecionada, valoresOperacao]);

  const limparInput = () => {
    setResultadoInput("");
    setResultadoInputConfirmado("");
    handleResultadoContainer(false);
  };

  const handleEntradaCaracteres = (e) => {
    setResultadoInput(e.target.value.trim());
  };

  const handleSelectQuantidadeValores = (e) => {
    localStorage.setItem("quantidadeValores", e.target.value);
    setQuantidadeValores(e.target.value);
  };

  const handleSelectAlcanceValores = (e) => {
    localStorage.setItem("alcanceValores", e.target.value);
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
    if (!resultadoInputConfirmado) return null;
    return resultado == resultadoInputConfirmado ? true : false;
  };

  const adicionarNoHistorico = (item) => {
    if (arrayHistorico.length > 0) {
      const ultimoItem = arrayHistorico[arrayHistorico.length - 1];

      const saoIguais = Object.keys(item).every((key) => {
        return item[key] === ultimoItem[key];
      });

      if (saoIguais) return;
    }

    setArrayHistorico((prevState) => [...prevState, item]);
  };

  const handleBotaoGerarNovoCalculo = () => {
    limparInput();
    gerarNumerosAleatorios(quantidadeValores, alcanceValores);
  };

  const handleBotaoVerificar = () => {
    let valor = resolverOperacao(valoresOperacao, operacaoSelecionada.simbolo);
    setResultadoInputConfirmado(resultadoInput);
    setResultado(valor);

    let item = {
      valores: valoresOperacao,
      operacao: operacaoSelecionada.simbolo,
      valorEnviado: resultadoInput,
      estado: valor == resultadoInput ? "correto" : "incorreto",
    };

    if (resultadoInput != valor) handleResultadoContainer(true);

    if (resultadoInput == "") return;

    adicionarNoHistorico(item);
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
    <div className="flex flex-col gap-8 w-full max-w-3xl m-auto">
      <h3 className="text-xl font-bold capitalize text-center text-[#6B7280]">
        {operacaoSelecionada.nome}
      </h3>

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
        <div
          className={`${
            validaResposta() === true
              ? resultadoCores.correto
              : validaResposta() === false
              ? resultadoCores.errado
              : resultadoCores.normal
          }
          flex flex-row min-h-[130px] w-full items-center rounded-lg p-6 text-6xl font-bold gap-2`}
        >
          <span className="text-white drop-shadow-md">=</span>
          <input
            ref={campoInput}
            className="w-fit text-6xl bg-transparent border-0 outline-none text-white overflow-x-auto"
            value={resultadoInput}
            onChange={(e) => handleEntradaCaracteres(e)}
            onKeyDown={(e) => handleKeyBindings(e)}
          />
        </div>

        <div
          className={`${visibilidadeResultadoContainer ? "flex" : "hidden"}
            bg-[#848484] flex-row p-4 justify-between gap-4 rounded-lg text-white font-bold`}
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

      <div className="flex flex-col w-full gap-4 items-center">
        <div className="flex flex-row flex-wrap gap-3 w-fit">
          <span className="px-3 py-1 rounded-lg bg-[#C7C7C7] text-[#676767] text-xs font-bold">
            ENTER
          </span>
          Para verificar a resposta.
        </div>
        <div className="flex flex-row flex-wrap gap-3 w-fit">
          <span className="px-3 py-1 rounded-lg bg-[#C7C7C7] text-[#676767] text-xs font-bold">
            SHIFT DIREITO
          </span>
          Para pular e gerar um novo cálculo.
        </div>
      </div>
    </div>
  );
};

export default Operacoes;
