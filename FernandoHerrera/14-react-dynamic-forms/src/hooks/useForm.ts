import { ChangeEvent, useState } from 'react';

export const useForm = <T>(initState: T) => {
	const [formData, setFormData] = useState(initState);

	const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const resetForm = () => {
		setFormData({ ...initState });
	};

	const isValidEmail = (email: string) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	return {
		// Properties
		...formData,
        formData,
        isValidEmail,

		// Methods
		onChange,
		resetForm,
	};
};
