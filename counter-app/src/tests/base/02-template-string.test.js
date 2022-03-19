import '@testing-library/jest-dom';
import { getSaludo } from '../../base/02-template-string';

describe('Pruebas en 02-template-string.js', () => {
	
    test('getSaludo debe retornar Hola Juan!', () => {

        const nombre = 'Juan';

        const saludo = getSaludo(nombre);

        expect(saludo).toBe('Hola ' + nombre + '!');

    });

    // getSaludo debe de  retornar Hola Carlos!, si no argumento nombre
    test('getSaludo debe de  retornar Hola Carlos!, si no argumento nombre', () => {

        const saludo = getSaludo();

        expect(saludo).toBe('Hola Carlos!');

    });
});
