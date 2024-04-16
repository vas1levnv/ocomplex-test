'use client'
import React, {useEffect, useState} from 'react';
import ProductsItem from "@/components/products/productsItem/productsItem";
import {Products} from "@/interface/interface";

const Products = () => {
    const [products, setProducts] = useState<Products[]>([]);

    const fetchData = async () => {
        try {
            const res = await fetch('http://o-complex.com:1337/products?page=1&page_size=20');
            const data = await res.json();
            setProducts(data.products);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {products.map((product) => (
                    <ProductsItem key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
};

export default Products;