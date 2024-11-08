import { useState } from 'react';

export const FormItemsView = ({ handler }) => {
	const [formItemsState, setFormItemsState] = useState({
		product: '',
		price: '',
		quantity: '',
	});

	const { product, price, quantity } = formItemsState;

	// Actualiza estado de una propiedad del objeto
	const onInputChange = ({ target: { name, value } }) => {
		setFormItemsState({
			...formItemsState,
			[name]: value,
		});
	};

	const onInvoiceSubmit = (event) => {
		event.preventDefault();

		if (product.trim().length <= 1) return;
		if (price.trim().length <= 1) return;
		if (isNaN(price.trim())) return;
		if (quantity.trim().length < 1) return;
		if (isNaN(quantity.trim())) return;

		// Se ejecuta funcion definido en componente InvoiceApp
		handler(formItemsState);

		// Resetear valores
		setFormItemsState({
			product: '',
			price: '',
			quantity: '',
		});
	};

	return (
		<>
			<form className="form-items w-50" onSubmit={onInvoiceSubmit}>
				<input
					type="text"
					name="product"
					placeholder="Producto"
					onChange={onInputChange}
					value={product}
				/>
				<input
					type="text"
					name="price"
					placeholder="Precio"
					onChange={onInputChange}
					value={price}
				/>
				<input
					type="text"
					name="quantity"
					placeholder="Cantidad"
					onChange={onInputChange}
					value={quantity}
				/>

				<button className="btn btn-submit" type="submit">
					Nuevo Item
				</button>
			</form>
		</>
	);
};
