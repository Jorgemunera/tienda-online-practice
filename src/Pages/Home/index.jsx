import { useContext } from "react";
import Layout from '../../Components/Layout.jsx';

import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {
    // usamos el contexto
    const context = useContext(ShoppingCartContext);

    // nuestro renderizado va a depender si ya existe una busqueda o no hemos escrito nada en el buscador para que filtre
    const renderView = () => {
        if (context.filteredItems?.length > 0) {
            return (
              context.filteredItems?.map(item => (
                <Card key={item.id} data={item} />
              ))
            )
          } else {
            return (
              <div>We don't have anything </div>
            )
          }
    }

    return (
        <Layout>
            <div className='flex items-center justify-center relative w-80 mb-4'>
                <h1 className='font-medium text-xl'>Exclusive Products</h1>
            </div>
            <input 
                type="text" 
                placeholder="Search a product" 
                className="rounded-lg border-black w-80 p-4 mb-6 focus:outline-none" 
                onChange={(event) => context.setSearchByTitle(event.target.value)}
            />
            <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
                {
                    renderView()
                }
            </div>
            <ProductDetail/>
        </Layout>
    )
}

export default Home