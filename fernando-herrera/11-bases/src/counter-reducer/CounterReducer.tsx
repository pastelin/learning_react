import { useReducer } from 'react';
import { CounterState } from './interfaces/interfaces';
import { counterReducer } from './state/counterReducer';
import * as actions from './actions/actions';

// Se usa import * as actions para no tener demaciadas importaciones, al realizarlo de esta forma se accede a todas las importaciones como si se tratase de un objeto

const INITIAL_STATE: CounterState = {
	counter: 0,
	previous: 0,
	changes: 0,
};

export const CounterReducerComponent = () => {
	// Custom hook usado cuando los estados a manipular son complejos
	// EL primer parametro corresponde a una funcion pura y esta solo se debe encargar de actualizar el estado
	// El segundo parametro corresponde al estado inicial del objeto
	const [counterState, dispatch] = useReducer(counterReducer, INITIAL_STATE);

	const handleReset = () => {
		dispatch(actions.doReset());
	};

	const increaseBy = (value: number) => {
        dispatch(actions.doIncreaseBy(value));
	}; 

	return (
		<>
			<h1>Counter Reducer Segmentado</h1>
			<pre>{JSON.stringify(counterState, null, 2)}</pre>

			<button onClick={() => increaseBy(1)}>+1</button>
			<button onClick={() => increaseBy(5)}>+5</button>
			<button onClick={() => increaseBy(10)}>+10</button>
			<button onClick={handleReset}>Reset</button>
		</>
	);
};
