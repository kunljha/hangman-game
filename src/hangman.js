class Hangman {
	constructor(word, count) {
		this.word = word.toLowerCase().split('')
		this.guessCount = count
		this.guessedLetters = []
		this.status = 'playing'
	}
	get puzzle() {
		let puzzle = ''
		this.word.forEach((letter) => {
			if (this.guessedLetters.includes(letter) || letter === ' ') {
				puzzle += letter
			} else {
				puzzle += '*'
			}
		})

		return puzzle
	}
	makeGuess(guess) {
		guess = guess.toLowerCase()
		const isUnique = !this.guessedLetters.includes(guess)
		const isWrongGuess = !this.word.includes(guess)

		if (this.status !== 'playing') {
			return
		}

		if (isUnique) {
			this.guessedLetters.push(guess)
		}

		if (isUnique && isWrongGuess) {
			this.guessCount--
		}

		this.gameStatus()
	}
	gameStatus() {
		const finished = this.word.every(
			(letter) => this.guessedLetters.includes(letter) || letter === ' '
		)

		if (this.guessCount < 0) {
			this.status = 'failed'
		} else if (finished) {
			this.status = 'finished'
		} else {
			this.status = 'playing'
		}
	}
	get statusMessage() {
		if (this.status === 'playing') {
			return `Incorrect guesses allowed: ${this.guessCount}`
		} else if (this.status === 'finished') {
			return 'Great work! You guessed the word correctly.'
		} else {
			return `You Loose! The word was "${this.word.join('')}"`
		}
	}
}

export { Hangman as default }
