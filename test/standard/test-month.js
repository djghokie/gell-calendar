const assert = require('assert');
const _ = require('lodash');

const timeperiod = require('../../domain/timeperiod');
const { month } = require('../../standard');

const { assertEvent } = require('../../ut/assert');

describe('month time period', function() {
    let timePeriod_;

    beforeEach(function() {
        timePeriod_ = timeperiod.materialize(month);
    })

    describe('calendar instance', function() {
        beforeEach(function() {
        })
    
        it('now', function() {
            const calendar_ = timePeriod_.instance();

            const calendar$ = calendar_.snapshot();

            assert(calendar$.startTs);
        })

        it('specific month', function() {
            const calendar_ = timePeriod_.instance('6/24/2024 17:55');

            const calendar$ = calendar_.snapshot();

            assertEvent.bounds(calendar$, '6/1/2024', { months: 1 });
        })
    })
})
