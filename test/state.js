var ss = require('..');exports['define state in state machine as object'] = function (test) {    var sm = ss.stateMachine();    var state = sm.state('HangOut');        test.ok(state);    test.equal(typeof state, 'object');};