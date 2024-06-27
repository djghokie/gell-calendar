const runtime = require('gell-runtime/mocha');

exports.mochaGlobalSetup = z => {}
exports.mochaGlobalTeardown = z => {}

function setupContext(...args) {
	// this.deps = this.deps.branch({
	// });
}

exports.mochaHooks = {
	beforeAll: [runtime.beforeAll],

	beforeEach: [setupContext]
}
