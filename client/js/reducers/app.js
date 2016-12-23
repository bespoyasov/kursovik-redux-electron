import cst from '../const';


function app(state = {}, action) {

	switch(action.type) {

		case cst.CHANGE_ACTIVE_TAB:
			return {
				...state,
				activeTab: action.idx
			}


		default:
      return state;
  }
}


export default app;
