const assert = require('assert');
const _ = require('lodash');

const { TimePeriods } = require('../domain/timeperiods');
const { day, week, month } = require('../standard');

describe('time periods', function() {
    let timePeriods;

    beforeEach(function() {
        timePeriods = new TimePeriods();
    })

    describe('configuring', function() {
        beforeEach(function() {
        })
    
        it('can add', function() {
            timePeriods.add(month);

            assert.strictEqual(timePeriods.defs.length, 1);
        })
    })

    describe('instance', function() {
        beforeEach(function() {
            timePeriods.defs = [
                day,
                week,
                month
            ];
        })
    
        it('returns instance if defined', function() {
            const calendar$ = timePeriods.instance('day', new Date('10/5/2024 11:25'));

            assert.strictEqual(calendar$.name, 'October 5th, 2024');
        })
    })
})