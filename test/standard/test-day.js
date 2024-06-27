const assert = require('assert');
const _ = require('lodash');

const { TimePeriod } = require('../../domain/timeperiod');
const { day } = require('../../standard');

const { assertTimestamp } = require('../../ut/assert');

describe('day time period', function() {
    let day_;

    beforeEach(function() {
        day_ = new TimePeriod(day);
    })

    describe('forward iterator', function() {
        let $forward;

        beforeEach(function() {
            $forward = day_.forward('June 25, 2024 14:12', '6/28/2024', { yieldSnapshots: true });
        })
    
        it('generates first calendar correctly', function() {
            // const first_ = $forward.next().value;
            const first$ = $forward.next().value;

            assertTimestamp.same(first$.startTs, "June 25, 2024");
            assert.strictEqual(first$.name, "June 25th, 2024");
        })

        it('generates second calendar correctly', function() {
            $forward.next();
            const second$ = $forward.next().value;

            assertTimestamp.same(second$.startTs, "June 26, 2024");
        })
    })

    describe('mod duration', function() {
        beforeEach(function() {
        })
    
        it('returns correct duration for day start', function() {
            const duration = day_.modDuration('June 23, 2024');

            assert.deepStrictEqual(duration, {});
        })

        it('returns correct duration for day middle', function() {
            const duration = day_.modDuration('June 26, 2024 15:30');

            assert.deepStrictEqual(duration, { hours: 15, minutes: 30 });
        })
    })
})
