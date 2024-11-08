import '../styles/styles.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../components';

export const RegisterFormikPage = () => {
	return (
		<div>
			<h1>Register Page</h1>
			<Formik
				initialValues={{
					name: '',
					email: '',
					password1: '',
					password2: '',
				}}
				onSubmit={(values) => {
					console.log(values);
				}}
				validationSchema={Yup.object({
					name: Yup.string()
						.min(2, 'Debe de tener 2 o más caracteres')
						.max(15, 'Debe de t  ener 15 caracteres o menos')
						.required('El nombre es obligatorio'),
					email: Yup.string()
						.email('Debe colocar un correo válido')
						.required('El correo es obligatorio'),
					password1: Yup.string()
						.min(6, 'El correo debe tener mínimo 6 caracteres')
						.required('La contraseña es un campo obligatorio'),
					password2: Yup.string()
						.oneOf([Yup.ref('password1')], 'Las contraseñas no son iguales')
						.required('La contraseña es un campo obligatorio'),
				})}
			>
				{({handleReset}) => (
					<Form>
						<MyTextInput label="Name" name="name" />

						<MyTextInput label="Email" name="email" type="email" />

						<MyTextInput label="Password" name="password1" type="password" />

						<MyTextInput label="Repeat Password" name="password2" type="password" />

                        <button type="submit">Create</button>
                        <button type="button" onClick={handleReset}>Reset Form</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
