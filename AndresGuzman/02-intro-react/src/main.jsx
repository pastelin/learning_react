import React from 'react';
import ReactDOM from 'react-dom/client';
import { HellorWorldApp } from './components/HellorWorldApp';

// const h1 = React.createElement('h1', null, 'Contenido del título'); // Forma original de crear elementos
// const h1 = <h1>Contenido del Título</h1> // Forma corta de crear elementos que al final se convierten a la forma anterior
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HellorWorldApp user={{ name: 'Pepe', lastName: 'Doe' }} id={1} title={'Hola Mundo'} />
	</React.StrictMode>
);
