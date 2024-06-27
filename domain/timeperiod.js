const assert = require('assert');
const _ = require('lodash');

const { State } = require('gell');
const javascript = require('gell-domain/binding/javascript');

const { add, intervalToDuration } = require('date-fns');

const calendar = require('./calendar');
const { dateFromArg } = require('../util');

const OPTIONS_FORWARD = { 
    yieldSnapshots: false
};

/**
 * WIP: this should probably extend State
 * 
 * WIP: protential attributes
 *  - parent
 *      - MONTH would be the parent of WEEK
 *  - child
 *      - MONTH would be the child of year
 *  - namedChildren
 *      - 'sunday', 'monday', etc are named children of WEEK
 */
class TimePeriod extends State {

    constructor(def) {
        super();

        // assert(def);

        this.def = def;
    }

    instance(dateTime=Date.now()) {
        const ts = this.def.startF(dateTime).getTime();

        const { durationAttribute, nameFormat } = this.snapshotPartial(['durationAttribute', 'nameFormat']);

        const step = { [durationAttribute]: 1 };

        return calendar.materialize({
            startTs: ts,
            endTs: add(ts, step).getTime(),
            nameFormat
        });
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
            // console.debug('#####', new Date(currentStart), new Date(endTs), step);
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

    /**
     * Like forward, but iterate backwards in time
     * 
     * @param {*} start 
     * @param {*} end 
     * @param {*} options 
     */
    *reverse(start, end, options=OPTIONS_FORWARD) {
        throw new Error('NYI')
    }

    /**
     * Iterate forward or back n number of time periods
     * 
     * @param {*} start 
     * @param {*} end 
     * @param {*} step 
     * @param {*} options 
     */
    *step(start, end, step=1, options=OPTIONS_FORWARD) {
        throw new Error('NYI')
    }

}

const model = {
    class: TimePeriod,

    attributes: {
        id: 'string',
        label: 'string',
        icon: 'string',
        sortFormat: 'string',
        nameFormat: 'string',
        // startF: 'derived',
        durationAttribute: 'string'
    }
}

module.exports = {
    TimePeriod,

    materialize: tp$ => {
        const tp_ = javascript.materialize(tp$, model)

        // WIP: still haven't figured out how to materialize startF
        tp_.def = tp$;

        return tp_;
    }
}