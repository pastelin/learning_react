import { ProductButtons, ProductImage, ProductTitle, ProductCard } from '../components';
import '../styles/custom-styles.css';

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
				<ProductCard product={product} className="bg-dark text-white">
					<ProductCard.Image className="custom-image" />
					<ProductCard.Title title="New title" />
					<ProductCard.Buttons className="custom-buttons" />
				</ProductCard>

				<ProductCard product={product} className="bg-dark text-white">
					<ProductImage className="custom-image" />
					<ProductTitle className="text-bold" />
					<ProductButtons className="custom-buttons" />
                </ProductCard>
                
				<ProductCard product={product} style={{ backgroundColor: '#70D1F8'}}>
					<ProductImage />
					<ProductTitle />
					<ProductButtons />
				</ProductCard>
			</div>
		</div>
	);
};
