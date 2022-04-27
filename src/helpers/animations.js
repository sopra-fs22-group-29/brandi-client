// Function wrapping code.
// fn - reference to function
// context - what you want "this" to be.
// params - array of parameters to pass to function.
var wrapFunction = function (fn, context, params) {
  return function () {
    fn.apply(context, params);
  };
};

// Create a function to be wrapped
export const moveBall = function (ballRef, start, end) {
  console.log("executing function");
};

export var functionQueue = [];
export var currentFunction = undefined;
export var currentFunctionStart = undefined;
export var currentFunctionEnd = undefined;
export var globalClock = undefined;
