const assert = require('assert');

const { State } = require('gell');

const timeperiod = require('./timeperiod');

/**
 * WIP: probably change this name to catalog
 */
class TimePeriods extends State {

    constructor(...defs) {
        super();

        this.add(...defs);
    }

    add(...defs) {
        defs.forEach(def => this.set(def.id, timeperiod.materialize(def)));
    }

	instance(timePeriod, dateTime=Date.now()) {
        assert(timePeriod);

        const tp_ = this.get(timePeriod);

        if (tp_) return tp_.instance(dateTime);
	}

}

module.exports = {
    TimePeriods
}