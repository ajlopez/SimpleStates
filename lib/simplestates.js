
var simplestates = (function () {
    function State(newstatefn) {
        var whens = { };        var enterfns = [];
        var exitfns = [];        
        this.when = function (trigger, newstate) {
            var steps;
            
            if (arguments.length > 2)
                steps = Array.prototype.slice.call(arguments, 1);
            else                steps = newstate;
                
            if (!whens[trigger])
                whens[trigger] = [];
                
            whens[trigger].push(steps);
            
            return this;
        };                this.fire = function (trigger) {            var arrsteps = whens[trigger];
            
            if (!arrsteps)
                return;            
            for (var n = 0; n < arrsteps.length; n++) {
                var newstate = arrsteps[n];
                                if (newstate)
                    if (Array.isArray(newstate)) {
                        for (var k = 0; k < newstate.length; k++) {
                            var step = newstate[k];
                            if (typeof step == 'function') {
                                if (step() === false)
                                    break;
                            }
                            else
                                newstatefn(step);
                        }
                        
                        if (k >= newstate.length)
                            break;
                    }
                    else {                        newstatefn(newstate);
                        break;
                    }
            }        };                this.enter = function (fn) {            enterfns.push(fn);            return this;        };
                this.exit = function (fn) {            exitfns.push(fn);            return this;        };                this.doEnter = function () {            enterfns.forEach(function (fn) { fn(); });        }                this.doExit = function () {            exitfns.forEach(function (fn) { fn(); });        }    }

    function StateMachine(initialstate) {
        var states = { };
        var currstate = initialstate;
        
        this.state = function (name) {
            var st = new State(setNewState);
            states[name] = st;
            return st;
        };                function setNewState(state) {            if (currstate === state)                return;                        if (states[currstate])                states[currstate].doExit();                            currstate = state;                        if (states[currstate])                states[currstate].doEnter();        }
        
        this.getState = function () { return currstate; };                this.fire = function (trigger) {            var st = states[currstate];                        st.fire(trigger);        };
    }

    function createStateMachine(initialstate) {
        return new StateMachine(initialstate);
    }

    return {
        stateMachine: createStateMachine
    }})();

if (typeof window === 'undefined')
    module.exports = simplestates;