import { Link, Navigate, NavLink } from "react-router-dom";
import LayoutTemp from '../../Components/LayoutTemp/index.jsx';

import { useContext, useRef, useState } from "react";
import { ShoppingCartContext } from "../../Context";

function SignIn() {
    const context = useContext(ShoppingCartContext);

    // creamos estado local
    const [view, setView] = useState("user-info")
    console.log("view", view)

    // usamos el hook de useRef
    const form = useRef(null);

    // Account
    const account = localStorage.getItem("account");
    const parsedAccount = JSON.parse(account);
    console.log("parsedAccount", parsedAccount)

    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
    console.log("hasUserAnAccount", hasUserAnAccount)

    // creamos funcion para atrapar el signIn
    const handleSignIn = () => {
        const stringifiedSignOut = JSON.stringify(false);
        localStorage.setItem("sign-out", stringifiedSignOut)
        context.setSignOut(false);

        // redirect
        return <Navigate replace to={"/"} />
    }


    // Creamos la funcion pra createAnAccount
    const createAnAccount = () => {
        const formData = new FormData(form.current);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        }
        console.log("data del form: ", data)

        // paso la data al account del localStorage y del estado
        let stringifiedData = JSON.stringify(data)
        localStorage.setItem("account", stringifiedData)
        context.setAccount(data);

        // sign in
        handleSignIn()
    }

    // funcion para renderizar login
    const renderLogin = () => {
        return (
            <div className='flex flex-col w-80'>
                <p>
                    <span className='font-light text-sm'>Email: </span>
                    <span>{parsedAccount?.email}</span>
                </p>
                <p>
                    <span className='font-light text-sm'>Password: </span>
                    <span>{parsedAccount?.password}</span>
                </p>
                <NavLink
                    to="/">
                    <button
                        className='bg-black disabled:bg-black/40 text-white  w-full rounded-lg py-3 mt-4 mb-2'
                        onClick={() => handleSignIn()}
                        disabled={!hasUserAnAccount}>
                        Log in
                    </button>
                </NavLink>
                <div className='text-center'>
                    <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot my password</a>
                </div>
                <button
                    className='border border-black disabled:text-black/40 disabled:border-black/40
              rounded-lg mt-6 py-3'
                    onClick={() => setView("create-user-info")}
                    disabled={hasUserAnAccount}>
                    Sign up
                </button>
            </div>
        )
    }

    // funcion para renderizar create user info
    const renderCreateUserInfo = () => {
        return (
            <form ref={form} className='flex flex-col gap-4 w-80'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name" className='font-light text-sm'>Your name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={parsedAccount?.name}
                        placeholder="Peter"
                        className='rounded-lg border border-black placeholder:font-light
                  placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-light text-sm'>Your email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        defaultValue={parsedAccount?.email}
                        placeholder="hi@helloworld.com"
                        className='rounded-lg border border-black
                  placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='font-light text-sm'>Your password:</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        defaultValue={parsedAccount?.password}
                        placeholder="******"
                        className='rounded-lg border border-black
                  placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    />
                </div>
                <Link to="/">
                    <button
                        className='bg-black text-white w-full rounded-lg py-3'
                        onClick={() => createAnAccount()}>
                        Create
                    </button>
                </Link>
            </form>
        )
    }

    const renderView = () => view === "create-user-info" ? renderCreateUserInfo() : renderLogin();

    return (
        <LayoutTemp>
            <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome</h1>
            {renderView()}
        </LayoutTemp>
    )
}

export default SignIn