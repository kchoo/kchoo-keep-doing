# kchoo-keep-doing

A helper function for doing async things serially (probably obsolete with `async`/`await` inside loops)

## Usage

It's a little complicated, the idea is:

`keepDoing()` takes three arguments:
* the "main" function you want to execute every iteration
  * this has two parameters, the object of arguments you pass every time, and the `Deferred` (see my `Promise` wrapper at https://github.com/kchoo/kchoo-q) instance for continuing or exiting
* the "exit" function you want to execute once you've exited "main"
  * the single parameter here is whatever you passed into `deferred.reject()` in "main"
* the object of initial arguments you want to pass into "main"

```
// function for counting to 10, 1 second at a time

const keepDoing = require('kchoo-keep-doing');

const numIterations = 10;

keepDoing(
  function ({i}, deferred) {
    if (i === numIterations) {
      deferred.reject({i});
    } else {
      deferred.resolve({
        i: i + 1
      });
    }
  },
  function ({i}) {
    console.log(`Counted to ${i}`);
  },
  {
    i: 0
  }
);
```
