import { useEffect, useState } from 'react';
import { getProducts } from '../service/productService';
import { ProductCardView } from './ProductCardView';

export const CatalogView = ({ handler }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const findAll = async () => {
        const prods = await getProducts();
        setProducts(prods);
        setIsLoading(false);
    };

    useEffect(() => {
        findAll();
    }, []);

    return (
        <>
            {isLoading && <div className='alert'>Loading...</div>}
            <div className='flex-responsive'>
                {products.map(({ id, name, description, price }) => (
                    <ProductCardView
                        key={id}
                        id={id}
                        name={name}
                        description={description}
                        price={price}
                        handler={handler}
                    />
                ))}
            </div>
        </>
    );
};
