
var ss = require('..');

exports['fire a trigger'] = function (test) {
    var sm = ss.stateMachine('OffHook');
    sm.state('OffHook').when('CallDialed', 'Ringing');
    
    test.equal(sm.getState(), 'OffHook');
    sm.fire('CallDialed');
    test.equal(sm.getState(), 'Ringing');
};

exports['one exit function'] = function (test) {
    var calls = 0;
    var sm = ss.stateMachine('OffHook');
    sm.state('OffHook')
        .when('CallDialed', 'Ringing')
        .exit(function () { calls++; });
        
    test.equal(sm.getState(), 'OffHook');
    sm.fire('CallDialed');
    test.equal(sm.getState(), 'Ringing');
    test.equal(calls, 1);
};

exports['two exit functions'] = function (test) {
    var calls = 0;
    var calls2 = 0;
    
    var sm = ss.stateMachine('OffHook');
    sm.state('OffHook')
        .when('CallDialed', 'Ringing')
        .exit(function () { calls++; })
        .exit(function () { calls2++; });
        
    test.equal(sm.getState(), 'OffHook');
    sm.fire('CallDialed');
    test.equal(sm.getState(), 'Ringing');
    test.equal(calls, 1);
    test.equal(calls2, 1);
};

exports['one enter function'] = function (test) {
    var ringings = 0;
    var sm = ss.stateMachine('OffHook');
    sm.state('OffHook')
        .when('CallDialed', 'Ringing');
        
    sm.state('Ringing')
        .enter(function() { ringings++; });
        
    test.equal(sm.getState(), 'OffHook');
    sm.fire('CallDialed');
    test.equal(sm.getState(), 'Ringing');
    test.equal(ringings, 1);
};

exports['two enter functions'] = function (test) {
    var ringings = 0;
    var ringings2 = 0;
    var sm = ss.stateMachine('OffHook');
    sm.state('OffHook')
        .when('CallDialed', 'Ringing');
        
    sm.state('Ringing')
        .enter(function() { ringings++; })
        .enter(function() { ringings2++; });
        
    test.equal(sm.getState(), 'OffHook');
    sm.fire('CallDialed');
    test.equal(sm.getState(), 'Ringing');
    test.equal(ringings, 1);
    test.equal(ringings2, 1);
};
