import cst from '../const';


function course(state = {}, action) {

	switch(action.type) {

		case cst.UPDATE_COURSE_VALUE:
			return {
				...state,
				prev: action.prev,
			  current: action.cur,
			}


		default:
      return state;
  }
}


export default course;
