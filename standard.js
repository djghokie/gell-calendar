const {
	startOfHour,
	startOfDay,
	startOfWeek,
	startOfMonth,
	startOfYear
} = require('date-fns');

const hour = {
	id: 'hour',
	label: 'HOUR',
	icon: 'fas fa-hourglass',
	sortFormat: 'yyyy-MM-dd-HH',
	nameFormat: 'yyyy-MM-dd-HH',
    startF: startOfHour,
	durationAttribute: 'hours'
}

const day = {
	id: 'day',
	label: 'DAY',
	icon: 'fas fa-calendar-day',
	sortFormat: 'yyyy-MM-dd',
	nameFormat: 'PPP',
    startF: startOfDay,
	durationAttribute: 'days'
}

const week = {
	id: 'week',
	label: 'WEEK',
	icon: 'fas fa-calendar-week',
	sortFormat: "yyyy-'W'ww",
	nameFormat: 'MMMM d',
    startF: startOfWeek,
    durationAttribute: 'weeks'
}

const month = {
	id: 'month',
	label: 'MONTH',
	icon: 'fas fa-calendar',
	sortFormat: 'yyyy-MM',
	nameFormat: 'MMMM',
	startF: startOfMonth,
	durationAttribute: 'months'
}

const year = {
	id: 'year',
	label: 'YEAR',
	icon: 'fas fa-calendar',
	sortFormat: 'yyyy',
	nameFormat: 'yyyy',
	startF: startOfYear,
	durationAttribute: 'years'
}

module.exports = {
	hour,
    day,
    week,
    month,
	year
}