import { ErrorMessage, useField } from 'formik';

interface Props {
	label: string;
	name: string;
	[x: string]: any;
}

export const MyCheckbox = ({label, ...props}: Props) => {
	// Ejemplo del objeto meta: {value: false, error: undefined, touched: false, initialValue: false, initialTouched: false, …}
	// const [field, meta] = useField({...props, type: 'checkbox'});

	// Hook de Formik que obtiene funciones del componente
	const [field] = useField({ ...props, type: 'checkbox' }); 

	return (
		<>
			<label>
				<input type="checkbox" {...field} {...props} />
				{label}
			</label>

			<ErrorMessage name={props.name} component="span" />

			{/* Ejercicio manual para el menejo de errores
                {
                meta.touched && meta.error && (
                    <span className="error"> {meta.error} </span>
                )
            } */}
		</>
	);
};
