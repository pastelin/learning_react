import { getUser, getUsuarioActivo } from '../../src/base/05-funciones';

describe('Pruebas en 05-funciones', () => {
    
    test('getUser debe retornar un objeto', () => {

        const testUser = {
            uid: 'ABC123',
            username: 'El_Papi1502',
        };

        const user = getUser();

        expect(user).toEqual(testUser);
    });

    test('getUsuarioActivo debe de retornar un objeto', () => {
        
        const name = 'Juan';

        const usuarioActivoTest = {
            uid: 'ABC567',
	        username: name,
        }

        const userActivo = getUsuarioActivo(name);

        expect(userActivo).toEqual(usuarioActivoTest);
    });

});