# Crack the Password Game

A small web-based game where you have several attempts to guess the correct password.

[Published game](https://crack-the-password.netlify.app).

## Game process description

The computer guesses a number with several different digits (from 3 to 6).

The player is given several attempts to guess the number.

After each attempt, the computer reports the number of matching digits standing out of place, as well as the number of correct digits in their places.

For example, the guessed number: `56478`, player guess: `52976`.

The answer is: `1 (6) matching digits out of place, 2 (5 and 7) matching digits in their places`.

The game is played until the end of the number of attempts or until the guessing.

## Features

- MVC pattern implemented
- Adaptive design
- Replay possibility added
- Highscore saving added

## Technologies used:

- HTML5
- CSS3
- JavaScript
