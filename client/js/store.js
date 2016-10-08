import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

import rootReducer from './reducers/index';
import course from './data/course';


const defaultState = {
	course
};


const store = createStore(rootReducer, defaultState);
export const history = syncHistoryWithStore(browserHistory, store);


export default store;
