const assert = require('assert');

const { format } = require('date-fns');

/**
 * WIP: probably change this name to catalog
 */
class TimePeriods {

    defs=[]

    constructor() {}

    add(def) {
        this.defs.push(def);
    }

	instance(timePeriod, dateTime=Date.now()) {
        assert(timePeriod);

		const tp = this.defs.find(t => t.id === timePeriod);

        if (tp) {
            return {
                label: tp.label,
                icon: tp.icon,
                name: format(dateTime, tp.nameFormat),
                sortValue: format(dateTime, tp.sortFormat),
            }
        }
	}

}

module.exports = {
    TimePeriods
}