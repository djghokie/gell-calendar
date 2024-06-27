const assert = require('assert');
const _ = require('lodash');

const { TimePeriod } = require('../../domain/timeperiod');
const { week } = require('../../standard');

describe('week time period', function() {
    let week_;

    beforeEach(function() {
        week_ = new TimePeriod(week);
    })

    describe('forward iterator', function() {
        let $forward;

        beforeEach(function() {
            $forward = week_.forward(new Date('June 19, 2024 10:00').getTime(), null, { yieldSnapshots: true });
        })
    
        it('generates first calendar correctly', function() {
            // const first_ = $forward.next().value;
            const first$ = $forward.next().value;

            assert.strictEqual(first$.startTs, new Date("June 16, 2024").getTime());
            assert.strictEqual(first$.name, "June 16");
        })

        it('generates second calendar correctly', function() {
            $forward.next();
            // const first_ = $forward.next().value;
            const second$ = $forward.next().value;

            assert.strictEqual(second$.startTs, new Date("June 23, 2024").getTime());
        })
    })

    describe('mod duration', function() {
        beforeEach(function() {
        })
    
        it('returns correct duration for week start', function() {
            const duration = week_.modDuration(new Date('June 23, 2024'));

            assert.deepStrictEqual(duration, {});
        })

        it('returns correct duration for week middle', function() {
            const duration = week_.modDuration(new Date('June 26, 2024 15:30').getTime());

            assert.strictEqual(duration.days, 3);
            assert.strictEqual(duration.hours, 15);
            assert.strictEqual(duration.minutes, 30);
        })
    })
})
