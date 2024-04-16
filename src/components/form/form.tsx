import React from 'react';

const Form = () => {
    return (
        <div className="w-fit mx-auto md:mt-28 mt-24 mb-12">
            <div>Добавленные товары</div>
            <div>
                <input className="rounded-2xl p-3 bg-black-btn"/>
                <button className="rounded-2xl p-3 bg-black-btn">заказать</button>
            </div>
        </div>
    );
};

export default Form;