import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";

// traemos nuestro contexto global
import { ShoppingCartContext } from "../../Context";

const Navbar = () => {
    // usamos el useContest
    const context = useContext(ShoppingCartContext);
    const activeStyle = "underline underline-offset-4";

    // Sign Out
    const signOut = localStorage.getItem("sign-out")
    console.log("Navbar.signOut", signOut)
    
    // const parsedSignOut = JSON.stringify(signOut)
    // console.log("Navbar.parsedSignOut", parsedSignOut)
    const isUserSignOut = context.signOut 

    // creamos la funcion para detectar el signOut
    const handleSignOut = () => {
        //stringifiamos el vamos de signout
        const stingifiedSignOut = JSON.stringify(true)
        localStorage.setItem("sign-out", stingifiedSignOut)
        context.setSignOut(true)
    }


    // creamos una funcion renderView para renderizar dependiendo de
    const renderView = () => {
        if (isUserSignOut) {
            console.log("isUserSignOut 1", isUserSignOut)
            return (
                <li>
                    <NavLink
                        to="/sign-in"
                        className={({ isActive }) => isActive ? activeStyle : undefined}
                        onClick={() => handleSignOut()}
                        >
                        Sign out
                    </NavLink>
                </li>
            )
        } else {
            return (
                <>
                {console.log("isUserSignOut 2", isUserSignOut)}
                    <li className='text-black/60'>
                        jorge@mail.com
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
        }
    }

    return (
        <nav className="bg-white flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
            <ul className="flex items-center gap-3">
                <li className="font-bold text-lg">
                    <NavLink
                        to='/'
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
            </ul>
        </nav>
    )
}

export default Navbar;