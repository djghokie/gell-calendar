const {
	startOfDay,
	startOfWeek,
} = require('date-fns');

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
	sortFormat: 'yyyy-ww',
	// WEEK: ts => `${format(ts, 'yyyy')}-W${format(ts, 'ww')}`,
	nameFormat: 'MMMM d',
    startF: startOfWeek,
    durationAttribute: 'weeks'
}

const month = {
	id: 'month',
	label: 'MONTH',
	icon: 'fas fa-calendar',
	sortFormat: 'yyyy-MM',
	nameFormat: 'PPP',
	durationAttribute: 'months'
}

module.exports = {
    day,
    week,
    month
}