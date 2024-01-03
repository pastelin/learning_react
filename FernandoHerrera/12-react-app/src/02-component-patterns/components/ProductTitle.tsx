import styles from '../styles/styles.module.css';
import { useContext } from 'react';
import { ProductContext } from './ProductCard';

// {title?: number} : indica el tipo de dato a recibir y que es opcional
export const ProductTitle = ({ title }: { title?: string }) => {
	const { product } = useContext(ProductContext);

	return <span className={styles.productDescription}>{title ? title : product.title}</span>;
};
