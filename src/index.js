import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { routeChanged, inputChanged, requestFaceMatch, userChanged} from './reducers.js'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';

const logger = createLogger();
// Initializing Redux: Combine reducers and create store wrap App around Provider(store)
const rootReducer = combineReducers({routeChanged, inputChanged, requestFaceMatch, userChanged});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
