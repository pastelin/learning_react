import { ErrorMessage, useField } from 'formik';

interface Props {
	label: string;
	name: string;
	placeholder?: string;
	[x: string]: any;
}

export const MySelect = ({ label, ...props }: Props) => {
	// Hook de Formik que obtiene funciones del componente
	const [field] = useField(props);

    return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select {...field} {...props} />
			<ErrorMessage name={props.name} component="span" />
		</>
	);
};
