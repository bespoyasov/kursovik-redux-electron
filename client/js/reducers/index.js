import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import course from './course';


const rootReducer = combineReducers({
	course,
	routing: routerReducer
});


export default rootReducer;
