import { ProductButtons, ProductImage, ProductTitle, ProductCard } from '../components';
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
				initialValues={{
					count: 4,
					maxCount: 10,
				}}
			>
				{/* El siguiente codigo regres un JSX.Element */}
				{({ reset, increaseBy, count, isMaxCountReached }) => (
					<>
						<ProductImage />
						<ProductTitle />
						<ProductButtons />
					</>
				)}
			</ProductCard>
		</div>
	);
};
