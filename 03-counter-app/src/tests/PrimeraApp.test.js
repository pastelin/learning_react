import React from 'react'
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import PrimeraApp from '../PrimeraApp';

describe('Pruebas en <PrimeraApp />', () => {

    test('debe mostrar <PrimeraApp /> correctamente', () => {

        const saludo = 'Hola, Soy Goku';
        const wraper = shallow(<PrimeraApp saludo={saludo} />);

        expect( wraper ).toMatchSnapshot();
    });

    test('debe enviar el subtitulo enviado por props', () => {

        const saludo = 'Hola, Soy Goku';
        const subTitulo = 'Soy un subtitulo';

        const wrapper = shallow(
            <PrimeraApp
                saludo={saludo}
                subtitulo={subTitulo}
            />
        );

        const textoParrafo = wrapper.find('p').text();

        expect(textoParrafo).toBe(subTitulo);
    });

});