import { shallow } from 'enzyme';
import CounterApp from '../CounterApp';

describe('Pruebas en <CounterApp />', () => {

    let wraper = shallow(<CounterApp />);

    beforeEach(() => {
        wraper = shallow(<CounterApp />);
    });

    test('debe mostrar <CounterApp /> correctamente', () => {

        expect(wraper).toMatchSnapshot();
    });

    test('debe mostrar el valor por defecto de 100', () => {

        const wrap = shallow( <CounterApp value={100}/> );
        const valorCounter = wrap.find('h2').text().trim();

        expect(valorCounter).toBe('100');
    });

    test('debe de incrementar con el boton +1', () => {

        wraper.find('button').at(0).simulate('click');
        const counterText = wraper.find('h2').text().trim();

        expect(counterText).toBe('11');

    });
    
    test('debe de decrementar con el boton -1', () => {

        wraper.find('button').at(2).simulate('click');
        const counterText = wraper.find('h2').text().trim();

        expect(counterText).toBe('9');

    });

    test('debe de colocar el valor por defecto con el btn reset', () => {

        const wrap = shallow( <CounterApp value={100}/> );

        wraper.find('button').at(0).simulate('click');
        wraper.find('button').at(0).simulate('click');
        wraper.find('button').at(1).simulate('click');
        const counterText = wraper.find('h2').text().trim();

        expect(counterText).toBe('100');

    });

});