import { Menu } from "../Components/Menu"
import { Outlet } from "react-router-dom"
import { Footer } from "../Components/Footer"
import { AutoBreadcrumbs } from "../Components/Breadcrumbs"



export const Template = () => {
    return (
        <div className="page">
            <Menu />

                <AutoBreadcrumbs />
                <Outlet />

            <Footer />
        </div>
    )
}
