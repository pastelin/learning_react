import { products } from '../data/products';

export const getProducts = () => {
    return products;
}

export const calculateTotal = (items) => {
    return items.reduce((accumulator, item) => accumulator + (item.quantity * item.product.price), 0);
}