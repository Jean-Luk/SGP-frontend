import { api } from '../services/api.js'
import { useEffect, useState, useRef } from "react";
import CardTipo from "../components/CardTipo.jsx";

export default function App () {

  const [tipos, setTipos] = useState([]);
  const [erro, setErro] = useState([]);

  useEffect(() => {
    loadTipos();
  }, [])


  async function loadTipos() {
    const response = await api.get("/tipos/listar")
    setTipos(response.data);
  }

  const nomeRef = useRef(null)

  const [possuiCoresSelecionado, setPossuiCoresSelecionado] = useState("false");

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  }


  async function handleSubmit(event) {
    event.preventDefault()

    if(!nomeRef.current?.value) return setErro("Preencha todos os campos");

    try {
      const response = await api.post("/tipos/criar", {
        nome: nomeRef.current?.value,
        possuiCores: possuiCoresSelecionado,
      })
      
      setErro(false);
      setTipos(todosTipos => [...todosTipos, response.data])
    } catch (err) {
      setErro(err.response?.data?.erro || "Ocorreu um erro. Tente novamente mais tarde")
    }

  }

  return (
    <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white text-center">Novo tipo</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome do tipo:</label>
              <input 
              type="text" 
              placeholder="Digite o nome do novo tipo de cabo..."
              className="w-full mb-5 p-2 rounded bg-white"
              ref={nomeRef}/>

          <label className="font-medium text-white">Possui cores:</label>
          <select
                      className="w-full mb-5 p-2 rounded bg-white"
                      value={possuiCoresSelecionado}
                      onChange={handleChange(setPossuiCoresSelecionado)}
          >
            <option value="false">Não possui</option>
            <option value="true">Possui</option>

          </select>

          <input type="submit" value="Criar"
          className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
        { erro && (
          <>
            <span className="text-center text-red-500 text-sm font-light mt-4">{erro}</span>
          </>
        )}
        </form>

        <section className="flex flex-col gap-4">

          {tipos.map((tipo) => (
            <CardTipo 
            key={tipo._id}
            tipo={tipo} />
          ))}

        </section>
      </main>
    </div>
  )
}