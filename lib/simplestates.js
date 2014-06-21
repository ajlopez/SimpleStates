
function State(newstatefn) {
    var whens = { };    var enterfns = [];
    var exitfns = [];    
    this.when = function (trigger, newstate) {        whens[trigger] = newstate;
        return this;
    };        this.fire = function (trigger) {        var newstate = whens[trigger];                if (newstate)            newstatefn(newstate);    };        this.enter = function (fn) {        enterfns.push(fn);        return this;    };
        this.exit = function (fn) {        exitfns.push(fn);        return this;    };        this.doEnter = function () {        enterfns.forEach(function (fn) { fn(); });    }        this.doExit = function () {        exitfns.forEach(function (fn) { fn(); });    }}

function StateMachine(initialstate) {
    var states = { };
    var currstate = initialstate;
    
    this.state = function (name) {
        var st = new State(setNewState);
        states[name] = st;
        return st;
    };        function setNewState(state) {        if (currstate === state)            return;                if (states[currstate])            states[currstate].doExit();                    currstate = state;                if (states[currstate])            states[currstate].doEnter();    }
    
    this.getState = function () { return currstate; };        this.fire = function (trigger) {        var st = states[currstate];                st.fire(trigger);    };
}

function createStateMachine(initialstate) {
    return new StateMachine(initialstate);
}

module.exports = {
    stateMachine: createStateMachine
}