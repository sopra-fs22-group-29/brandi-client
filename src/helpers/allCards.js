export const positionCard = (playerColor, position) => {
  switch (position) {
    case 1:
      return positionCard1(playerColor);
    case 2:
      return positionCard2(playerColor);
    case 3:
      return positionCard3(playerColor);
    case 4:
      return positionCard4(playerColor);
    case 5:
      return positionCard5(playerColor);
    case 6:
      return positionCard6(playerColor);
  }
};

export const positionCard1 = (playerColor) => {
  let positionCard1 = [0.3, -0.02, 0.9];
  if (playerColor === "BLUE") {
    positionCard1 = [-0.8, -0.12, 0.15];
  } else if (playerColor === "YELLOW") {
    positionCard1 = [-0.3, 0, -0.9];
  } else if (playerColor === "RED") {
    positionCard1 = [0.3, 0, -0.9];
  }
  return positionCard1;
};

export const positionCard2 = (playerColor) => {
  let positionCard2 = [0.4, -0.04, 0.75];
  if (playerColor === "BLUE") {
    positionCard2 = [-0.7, -0.1, 0.3];
  } else if (playerColor === "YELLOW") {
    positionCard2 = [-0.4, -0.025, -0.75];
  } else if (playerColor === "RED") {
    positionCard2 = [0.4, -0.025, -0.75];
  }
  return positionCard2;
};

export const positionCard3 = (playerColor) => {
  let positionCard3 = [0.5, -0.06, 0.6];
  if (playerColor === "BLUE") {
    positionCard3 = [-0.6, -0.08, 0.45];
  } else if (playerColor === "YELLOW") {
    positionCard3 = [-0.5, -0.055, -0.6];
  } else if (playerColor === "RED") {
    positionCard3 = [0.5, -0.055, -0.6];
  }
  return positionCard3;
};

export const positionCard4 = (playerColor) => {
  let positionCard4 = [0.6, -0.08, 0.45];
  if (playerColor === "BLUE") {
    positionCard4 = [-0.5, -0.06, 0.6];
  } else if (playerColor === "YELLOW") {
    positionCard4 = [-0.6, -0.08, -0.45];
  } else if (playerColor === "RED") {
    positionCard4 = [0.6, -0.08, -0.45];
  }
  return positionCard4;
};

export const positionCard5 = (playerColor) => {
  let positionCard5 = [0.7, -0.1, 0.3];
  if (playerColor === "BLUE") {
    positionCard5 = [-0.4, -0.04, 0.75];
  } else if (playerColor === "YELLOW") {
    positionCard5 = [-0.7, -0.105, -0.3];
  } else if (playerColor === "RED") {
    positionCard5 = [0.7, -0.105, -0.3];
  }
  return positionCard5;
};
export const positionCard6 = (playerColor) => {
  let positionCard6 = [0.8, -0.12, 0.15];
  if (playerColor === "BLUE") {
    positionCard6 = [-0.3, -0.02, 0.9];
  } else if (playerColor === "YELLOW") {
    positionCard6 = [-0.8, -0.13, -0.15];
  } else if (playerColor === "RED") {
    positionCard6 = [0.8, -0.13, -0.15];
  }
  return positionCard6;
};

export const getCard = (rank, suit) => {
  let card = "gltf/cards/";

  switch (rank) {
    case "TWO":
      card += "2";
      break;
    case "THREE":
      card += "3";
      break;
    case "FOUR":
      card += "4";
      break;
    case "FIVE":
      card += "5";
      break;
    case "SIX":
      card += "6";
      break;
    case "SEVEN":
      card += "7";
      break;
    case "EIGHT":
      card += "8";
      break;
    case "NINE":
      card += "9";
      break;
    case "TEN":
      card += "0";
      break;
    case "JACK":
      card += "J";
      break;
    case "QUEEN":
      card += "Q";
      break;
    case "KING":
      card += "K";
      break;
    case "JOKER":
      return card + "X1.gltf";
    case "ACE":
      card += "A";
      break;
  }

  switch (suit) {
    case "CLUB":
      card += "C";
      break;
    case "DIAMOND":
      card += "D";
      break;
    case "HEART":
      card += "H";
      break;
    case "SPADE":
      card += "S";
      break;
  }

  return card + ".gltf";
};
