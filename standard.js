const {
	startOfWeek
} = require('date-fns');

const day = {
	id: 'day',
	label: 'DAY',
	icon: 'fas fa-calendar-day',
	sortFormat: 'yyyy-MM-dd',
	nameFormat: 'PPP',
	stepAttribute: 'days'
}

const week = {
	id: 'week',
	label: 'WEEK',
	icon: 'fas fa-calendar-week',
	sortFormat: 'yyyy-ww',
	// WEEK: ts => `${format(ts, 'yyyy')}-W${format(ts, 'ww')}`,
	nameFormat: 'PPP',
    startF: startOfWeek,
    durationAttribute: 'weeks'
}

const month = {
	id: 'month',
	label: 'MONTH',
	icon: 'fas fa-calendar',
	sortFormat: 'yyyy-MM',
	nameFormat: 'PPP',
	stepAttribute: 'months'
}

module.exports = {
    day,
    week,
    month
}