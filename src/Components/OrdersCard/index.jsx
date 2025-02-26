import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid";

const OrdersCard = (props) => {
    const context = useContext(ShoppingCartContext);

    // destructuramos las propiedades que vamos a recibir de la orden
    let {date, totalProducts, totalPrice} = props;

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex justify-between items-center border border-black w-60 p-4 rounded-lg">
                <div>
                    <p className="flex flex-col">
                        <span className="font-medium">Fecha: {date}</span>
                        <span className="font-medium">{totalProducts} Productos</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-bold text-2xl">$ {totalPrice}</span>
                    </p>
                </div>
            </div>
            <div className="">
                <ChevronRightIcon className="h-6 w-6 text-black "/>
            </div>
        </div>
    )
}

export default OrdersCard;