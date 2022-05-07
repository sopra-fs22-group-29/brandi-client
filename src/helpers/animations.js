import { marblePosition } from "./marblePosition";

const waitForMs = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export let animationRunning = false;

export const marbleJump = async (ref, coordinates, destinationHole) => {
  await waitForAnimationToFinish();
  animationRunning = true;

  const destCoordinates = marblePosition(destinationHole);
  const movement = [
    destCoordinates[0] - coordinates[0],
    destCoordinates[1] - coordinates[1],
    destCoordinates[2] - coordinates[2],
  ];
  //   console.log(coordinates);
  //   console.log(destCoordinates);
  //   console.log(movement);
  const duration = 200.0;
  const loopDelay = 5.0;
  const iterations = duration / loopDelay;
  const yMovement = Math.PI / iterations;
  const height = 0.06;

  const movementPerIteration = [
    movement[0] / iterations,
    movement[1] / iterations,
    movement[2] / iterations,
  ];
  //   console.log(movementPerIteration);

  for (let i = 0; i < iterations; i++) {
    ref.current.position.x = coordinates[0] + i * movementPerIteration[0];
    ref.current.position.y = coordinates[1] + Math.sin(yMovement * i) * height;
    ref.current.position.z = coordinates[2] + i * movementPerIteration[2];

    // if (i % 30 == 0) {
    //   console.log("coordinates: ");
    //   console.log(ref.current.position.x);
    //   console.log(ref.current.position.y);
    //   console.log(ref.current.position.z);
    // }

    await waitForMs(loopDelay);
  }

  animationRunning = false;
};

export const waitForAnimationToFinish = async () => {
  while (animationRunning) {
    await waitForMs(2);
  }
};
