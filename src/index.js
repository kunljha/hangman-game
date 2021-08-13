import getPuzzle from './requests'
import Hangman from './hangman'

const puzzleEl = document.querySelector('#puzzle')
const statusEl = document.querySelector('#status')
const resetEl = document.querySelector('#reset')
let game1

const render = () => {
	puzzleEl.innerHTML = ''
	statusEl.textContent = game1.statusMessage

	game1.puzzle.split('').forEach((letter) => {
		const letterEl = document.createElement('span')
		letterEl.textContent = letter
		puzzleEl.appendChild(letterEl)
	})
}

const startGame = async () => {
	let guessAllowed
	const puzzle = await getPuzzle(2)
	if (puzzle.length <= 14) {
		guessAllowed = 3
	} else {
		guessAllowed = 5
	}

	game1 = new Hangman(puzzle, guessAllowed)
	render()
}

window.addEventListener('keypress', (e) => {
	guess = String.fromCharCode(e.charCode)
	game1.makeGuess(guess)
	render()
})

resetEl.addEventListener('click', () => {
	startGame()
})

startGame()
