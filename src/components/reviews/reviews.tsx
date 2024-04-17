'use client'
import React, {useEffect, useState} from 'react';
import {ReviewsItem} from "@/interface/interface";
import useFetchData from "@/hooks/useFetchData";
import ReviewsService from "@/components/API/ReviewsService";

const Reviews = () => {
    const [reviews, setReviews] = useState<ReviewsItem[]>([]);

    const [isLoading, error, fetchReviews] = useFetchData(async () => {
        const data = await ReviewsService.fetchReview()
        setReviews(data);
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="max-w-5xl mx-auto md:mt-28 mt-24">
            <div className="grid md:grid-cols-2 gap-4">
                {reviews ?
                    reviews.map((review, index) => (
                        <div key={index}
                             className="bg-gray rounded-2xl p-2 text-black"
                             dangerouslySetInnerHTML={{__html: review.text}}></div>)) :
                    <div>Отзывов пока нет</div>
                }
            </div>
            {isLoading && <div>Идет загрузка отзывов...</div>}
            {error && <div>Ошибка {error.message}</div>}
        </div>
    );
};

export default Reviews;