
var ss = require('..');

exports['fire a trigger with function'] = function (test) {
    var calls = 0;
    var sm = ss.stateMachine('OffHook');
    sm.state('OffHook').when('CallDialed', function () { calls++; }, 'Ringing');
    
    test.equal(sm.getState(), 'OffHook');
    sm.fire('CallDialed');
    test.equal(sm.getState(), 'Ringing');
    test.equal(calls, 1);
};

exports['fire a trigger with two functions'] = function (test) {
    var calls = 0;
    var calls2 = 0;
    var sm = ss.stateMachine('OffHook');
    sm.state('OffHook').when('CallDialed', function () { calls++; }, function () { calls2++; }, 'Ringing');
    
    test.equal(sm.getState(), 'OffHook');
    sm.fire('CallDialed');
    test.equal(sm.getState(), 'Ringing');
    test.equal(calls, 1);
    test.equal(calls2, 1);
};

