import { useMemo } from 'react';
import { useEffect, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
	const [formState, setFormState] = useState(initialForm);
	const [formValidation, setFormValidation] = useState({});

	// Hook que valida cada campo de formState y se ejecuta cada este mismo cambie de estado
	useEffect(() => {
		createValidators();
    }, [formState]);
    
    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])

	// Hook que se encarga de validar si hay mensajes de errore indicandolo mediante un boleano
	// Regresa false si hubo un errror caso contrario regresa true
	// Se ejecutara la validacion cada que el estado de formValidation cambie
	const isFormValid = useMemo(() => {
		for (const formValue of Object.keys(formValidation)) {
			if (formValidation[formValue] != null) return false;
		}

		return true;
	}, [formValidation]);

	// Desestructuta target del objeto event() que recibe
	const onInputChange = ({ target }) => {
		// Desestructura el name y value del objeto target();
		const { name, value } = target;

		setFormState({
			...formState, // (...) operador spread para obtener todos los parametros y valores del estado formState
			[name]: value, // reemplaza el valor del atributo indicado en name
		});
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};


	const createValidators = () => {
		const formCheckedValues = {};

		// Recorre el objeto formValidations y obtiene el nombre de la propiedad dentro de formField
		for (const formField of Object.keys(formValidations)) {
			// Desestructura el objeto formValidations definido en LoginPage para obtener la funcion y mensaje de error
			const [fn, errorMesssage = 'Este campo es requerido.'] = formValidations[formField];

			// Almacena en el objeto formCheckedValues el resultado de validar cada propiedad del estado formState
			formCheckedValues[`${formField}Valid`] = fn(formState[formField])
				? null
                : errorMesssage;
            
		}

		setFormValidation(formCheckedValues);
	};

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
		...formValidation,
		isFormValid,
	};
};