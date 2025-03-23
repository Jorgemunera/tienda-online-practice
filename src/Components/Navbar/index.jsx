import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";

// traemos nuestro contexto global
import { ShoppingCartContext } from "../../Context";
import ShoppingCart from "../ShoppingCart";

const Navbar = () => {
    // usamos el useContest
    const context = useContext(ShoppingCartContext);
    const activeStyle = "underline underline-offset-4";

    // Sign Out
    const signOut = localStorage.getItem("sign-out")
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut


    // Account
    const account = localStorage.getItem("account")
    const parsedAccount = JSON.parse(account)

    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
    console.log("hasUserAnAccount.navbar", hasUserAnAccount)


    // creamos la funcion para detectar el signOut
    const handleSignOut = () => {
        //stringifiamos el vamos de signout
        const stingifiedSignOut = JSON.stringify(true)
        localStorage.setItem("sign-out", stingifiedSignOut)
        context.setSignOut(true)
    }


    // creamos una funcion renderView para renderizar dependiendo de
    const renderView = () => {
        if (hasUserAnAccount && !isUserSignOut) {
            return (
                <>
                    <li className='text-black/60'>
                        {parsedAccount?.email}
                    </li>
                    <li>
                        <NavLink
                            to='/my-orders'
                            className={({ isActive }) => isActive ? activeStyle : undefined}>
                            My Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/my-account'
                            className={({ isActive }) => isActive ? activeStyle : undefined}>
                            My Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/sign-in'
                            className={({ isActive }) => isActive ? activeStyle : undefined}
                            onClick={() => handleSignOut()}>
                            Sign out
                        </NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <li>
                    <NavLink
                        to="/sign-in"
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        onClick={() => handleSignOut()}>
                        Sign in
                    </NavLink>
                </li>
            )
        }
    }

    return (
        <nav className="bg-white flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
            <ul className="flex items-center gap-3">
                <li className="font-bold text-lg">
                    <NavLink
                        to={`${isUserSignOut ? '/sign-in' : '/'}`}
                    >
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/clothes'
                        onClick={() => context.setSearchByCategory("clothes")}
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/electronics'
                        onClick={() => context.setSearchByCategory("electronic")}
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/furnitures'
                        onClick={() => context.setSearchByCategory("furnitures")}
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/toys'
                        onClick={() => context.setSearchByCategory("toys")}
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        Toys
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/others'
                        onClick={() => context.setSearchByCategory("other")}
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        Others
                    </NavLink>
                </li>
            </ul>
            <ul className="flex items-center gap-3">
                {renderView()}
                <li className='flex items-center'>
                    <ShoppingCart/>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;