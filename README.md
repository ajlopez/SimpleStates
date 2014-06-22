# SimpleStates

Simple state machines in JavaScript.

## Installation

Via npm on Node:

```
npm install simplestates
```

## Usage

Reference in your program:

```js
var ss = require('simplestates');
```

Create state machine with initial state
```js
var sm = ss.stateMachine('OffHook');
```

Define states with trigger actions
```js
sm.state('OffHook')
    .when('CallDialed', 'Ringing');
    
sm.state('Ringing')
    .when('HungUp', 'OffHook')
    .when('CallConnected', 'Connected');
```

Define states with enter and exit functions
```js
var exits = 0;
var ringings = 0;

sm.state('OffHook')
    .when('CallDialed', 'Ringing')
    .exit(function () { exits++; });
    
sm.state('Ringing')
    .enter(function () { ringings++; })
    .when('HungUp', 'OffHook')
    .when('CallConnected', 'Connected');
```

Define triggers with functions
```js
var ringings = 0;

sm.state('OffHook')
    .when('CallDialed', 
        function () { ringings++; }, 
        'Ringing');
```

If a triggered function returns `false` the actions are stopped, and the next defined
actions for the same trigger are executed
```js
var calls = 0;

// ....
    
sm.state('Ringing')
    .when('HungUp', 'OffHook')
    .when('CallConnected', 
        function ()  { if (calls < 100) return false; },
        'Stop');
    .when('CallConnected', 
        function ()  { call++; }, 
        'Connected');
```

Usage in browser
```html
<script src='simplestates.js' type='text/javascript'></script>
```
Then the `simplestates` object is defined:
```js
var machine = simplestates.stateMachine('OffHook');
```



## Development

```
git clone git://github.com/ajlopez/SimpleStates.git
cd SimpleStates
npm install
npm test
```

## Samples

TBD

## References

- [Stateless](https://code.google.com/p/stateless/) A C# Hierarchical State Machine
- [Simple State Machine](http://simplestatemachine.codeplex.com/) 

## License

MIT

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleStates) and submit
[pull requests](https://github.com/ajlopez/SimpleStates/pulls) — contributions are
welcome<

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

