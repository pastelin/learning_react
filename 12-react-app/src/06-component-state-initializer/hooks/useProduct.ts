import { useEffect, useRef, useState } from 'react';
import { InitialValues, Product, onChangeArgs } from '../interfaces/intefaces';

interface useProductArgs {
	product: Product;
	onChange?: (args: onChangeArgs) => void;
	value?: number;
	initialValues?: InitialValues;
}

export const useProduct = ({ onChange, product, value = 0, initialValues }: useProductArgs) => {
	const [counter, setCounter] = useState<number>(initialValues?.count || value);

	// useRef crea un objeto que sobrevivira diferemtes renderizaciones del mismo conponente
	// Maneja variable que permite manejarla cuando cambia sin disparar renderizaciones de react
	const isMounted = useRef(false);

	const increaseBy = (value: number) => {
		console.log(value, counter);
		const newValue = Math.max(counter + value, 0);

		if (initialValues?.maxCount && newValue > initialValues.maxCount) return;

		setCounter(newValue);
		// Al ser opcional la propiedad puede fallar, por eso valida primero que se tenga un valor para ejecutarlo
		onChange && onChange({ count: newValue, product });
	};

    const reset = () => {
        setCounter(initialValues?.count || value);
    }

	useEffect(() => {
		if (!isMounted.current) return;
		setCounter(counter);
	}, [counter]);

	useEffect(() => {
		console.log(isMounted.current);
		isMounted.current = true;
	}, []);

	return {
		counter,
        isMaxCountReached: !!initialValues?.count && initialValues.maxCount === counter,
        maxCount: initialValues?.maxCount,
        
        increaseBy,
        reset
	};
};
