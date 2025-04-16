import { api } from '../services/api.js'
import { useEffect, useState, useRef } from "react";
import CardVendedor from "../components/CardVendedor.jsx";

export default function App() {

  const [vendedores, setVendedores] = useState([]);
  const [erro, setErro] = useState([]);

  useEffect(() => {
    loadVendedores();
  }, [])


  async function loadVendedores() {
    const response = await api.get("/vendedores/listar")
    setVendedores(response.data);
  }

  const nomeRef = useRef(null)
  const codRef = useRef(null)
  const pinRef = useRef(null)

  async function handleSubmit(event) {
    event.preventDefault()

    if (!nomeRef.current?.value || !codRef.current?.value || !pinRef.current?.value) return setErro("Preencha todos os campos");

    try {
      const response = await api.post("/vendedores/criar", {
        nome: nomeRef.current?.value,
        pin: pinRef.current?.value,
        codVendedor: codRef.current?.value,
      })

      setErro(false);
      setVendedores(todosVendedores => [...todosVendedores, response.data])
    } catch (err) {
      setErro(err.response?.data?.erro || "Ocorreu um erro. Tente novamente mais tarde")
    }

  }

  return (
    <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white text-center">Novo vendedor</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome do vendedor:</label>
          <input
            type="text"
            placeholder="Digite o nome do vendedor..."
            className="w-full mb-5 p-2 rounded bg-white"
            ref={nomeRef} />

          <label className="font-medium text-white">Código do vendedor:</label>
          <input
            type="text"
            placeholder="Digite o código do vendedor..."
            className="w-full mb-5 p-2 rounded bg-white"
            ref={codRef} />
          <label className="font-medium text-white">PIN:</label>
          <input
            type="password"
            placeholder="Crie um PIN..."
            className="w-full mb-5 p-2 rounded bg-white"
            ref={pinRef} />


          <input type="submit" value="Criar"
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
          {erro && (
            <>
              <span className="text-center text-red-500 text-sm font-light mt-4">{erro}</span>
            </>
          )}
        </form>

        <section className="flex flex-col gap-4">

          {vendedores.map((vendedor) => (
            <CardVendedor
              key={vendedor._id}
              vendedor={vendedor} />
          ))}

        </section>
      </main>
    </div>
  )
}