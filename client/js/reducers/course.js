import cst from '../const';


function course(state = {}, action) {

	switch(action.type) {

		case cst.UPDATE_COURSE_VALUE:
			return {
				...state,
				prev: action.prev,
			  current: action.cur,
			}


		case cst.UPDATE_COURSE_WEEK:
			return {
				...state,
				week: {
					data: action.data,
					labels: action.labels
				}
			}


		default:
      return state;
  }
}


export default course;
