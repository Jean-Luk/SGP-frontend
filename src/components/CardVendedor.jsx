const CardVendedor = (prop) => {
    return (
        <article
            className="w-full bg-white rounded p-2 relative hover:scale-102 duration-200">

            <h1 className="text-2xl">{prop.vendedor?.nome}</h1>
            <p><span className="font-medium">Código:</span> {prop.vendedor?.codVendedor}</p>
            <p><span className="font-medium">Total de retiradas:</span> {prop.vendedor?.totalRetiradas}</p>
            <p><span className="font-medium">Total de adições:</span> {prop.vendedor?.totalAdicoes}</p>

        </article>

    )
}

export default CardVendedor;