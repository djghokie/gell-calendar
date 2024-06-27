const assert = require('assert');
const _ = require('lodash');

const { TimePeriods } = require('../../domain/timeperiods');
const { day, week } = require('../../standard');

const instance = require('../../snapshot/instance');

describe('snapshot time period instance', function() {
    let deps;

    beforeEach(function() {
        const timePeriods = new TimePeriods(day, week);

        deps = this.deps.branch({
            timePeriods
        });
    })

    describe('effect', function() {
        beforeEach(function() {
        })
    
        it('returns calendar_', async function() {
            const calendar_ = await instance.effect({
                params: {
                    timePeriod: 'week'
                },
                deps
            });

            const calendar$ = calendar_.snapshot();

            assert(calendar$.startTs);
        })
    })

    describe('api', function() {
        beforeEach(function() {
        })
    
        it('returns calendar_', async function() {
            const calendar_ = await instance.api({
                params: {
                    timePeriod: 'week'
                },
                deps
            });

            const calendar$ = calendar_.snapshot();

            assert(calendar$.startTs);
        })
    })
})
