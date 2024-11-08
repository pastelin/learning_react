import {render, screen} from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import { useFetchGifs } from '../../src/hooks/useFetchGifs'

// Indica que haga un mock completo de esta path
jest.mock('../../src/hooks/useFetchGifs');


describe('Pruebas en <GifGrid />', () => {
    const category = 'One Punch';

    test('debe de mostrar el loading inicialmente', () => {
        
        // Indica los valores de retorno del mock
        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true
        })

        render( <GifGrid category={ category } />);
        expect( screen.getByText('Cargando...') );
        expect( screen.getByText(category) );

    });

    test('debe de mostrar items cuando se cargan las imagenes useFetchGifs', () => {
        
        const  gifs = [
            {
                id: '123',
                title: 'Goku',
                url: 'https://localhost/goku.jpg'
            },
            {
                id: '124',
                title: 'Saitama',
                url: 'https://localhost/saitama.jpg'
            },
        ]

        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: false
        })

        render( <GifGrid category={ category } /> )
        expect( screen.getAllByRole('img').length ).toBe(2);
    });

});