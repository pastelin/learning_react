import { ProductCardHOCProps } from '../interfaces/intefaces';
import { ProductButtons } from './ProductButtons';
import { ProductCard as ProductCardHOC } from './ProductCard';
import { ProductImage } from './ProductImage';
import { ProductTitle } from './ProductTitle';

// export * from './ProductCard';
export { ProductButtons } from './ProductButtons';
export { ProductImage } from './ProductImage';
export { ProductTitle } from './ProductTitle';

export const ProductCard: ProductCardHOCProps = Object.assign(ProductCardHOC, {
	Title: ProductTitle,
	Image: ProductImage,
	Buttons: ProductButtons,
});

export default ProductCard;