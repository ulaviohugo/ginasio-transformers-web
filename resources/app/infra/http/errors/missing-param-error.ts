import { LabelUtils } from '@/utils'

export class MissingParamError extends Error {
	constructor(paramName: string) {
		super(`Informe o parâmetro: ${LabelUtils.translateField(paramName as any)}`)
		this.name = 'MissingParamError'
	}
}
