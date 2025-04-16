import { useEffect, useState } from "react";
import { api } from '../services/api.js'
import { formatarData } from '../helpers/formatarData.js'

const CardEntrada = (prop) => {

    const [vendedor, setVendedor] = useState(null);
    const [entrada, setEntrada] = useState(null);
    const [dataEntrada, setDataEntrada] = useState(null);

    async function loadEntrada() {
        const response = await api.get("/entradas/pedaco/" + prop.idPedaco);
        setEntrada(response.data);

    }
    
    async function loadVendedor() {
        const response = await api.get("/vendedores/buscar/" + entrada.idVendedor)
        setVendedor(response.data);

    }

    useEffect(() => {
        loadEntrada();
    }, [])
    useEffect(() => {
        if (entrada && entrada.idVendedor) {
            loadVendedor();
            setDataEntrada(formatarData(entrada.dataEntrada))
        }
        
    }, [entrada])
    
    return (


        <article
            className="w-full bg-white rounded p-2 relative mb-4">

            <h1 className="text-2xl">Entrada:</h1>
            <p><span className="font-medium">Registrado por:</span> {vendedor?.nome}</p>
            <p><span className="font-medium">Data:</span> {dataEntrada}</p>

        </article>

    )
}

export default CardEntrada;