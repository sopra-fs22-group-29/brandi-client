export const positionCard1 = (playerColor) => {
  let positionCard1 = [0.3, -0.02, 0.9];
  if (playerColor === "blue") {
    positionCard1 = [-0.8, -0.12, 0.15];
  } else if (playerColor === "yellow") {
    positionCard1 = [-0.3, 0, -0.9];
  } else if (playerColor === "red") {
    positionCard1 = [0.3, 0, -0.9];
  }
  return positionCard1;
};

export const positionCard2 = (playerColor) => {
  let positionCard2 = [0.4, -0.04, 0.75];
  if (playerColor === "blue") {
    positionCard2 = [-0.7, -0.1, 0.3];
  } else if (playerColor === "yellow") {
    positionCard2 = [-0.4, -0.025, -0.75];
  } else if (playerColor === "red") {
    positionCard2 = [0.4, -0.025, -0.75];
  }
  return positionCard2;
};

export const positionCard3 = (playerColor) => {
  let positionCard3 = [0.5, -0.06, 0.6];
  if (playerColor === "blue") {
    positionCard3 = [-0.6, -0.08, 0.45];
  } else if (playerColor === "yellow") {
    positionCard3 = [-0.5, -0.055, -0.6];
  } else if (playerColor === "red") {
    positionCard3 = [0.5, -0.055, -0.6];
  }
  return positionCard3;
};

export const positionCard4 = (playerColor) => {
  let positionCard4 = [0.6, -0.08, 0.45];
  if (playerColor === "blue") {
    positionCard4 = [-0.5, -0.06, 0.6];
  } else if (playerColor === "yellow") {
    positionCard4 = [-0.6, -0.08, -0.45];
  } else if (playerColor === "red") {
    positionCard4 = [0.6, -0.08, -0.45];
  }
  return positionCard4;
};

export const positionCard5 = (playerColor) => {
  let positionCard5 = [0.7, -0.1, 0.3];
  if (playerColor === "blue") {
    positionCard5 = [-0.4, -0.04, 0.75];
  } else if (playerColor === "yellow") {
    positionCard5 = [-0.7, -0.105, -0.3];
  } else if (playerColor === "red") {
    positionCard5 = [0.7, -0.105, -0.3];
  }
  return positionCard5;
};
export const positionCard6 = (playerColor) => {
  let positionCard6 = [0.8, -0.12, 0.15];
  if (playerColor === "blue") {
    positionCard6 = [-0.3, -0.02, 0.9];
  } else if (playerColor === "yellow") {
    positionCard6 = [-0.8, -0.13, -0.15];
  } else if (playerColor === "red") {
    positionCard6 = [0.8, -0.13, -0.15];
  }
  return positionCard6;
};
