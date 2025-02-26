import { useContext } from "react";
import { XMarkIcon } from '@heroicons/react/20/solid'
import { ShoppingCartContext } from "../../Context";
import "./styles.css";

const ProductDetail = () => {
  // usamos el contexto
  const context = useContext(ShoppingCartContext);
  let { images, title, price, description } = context.infoProductToShow;

  // inicializamos las variables en caso de que no existan para que no se rompa la aplicacion
  images = images || [];
  title = title || '';
  price = price || '';
  description = description || '';

  return (
    <aside
      className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>Detail</h2>
        <div>
          <XMarkIcon
            className='h-6 w-6 text-black cursor-pointer'
            // al undir click cerramos el productDetail
            onClick={() => context.closeProductDetail()}></XMarkIcon>
        </div>
      </div>
      <figure className='px-6'>
        <img
          className='w-full h-full rounded-lg'
          src={images[0]}
          alt={title} />
      </figure>
      <p className='flex flex-col p-6'>
        <span className='font-medium text-2xl mb-2'>${price}</span>
        <span className='font-medium text-md'>${title}</span>
        <span className='font-light text-sm'>${description}</span>
      </p>
    </aside>
  )
}

export default ProductDetail;