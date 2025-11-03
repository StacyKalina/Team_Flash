import React, { useEffect } from 'react'
import { MainBanner } from '../Components/MainBanner'
import { SectionCategories } from '../Components/SectionCategories';
import { DiscountCard } from '../Components/DiscountCard'
import SectionSales from '../Components/SectionSales';


export const Main = () => {

    useEffect(() => {
        fetch("http://localhost:3333/products/all")
            .then((res) => res.json())
            .then((products) => {
                console.log(products)
            })
    }, [])

    return (
        <div>
            <MainBanner />
            <div className="page__content">
                <SectionCategories />
                <DiscountCard />
                <SectionSales />
            </div>
        </div>
    );

}