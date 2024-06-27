const assert = require('assert');
const _ = require('lodash');

function dateFromArg(arg) {
	assert(arg);

	if (_.isDate(arg)) return arg;
	if (_.isNumber(arg) || _.isString(arg)) return new Date(arg);

	throw new Error(`invalid date argument ${arg}`);
}

module.exports = {
    dateFromArg
}