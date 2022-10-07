export const state = {
  password: ``,
  guess: ``,
  attempts: 0,
  error: false,
  win: false,
  loose: false,
  score: 0,
  highscore: 0,
  guessedNumbers: [],
  guessedPositions: [],
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createPassword = ({ length, minInt, maxInt }) => {
  const arr = [...new Array(length)];

  for (let i = 0; i < arr.length; i++) {
    let int = `${randomInt(minInt, maxInt)}`;
    !arr.find((el) => el == int) ? (arr[i] = int) : (int = randomInt) && i--;
  }

  return arr.join(``);
};

export const newGame = () => {
  state.password = createPassword({
    length: randomInt(3, 6),
    minInt: 0,
    maxInt: 9,
  });
  state.guess = ``;
  state.attempts = randomInt(5, 10);
  state.error = false;
  state.win = false;
  state.loose = false;
  state.score = 0;
};

export const makeGuess = (guess) => {
  state.guess = guess;
};

export const next = () => {
  state.attempts -= 1;
  state.score += 1;
};

export const guessIsValid = () => {
  state.error = false;
  if (state.password.length !== state.guess.length) {
    state.error = true;
    return false;
  } else {
    return true;
  }
};

export const guessIsRight = () => {
  if (state.password === state.guess) {
    state.win = true;
    if (state.highscore === 0 || state.score < state.highscore) {
      state.highscore = state.score;
    }
    return true;
  }
};

export const gameOver = () => {
  if (!state.win && state.attempts === 0) {
    state.loose = true;
    return true;
  }
};

export const checkGuessNumbers = () => {
  state.guessedNumbers = [];
  state.guessedPositions = [];

  const arr1 = [...state.password];
  const arr2 = [...state.guess];

  arr2.forEach((el, i) => {
    arr1.find((elem) => elem === el) &&
      (arr1[i] === el
        ? state.guessedPositions.push(el)
        : state.guessedNumbers.push(el));
  });
};
