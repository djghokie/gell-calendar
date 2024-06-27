const assert = require('assert');
const _ = require('lodash');

const { add, intervalToDuration } = require('date-fns');

const calendar = require('./calendar');

const OPTIONS_FORWARD = { 
    yieldSnapshots: false
};

/**
 * WIP: this should probably extend State
 */
class TimePeriod {

    constructor(def) {
        assert(def);

        this.def = def;
    }

    modDuration(dateTime) {
        assert(dateTime);

        return intervalToDuration({ start: this.def.startF(dateTime), end: dateTime });
    }

    *forward(start, end, options=OPTIONS_FORWARD) {
        assert(start, 'start is required');

        if (end) var endTs = (_.isDate(end) ? end : new Date(end)).getTime();
        const defaulted = _.defaults(options, OPTIONS_FORWARD);

        const step = { [this.def.durationAttribute]: 1 };

        let currentStart = this.def.startF(start).getTime();
        do {
            /**
             * WIP: calendar_ is really a projection of a time period
             *  - what attributes should be included?
             */
            const calendar_ = calendar.materialize({
                startTs: currentStart,
                endTs: add(currentStart, step).getTime(),
                nameFormat: this.def.nameFormat
            });

            yield defaulted.yieldSnapshots ? calendar_.snapshot() : calendar_;

            currentStart = add(currentStart, step).getTime();
        } while (!end || currentStart < endTs);
    }

}

module.exports = {
    TimePeriod
}