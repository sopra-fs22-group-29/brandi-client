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

export const marbleMove = async (ref, holesArray) => {
  await waitForAnimationToFinish();
  animationRunning = true;

  let duration = 0;
  if (holesArray.length === 2) {
    duration = 100;
  } else if (holesArray.length < 9) {
    duration = 80;
  } else {
    duration = 70;
  }

  document.body.style.cursor = "auto";

  for (let i = 0; i < holesArray.length - 1; i++) {
    await jumpOneHole(ref, holesArray[i], holesArray[i + 1], duration);
  }

  animationRunning = false;
};

const jumpOneHole = async (ref, from, to, duration) => {
  const fromCoordinates = marblePosition(from);
  const toCoordinates = marblePosition(to);
  const movement = [
    toCoordinates[0] - fromCoordinates[0],
    toCoordinates[1] - fromCoordinates[1],
    toCoordinates[2] - fromCoordinates[2],
  ];
  // console.log("from hole: " + from + " " + fromCoordinates);
  // console.log("to hole: " + to + " " + toCoordinates);
  // console.log(movement);
  const loopDelay = 2;
  const iterations = duration / loopDelay;
  const yMovement = Math.PI / iterations;
  const height = 0.025;

  const movementPerIteration = [
    movement[0] / iterations,
    movement[1] / iterations,
    movement[2] / iterations,
  ];
  //   console.log(movementPerIteration);

  for (let i = 0; i < iterations; i++) {
    ref.current.position.x = fromCoordinates[0] + i * movementPerIteration[0];
    ref.current.position.y =
      fromCoordinates[1] + Math.sin(yMovement * i) * height;
    ref.current.position.z = fromCoordinates[2] + i * movementPerIteration[2];

    // if (i % 30 == 0) {
    //   console.log("coordinates: ");
    //   console.log(ref.current.position.x);
    //   console.log(ref.current.position.y);
    //   console.log(ref.current.position.z);
    // }

    await waitForMs(loopDelay);
  }

  ref.current.position.x = toCoordinates[0];
  ref.current.position.y = toCoordinates[1];
  ref.current.position.z = toCoordinates[2];
};

export const waitForAnimationToFinish = async () => {
  while (animationRunning) {
    await waitForMs(2);
  }
};
