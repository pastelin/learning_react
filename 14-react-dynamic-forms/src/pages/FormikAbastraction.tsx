import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyCheckbox, MySelect, MyTextInput } from '../components';

export const FormikAbstraction = () => {
	return (
		<div>
			<h1>Formik Abstraction</h1>

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
                        {/* No ocupa definir obSubmit */}
                        
                        <MyTextInput label="First Name" name="firstName" />

                        <MyTextInput label="Last Name" name="lastName" />

                        <MyTextInput label="Email Address" name="email" type="email" />

						<MySelect label="Job Type" name="jobType">
							<option value="">Pick Somethink</option>
							<option value="developer">Developer</option>
							<option value="design">Designer</option>
							<option value="it-senior">IT Senior</option>
							<option value="it-jr">IT Jr.</option>
                        </MySelect>
                        
                        <MyCheckbox label="Terms & Conditions" name="terms" />
                            
						<button type="submit"> Enviar</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
