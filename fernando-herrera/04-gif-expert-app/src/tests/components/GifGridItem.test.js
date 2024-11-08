import { shallow } from 'enzyme'
import { GifGridItem } from '../../components/GifGridItem';

describe('Pruebas en <GifGridItem />', () => {

    const title = 'imagen';
    const url = 'http://localhost/imagen.jpg'
    
    test('debe mostrar <CounterApp /> correctamente', () => {

        let wraper = shallow(<GifGridItem title={title} url={url} />);

        expect(wraper).toMatchSnapshot();

    });



})