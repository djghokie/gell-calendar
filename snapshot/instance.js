const assert = require('assert');
const _ = require('lodash');

function doInstance(timePeriod, dateTime, deps) {
    const { timePeriods } = deps.resolve('timePeriods');

    const tp_ = timePeriods.instance(timePeriod, dateTime);

    assert(tp_, `time period (id=${timePeriod}) not defined`);

    return tp_;
}

exports.effect = async function(event) {
    const { params={}, deps } = event;

    const { timePeriod, dateTime } = params;
    assert(_.isString(timePeriod), 'timePeriod is required');

    const { logger } = deps.resolve('logger');

    logger.info('executing effect (name="timeperiod.instance")');

    return doInstance(timePeriod, dateTime, deps);
}

/**
 * WIP: placeholder for getting an instance (calendar) from a predefined time period
 * 
 * @param {*} event 
 * @returns 
 */
exports.api = async function(event) {
    const { params={}, deps } = event;
    const { timePeriod, dateTime } = params;
    assert(_.isString(timePeriod), 'timePeriod is required');

    const { logger } = deps.resolve('logger')

    logger.info('executing api (name="timeperiod.instance")');

    return doInstance(timePeriod, dateTime, deps);
}