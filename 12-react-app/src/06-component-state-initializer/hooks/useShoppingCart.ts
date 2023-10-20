import { useState } from 'react';
import { Product, ProductInCart } from '../interfaces/intefaces';
export const useShoppingCart = () => {
	// Indica que sera un arreglo de objetos
	const [shopingCart, setShoppingCart] = useState<{ [key: string]: ProductInCart }>({});

	const onProductCountChange = ({ count, product }: { count: number; product: Product }) => {
		// console.log('onProductCountChange');

		setShoppingCart((oldShoppingCart) => {
			if (count === 0) {
				// Desestructuracion donde obtiene primero el producto con cero productos, posteriormente obtiene el resto de productos
				const { [product.id]: toDelete, ...rest } = oldShoppingCart;

				return rest;
			}
			return {
				...oldShoppingCart,
				[product.id]: { ...product, count },
			};
		});
	};

	return {
		shopingCart,
		onProductCountChange,
	};
};
