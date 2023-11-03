import styles from '../styles/styles.module.css';
import React, { useContext } from 'react';
import { ProductContext } from './ProductCard';

export interface Props {
	title?: string;
	className?: string;
	style?: React.CSSProperties;
}

// {title?: number} : indica el tipo de dato a recibir y que es opcional
export const ProductTitle = ({ title, className, style }: Props) => {
	const { product } = useContext(ProductContext);

	return (
		<span className={`${styles.productDescription} ${className}`} style={style}>
			{title ? title : product.title}
		</span>
	);
};
