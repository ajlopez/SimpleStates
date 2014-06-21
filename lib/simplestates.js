
function State() {
    var whens = { };
    
    this.when = function (trigger, newstate) {
        return this;
    }
}

function StateMachine(initialstate) {
    var states = { };
    var currstate = initialstate;
    
    this.state = function (name) {
        var st = new State();
        states[name] = st;
        return st;
    }
    
    this.getState = function () { return currstate; }
}

function createStateMachine(initialstate) {
    return new StateMachine(initialstate);
}

module.exports = {
    stateMachine: createStateMachine
}