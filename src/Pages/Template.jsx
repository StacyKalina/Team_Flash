import {Outlet} from "react-router-dom";
import {Menu} from "../Components/Menu";
import {Footer} from "./Footer";

export const Template = () =>{
    return (
        <>
        <Menu/>
        <Outlet/>
        <Footer/>
        </>
    );
}