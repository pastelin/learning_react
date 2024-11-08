import { useNavigate } from 'react-router-dom';

export const ProductCardView = ({ id, name, description, price, handler }) => {
	const navigate = useNavigate();

	const onAddProduct = (product) => {
		handler(product);
		navigate('/cart');
	};

	return (
		<>
			<div className="card flex-responsive-item">
				<div className="card-body">
					<h3>{name}</h3>
					<p>{description}</p>
					<p>$ {price}</p>
					<button
						className="btn btn-card"
						onClick={() => onAddProduct({ id, name, description, price })}
					>
						Agregar
					</button>
				</div>
			</div>
		</>
	);
};
