import { useEffect, useState } from "react";
import { api } from '../services/api.js'
import { formatarData } from '../helpers/formatarData.js'

const CardRetirada = (prop) => {

    const [vendedor, setVendedor] = useState(null);
    const [retirada, setRetirada] = useState(null);
    const [dataRetirada, setDataRetirada] = useState(null);

    async function loadEntrada() {
        const response = await api.get("/retiradas/pedaco/" + prop.idPedaco);
        setRetirada(response.data);

    }
    
    async function loadVendedor() {
        const response = await api.get("/vendedores/buscar/" + retirada.idVendedor)
        setVendedor(response.data);

    }

    useEffect(() => {
        loadEntrada();
    }, [])
    useEffect(() => {
        if (retirada && retirada.idVendedor) {
            loadVendedor();
            setDataRetirada(formatarData(retirada.dataRetirada))
        }
        
    }, [retirada])
    
    return (


        <article
            className="w-full bg-white rounded p-2 relative mb-4">

            <h1 className="text-2xl">Retirada:</h1>
            <p><span className="font-medium">Retirado por:</span> {vendedor?.nome}</p>
            <p><span className="font-medium">Data:</span> {dataRetirada}</p>

        </article>

    )
}

export default CardRetirada;