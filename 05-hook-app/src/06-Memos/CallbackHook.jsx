import { useCallback, useState } from 'react';
import { ShowIncrement } from './ShowIncrement';

export const CallbackHook = () => {
	const [counter, setCounter] = useState(10);

	const incrementFather = useCallback(
        // Se definen todas las propiedades que recibira increment por parte del componente al que se le delgo la funcion
        (value) => {
		    setCounter( (c) => c + value );
	    }, []);

	return (
		<>
			<h1>useCallback Hook: {counter} </h1>
			<hr />

			<ShowIncrement increment={incrementFather} />
		</>
	);
};
