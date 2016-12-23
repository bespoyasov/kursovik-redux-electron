import cst from '../const';


export function updateCourseValue(cur, prev) {
	return {
		type: cst.UPDATE_COURSE_VALUE,
		cur, prev
	}
};


export function updateCourseWeek(data, labels, fulllabels) {
	return {
		type: cst.UPDATE_COURSE_WEEK,
		data, labels, fulllabels
	}
}


export function updateCourseMonth(data, labels, fulllabels) {
	return {
		type: cst.UPDATE_COURSE_MONTH,
		data, labels, fulllabels
	}
}


export function updateCourseQuart(data, labels, fulllabels) {
	return {
		type: cst.UPDATE_COURSE_QUART,
		data, labels, fulllabels
	}
}


export function changeActiveTab(idx) {
	return {
		type: cst.CHANGE_ACTIVE_TAB,
		idx
	}
}
