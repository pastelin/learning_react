import { useState } from 'react';
import PropTypes from 'prop-types';

export const AddCategory = ( {setCategorias} ) => {

    const [inputvalue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputvalue.trim().length > 2) {
            setCategorias( cats => [inputvalue, ...cats] );
            setInputValue('');
        }
    };

    return (
        <form onSubmit={ handleSubmit }>
            <input 
                type = "text"
                value = { inputvalue }
                onChange = { handleInputChange }
            />
        </form>
    );
}

AddCategory.propTypes = {
    setCategorias: PropTypes.func.isRequired,
}