import { api } from '../services/api.js'
import { useEffect, useState, useRef } from "react";
import CardPedaco from "../components/CardPedaco.jsx";

export default function App () {

  const [pedacos, setPedacos] = useState([]);
  const [cores, setCores] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [erro, setErro] = useState([]);

  useEffect(() => {
    loadPedacos();
    loadCores();
    loadTipos();
  }, [])

  async function loadPedacos() {
    const response = await api.get("/pedacos/listar")
    setPedacos(response.data);
  }

  async function loadCores() {
    const response = await api.get("/cores/listar")
    setCores(response.data);
  }

  async function loadTipos() {
    const response = await api.get("/tipos/listar")
    setTipos(response.data);
  }

  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [corSelecionada, setCorSelecionada] = useState("");

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  }

  const tamanhoRef = useRef(null)
  const codVendedorRef = useRef(null)
  const pinRef = useRef(null)

  async function handleSubmit(event) {
    event.preventDefault()

    if(!tipoSelecionado || (tipos[tipos.findIndex(tipo => tipo._id === tipoSelecionado)]?.possuiCores && !corSelecionada) || !tamanhoRef.current?.value || !codVendedorRef.current?.value || !pinRef.current?.value) return setErro("Preencha todos os campos");

    try {
      const response = await api.post("/pedacos/criar", {
        idTipo: tipoSelecionado,
        tamanho: tamanhoRef.current?.value,
        idCor: corSelecionada,
        codVendedor: codVendedorRef.current?.value,
        pin: pinRef.current?.value
      })
      
      setErro(false);
      setPedacos(todosPedacos => [...todosPedacos, response.data.result])
    } catch (err) {
      setErro(err.response?.data?.erro || "Ocorreu um erro. Tente novamente mais tarde")
    }

  }

  return (
    <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white text-center">Novo pedaço</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Tipo:</label>
          <select
            className="w-full mb-5 p-2 rounded bg-white"
            value={tipoSelecionado}
            onChange={handleChange(setTipoSelecionado)}
          >
            <option value="" disabled>Selecione o tipo...</option>
            {tipos.map((tipo) => (
              <option key={tipo._id} value={tipo._id}>{tipo.nome}</option>
            ))}
          </select>
          {tipos[tipos.findIndex(tipo => tipo._id === tipoSelecionado)]?.possuiCores && (
            <>
          <label className="font-medium text-white">Cor:</label>
          <select
                      className="w-full mb-5 p-2 rounded bg-white"
                      value={corSelecionada}
                      onChange={handleChange(setCorSelecionada)}
          >
            <option value="" disabled>Selecione a cor...</option>
            {cores.map((cor, index) => (
              <option key={index} value={index}>{cor}</option>
            ))}

          </select>
          </>
          )}
          <label className="font-medium text-white">Tamanho:</label>
          <input 
          type="number" 
          placeholder="Digite o tamanho em metros..."
          className="w-full mb-5 p-2 rounded bg-white"
          ref={tamanhoRef}
          />

          <hr className="border-white border-t mb-4"></hr>
          <span className="flex justify-between w-full gap-x-4">
          <section className="w-full">
              <label className="font-medium text-white">Código de vendedor:</label><br/>
              <input 
              type="number" 
              placeholder="Seu código..."
              className="w-full mb-5 p-2 rounded bg-white"
              ref={codVendedorRef}/>
            </section>
            <section className="w-full">
              <label className="font-medium text-white">Pin:</label><br/>
              <input 
              type="password" 
              placeholder="Seu pin..."
              className="w-full mb-5 p-2 rounded bg-white"
              ref={pinRef}/>
            </section>
          </span>

          <input type="submit" value="Adicionar"
          className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
        { erro && (
          <>
            <span className="text-center text-red-500 text-sm font-light mt-4">{erro}</span>
          </>
        )}
        </form>

        <section className="flex flex-col gap-4">

          {pedacos.map((pedaco) => (
            <CardPedaco 
            tipo={tipos[tipos.findIndex(tipo => tipo._id === pedaco.idTipo)]?.nome} 
            cor={tipos[tipos.findIndex(tipo => tipo._id === pedaco.idTipo)]?.possuiCores ? cores[pedaco.idCor] : "N/A"}
            pedaco={pedaco} />
          ))}

        </section>
      </main>
    </div>
  )
}