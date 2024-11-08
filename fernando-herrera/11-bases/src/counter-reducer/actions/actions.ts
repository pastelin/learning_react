export type CounterAction = { type: 'increaseBy'; payload: { value: number } } | { type: 'reset' };

// export const doReset = (): CounterAction => {
//     return {
//         type: 'reset'
//     }
// }

// Despues de => se colocar '()' el cual incluye el return de forma implicita
export const doReset = (): CounterAction => ({
	type: 'reset',
});

export const doIncreaseBy = (value: number): CounterAction => ({
	type: 'increaseBy',
	payload: { value },
});
