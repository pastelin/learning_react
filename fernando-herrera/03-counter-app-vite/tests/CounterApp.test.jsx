import {render, screen, fireEvent} from '@testing-library/react';
import { CounterApp } from '../src/CounterApp';

describe('Pruebas en el <CounterApp />', () => {
    
    const value = 10;

    test('debe hacer match con el snapshot', () => {
        
        const {container} = render(<CounterApp value={value} />)
        expect(container).toMatchSnapshot();

    });

    test('debe de mostrar el valor inicial de 100', () => {
        render(<CounterApp value={100} />)
        expect(screen.getByText(100)).toBeTruthy();
        // expect(screen.getByRole('heading', {level: 2}).innerHTML).toContain('100');
    });

    test('debe incrementar con el boton +1', () => {
        render(<CounterApp value={value} />);
        fireEvent.click( screen.getByText('+1'));
        expect( screen.getByText('11') ).toBeTruthy();
    });

    test('debe decrementar con el boton +1', () => {
        render(<CounterApp value={value} />);
        fireEvent.click( screen.getByText('-1'));
        expect( screen.getByText('9') ).toBeTruthy();
    });

    test('debe de funcionar el boton de reset', () => {
        render(<CounterApp value={value} />);
        fireEvent.click( screen.getByText('+1'));
        fireEvent.click( screen.getByText('+1'));
        fireEvent.click( screen.getByText('+1'));
        fireEvent.click( screen.getByRole('button', {name: 'btn-reset'}) );
        expect( screen.getByText(value) ).toBeTruthy();
    });

});