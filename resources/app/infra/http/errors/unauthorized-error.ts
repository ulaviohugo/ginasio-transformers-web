export class UnauthorizedError extends Error {
	constructor(message = 'Não autorizado') {
		super(message)
		this.name = 'UnauthorizedError'
	}
}
