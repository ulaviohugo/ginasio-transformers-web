export class MissingParamError extends Error {
	constructor(paramName: string) {
		super(`Informe o parâmetro: ${paramName}`)
		this.name = 'MissingParamError'
	}
}
