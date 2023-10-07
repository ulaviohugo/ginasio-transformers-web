export class UnexpectedError extends Error {
	constructor(message = 'Houve um erro inesperado. Tente novamente mais tarde') {
		super(message)
		this.name = 'UnexpectedError'
	}
}
