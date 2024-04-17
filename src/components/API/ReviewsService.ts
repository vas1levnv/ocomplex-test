export default class ReviewsService {
    static async fetchReview() {
        const res = await fetch('http://o-complex.com:1337/reviews');
        const data = await res.json();
        if (res.status === 200) {
            return data;
        }
    }
}