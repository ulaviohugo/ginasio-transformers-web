export class NameInUseError extends Error {
	constructor() {
		super('O nome já está em uso')
		this.name = 'NameInUseError'
	}
}
