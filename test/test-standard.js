const assert = require('assert');
const _ = require('lodash');

const standard = require('../standard');

const { format } = require('date-fns');

describe('standard time periods', function() {
    beforeEach(function() {
    })

    function defTests(id) {
        describe(`standard time period "${id}"`, function() {
            let def;

            beforeEach(function() {
                def = standard[id];
            })

            it('id matches', function() {
                assert.strictEqual(id, def.id);
            })
        
            it('defines label', function() {
                assert(_.isString(def.label));
            })

            it('defines icon', function() {
                assert(_.isString(def.icon));
            })

            it('defines sort format', function() {
                assert(_.isString(def.sortFormat));

                format(new Date(), def.sortFormat);
            })

            it('defines name format', function() {
                assert(_.isString(def.nameFormat));

                format(new Date(), def.nameFormat);
            })

            it('defines start function', function() {
                assert(_.isFunction(def.startF));
            })

            it('defines duration attribute', function() {
                assert(_.isString(def.durationAttribute));
            })
        })
    }

    Object.keys(standard).forEach(defTests);
})