import { useState } from 'react';
import PropTypes from 'prop-types';

export const AddCategory = ( {onNewCategory} ) => {
	const [inputValue, setInputValue] = useState('');

    const onInputChange = ({target}) => {
        setInputValue(target.value);
    }

    const onSubmit = (event) => {
		// Evita que la pagina se recargue al enviar la peticion
        event.preventDefault();

        if( inputValue.trim().length <= 1 ) return;

		// Ejecuta funcion definida en GifExpert donde valida que la cadena no halla sido ingresada
		// previamente y lo agrega al arreglo si no se repite
        onNewCategory( inputValue.trim() );

		// Vacia imput cada que se envia la peticion
        setInputValue('');
    }

	return (
		<section className='inputCategory'> 
			<form onSubmit={ onSubmit } aria-label="form">
				<input
					type="text"
					placeholder="Buscar gifs"
					value={ inputValue }
					onChange={ onInputChange }
				/>
			</form>
		</section>
	);
};

AddCategory.propTypes = {
	onNewCategory: PropTypes.func.isRequired,
}
