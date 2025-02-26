import { createContext, useEffect, useState } from "react";

// creamos nuestro contexto
export const ShoppingCartContext = createContext();

// necesitamos crear un provider
export const ShoppingCartProvider = ({children}) => {
    // ProductDetail - increment quantity
    const [count, setCount] = useState(0);

    // ProductDetail - show or hide
    // creamos un estado para saber si productDetail esta abierto o cerrado
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    
    // creamos 2 funciones, una para abrir y otra para cerrar el productDetail
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);
    

    // CheckoutSideMenu - show or hide
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);


    // ProductDetail - show productDetail
    const [infoProductToShow, setInfoProductToShow] = useState({});


    // CartProducts - add products to cart
    // creamos el estado para almacenar la informacion de una orden especifica
    const [cartProducts, setCartProducts] = useState([]); 


    // CartProducts - Order
    const [order, setOrder] = useState([]); 


    // Get Products
    const [items, setItems] = useState(null);


    // Get filteredItems
    // este estado va a coresponder a los items que sean filtreados dependiendo de lo que escribamos en el input
    const [filteredItems, setFilteredItems] = useState(null);


    // Get Products by title
    const [searchByTitle, setSearchByTitle] = useState(null);


    // Get Products by Category
    const [searchByCategory, setSearchByCategory] = useState(null);

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => response.json())
            .then(data => setItems(data))
    }, []);


    // funcion para filtrar items por titulo
    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter((item) => item.title.toLowerCase().includes(searchByTitle.toLowerCase())) 
    }

    // funcion para filtrar items por categoria
    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter((item) => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())) 
    }

    // creamos otra funcion para filtrar dependiendo de de si es title o category
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        // si filtran solo por titulo
        if(searchType === 'BY_TITLE'){
            return filteredItemsByTitle(items, searchByTitle)
        }

        // si filtran solo pr categoria
        if(searchType === 'BY_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory)
        }

        // si filtran por titulo y categoria
        if(searchType === 'BY_TITLE_AND_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory).filter((item) => item.title.toLowerCase().includes(searchByTitle).toLowerCase())
        }

        // si no filtran por ninguno
        if(!searchType){
            return items;
        }
    }

    // ahora ya enemos nuestros items filtrados, pero ahora hay que guardarlos en nuestro estado tambien.
    // para eso vamos a usar el useEfect
    useEffect(() => {
        // podemos utilizar la funcion generica de filtrado
        // si han filtrado por titulo solamente
        if(searchByTitle && !searchByCategory) setFilteredItems(filterBy("BY_TITLE", items, searchByTitle, searchByCategory))
        // si han filtrado por categoria solamente
        if(searchByCategory && !searchByTitle) setFilteredItems(filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory))
        // si no han filtrado por nada
        if(!searchByCategory && !searchByTitle) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
        // si filtran tanto por titulo como categoria
        if(searchByCategory && searchByTitle) setFilteredItems(filterBy("BY_TITLE_AND_CATEGORY", items, searchByTitle, searchByCategory))
    }, [items, searchByTitle, searchByCategory]);

    return (
        // y va a funcionar como un wraper para todos los componentes que esten dentro de el, para proveer esa fuente de verdad a todos
        <ShoppingCartContext.Provider value= {{
            count,
            setCount,
            // pasamos el estado y las funciones al provider para poder usarlos globalmente
            isProductDetailOpen,
            openProductDetail,
            closeProductDetail,
            // pasamos la inforrmacion del producto
            infoProductToShow,
            setInfoProductToShow,
            // pasamos la informacion del carrito
            cartProducts,
            setCartProducts,
            // pasamos la informacion del checkoutSideMenu
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            // pasamos la informacion de la orden
            order,
            setOrder,
            // Pasamos la informacion de los productos que vienen de la API
            items,
            setItems,
            // Pasamos la informacion del searchByTitle
            searchByTitle,
            setSearchByTitle,
            // Pasamos la informacion de los items filtrados
            filteredItems,
            setFilteredItems,
            // pasamos la info de searchByCategory
            searchByCategory,
            setSearchByCategory
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}