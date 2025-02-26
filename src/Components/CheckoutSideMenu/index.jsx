import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from '@heroicons/react/20/solid'
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import "./styles.css";
import { totalPrice } from "../../utils";

const CheckoutSideMenu = () => {
  // usamos el contexto
  const context = useContext(ShoppingCartContext);

  // funcion para manejar el delete de un product en el carrito
  const handleDelete = (id) => {
    // identificamos los productos que deben seguir en el carrito
    let cartPorductsUpdate = context.cartProducts.filter((product) => {
        return product.id !== id
    })

    // actualizamos el carrito
    context.setCartProducts(cartPorductsUpdate);

    // actualizamos el contador
    context.setCount(context.count - 1);
  }
  
  // Función para formatear la fecha en formato DD-MM-AAAA
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Asegura que siempre tenga dos dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // funcion para manejar el checkout
  const handleCheckout = () => {

    let orderToAdd = {
      date: formatDate(new Date()),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }
    
    // actualizamos la orden y limpiamos el carrito
    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.setCount(0);
    // aqui lo limpiamos el valor que estaba en la busqueda
    context.setSearchByTitle(null);
  }


  return (
    <aside
      className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>My Order</h2>
        <div>
          <XMarkIcon
            className='h-6 w-6 text-black cursor-pointer'
            // al undir click cerramos el productDetail
            onClick={() => context.closeCheckoutSideMenu()}></XMarkIcon>
        </div>
      </div>
      <div className="px-6 overflow-y-scroll flex-1">
        {
          // renderizamos una OrderCard por cada producto en el carrito
          // y vamos a enviar esas propiedades a OrderCard
          context.cartProducts.map((product) => {
            return (
              <OrderCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.images[0]}
                price={product.price}
                handleDelete={handleDelete}
              />
            )
          })
        }
      </div>
      <div className='px-6'>
        <p className="flex justify-between items-center mt-6">
          <span className='font-medium text-xl'>Total</span>
          <span className='font-bold text-2xl'>
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        <Link to={'/my-orders/last'}> 
          <button
            className="w-full bg-black text-white py-4 mt-8 rounded-lg mb-6"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  )
}

export default CheckoutSideMenu;