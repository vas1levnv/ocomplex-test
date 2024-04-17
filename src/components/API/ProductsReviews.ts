export default class ProductsService {
    static async fetchProductsList(page: number, amount: number) {
        const res = await fetch(`http://o-complex.com:1337/products?page=${page}&page_size=${amount}`);
        const data = await res.json();
        return data;
    }
}