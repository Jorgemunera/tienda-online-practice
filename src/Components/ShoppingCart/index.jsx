import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

const ShoppingCart = () => {
    // traemos el contexto
    const context = useContext(ShoppingCartContext)

    // creamos funcion para abrir el checkoutsidemenu y cerrar el productDetail
    const openCheckoutSideMenu = () => {
        context.openCheckoutSideMenu()
        context.closeProductDetail()
    }

    return (
        <div
            className="relative flex gap-0.5 items-center cursor-pointer"
            onClick={() => { openCheckoutSideMenu() }}
        >
            <ShoppingBagIcon className="w-6 h-6 fill-none stroke-black" />
            <div
                className="absolute bottom-3.5 left-3.5 flex justify-center items-center rounded-full bg-black w-4 h-4 text-xs text-white"
            >
                {context.cartProducts.length}
            </div>
        </div>
    )
}

export default ShoppingCart;