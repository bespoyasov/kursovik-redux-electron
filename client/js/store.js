import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

import rootReducer from './reducers/index';
import course from './data/course';
import app from './data/app';


const defaultState = {
	course,
	app
};


const store = createStore(rootReducer, defaultState);
export const history = syncHistoryWithStore(browserHistory, store);


export default store;
