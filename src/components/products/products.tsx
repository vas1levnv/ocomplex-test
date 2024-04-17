'use client'
import React, {useEffect, useState} from 'react';
import ProductsItem from "@/components/products/productsItem/productsItem";
import {ProductsInterface} from "@/interface/interface";
import ProductsService from "@/components/API/ProductsReviews";
import useFetchData from "@/hooks/useFetchData";

const Products = () => {
    const [products, setProducts] = useState<ProductsInterface[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [amount, setAmount] = useState<number>(18);
    const [page, setPage] = useState<number>(1);
    const observerRef = React.useRef<HTMLDivElement>(null);
    const [isLoading, error, fetchProducts] = useFetchData(async () => {
        const data = await ProductsService.fetchProductsList(page, amount);
        setProducts([...products, ...data.products]);
        setPage(page + 1);
        setTotalPages(Math.ceil(data.total / amount));
    });

    useEffect(() => {
        fetchProducts();
    }, []);


    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    };

    let callback = (entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting && page <= totalPages && !error) {
                fetchProducts();
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
        <div className="mt-24 max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {products.map((product) => (
                    <ProductsItem key={product.id} product={product}/>
                ))}
            </div>
            {isLoading && <div className="my-2">Идет загрузка товаров...</div>}
            {error && <div>Ошибка {error.message}</div>}
            <div className="h-14" ref={observerRef}></div>
        </div>
    );
};

export default Products;