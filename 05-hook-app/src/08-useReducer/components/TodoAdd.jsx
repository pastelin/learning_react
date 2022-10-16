import { useState } from 'react';
import { useForm } from '../../hooks/useForm';

export const TodoAdd = ({ onNewTodo }) => {
	const {descripcion, onInputChange, onResetForm} = useForm({ descripcion: '' });

	const onSubmit = (event) => {
		event.preventDefault();

		if(descripcion.length <= 1) return;
		
        const newTodo = {
            id: new Date().getTime(),
            descripcion: descripcion,
            done: false
        }

        onNewTodo(newTodo);
        onResetForm();
	};

	return (
		<form onSubmit={ onSubmit }>
			<input
				type="text"
				placeholder="¿Qué hay que hacer?"
				className="form-control"
				name="descripcion"
				value={ descripcion }
                onChange={ onInputChange }
			/>

			<button type="submit" className="btn btn-outline-primary mt-1">
				Agregar
			</button>
		</form>
	);
};
