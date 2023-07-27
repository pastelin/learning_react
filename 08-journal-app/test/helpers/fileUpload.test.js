import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
	cloud_name: 'practicas-react',
	api_key: '737698759396622',
	api_secret: 'Ff69rYliaKm3Fs_BbphDWL6fVvg',
	secure: true,
});


describe('Pruebas en fileupload', () => {
    test('debe e subir el archivo correctamente a cloudinary', async() => {
        
        // Crea objeto file a partir de una imagen obtenido de internet
        // Simula imagens cargadas mediante el input file
        const imageUrl =
			'https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        // Proceso para eliminar la imagen cargada en cloudinary
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        await cloudinary.api.delete_resources(['journal-app/' + imageId], {
            resource_type: 'image'
        });

    });

    test('debe de retornar null', async() => { 
        const file = new File([], 'foto.jpg');

        const url = await fileUpload(file);
        expect(url).toBe(null);
     })
});