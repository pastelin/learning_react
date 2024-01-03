export const fileUpload = async (file) => {
	if (!file) throw new Error('No hay ningún archivo a subir');

	const cloudUrl = 'https://api.cloudinary.com/v1_1/practicas-react/image/upload';

	// Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data".
	const formData = new FormData();
	formData.append('upload_preset', 'react-journal');
	formData.append('file', file);

	try {
		const resp = await fetch(cloudUrl, {
			method: 'POST',
			body: formData,  
		});

		// if (!resp.ok) throw new Error('No se pudo subir la imagen');
        if (!resp.ok) return null;

		const cloudResp = await resp.json();

		return cloudResp.secure_url;
	} catch (error) {
		console.log(error);
		// throw new Error(error.message);
        return null;
	}
};
