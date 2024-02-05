import { Routes, Route, Navigate } from 'react-router-dom';
import { CatalogView } from '../components/CatalogView';
import { CartView } from '../components/CartView';

export const CartRoutes = ({ handlerAddProductCart, cartItems, handlerDeleteProductCart }) => {
	return (
		<Routes>
			<Route path="catalog" element={<CatalogView handler={handlerAddProductCart} />} />
			<Route
				path="cart"
				element={
					cartItems?.length <= 0 ? (
						<div className="alert alert-warning">
							No hay productos en el carrito de compras!
						</div>
					) : (
						<div>
							<CartView items={cartItems} handlerDelete={handlerDeleteProductCart} />
						</div>
					)
				}
			/>

			<Route path="/" element={<Navigate to={'/catalog'} />} />
		</Routes>
	);
};
