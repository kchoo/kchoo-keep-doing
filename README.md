# kchoo-keep-doing

A helper function for looping async tasks (probably obsolete with `async`/`await` inside loops)

## Usage

It's a little complicated, the idea is:

`keepDoing()` takes two arguments:
* the "main" function you want to execute every iteration
  * this has N + 2 parameters, where N is the number of arguments you want to pass for each iteration
  * the last two parameters are like `resolve()` and `reject()` of `Promise`, call the first to continue looping, call the second to stop
* the initial arguments you want to pass into your function

```
// function for counting from 0 to 10, in increments of 2, with 500 milliseconds between each number

const keepDoing = require('kchoo-keep-doing');

const numIterations = 10;
const step = 2;
const period = 500;

const loopPromise = keepDoing(
  function (i, loop, exit) {
    if (i >= numIterations) {
      exit(i);
    } else {
      setTimeout(function () {
        loop(i + step);
      }, period);
    }
  },
  0
);

loopPromise.then(function (finalI) { console.log(`Performed ${finalI} iterations`); });
```

## Drawbacks

The way this is currently implemented, heap and stack space allocated for every iteration of the loop cannot be freed until the loop exits, which could lead to significant memory usage for large numbers of iterations.

## Coming soon

Doing batches of async tasks. Say you want to do 50 tasks, and they're largely independent, but you only want to do 10 at a time. I want to add logic that does `N` tasks in parallel, waits for them all to call `loop()`, and then kicks off the next `N` tasks.
