import React from 'react'
import { MainBanner } from '../Components/MainBanner'
import { DiscountCard } from '../Components/DiscountCard'

import { Categories } from '../Components/Categories';
export const Main = () => {
        return (
                <div>
                        <MainBanner />
                        <DiscountCard />
                        <Categories />
                </div>
        );
}