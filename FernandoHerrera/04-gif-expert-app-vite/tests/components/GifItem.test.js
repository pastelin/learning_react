import {render, screen} from '@testing-library/react';
import { GifItem } from '../../src/components/GifItem';

describe('Pruebas en componente GifItem', () => {

    const title = 'Saitama';
    const url ="https://one-punch.com/saitama.jpg";
    
    test('debe hacer match con el snapshot', () => {
        const { container } = render(<GifItem title={title}  url={url} />);
        expect(container).toMatchSnapshot();
    });

    test('debe mostrar la imagen con el URL y el ALT indicado', () => {

        render(<GifItem title={title} url={url} />);
        
        // muestra el html del componente, para poder identificar su estructura, tags, propiedades, etc.
        //screen.debug();

        // getByRole puede obtener el valor de atributos de un tag especificado
        // expect( screen.getByRole('img') .src ).toBe(url);
        const {src, alt} = screen.getByRole('img');
        expect(src).toBe(url);
        expect(alt).toBe(title);

    });

    test('debe de mostrar el titulo en el componente', () => {
        render(<GifItem title={title} url={url} />);
        expect(screen.getByText(title)).toBeTruthy();
    });

});