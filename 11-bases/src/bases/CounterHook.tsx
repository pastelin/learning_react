import { useCounter } from '../hooks/useCounter';

export const CounterHook = () => {
	const { counter, elementToAnimate, handleClick } = useCounter({
		maxCount: 15,
	});

	return (
		<>
			<h1>Counter Hook: {counter}</h1>
			{/* useRef: Paso 2 */}
			<h2 ref={elementToAnimate}>{counter}</h2>

			<button onClick={handleClick}>+1</button>
		</>
	);
};
