import React, { useEffect } from 'react'

import { MainHomePage } from './HomrComponent/MainHomePage'

import FeatureProductGrid from './FeatureProductGrid'
import { ProductGrid } from '../user/ProductGrid'
import TestimonialSection from './TestimonialSection'
import { CartProvider } from '../context/CartContext'



export default function Home() {
    useEffect(() => {
        document.title = 'SnapDeal-Home'
    })


    return (
        <div className=' bg-gray-100'>
            <MainHomePage />
            <FeatureProductGrid />
            <CartProvider>
                <ProductGrid />
            </CartProvider>
            <TestimonialSection />
        </div>
    )
}
