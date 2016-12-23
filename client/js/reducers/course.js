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
					labels: action.labels,
					fulllabels: action.fulllabels
				}
			}


		case cst.UPDATE_COURSE_MONTH:
			return {
				...state,
				month: {
					data: action.data,
					labels: action.labels,
					fulllabels: action.fulllabels
				}
			}


		case cst.UPDATE_COURSE_QUART:
			return {
				...state,
				quart: {
					data: action.data,
					labels: action.labels,
					fulllabels: action.fulllabels
				}
			}


		default:
      return state;
  }
}


export default course;
