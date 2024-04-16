import React, {useState} from 'react';
import {Products} from "@/interface/interface";

interface Props {
    product: Products;
}

const ProductsItem = (props: Props) => {

    const [itemCounter, setItemCounter] = useState(0);

    const buyItem = () => {
        setItemCounter(itemCounter + 1)
    }

    const decrementCounter = () => {
        setItemCounter(itemCounter - 1)
    }

    const incrementCounter = () => {
        setItemCounter(itemCounter + 1)
    }

    const changeCounter = (e: any) => {
        setItemCounter(+e.target.value)
    }

    return (
        <div className="flex flex-col justify-between bg-gray rounded-2xl p-2 text-black">
            <img className="rounded-2xl h-96 object-cover"
                 src={props.product.image_url}
                 alt={props.product.title}/>
            <div className="text-center text-3xl overflow-hidden">
                {props.product.title}
            </div>
            <div className="flex-auto">
                {props.product.description}
            </div>
            <div className="text-center text-4xl mb-10">
                цена: {props.product.price}₽
            </div>
            <div className="text-4xl text-white">
                {itemCounter ?
                    <div className="flex items-center gap-2">
                        <button className="w-48 rounded-2xl p-3 bg-black-btn" onClick={decrementCounter}>-</button>
                        <input className="w-full flex-auto rounded-2xl p-3 text-center bg-black-btn" type="number"
                               value={itemCounter}
                               onChange={changeCounter}/>
                        <button className="w-48 rounded-2xl p-3 bg-black-btn" onClick={incrementCounter}>+</button>
                    </div> :
                    <button className="w-full rounded-2xl p-3 bg-black-btn" onClick={buyItem}>Купить</button>
                }
            </div>
        </div>
    );
};

export default ProductsItem;