import { LabelUtils } from '@/utils'

export class InvalidParamError extends Error {
	constructor(paramName: string) {
		super(`Parâmetro inválido: ${LabelUtils.translateField(paramName as any)}`)
		this.name = 'InvalidParamError'
	}
}
