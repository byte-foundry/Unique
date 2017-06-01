import React from 'react';
import ReactDOM from 'react-dom';
import App from './layout/app/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
