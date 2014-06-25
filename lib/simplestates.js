
var simplestates = (function () {
    function NewStateAction(newstate, newstatefn) {
        this.doAction = function () {
            newstatefn(newstate);
            return true;
        }
    }
    
    function StepsAction(steps, newstatefn) {
        var l = steps.length;
        
        this.doAction = function () {
            for (var k = 0; k < l; k++) {
                var step = steps[k];
                
                if (typeof step == 'function') {
                    if (step() === false)
                        return false;
                    continue;
                }
                
                newstatefn(step);
            }
            
            return true;
        }
    }
    
    function State(newstatefn) {
        var whens = { };        var enterfns = [];
        var exitfns = [];        
        this.when = function (trigger, newstate) {
            var action;
            
            if (arguments.length > 2)
                action = new StepsAction(Array.prototype.slice.call(arguments, 1), newstatefn);
            else                action = new NewStateAction(newstate, newstatefn);
                
            if (!whens[trigger])
                whens[trigger] = [];
                
            whens[trigger].push(action);
            
            return this;
        };                this.fire = function (trigger) {            var actions = whens[trigger];
            
            if (!actions)
                return false;            
            for (var n = 0; n < actions.length; n++) {
                var action = actions[n];
                
                if (action.doAction())
                    return true;            }
            
            return false;        };                this.enter = function (fn) {            enterfns.push(fn);            return this;        };
                this.exit = function (fn) {            exitfns.push(fn);            return this;        };                this.doEnter = function () {            enterfns.forEach(function (fn) { fn(); });        }                this.doExit = function () {            exitfns.forEach(function (fn) { fn(); });        }    }

    function StateMachine(initialstate) {
        var states = { };
        var currstate = initialstate;
        
        this.state = function (name) {
            var st = new State(setNewState);
            states[name] = st;
            return st;
        };                function setNewState(state) {            if (currstate === state)                return;                        if (states[currstate])                states[currstate].doExit();                            currstate = state;                        if (states[currstate])                states[currstate].doEnter();        }
        
        this.getState = function () { return currstate; };                this.fire = function (trigger) {            var st = states[currstate];                        if (st.fire(trigger))
                return true;
            else
                return false;        };
    }

    function createStateMachine(initialstate) {
        return new StateMachine(initialstate);
    }

    return {
        stateMachine: createStateMachine
    }})();

if (typeof window === 'undefined')
    module.exports = simplestates;