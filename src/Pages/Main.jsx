import React, { useEffect } from 'react'
import { MainBanner } from '../Components/MainBanner'
import { SectionCategories } from '../Components/SectionCategories';
import { DiscountCard } from '../Components/DiscountCard'
import { ModalWindow } from '../Components/SectionHeader/ModalWindow/ModalWindow';

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
            <ModalWindow />
        </div>
    );

}