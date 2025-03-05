import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { XMarkIcon } from "@heroicons/react/20/solid";

const OrderCard = (props) => {
    const context = useContext(ShoppingCartContext);

    // destructuramos las propiedades que vamos a recibir incluida el handleDelete
    const {id, title, imageUrl, price, handleDelete} = props;

    // variable para ver si debemos o no renderizar el icono de borrar
    let renderXmarkIcon = null;
    
    if(handleDelete) {
        renderXmarkIcon = (
            <XMarkIcon
                className="h-6 w-6 text-black cursor-pointer"
                onClick={() => handleDelete(id)}
            />
        )
    }

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 mr-2">
                <figure className="w-20 h-20 flex-shrink-0">
                    <img className="w-full h-full rounded-lg object-cover" src={imageUrl} alt={title} />
                </figure>
                <p className="text-sm font-light">{title}</p>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-lg font-medium">$</p>
                <p className="text-lg font-medium">{price}</p>
                {
                    renderXmarkIcon
                }
            </div>
        </div>
    )
}

export default OrderCard;