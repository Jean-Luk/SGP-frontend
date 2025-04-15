const CardTipo = (prop) => {
    return (
        <article
            className="w-full bg-white rounded p-2 relative hover:scale-102 duration-200">

            <h1 className="text-2xl">{prop.tipo.nome}</h1>
            <p><span className="font-medium">Possui cores:</span> {prop.tipo?.possuiCores ? '✅ Sim' : '❌ Não'}</p>
            <p><span className="font-medium">Status:</span> {prop.tipo?.status}</p>

        </article>

    )
}

export default CardTipo;