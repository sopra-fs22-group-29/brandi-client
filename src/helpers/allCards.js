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
  let card = "gltf/cards/2C.gltf";
  if ((rank === "TWO") & (suit === "CLUB")) {
    card = "gltf/cards/2C.gltf";
  } else if (rank === "TWO" && suit === "DIAMOND") {
    card = "gltf/cards/2D.gltf";
  } else if (rank === "TWO" && suit === "HEART") {
    card = "gltf/cards/2H.gltf";
  } else if (rank === "TWO" && suit === "SPADE") {
    card = "gltf/cards/2S.gltf";
  } else if (rank === "THREE" && suit === "CLUB") {
    card = "gltf/cards/3C.gltf";
  } else if (rank === "THREE" && suit === "DIAMOND") {
    card = "gltf/cards/3D.gltf";
  } else if (rank === "THREE" && suit === "HEART") {
    card = "gltf/cards/3H.gltf";
  } else if (rank === "THREE" && suit === "SPADE") {
    card = "gltf/cards/3S.gltf";
  } else if (rank === "FOUR" && suit === "CLUB") {
    card = "gltf/cards/4C.gltf";
  } else if (rank === "FOUR" && suit === "DIAMOND") {
    card = "gltf/cards/4D.gltf";
  } else if (rank === "FOUR" && suit === "HEART") {
    card = "gltf/cards/4H.gltf";
  } else if (rank === "FOUR" && suit === "SPADE") {
    card = "gltf/cards/4S.gltf";
  } else if (rank === "FIVE" && suit === "CLUB") {
    card = "gltf/cards/5C.gltf";
  } else if (rank === "FIVE" && suit === "DIAMOND") {
    card = "gltf/cards/5D.gltf";
  } else if (rank === "FIVE" && suit === "HEART") {
    card = "gltf/cards/5H.gltf";
  } else if (rank === "FIVE" && suit === "SPADE") {
    card = "gltf/cards/5S.gltf";
  } else if (rank === "SIX" && suit === "CLUB") {
    card = "gltf/cards/6C.gltf";
  } else if (rank === "SIX" && suit === "DIAMOND") {
    card = "gltf/cards/6D.gltf";
  } else if (rank === "SIX" && suit === "HEART") {
    card = "gltf/cards/6H.gltf";
  } else if (rank === "SIX" && suit === "SPADE") {
    card = "gltf/cards/6S.gltf";
  } else if (rank === "SEVEN" && suit === "CLUB") {
    card = "gltf/cards/7C.gltf";
  } else if (rank === "SEVEN" && suit === "DIAMOND") {
    card = "gltf/cards/7D.gltf";
  } else if (rank === "SEVEN" && suit === "HEART") {
    card = "gltf/cards/7H.gltf";
  } else if (rank === "SEVEN" && suit === "SPADE") {
    card = "gltf/cards/7S.gltf";
  } else if (rank === "EIGHT" && suit === "CLUB") {
    card = "gltf/cards/8C.gltf";
  } else if (rank === "EIGHT" && suit === "DIAMOND") {
    card = "gltf/cards/8D.gltf";
  } else if (rank === "EIGHT" && suit === "HEART") {
    card = "gltf/cards/8H.gltf";
  } else if (rank === "EIGHT" && suit === "SPADE") {
    card = "gltf/cards/8S.gltf";
  } else if (rank === "NINE" && suit === "CLUB") {
    card = "gltf/cards/9C.gltf";
  } else if (rank === "NINE" && suit === "DIAMOND") {
    card = "gltf/cards/9D.gltf";
  } else if (rank === "NINE" && suit === "HEART") {
    card = "gltf/cards/9H.gltf";
  } else if (rank === "NINE" && suit === "SPADE") {
    card = "gltf/cards/9S.gltf";
  } else if (rank === "TEN" && suit === "CLUB") {
    card = "gltf/cards/0C.gltf";
  } else if (rank === "TEN" && suit === "DIAMOND") {
    card = "gltf/cards/0D.gltf";
  } else if (rank === "TEN" && suit === "HEART") {
    card = "gltf/cards/0H.gltf";
  } else if (rank === "TEN" && suit === "SPADE") {
    card = "gltf/cards/0S.gltf";
  } else if (rank === "JACK" && suit === "CLUB") {
    card = "gltf/cards/JC.gltf";
  } else if (rank === "JACK" && suit === "DIAMOND") {
    card = "gltf/cards/JD.gltf";
  } else if (rank === "JACK" && suit === "HEART") {
    card = "gltf/cards/JH.gltf";
  } else if (rank === "JACK" && suit === "SPADE") {
    card = "gltf/cards/JS.gltf";
  } else if (rank === "QUEEN" && suit === "CLUB") {
    card = "gltf/cards/QC.gltf";
  } else if (rank === "QUEEN" && suit === "DIAMOND") {
    card = "gltf/cards/QD.gltf";
  } else if (rank === "QUEEN" && suit === "HEART") {
    card = "gltf/cards/QH.gltf";
  } else if (rank === "QUEEN" && suit === "SPADE") {
    card = "gltf/cards/QS.gltf";
  } else if (rank === "KING" && suit === "CLUB") {
    card = "gltf/cards/KC.gltf";
  } else if (rank === "KING" && suit === "DIAMOND") {
    card = "gltf/cards/KD.gltf";
  } else if (rank === "KING" && suit === "HEART") {
    card = "gltf/cards/KH.gltf";
  } else if (rank === "KING" && suit === "SPADE") {
    card = "gltf/cards/KS.gltf";
  } else if (rank === "JOKER" && suit === "SPADE") {
    card = "gltf/cards/X1.gltf";
  }
  return card;
};
