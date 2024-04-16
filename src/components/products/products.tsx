'use client'
import React, {useEffect, useState} from 'react';
import ProductsItem from "@/components/products/productsItem/productsItem";
import {Products} from "@/interface/interface";

const Products = () => {
    const [products, setProducts] = useState<Products[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [amount, setAmount] = useState<number>(18);
    const [page, setPage] = useState<number>(1);
    const observerRef = React.useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`http://o-complex.com:1337/products?page=${page}&page_size=${amount}`);
            const data = await res.json();
            setProducts([...products, ...data.products]);
            setPage(page + 1);
            setTotalPages(Math.ceil(data.total / amount));
            console.log(totalPages, page)
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    };

    let callback = (entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting && page <= totalPages) {
                fetchData()
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options)
        if (observerRef.current) observer.observe(observerRef.current);
        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        }
    }, [observerRef, options])

    return (
        <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {products.map((product) => (
                    <ProductsItem key={product.id} product={product}/>
                ))}
            </div>
            {isLoading ?
                <div className="my-2">Идет загрузка товаров...</div> :
                false
            }
            <div className="h-14" ref={observerRef}></div>
        </div>
    );
};

export default Products;