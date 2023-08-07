import { LabelUtils } from '@/app/utils'

export class InvalidParamError extends Error {
	constructor(paramName: string) {
		super(`Parâmetro inválido: ${LabelUtils.translateField(paramName)}`)
		this.name = 'InvalidParamError'
	}
}
