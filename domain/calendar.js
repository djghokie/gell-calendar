const { State } = require('gell');

const javascript = require('gell-domain/binding/javascript');

const { format } = require('date-fns');

class Calendar extends State {

    get startTs() {
        return this.get('startTs');
    }

    get endTs() {
        return this.get('endTs');
    }

}

const model = {
    class: Calendar,

    attributes: {
        startTs: 'timestamp',
        endTs: 'timestamp',
        nameFormat: 'string',
        name: function() {
            const { startTs, nameFormat } = this.snapshotPartial(['startTs', 'nameFormat']);

            if (startTs && nameFormat) return format(startTs, nameFormat);
        }
    }
}

module.exports = {
    Calendar,

    materialize: calendar$ => javascript.materialize(calendar$, model)
}