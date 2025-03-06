// traemos el contexto de react
import { useContext } from 'react';

import { PlusIcon, CheckIcon } from '@heroicons/react/20/solid';

// traemos el contexto global}
import { ShoppingCartContext } from '../../Context';

const Card = (data) => {
    // usarmos el contexto
    const context = useContext(ShoppingCartContext);

    // creamos una funcion para la informacion del producto
    const showProduct = (infoProduct) => {
        context.openProductDetail();
        // pasamos la informacion del producto
        context.setInfoProductToShow(infoProduct);
    }

    // agregar productos al carrito
    const addProductToCart = (event, productData) => {
        event.stopPropagation();
        context.setCount(context.count + 1);
        context.setCartProducts([...context.cartProducts, productData]);
        context.closeProductDetail();
        context.openCheckoutSideMenu();
    }

    const renderIcon = (id) => {
        // verificamos si el producto ya esta en el carrito
        const isInCart = context.cartProducts.filter((product) => {
            return product.id === id;
        }).length > 0;

        // si esta en el carrito mostramos un check, si no mostramos un plus con sus estilos determinados
        if (isInCart) {
            return (
                <div
                    className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'
                >
                    <CheckIcon
                        className='size-6 text-white'
                    />
                </div>
            )
        } else {
            return (
                <div
                    className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
                    // evento de undir click para aumentar el contador
                    onClick={(event) => addProductToCart(event, data.data)}
                >
                    <PlusIcon
                        className='size-6 text-black-500'
                    />
                </div>
            ) 
        }
    }

    return (
        <div
            className='bg-white cursor-pointer w-56 h-60 rounded-lg'
            // cuando undamos click en la card vamos a abrir el productDetail y pasamos la informacion del producto
            onClick={() => showProduct(data.data)}
        >
            <figure className='relative mb-2 w-full h-4/5'>
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.data.category.name}</span>
                <img className='w-full h-full object-cover rounded-lg' src={data.data.images[0]} alt={data.data.title} />
                {renderIcon(data.data.id)}
            </figure>
            <p className='flex justify-between items-center'>
                <span className='text-sm font-light'>{data.data.title}</span>
                <span className='text-lg font-medium'>${data.data.price}</span>
            </p>
        </div>
    )
}

export default Card;