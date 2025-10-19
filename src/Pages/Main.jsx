import React from 'react'
import { MainBanner } from '../Components/MainBanner'
import { DiscountCard } from '../Components/DiscountCard'

import { Categories } from '../Components/Categories';
import { NotFound } from './NotFound';
export const Main = () => {
        return (
                <div>
                        <MainBanner />
                        <DiscountCard />
                        <Categories />
                        <NotFound />
                </div>
        );
}