import styles from '../styles/styles.module.css';
import { ProductButtons, ProductImage, ProductTitle, ProductCard } from '../components';
import '../styles/custom-styles.css';
import { products } from '../data/products';

const product = products[0];

export const ShoppingPage = () => {
	return (
		<div>
			<h1>Shopping Store</h1>
			<hr />

			<ProductCard
				key={product.id}
				product={product}
				className="bg-dark text-white"
				initialValues={{
					count: 4,
					maxCount: 10,
				}}
			>
				{/* El siguiente codigo regres un JSX.Element */}
				{({ reset, increaseBy, count, isMaxCountReached }) => (
					<>
						<ProductImage className="custom-image" />
						<ProductTitle className="text-bold" />
						<ProductButtons className="custom-buttons" />

						<button onClick={reset}>Reset</button>
						<button onClick={() => increaseBy(-2)}>-2</button>
						<button
							className={` ${isMaxCountReached && styles.hidden}`}
							onClick={() => increaseBy(2)}
						>
							+2
						</button>
						<span>{count}</span>
					</>
				)}
			</ProductCard>
		</div>
	);
};
