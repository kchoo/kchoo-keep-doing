# kchoo-keep-doing

A helper function for looping async tasks (probably obsolete with `async`/`await` inside loops, but that isn't supported by AWS lambda functions yet)

## Usage

It's a little complicated, the idea is:

`keepDoing()` takes two arguments:
* the "main" function you want to execute every iteration
  * this has N + 2 parameters, where N is the number of arguments you want to pass for each iteration
  * the last two parameters are like `resolve()` and `reject()` of `Promise`, call the first to continue looping with new arguments, call the second to stop (with the value you want `keepDoing()`'s `Promise` to resolve with)
* the initial arguments you want to pass into your function

```
// function for counting from 0 to 10, in increments of 2, with 500 milliseconds between each number

// note: not an npm package yet
const keepDoing = require('kchoo-keep-doing');

const numIterations = 10;
const step = 2;
const period = 500;

const loopPromise = keepDoing(
  function (i, next, stop) {
    if (i >= numIterations) {
      stop(i);
    } else {
      setTimeout(function () {
        next(i + step);
      }, period);
    }
  },
  0
);

loopPromise.then(function (finalI) { console.log(`Performed ${finalI} iterations`); });
```

## Coming soon

Doing batches of async tasks. Say you want to do 50 tasks, and they're independent, but you only want to do 10 at a time. I want to add logic that does `N` tasks in parallel, waits for them all to call `next()`, and then kicks off the next `N` tasks.
