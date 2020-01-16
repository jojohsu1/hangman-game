import Home from './home.js';
import End from './end.js';
import Board from './board.js';
import { sound } from './../data/sound.js';

const Game = (_ => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const words = ['apple', 'angle', 'anger', 'ball', 'book', 'cat', 'dog', 'duck', 'elephant'];
    let chosenWord = '';
    let guessingWord = [];
    let guesses = [];
    let lives = 0;

    //cache the DOM
    const $hangman = document.querySelector('.hangman');

    const init = _ => {
        chosenWord = chooseWord();
        guessingWord = Array(chosenWord.length).fill("_");
        lives = 7;
        showInitPage();
        listeners();
        Board.init();
    }

    const listeners = _ => {
        $hangman.addEventListener('click', event => {
            if (event.target.matches('.hangman__letter')) {
                sound.click.play();
                check(event.target.innerHTML);
            }

            if (event.target.matches('.hangman__trigger')) {
                Home.init();
                sound.click.play();
            }
        })
    }

    const isAlreadyTaken = letter => {
        return guesses.includes(letter);
    }

    const check = guess => {
        if (isAlreadyTaken(guess)) return;
        guesses.push(guess);
        if (chosenWord.includes(guess)) {
            updateGuessingWord(guess); //update the guessingWord
        } else {
            lives--;
            //render the board
            Board.setLives(lives);
        }
        render(); //html content
        isGameOver(); //check if the game is over
    }

    const isGameOver = _ => {
        if (guessingWord.join("") === chosenWord) {
            sound.win.play();
            End.setState({
                chosenWord,
                result: "win"
            })

        }
        if (lives <= 0) {
            sound.lose.play();
            End.setState({
                chosenWord,
                result: "lose"
            })
        }
    }

    const render = _ => {
        document.querySelector('.hangman__lives').innerHTML = lives;
        document.querySelector('.hangman__words').innerHTML = guessingWord.join("").toUpperCase();
        document.querySelector('.hangman__letters').innerHTML = createLetters();
        document.querySelector('.hangman__letter').classList.remove('hangman__letter--active');
    }

    const updateGuessingWord = letter => {
        chosenWord.split("").forEach((elem, index) => {
            if (elem === letter) {
                guessingWord[index] = elem;
            }
        })

    }

    const showInitPage = _ => {
        let markup = '';
        markup = `
        <h1 class="hangman__title">Hangman</h1>
        <p class="hangman__stats">lives:
        <span class="hangman__lives">${lives}
        </span></p>
        <canvas class="hangman__board"></canvas>
        <div class="hangman__words">${guessingWord.join("").toUpperCase()}</div>
        <p class="hangman__instructions">Pick a letter blow to guess the whole word.</p>
        <ul class="hangman__letters">${createLetters()}</ul>
        <button class="button hangman__trigger">menu</button>
        `;
        $hangman.innerHTML = markup;
    }

    const createLetters = _ => {

        let markup = '';
        letters.forEach(letter => {
            const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';
            markup += `
        <li class="hangman__letter ${isActive}">${letter}</li>
            `;
        })
        return markup;
    }

    const chooseWord = _ => {
        let randNum = Math.floor(Math.random() * words.length);
        return words[randNum];
    };

    return {
        init
    }
})();

export default Game;