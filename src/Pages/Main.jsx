import React, { useEffect } from 'react'
import { MainBanner } from '../Components/MainBanner'
import { SectionCategories } from '../Components/SectionCategories';
import { DiscountCard } from '../Components/DiscountCard'
import SectionSales from '../Components/SectionComponents';


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
            <DiscountCard/>
            <SectionCategories />
            <SectionSales />
        </div>
    );

}