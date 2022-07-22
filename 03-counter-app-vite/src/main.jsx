import React from 'react';
import ReactDOM from 'react-dom/client';
import {HellowWorldApp} from './HellowWorldApp';
import {FirstApp} from './FirstApp'

import './style.css';
import { CounterApp } from './CounterApp';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
        {/* <CounterApp value={10}/> */}
		<FirstApp title="Hola, Soy Juan" />
	</React.StrictMode>
);
