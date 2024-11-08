import { useEffect, useReducer } from 'react';
import {
	AddProductCart,
	DeleteProductCart,
	UpdateQuantityProductCart,
} from '../reducer/itemsActions';
import { itemsReducer } from '../reducer/itemsReducer';

const initialCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

export const useItemsCart = () => {
	// Administra el estado del objeto mediante useReducer
	// cartItems: es el estado de nuestro objeto
	// dispatch: es la referencia de la funcion a ejecutar para modificar el estado del objeto
	// itemsReducer: es la referencia de nuestra funcion que implementa el dispach
	// initialItems: es el estado inicial que tendra nuestro objeto
	const [cartItems, dispatch] = useReducer(itemsReducer, initialCartItems);

	useEffect(() => {
		sessionStorage.setItem('cart', JSON.stringify(cartItems));
	}, [cartItems]);

	// Funcion que actualiza el estado de los items y se delega al componente hijo
	const handlerAddProductCart = (product) => {
		console.log(product);
		const hasItem = cartItems.find((item) => item.product.id === product.id);

		if (hasItem) {
			dispatch({
				type: UpdateQuantityProductCart,
				payload: product,
			});
		} else {
			dispatch({
				type: AddProductCart,
				payload: product,
			});
		}
	};

	const handlerDeleteProductCart = (id) => {
		dispatch({
			type: DeleteProductCart,
			payload: id,
		});
	};
	return { cartItems, handlerAddProductCart, handlerDeleteProductCart };
};
