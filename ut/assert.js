const assert = require('assert');
const _ = require('lodash');

const {
	isValid,
	isSameDay,
	isSameHour,
	add,
	format
} = require('date-fns');

function dateFromArg(arg) {
	assert(arg);

	if (_.isDate(arg)) return arg;
	if (_.isNumber(arg) || _.isString(arg)) return new Date(arg);

	throw new Error(`invalid date argument ${arg}`);
}

const assertTimestamp = {
	valid: ts => {
		assert(_.isNumber(ts) && !isNaN(ts) && isValid(ts), `value ${ts} is not a valid timestamp`);
	},

	/**
	 * WIP:
	 * 
	 * @param {*} actual 
	 * @param {*} expected 
	 */
	same: (actual, expected) => {
		assert(_.isNumber(actual) && !isNaN(actual), `actual value ${actual} is not a valid timestamp`);

		const expectedTs = dateFromArg(expected).getTime();

		try {
			assert.strictEqual(actual, expectedTs);
		} catch (e) {
			assert(isSameDay(actual, expectedTs), `day of year is not same: ${format(actual, 'yyyy-MM-dd')} vs ${format(expectedTs, 'yyyy-MM-dd')}`);
			assert(isSameHour(actual, expectedTs), `hour of day is not same: ${format(actual, 'HH')} vs ${format(expectedTs, 'HH')}`);

			throw e;
		}
	}
}

const assertDate = {
	same: (actual, expected) => {
		const actualD = dateFromArg(actual);
		const expectedD = dateFromArg(expected);

		return assertTimestamp.same(actualD.getTime(), expectedD.getTime());
	}
}

const assertEvent = {
	bounds: (event, start, endOrDuration) => {
		assert(!_.isUndefined(event), 'event is undefined');
		assert(!_.isUndefined(start), 'start is undefined');
		assert(!_.isUndefined(endOrDuration), 'endOrDuration is undefined');

		const event$ = _.isFunction(event.snapshot) ? event.snapshot() : event;

		assert(event$.startTs, 'startTs not defined by event');
		assert(event$.endTs, 'endTs not defined by event');

		assertTimestamp.same(event$.startTs, start);
		
		if (_.isNumber(endOrDuration) || _.isString(endOrDuration) || _.isDate(endOrDuration))
			var endTs = dateFromArg(endOrDuration).getTime();
		else var endTs = add(event$.startTs, endOrDuration).getTime();

		assertTimestamp.same(event$.endTs, endTs);
	},
}

module.exports = {
	assertTimestamp,
	assertDate,
	assertEvent,
}