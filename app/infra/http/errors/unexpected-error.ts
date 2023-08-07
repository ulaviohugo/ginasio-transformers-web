export class UnexpectedError extends Error {
	constructor(message = 'Ouve um erro inesperado. Tente novamente mais tarde') {
		super(message)
		this.name = 'UnexpectedError'
	}
}
