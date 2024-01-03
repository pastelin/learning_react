import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { MyLabel } from 'jp-custom-components';
import { Button } from 'jp-custom-components';

function App() {
	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<MyLabel label={'Hola Mundo'} allCaps color="text-primary" />
				<Button
					label={'Boton'}
					backgroundColor="#fafafa"
					onClick={() => console.log('click')}
				/>
			</div>
		</>
	);
}

export default App;
