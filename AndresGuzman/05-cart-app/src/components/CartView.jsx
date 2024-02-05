import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { calculateTotal } from '../service/productService';

export const CartView = ({ items, handlerDelete }) => {
	const [total, setTotal] = useState(0);
	const navigate = useNavigate();

	const onDeleteProduct = (id) => {
		handlerDelete(id);
	};

	useEffect(() => {
		setTotal(calculateTotal(items));
	}, [items]);

	const onCatalog = () => {
		navigate('/catalog');
	};

	return (
		<>
			<h3>Carro de compras</h3>
			<table className="table">
				<thead>
					<tr>
						<th>Producto</th>
						<th>Precio</th>
						<th>Cantidad</th>
						<th>Total</th>
						<th>Eliminar</th>
					</tr>
				</thead>
				<tbody>
					{items.map(({ product, quantity }) => (
						<tr key={product.id}>
							<td>{product.name}</td>
							<td>{product.price}</td>
							<td>{quantity}</td>
							<td>{quantity * product.price}</td>
							<td>
								<button
									className="btn btn-delete-item"
									onClick={() => onDeleteProduct(product.id)}
								>
									Eliminar
								</button>
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td className="text-end fw-bold" colSpan="3">
							Total
						</td>
						<td className="text-start fw-bold" colSpan="2">
							{total}
						</td>
					</tr>
				</tfoot>
			</table>
			<button className="btn btn-card" onClick={onCatalog}>
				Seguir comprando
			</button>
		</>
	);
};
