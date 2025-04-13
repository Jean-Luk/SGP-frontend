import { FaMagnifyingGlass, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { api } from '../services/api.js'
import { useEffect, useState, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function App() {

  const { id } = useParams();
  const [pedaco, setPedaco] = useState()
  const [tipo, setTipo] = useState();
  const [cor, setCor] = useState();
  const [erro, setErro] = useState([]);

  const codVendedorRef = useRef(null)
  const pinRef = useRef(null)

  async function loadPedaco() {
    const responsePedaco = await api.get("/pedacos/buscar/" + id);
    setPedaco(responsePedaco.data);

    const responseTipo = await api.get("/tipos/buscar/" + responsePedaco.data.idTipo)
    setTipo(responseTipo.data);

    const responseCor = await api.get("/cores/listar")
    setCor(responseCor.data[responsePedaco.data.idCor])

  }

  useEffect(() => {
    async function fetchData() {
      await loadPedaco();

    }
    fetchData()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!codVendedorRef.current?.value || !pinRef.current?.value) return setErro("Preencha todos os campos");

    try {
      const response = await api.post("/pedacos/retirar", {
        idPedaco: id,
        codVendedor: codVendedorRef.current?.value,
        pin: pinRef.current?.value
      })

      setErro(false);

      loadPedaco(response.data.result);
    } catch (err) {
      setErro(err.response?.data?.erro || "Ocorreu um erro. Tente novamente mais tarde")
    }

  }

  return (
    <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white text-center mb-4">Retirar pedaço</h1>
        <article
          className="w-full bg-white rounded p-2 relative">

          <h1 className="text-2xl">{tipo?.nome}</h1>
          <p><span className="font-medium">Tamanho:</span> {pedaco?.tamanho} metros</p>
          <p><span className="font-medium">Cor:</span> {cor}</p>

        </article>

        {pedaco?.status === "retirado" ? (
          <input type="submit" value="Retirado"
            className="w-full p-2 bg-gray-400 rounded mt-4 font-medium" disabled />
        ) : (

          <form className="flex flex-col my-6" onSubmit={handleSubmit}>
            <span className="flex justify-between w-full gap-x-4">
              <section className="w-full">
                <label className="font-medium text-white">Código de vendedor:</label><br />
                <input
                  type="number"
                  placeholder="Seu código..."
                  className="w-full mb-5 p-2 rounded bg-white"
                  ref={codVendedorRef} />
              </section>
              <section className="w-full">
                <label className="font-medium text-white">Pin:</label><br />
                <input
                  type="password"
                  placeholder="Seu pin..."
                  className="w-full mb-5 p-2 rounded bg-white"
                  ref={pinRef} />
              </section>
            </span>
            <input type="submit" value="Confirmar"
              className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
            {erro && (
              <>
                <span className="text-center text-red-500 text-sm font-light mt-4">{erro}</span>
              </>
            )}

          </form>
        )}
      </main>
    </div>

  )
}