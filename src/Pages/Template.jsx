import { Menu } from "../Components/Menu"
import { Outlet } from "react-router-dom"
import { Footer } from "../Components/Footer"



export const Template = () => {
    return (
        <>
        <Menu/>
        <Outlet/>
        <Footer/>
        </>
    )
}