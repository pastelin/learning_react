import { getHeroeById, getHeroesByOwner } from '../../src/base/08-imp-exp';
import heroes from '../../src/data/heroes';

describe('Pruebas en 08-imp-exp', () => {
    
    test('getHeroeById debe de retornar un heroe por ID', () => {
        
        const id = 1;
        const hero = getHeroeById(id);

        expect(hero).toEqual({id: 1,name: 'Batman',owner: 'DC'});
    });

    test('getHeroeById debe de retornar undefined si no existe el ID', () => {
        
        const id = 100;
        const hero = getHeroeById(id);

        expect(hero).toBeFalsy();
    });

    test('getHeroById debe retornar un arreglo con los heroes de DC length === 3', () => {

        const owner = 'DC';
        const lengthExpected = 3;
        const dcHeroes = getHeroesByOwner(owner);

        expect(dcHeroes.length).toBe(lengthExpected);

    });

    test('getHeroById debe retornar un arreglo con los heroes de Marvel length === 2', () => {

        const owner = 'Marvel';
        const lengthExpected = 2;
        const heroesActual = getHeroesByOwner(owner);
        const expectedHeroes = heroes.filter( hero => hero.owner === owner );

        expect(heroesActual.length).toBe(lengthExpected);
        expect(heroesActual).toEqual(expectedHeroes);

    });
});