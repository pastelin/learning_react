import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const MAXIMUM_COUNT = 10;

export const CounterEffect = () => {
	const [counter, setCounter] = useState(5);

	// useRef: Paso 1
	const counterElement = useRef<HTMLHeadingElement>(null);

	const handleClick = () => {
		setCounter((prev) => Math.min(prev + 1, MAXIMUM_COUNT));
	};

	// useLayoutEffect: se ejecuta después de que se renderiza el html
	useEffect(() => {
		if (counter < 10) return;

		console.log('%c Se llego al valor maximo', 'color:red; background-color: black');

		const tl = gsap.timeline();
		// useRef: Paso 3

        tl.to(counterElement.current, { y: -10, duration: 0.2, ease: 'ease.out' })
            .to(counterElement.current, { y: 0, duration: 1, ease: 'bounce.out' });
        
	}, [counter]);

	return (
		<>
			<h1>Counter Effect: {counter}</h1>
			{/* useRef: Paso 2 */}
			<h2 ref={counterElement}>{counter}</h2>

			<button onClick={handleClick}>+1</button>
		</>
	);
};
