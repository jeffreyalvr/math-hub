import { Fragment } from "react";

const History = ({ itens: arrayHistorico }) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="p-2 px-2 w-full max-h-80 rounded-lg bg-[#C7C7C7] overflow-y-auto">
        {arrayHistorico && arrayHistorico.length > 0 ? (
          <table className="w-full border-separate">
            <thead className="text-left">
              <tr className="text-[#555555]">
                <th>#</th>
                <th>Operação</th>
                <th>Valor Enviado</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {arrayHistorico.map((item, index) => (
                <tr
                  className={
                    item.estado === "incorreto"
                      ? `bg-red-300 mb-2`
                      : `bg-green-300`
                  }
                  key={index}
                >
                  <td className="px-4 py-1">{index + 1}</td>
                  <td className="px-4 py-1">
                    {item.valores &&
                      item.valores.map((valor, id) => (
                        <Fragment key={id}>
                          {id > 0 && (
                            <span className="mx-1">{item.operacao}</span>
                          )}
                          <span>{valor}</span>
                        </Fragment>
                      ))}
                  </td>
                  <td className="px-4 py-1">{item.valorEnviado}</td>
                  <td className="capitalize px-4 py-1">{item.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-3 text-[#555555]">
            Nenhuma operação registrada ainda.
          </p>
        )}
      </div>
    </div>
  );
};

export default History;
