import { useEffect, useRef, useState } from 'react';
import { Product, onChangeArgs } from '../interfaces/intefaces';

interface useProductArgs {
	product: Product;
	onChange?: (args: onChangeArgs) => void;
	value?: number;
}

// Indica que onChange es opcional
export const useProduct = ({ onChange, product, value = 0 }: useProductArgs) => {
    const [counter, setCounter] = useState(value);
    
    const isControlled = useRef(!!onChange);

    const increaseBy = (value: number) => {
        
        if (isControlled.current) {
            return onChange!({ count: value, product });
        }

		const newValue = Math.max(counter + value, 0);
		setCounter(newValue);

		// Al ser opcional la propiedad puede fallar, por eso valida primero que se tenga un valor para ejecutarlo
		onChange && onChange({ count: newValue, product });
	};

	useEffect(() => {
		setCounter(value);
	}, [value]);

	return {
		counter,
		increaseBy,
	};
};
