import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import course from './course';
import app from './app';


const rootReducer = combineReducers({
	course,
	app,
	routing: routerReducer
});


export default rootReducer;
