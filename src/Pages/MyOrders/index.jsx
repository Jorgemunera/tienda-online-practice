import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import LayoutTemp from '../../Components/LayoutTemp/index.jsx';

import OrdersCard from "../../Components/OrdersCard";
import { Link } from "react-router-dom";

function MyOrders() {
    //traemos el contexto global
    const context = useContext(ShoppingCartContext);

    return (
        <LayoutTemp>
            <div className="flex relative w-80 items-center justify-center mb-4">
                <h1 className='font-medium text-xl'>My Orders</h1>
            </div>
            {
                context.order.map((order, index) => {
                    return (
                        <Link key={index} to={`/my-orders/${index}`}>
                            <OrdersCard
                                key={order.id}
                                date={order.date}
                                totalProducts={order.totalProducts}
                                totalPrice={order.totalPrice}
                            />
                        </Link>
                    )
                })
            }
        </LayoutTemp>
    )
}

export default MyOrders