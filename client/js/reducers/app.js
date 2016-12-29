import cst from '../const';


function app(state = {}, action) {

	switch(action.type) {

		case cst.CHANGE_ACTIVE_TAB:
			return {
				...state,
				activeTab: action.idx
			}


		case cst.CHANGE_LOADING_MODE:
			return {
				...state,
				isLoading: action.mode
			}


		case cst.SET_ERROR:
			return {
				...state,
				error: action.ermsg
			}


		case cst.SET_CONNECTION_STATUS:
			return {
				...state,
				connection: action.status,
				error: !action.status ? cst.MESSAGES.noConnection : null,
			}


		default:
      return state;
  }
}


export default app;
