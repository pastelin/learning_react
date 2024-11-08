describe('Pruebas en el archivo demo.test.js', () => {
	test('deben de ser iguales los string', () => {
		
        // 1. inicializacion
        const mensaje = 'Hola Mundo';

        // 2. estimulo
        const mensaje2 = `Hola Mundo`;

        // 3. observar el comportamiento
        expect(mensaje).toBe(mensaje2);

	});
});
