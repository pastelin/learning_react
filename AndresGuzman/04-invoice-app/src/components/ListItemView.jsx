import PropTypes from 'prop-types';
import { RowItemView } from './RowItemView';

export const ListItemView = ({ title, items, handlerDeleteItem }) => {
	return (
		<>
			<h4>{title}</h4>
			<table className="table">
				<thead>
					<tr>
						<th>Producto</th>
						<th>Precio</th>
						<th>Cantidad</th>
						<th>Eliminar</th>
					</tr>
				</thead>
				<tbody>
					{items.map(({ id, price, product, quantity }) => (
						<RowItemView
							key={id}
							id={id}
							product={product}
							price={price}
							quantity={quantity}
							handlerDeleteItem={handlerDeleteItem}
						/>
					))}
				</tbody>
			</table>
		</>
	);
};

ListItemView.propTypes = {
	title: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
};
