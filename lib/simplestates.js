
function State(newstatefn) {
    var whens = { };
    
    this.when = function (trigger, newstate) {        whens[trigger] = newstate;
        return this;
    };        this.fire = function (trigger) {        var newstate = whens[trigger];                if (newstate)            newstatefn(newstate);    };
}

function StateMachine(initialstate) {
    var states = { };
    var currstate = initialstate;
    
    this.state = function (name) {
        var st = new State(setNewState);
        states[name] = st;
        return st;
    };        function setNewState(state) {        currstate = state;    }
    
    this.getState = function () { return currstate; };        this.fire = function (trigger) {        var st = states[currstate];                st.fire(trigger);    };
}

function createStateMachine(initialstate) {
    return new StateMachine(initialstate);
}

module.exports = {
    stateMachine: createStateMachine
}