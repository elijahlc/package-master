import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './store';

import App from './Components/App';

const root = createRoot(document.querySelector('#root'));

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
