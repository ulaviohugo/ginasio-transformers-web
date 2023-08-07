import { NumberUtils } from '.'

type GenerateProps = {
	length?: number
	dataSource?: string
	separator?: string
	decimal?: number
}

export class StringUtils {
	static readonly ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

	static generate(params?: GenerateProps) {
		const length = params?.length ?? 8
		const dataSource = params?.dataSource || StringUtils.ALPHABET
		const decimal = params?.decimal || 0
		const separator = params?.separator || ''

		const textArray: string[] = []

		for (let i = 0; i < length; i++) {
			textArray.push(dataSource[NumberUtils.random(0, dataSource.length - 1)])

			if (decimal && (i + 1) % decimal === 0 && i !== length - 1) {
				textArray.push(separator)
			}
		}

		return textArray.join('')
	}
}
