import { createContext, useEffect, useState } from "react";

export const ShoppingCartContext = createContext();

// vamos a inicializar esto en el context
export const initializeLocalStorage = () => {
    // tomamos las variables del localStorage
    const accountInLocalStorage = localStorage.getItem("account");
    const signOutInLocalStorage = localStorage.getItem("sign-out");

    let parsedAccount;
    let parsedSignOut;

    // si no hay nada en el localStorage para account
    if(!accountInLocalStorage){
        localStorage.setItem("account", JSON.stringify({}))
        parsedAccount = {}
        console.log("parsedAccount", parsedAccount)
    } else {
        // en caso contrario
        parsedAccount = JSON.stringify(accountInLocalStorage)
        console.log("parsedAccount", parsedAccount)
    }
    
    // si no hay nada en localStorage para sing-out
    if(!signOutInLocalStorage){
        localStorage.setItem("sign-out", JSON.stringify(false))
        parsedSignOut = false
        console.log("parsedSignOut", parsedSignOut)
    } else {
        // en caso contrario
        parsedSignOut = JSON.stringify(signOutInLocalStorage)
        console.log("parsedSignOut", parsedSignOut)
    }
}

initializeLocalStorage()

export const ShoppingCartProvider = ({children}) => {
    // My account
    const [account, setAccount] = useState({})
    
    
    // Sign Out
    const [signOut, setSignOut] = useState(false)
    console.log("signOut", signOut)

    // contador del carrito
    const [count, setCount] = useState(0);

    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);
    

    // CheckoutSideMenu - show or hide
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);


    // ProductDetail - show productDetail
    const [infoProductToShow, setInfoProductToShow] = useState({});


    // CartProducts - add products to cart
    const [cartProducts, setCartProducts] = useState([]); 


    // CartProducts - Order
    const [order, setOrder] = useState([]); 


    // Get Products
    const [items, setItems] = useState(null);


    // Get filteredItems
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
        if(searchType === 'BY_TITLE'){
            return filteredItemsByTitle(items, searchByTitle)
        }

        if(searchType === 'BY_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory)
        }

        if(searchType === 'BY_TITLE_AND_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory).filter((item) => item.title.toLowerCase().includes(searchByTitle).toLowerCase())
        }

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
        <ShoppingCartContext.Provider value= {{
            count,
            setCount,
            isProductDetailOpen,
            openProductDetail,
            closeProductDetail,
            infoProductToShow,
            setInfoProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            searchByCategory,
            setSearchByCategory,
            // pasamos la informacion del signout y account
            signOut,
            setSignOut,
            account,
            setAccount
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

