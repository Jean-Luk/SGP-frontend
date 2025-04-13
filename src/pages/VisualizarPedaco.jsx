import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { api } from '../services/api.js'
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import CardPedaco from "../components/CardPedaco.jsx";
import { Link } from "react-router-dom";

export default function App () {

  const { id } = useParams();
  const [ pedaco, setPedaco ] = useState()
  const [ tipo, setTipo ] = useState();
  const [ cor, setCor ] = useState();

  async function loadPedaco () {
    const responsePedaco = await api.get("/pedacos/buscar/" + id);
    setPedaco(responsePedaco.data);

    const responseTipo = await api.get("/tipos/buscar/" + responsePedaco.data.idTipo)
    setTipo(responseTipo.data);

    const responseCor = await api.get("/cores/listar")
    setCor(responseCor.data[responsePedaco.data.idCor] || "N/A")

  }

  useEffect(() => {
    async function fetchData () {
      await loadPedaco();

    }
    fetchData()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
    <main className="my-10 w-full md:max-w-2xl">

    <article 
    className="w-full bg-white rounded p-2 relative">

  <h1 className="text-2xl">{tipo?.nome}</h1>
  <p><span className="font-medium">Tamanho:</span> {pedaco?.tamanho} metros</p>
  <p><span className="font-medium">Cor:</span> {cor}</p>

  {pedaco?.status === "retirado" ? (
                    <button
                        className='bg-gray-400 w-7 h-7 flex items-center justify-center rounded-lg absolute bottom-2 right-2'
                    >
                        <FaArrowUpRightFromSquare size={18} color='#FFF' />
                    </button>
            ) : (
                <Link to={"/retirarPedaco/" + pedaco?._id}>
                    <button
                        className='bg-green-500 w-7 h-7 flex items-center justify-center rounded-lg absolute bottom-2 right-2 cursor-pointer'
                    >
                        <FaArrowUpRightFromSquare size={18} color='#FFF' />
                    </button>
                </Link>

            )}
  </article>
  </main>
  </div>

  )
}