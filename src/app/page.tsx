import Reviews from "@/components/reviews/reviews";
import Products from "@/components/products/products";
import Header from "@/components/header/Header";
import Form from "@/components/form/form";

export default function Home() {
    return (
        <div className="container mx-auto py-2 mb-20">
            <Header/>
            <Reviews/>
            <Form/>
            <Products/>
        </div>
    );
}
