let _data;

const parentEl = document.querySelector(`body`);

const clear = () => {
  parentEl.innerHTML = parentEl.value = ``;
};

export const render = (data) => {
  _data = data;

  clear();

  const markup = `
    <header>
      <div class="header-menu">
        <button class="btn again">Again!</button>
        <p class="attempts">Attempts left: ${_data.attempts}</p>
      </div>
      <h1>Crack the Password!</h1>
      <div class="password">
        <ul class="numbers flex">
        ${_data.password
          .split(``)
          .map(
            _data.win || _data.loose
              ? generateMarkupPasswordShow
              : generateMarkupPasswordHide
          )
          .join(``)}
        </ul>
      </div>
    </header>
    <main>
      <section class="section-guess">
        <input type="number" class="guess" />
        <button class="btn check">Crack!</button>
      </section>
      <section class="section-message">
        <div class="section-message--container">
          ${generateMarkupMessage(_data)}  
        </div>
      </section>
    </main>
    <footer>
      <div class="score-container">
        <p class="label-score">Score: <span class="score">${
          _data.score
        }</span></p>
        <p class="label-highscore">
          Highscore: <span class="highscore">${_data.highscore}</span>
        </p>
      </div>
    </footer>
  `;

  parentEl.insertAdjacentHTML(`afterbegin`, markup);
};

export const addHandlersGuess = (handler) => {
  const checkBtn = document.querySelector(`.check`);
  const guess = document.querySelector(`.guess`);

  guess.onfocus = () => guess.classList.add(`focused`);
  guess.onblur = () => guess.classList.remove(`focused`);

  if (!_data.win || !_data.loose) {
    checkBtn.addEventListener(`click`, () => {
      handler(guess.value);
      guess.value = ``;
    });

    document.onkeydown = (e) => {
      if (isFinite(+e.key) && !guess.classList.contains(`focused`))
        guess.value += e.key;

      if (e.key === `Backspace` && !guess.classList.contains(`focused`))
        guess.value = guess.value.slice(0, guess.value.length - 1);

      if (e.key === `Enter`) {
        if (_data.win || _data.loose) return;
        handler(guess.value);
        guess.value = ``;
      }
    };
  }
};

export const addHandlerAgain = (handler) => {
  const againBtn = document.querySelector(`.again`);
  againBtn.addEventListener(`click`, handler);
};

const generateMarkupPasswordHide = () => {
  return `
  <li class="number">*</li>
  `;
};

const generateMarkupPasswordShow = (number) => {
  return `
  <li class="number">${number}</li>
  `;
};

const generateMarkupMessage = (data) => {
  if (!data) {
    return `<p>Enter your guess</p>`;
  } else if (data.score === 0) {
    return `<p>Enter your guess</p>`;
  } else if (data.win) {
    return `<p>The password is cracked!</p>`;
  } else if (data.loose) {
    return `<p>The password is not cracked!</p>`;
  } else if (data.error) {
    return `
      <p>Be attentive!</p>
      <p>You entered the wrong number of digits!</p>
      <p>The password contains ${data.password.length} digits.</p>
    `;
  } else {
    return `
      <p>Matching digits out of place:</p>
      <p>${displayNumbers(data.guessedNumbers)}</p>
      <p>Matching digits in their places:</p>
      <p>${displayNumbers(data.guessedPositions)}</p>
    `;
  }
};

const displayNumbers = (numbersArr) => {
  return `
    ${numbersArr.length} (${(() => {
    switch (numbersArr.length) {
      case 0:
        return `0`;
      case 1:
        return numbersArr[0];
      case 2:
        return `${numbersArr[0]} и ${numbersArr[1]}`;
      default:
        return `${numbersArr.slice(0, -1).join(`, `)} и ${
          numbersArr[numbersArr.length - 1]
        }`;
    }
  })()})
  `;
};
