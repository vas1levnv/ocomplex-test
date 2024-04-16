'use client'
import React, {useEffect, useState} from 'react';
import {Reviews} from "@/interface/interface";

const Reviews = () => {
    const [reviews, setReviews] = useState<Reviews[]>([]);

    const fetchData = async () => {
        try {
            const res = await fetch('http://o-complex.com:1337/reviews');
            const data = await res.json();
            setReviews(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="max-w-5xl mx-auto md:mt-28 mt-24">
            <div className="grid md:grid-cols-2 gap-4">
                {reviews.map((review, index) => (
                    <div key={index}
                         className="bg-gray rounded-2xl p-2 text-black"
                         dangerouslySetInnerHTML={{__html: review.text}}></div>))}
            </div>
        </div>
    );
};

export default Reviews;