import { ProductButtons, ProductImage, ProductTitle, ProductCard } from '../components';

const product = {
	id: '1',
	title: 'Coffe Mug - Card',
	img: './coffee-mug.png',
};

export const ShoppingPage = () => {
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
				{/* 
                    Beneficios: 
                    1. Permite controlar el componente sin acceder directamente
                */}
				<ProductCard product={product}>
					<ProductCard.Image />
					<ProductCard.Title title="New title" />
					<ProductCard.Buttons />
				</ProductCard>

				<ProductCard product={product}>
					<ProductImage />
					<ProductTitle />
					<ProductButtons />
				</ProductCard>
			</div>
		</div>
	);
};
