import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaArrowUpRightFromSquare } from "react-icons/fa6";

const CardPedaco = (prop) => {
    return (
        <article
            className="w-full bg-white rounded p-2 relative hover:scale-102 duration-200">

            <h1 className="text-2xl">{prop.tipo}</h1>
            <p><span className="font-medium">Tamanho:</span> {prop.pedaco?.tamanho} metros</p>
            <p><span className="font-medium">Cor:</span> {prop.cor}</p>
            <p><span className="font-medium">Status:</span> {prop.pedaco?.status}</p>

            <Link to={"/visualizarPedaco/" + prop.pedaco?._id}>
                <button
                    className='bg-gray-300 w-7 h-7 flex items-center justify-center rounded-lg absolute bottom-2 right-10 cursor-pointer'
                >
                    <FaMagnifyingGlass size={18} color='#FFF' />
                </button>
            </Link>

            {prop.pedaco?.status === "retirado" ? (
                    <button
                        className='bg-gray-400 w-7 h-7 flex items-center justify-center rounded-lg absolute bottom-2 right-2'
                    >
                        <FaArrowUpRightFromSquare size={18} color='#FFF' />
                    </button>
            ) : (
                <Link to={"/retirarPedaco/" + prop.pedaco?._id}>
                    <button
                        className='bg-green-500 w-7 h-7 flex items-center justify-center rounded-lg absolute bottom-2 right-2 cursor-pointer'
                    >
                        <FaArrowUpRightFromSquare size={18} color='#FFF' />
                    </button>
                </Link>

            )}
        </article>

    )
}

export default CardPedaco;