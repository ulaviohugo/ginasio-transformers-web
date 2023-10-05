export class NumberUtils {
	static regExpNumber = /^[0-9]{1,50}$/
	static regExpFloat = /^[+-]?\d+(\.\d+)?$/

	static format(number: number | string): string {
		if (!number) return '0'
		const numStr = this.convertToNumber(number)
		return numStr.toLocaleString('pt-AO')
	}

	static formatCurrency(number: number | string): string {
		if (!number) return '0'
		const numStr = this.convertToNumber(number).toFixed(2)

		return Number(numStr).toLocaleString('pt-AO', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})
	}

	static convertToNumber(
		number: number | string | Date | undefined,
		nullable = false
	): number {
		if (!number) return (nullable ? null : 0) as any
		if (typeof number === 'number') return number
		if (number instanceof Date) return number.getTime()
		return Number(String(number)?.replaceAll(' ', ''))
	}

	static convertToPrice(value: number | string | undefined, nullable = false) {
		const price = this.convertToNumber(value, nullable)
		return Number(price.toFixed(2))
	}

	static random(min: number, max: number): number {
		if (min > max) {
			throw new Error('min deve ser menor ou igual a max')
		}
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	static isNumber(value: any) {
		return this.regExpNumber.test(value)
	}

	static isFloatNumber(value: any) {
		try {
			return this.regExpFloat.test(value)
		} catch (error) {
			return false
		}
	}
}
