import { useFrame } from "@react-three/fiber";
import {
  currentFunction,
  currentFunctionStart,
  functionQueue,
} from "helpers/animations";
import React from "react";
import "styles/views/Game.scss";

// The useFrame hook has to be somewhere inside of the Canvas Component
// To not overload the BasicBoard, I thought of offloading the code here
export const Animate = React.forwardRef((props, ref) => {
  // the forwared refs for all moving elements are deconstructed here
  const {
    blue: [blueOne, blueTwo, blueThree, blueFour],
  } = ref;
  useFrame(({ clock }) => {
    // an example of how to animate the marbles
    blueOne.current.position.y = Math.abs(
      Math.sin(clock.getElapsedTime()) / 10.0
    );
    blueTwo.current.position.y = Math.abs(
      Math.sin(clock.getElapsedTime() + 0.25) / 10.0
    );
    blueThree.current.position.y = Math.abs(
      Math.sin(clock.getElapsedTime() + 0.5) / 10.0
    );
    blueFour.current.position.y = Math.abs(
      Math.sin(clock.getElapsedTime() + 0.75) / 10.0
    );

    // update global clock on every frame
    // globalClock = new Number(clock.getElapsedTime());
    // console.log(typeof clock.getElapsedTime());

    // TODO: execute one function after another
    // each function needs to animate its objects within a predetermined timeframe
    if (currentFunction) {
      currentFunction();
    } else if (functionQueue.length > 0 && currentFunction === undefined) {
      currentFunction = functionQueue.shift();
      currentFunctionStart = clock.getElapsedTime();
    }

    // a function can be enqueued like this:

    // we can pass 'this' in order to access the same context in the target function
    // var fun1 = wrapFunction((str) => {alert(str)}, this, ["Hello, world!"]);
    // functionQueue.push(fun1);

    // most of our functions will probably look a bit more like this:
    // var fun2 = wrapFunction((ballRef, start, end) => {
    //   // function will take 2.000 seconds
    //   const totalTimeS = 2.000;

    //   // the ball should travel from start to end within the timeframe
    //   const travelDistance = end - start;

    //   const progress = (globalClock - currentFunctionStart) / totalTimeS;

    //   // this should update the distance accordingly
    //   ballRef.current.position = start + (travelDistance * progress);

    // }, null, [ballRef, start, end]);
    // functionQueue.push(fun2);
  });
  return <></>;
});
