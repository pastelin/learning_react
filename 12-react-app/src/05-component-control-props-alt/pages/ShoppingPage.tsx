import { ProductButtons, ProductImage, ProductTitle, ProductCard } from '../components';
import '../styles/custom-styles.css';
import { products } from '../data/products';
import { useShoppingCart } from '../hooks/useShoppingCart';



export const ShoppingPage = () => {

    const {onProductCountChange, shopingCart } = useShoppingCart();
	
	return (
		<div>
			<h1>Shopping Store</h1>
			<hr />

			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
				}}
			>
				{products.map((product) => (
					<ProductCard
						product={product}
						className="bg-dark text-white"
						key={product.id}
						onChange={onProductCountChange}
						value={shopingCart[product.id]?.count || 0}
					>
						<ProductImage className="custom-image" />
						<ProductTitle className="text-bold" />
						<ProductButtons className="custom-buttons" />
					</ProductCard>
				))}
			</div>
			<div className="shopping-cart">
				{Object.entries(shopingCart).map(([key, product]) => (
					<ProductCard
						product={product}
						className="bg-dark text-white"
						style={{ width: '100px' }}
						key={key}
						value={product.count}
						onChange={onProductCountChange}
					>
						<ProductImage className="custom-image" />
						<ProductButtons
							className="custom-buttons"
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						/>
					</ProductCard>
				))}
			</div>
		</div>
	);
};
