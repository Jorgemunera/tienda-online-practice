import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import Layout from '../../Components/Layout.jsx';

import OrderCard from "../../Components/OrderCard";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

function MyOrder() {
    // traemos el contexto global
    const context = useContext(ShoppingCartContext);
    const currentPath = window.location.pathname;
    let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    if (index === 'last') {
        index = context.order?.length - 1;
    }

    return (
        // tomamos el componente de ordercard que ya tebiamos

        <Layout>
            <div className="flex relative w-80 mb-4 items-center justify-center">
                <Link to='/my-orders' className="absolute left-0">
                    <ChevronLeftIcon
                        className="h-6 w-6 text-black cursor-pointer"
                    />
                </Link>
                <h1 className='font-medium text-xl'>My Orders</h1>
            </div>
            <div className="flex flex-col w-80">
                {
                    // renderizamos una OrderCard por cada producto en la orden
                    // vamos a coger la ultima orden por eso vamos a usar slice -1
                    context.order?.[index]?.products.map((product) => {
                        return (
                            <OrderCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                imageUrl={product.images[0]}
                                price={product.price}
                            />
                        )
                    })
                }
            </div>
        </Layout>
    )
}

export default MyOrder