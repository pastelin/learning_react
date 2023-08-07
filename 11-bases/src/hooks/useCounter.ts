import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const useCounter = ({ maxCount = 10 }) => {
	const [counter, setCounter] = useState(5);
	// useRef: Paso 1
	const elementToAnimate = useRef<any>(null);

    // useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
    // Solo se crea la primera vez y se almacena la referencia
	const tl = useRef(gsap.timeline());

	const handleClick = () => {
		setCounter((prev) => Math.min(prev + 1, maxCount));
	};

    // useLayoutEffect: se ejecuta después de que se renderiza el html
    useLayoutEffect(() => {

        if (!elementToAnimate.current) return; 
		// useRef: Paso 3
		tl.current
			.to(elementToAnimate.current, { y: -10, duration: 0.2, ease: 'ease.out' })
            .to(elementToAnimate.current, { y: 0, duration: 1, ease: 'bounce.out' })
            .pause();
	}, [])


    useEffect(() => {
        tl.current.play(0);
	}, [counter]);

	return {
		counter,
		elementToAnimate,
		handleClick,
	};
};
