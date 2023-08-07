export class DocumentInUseError extends Error {
	constructor() {
		super('O documento já está em uso')
		this.name = 'DocumentInUseError'
	}
}
