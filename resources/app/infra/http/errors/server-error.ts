export class ServerError extends Error {
	constructor(stack: string) {
		super(`Error no servidor: ${stack}`)
		this.name = 'ServerError'
		this.stack = stack
	}
}
