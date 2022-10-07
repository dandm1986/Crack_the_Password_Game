'use strict';

import * as model from './model.js';
import { render, addHandlersGuess, addHandlerAgain } from './view.js';

const makeAttempt = (guess) => {
  model.makeGuess(guess);
  model.next();

  if (model.guessIsRight() || model.gameOver()) {
    render(model.state);
    addHandlerAgain(newGame);
  } else {
    model.guessIsValid() && model.checkGuessNumbers();
    render(model.state);
    addHandlersGuess(makeAttempt);
    addHandlerAgain(newGame);
  }
};

const newGame = () => {
  model.newGame();
  render(model.state);
  addHandlersGuess(makeAttempt);
  addHandlerAgain(newGame);
};

newGame();
