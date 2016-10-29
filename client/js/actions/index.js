import cst from '../const';


export function updateCourseValue(cur, prev) {
	return {
		type: cst.UPDATE_COURSE_VALUE,
		cur, prev
	}
};


export function updateCourseWeek(data, labels) {
	return {
		type: cst.UPDATE_COURSE_WEEK,
		data, labels
	}
}
