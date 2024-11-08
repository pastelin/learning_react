export const getProducts = async () => {
    const response = await fetch('http://localhost:8081/products');
    return await response.json();
};

export const calculateTotal = (items) => {
    return items.reduce(
        (accumulator, item) => accumulator + item.quantity * item.product.price,
        0
    );
};
