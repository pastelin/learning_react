import React from 'react';
import ReactDOM from 'react-dom/client';
import {HellowWorldApp} from './HellowWorldApp';
import {FirstApp} from './FirstApp'

import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
        <FirstApp title='Hola, soy Goku!' subtitle={123} />
	</React.StrictMode>
);
