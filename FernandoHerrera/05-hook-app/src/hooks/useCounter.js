import { useState } from 'react'

export const useCounter = ( initialValue = 10 ) => {

    const [ counter, setCounter ] = useState( initialValue );

    const increment = (value = 1) => {
        // metodo que actualiza el estado de counter
        // current almacena el estado actual de counter
        setCounter( (current) => current + value );
    }

    const decrement = (value = 1) => {
        if (counter === 0) return;
        setCounter( (current) => current - value );
    }

    const reset = () => {
        setCounter( initialValue );
    }

    return {
        counter,
        increment,
        decrement,
        reset,
    }

}