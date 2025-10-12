import React from "react";
import { ProductCard } from "../Components/ProductCard";
import styles from "./Catalog.module.css";

import secateursImg from "../Images/cards/Secateurs.png";
import collectionBerriesImg from "../Images/cards/Collection for berries (plastic).png";
import glovesBlackImg from "../Images/cards/Gloves (black).png";
import sickleHacksawImg from "../Images/cards/Sickle-shaped hacksaw.png";
import bayonetShovelImg from "../Images/cards/Bayonet shovel.png";
import gardenPitchforkImg from "../Images/cards/Garden pitchfork.png";
import barbellImg from "../Images/cards/Barbell.png";
import souvenirThermometerImg from "../Images/cards/Souvenir thermometer.png";

const PRODUCTS = [
    {
        id: 1,
        title: "Secateurs",
        price: 199,
        oldPrice: 240,
        discount: 17,
        imageSrc: secateursImg,
    },
    {
        id: 2,
        title: "Collection for berries",
        price: 26,
        oldPrice: 35,
        discount: 26,
        imageSrc: collectionBerriesImg,
    },
    {
        id: 3,
        title: "Gloves (black)",
        price: 9,
        oldPrice: 14,
        discount: 36,
        imageSrc: glovesBlackImg,
    },
    {
        id: 4,
        title: "Sickle-shaped hacksaw",
        price: 155,
        imageSrc: sickleHacksawImg,
    },
    {
        id: 5,
        title: "Bayonet shovel",
        price: 180,
        imageSrc: bayonetShovelImg,
    },
    {
        id: 6,
        title: "Garden pitchfork",
        price: 179,
        imageSrc: gardenPitchforkImg,
    },
    {
        id: 7,
        title: "Barbell",
        price: 12,
        imageSrc: barbellImg,
    },
    {
        id: 8,
        title: "Souvenir thermometer",
        price: 98,
        oldPrice: 120,
        discount: 18,
        imageSrc: souvenirThermometerImg,
    },
];

export const Catalog = () => {
    return (
        <section className={styles.wrapper}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>Tools and equipment</h1>
            </header>

            <div className={styles.cardsGrid}>
                {PRODUCTS.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    );
};
