const assert = require('assert');
const _ = require('lodash');

const { add, intervalToDuration } = require('date-fns');

class TimePeriod {

    constructor(def) {
        assert(def);

        this.def = def;
    }

    modDuration(dateTime) {
        assert(dateTime);

        return intervalToDuration({ start: this.def.startF(dateTime), end: dateTime });
    }

    *forward(start, end) {
        assert(start, 'start is required');

        const step = { [this.def.durationAttribute]: 1 };

        if (end) var endTs = (_.isDate(end) ? end : new Date(end)).getTime();

        let currentStart = this.def.startF(start).getTime();

        do {
            const calendar$ = {
                startTs: currentStart,
                endTs: add(currentStart, step).getTime()
            };

            yield calendar$;

            currentStart = add(currentStart, step).getTime();
        } while (!end || currentStart < endTs);
    }

}

module.exports = {
    TimePeriod
}