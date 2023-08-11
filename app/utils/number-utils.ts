export class NumberUtils {
	static format(number: number | string): string {
		if (!number) return '0'
		const numStr = this.convertToNumber(number)
		return numStr.toLocaleString('pt-AO')
	}

	static formatCurrency(number: number | string): string {
		if (!number) return '0'
		const numStr = this.convertToNumber(number)

		return numStr.toLocaleString('pt-AO', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})
	}

	static convertToNumber(number: number | string | undefined, nullable = false): number {
		if (!number) return (nullable ? null : 0) as any
		return typeof number === 'number' ? number : Number(number)
	}

	static random(min: number, max: number): number {
		if (min > max) {
			throw new Error('min deve ser menor ou igual a max')
		}
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
}
