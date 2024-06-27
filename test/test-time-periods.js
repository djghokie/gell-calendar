const assert = require('assert');
const _ = require('lodash');

const { TimePeriods } = require('../domain/timeperiods');
const { day, week, month } = require('../standard');

const { assertTimestamp } = require('../ut/assert');

describe('time periods', function() {
    let timePeriods;

    beforeEach(function() {
        timePeriods = new TimePeriods();
    })

    it('can be constructed with multiple', function() {
        timePeriods = new TimePeriods(day, week);

        assert.strictEqual(timePeriods.attributes().length, 2);
    })

    describe('configuring', function() {
        beforeEach(function() {
        })
    
        it('can add', function() {
            timePeriods.add(month);

            assert.strictEqual(timePeriods.attributes().length, 1);
        })

        it('can add multiple', function() {
            timePeriods.add(month, week);

            assert.strictEqual(timePeriods.attributes().length, 2);
        })
    })

    describe('instance', function() {
        beforeEach(function() {
            timePeriods.add(day, week, month);
        })
    
        it('returns instance if defined', function() {
            const calendar_ = timePeriods.instance('day', new Date('10/5/2024 11:25'));

            const calendar$ = calendar_.snapshot();

            // console.debug('#####', calendar$);

            assert.strictEqual(calendar$.name, 'October 5th, 2024');
            assertTimestamp.same(calendar$.startTs, '10/5/2024');
        })
    })

    describe('snapshot', function() {
        beforeEach(function() {
        })
    
        it('empty', function() {
            const timeperiods$ = timePeriods.snapshot();

            assert.deepStrictEqual(timeperiods$, {});
        })

        it('single time period', function() {
            timePeriods.add(day);
        
            const timeperiods$ = timePeriods.snapshot();

            const expected$ = Object.assign({}, day);
            delete expected$.startF;

            assert.deepStrictEqual(timeperiods$, { day: expected$ });
        })
    })
})