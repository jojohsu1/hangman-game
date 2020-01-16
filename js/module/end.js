import { sound } from './../data/sound.js';
const End = (_ => {
    const state = {
        chosenWord: null,
        winOrLose: null
    }

    const $hangman = document.querySelector('.hangman');
    const setState = obj => {
        state.chosenWord = obj.chosenWord;
        state.winOrLose = obj.result;
        render();
    }
    const render = _ => {
        let markup = '';
        markup = `
    <h1 class="hangman__title end">game over</h1>
    <div class="hangman__circle"><p class="hangman__result">You ${state.winOrLose.toUpperCase()}!</p></div><br>
    <p class="chosenword">The word is ${state.chosenWord.toUpperCase()}.</p>
    <button class="button hangman__trigger">menu</button>
    `;
        $hangman.innerHTML = markup;
    }

    return {
        setState
    }

})();

export default End;