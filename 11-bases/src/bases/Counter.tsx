import { useState } from 'react';

// ? : indica que initialValue es opcional
interface Props {
	initialValue?: number;
}

// {initialValue: number = 0} : Indica que initialValua cambia a number
export const Counter = ({ initialValue = 0 }: Props) => {
	const [counter, setCounter] = useState(initialValue);

	const handleClick = () => {
		setCounter((prev) => prev + 1);
	};

	return (
		<>
			<h1>Counter: {counter}</h1>

			<button onClick={handleClick}>+1</button>
		</>
	);
};
