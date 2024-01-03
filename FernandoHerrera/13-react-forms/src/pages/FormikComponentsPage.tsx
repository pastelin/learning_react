import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const FormikComponentsPage = () => {
	return (
		<div>
			<h1>Formik Components</h1>

			{/* HOC : Hight Order Component */}
			{/* Ayuda a evitar el uso de useFormik */}
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					terms: false,
					jobType: '',
				}}
				onSubmit={(values) => {
					console.log(values);
				}}
				validationSchema={Yup.object({
					firstName: Yup.string()
						.max(15, 'Debe de tener 15 caracteres o menos')
						.required('Requerido'),
					lastName: Yup.string()
						.max(15, 'Debe de tener 15 caracteres o menos')
						.required('Requerido'),
					email: Yup.string().email('must be a valid email').required('Requerido'),
					terms: Yup.boolean().oneOf([true], 'Debe de aceptar las condiciones'),
					jobType: Yup.string()
						.notOneOf(['it-jr'], 'Esta opción no es permitida.')
						.required('Requerido'),
				})}
			>
				{/* Children */}
				{(formik) => (
					<Form>
						{' '}
						{/* No ocupa definir obSubmit */}
						<label htmlFor="firstName">First Name</label>
						<Field name="firstName" type="text" /> {/* Reemplaza el uso de input */}
						<ErrorMessage name="firstName" component="span" />{' '}
						{/* component coloca el contenido en las etiquetas definidas */}
						<label htmlFor="lastName">Last Name</label>
						<Field name="lastName" type="text" /> {/* Reemplaza el uso de input */}
						<ErrorMessage name="lastName" component="span" />
						<label htmlFor="email">Email Address</label>
						<Field name="email" type="text" /> {/* Reemplaza el uso de input */}
						<ErrorMessage name="email" component="span" />
						<label htmlFor="jobType">Job Type</label>
						<Field name="jobType" as="select">
							<option value="">Pick Somethink</option>
							<option value="developer">Developer</option>
							<option value="design">Designer</option>
							<option value="it-senior">IT Senior</option>
							<option value="it-jr">IT Jr.</option>
						</Field>
						<ErrorMessage name="jobType" component="span" />
						<label>
							<Field name="terms" type="checkbox" /> {/* Reemplaza el uso de input */}
							Terms and conditions
						</label>
						<ErrorMessage name="terms" component="span" />
						<button type="submit"> Enviar</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
