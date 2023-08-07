export class NumberUtils {
	static format(number: string | number, separator = ' '): string {
		if (!number) return '0'
		const numStr = typeof number === 'number' ? number.toString() : number
		return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
	}

	static random(min: number, max: number): number {
		if (min > max) {
			throw new Error('min deve ser menor ou igual a max')
		}
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
}
