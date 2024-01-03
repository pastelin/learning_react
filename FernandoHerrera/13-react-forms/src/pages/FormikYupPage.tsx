import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
	firstName: string;
	lastName: string;
	email: string;
}

export const FormikYupPage = () => {
	/*
	 * errors: obtiene objeto de los errores obtenidos del validate
	 * touched: obtiene objeto con valor booleano donde indica si la propiedad se ha seleccionado
	 * getFieldProps: regresa un objeto con las propiedades (name, onChange, value, onBlur)
	 */
	const { handleSubmit, errors, touched, getFieldProps } =
		useFormik({
			initialValues: {
				firstName: '',
				lastName: '',
				email: '',
			},
			onSubmit: (values) => {
				console.log(values);
			},
			validationSchema: Yup.object({
				firstName: Yup.string()
					.max(15, 'Debe de tener 15 caracteres o menos')
					.required('Requerido'),
				lastName: Yup.string()
					.max(15, 'Debe de tener 15 caracteres o menos')
					.required('Requerido'),
				email: Yup.string().email('must be a valid email').required('Requerido'),
			}),
		});

	return (
		<div>
			<h1>Formik Yup</h1>
			<form onSubmit={handleSubmit} noValidate>
				<label htmlFor="firstName">First Name</label>
				<input type="text" {...getFieldProps('firstName')} />
				{touched.firstName && errors.firstName && <span>{errors.firstName}</span>}

				<label htmlFor="lastName">Last Name</label>
				<input type="text" {...getFieldProps('lastName')} />
				{touched.lastName && errors.lastName && <span>{errors.lastName}</span>}

				<label htmlFor="email">Email Address</label>
				<input type="email" {...getFieldProps('email')} />
				{touched.email && errors.email && <span>{errors.email}</span>}

				<button type="submit"> Enviar</button>
			</form>
		</div>
	);
};
