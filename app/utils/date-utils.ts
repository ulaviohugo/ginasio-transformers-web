const months = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro'
]

const weekDays = [
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado',
	'Domingo'
]

export class DateUtils {
	static getDate(dateParam: Date | string, separator = '-'): string {
		if (!dateParam) return null as any
		const date = this.convertToDate(dateParam)

		const year = date.getUTCFullYear(),
			month = (date.getUTCMonth() + 1).toString().padStart(2, '0'),
			day = date.getDate().toString().padStart(2, '0')
		return `${year}${separator}${month}${separator}${day}`
	}

	static getDatePt(dateParam: Date | string | undefined, separator = '-') {
		if (!dateParam) return null as any
		const date = this.convertToDate(dateParam)

		const year = date.getUTCFullYear(),
			month = (date.getUTCMonth() + 1).toString().padStart(2, '0'),
			day = date.getDate().toString().padStart(2, '0')
		return `${day}${separator}${month}${separator}${year}`
	}

	static getMonth(date: Date | string) {
		return this.convertToDate(date)?.getUTCMonth()
	}

	static getMonthExt(date: Date | string | number) {
		if (typeof date == 'number') return months[date]

		return months[this.getMonth(date)]
	}

	static getMonthExtShort(date: Date | string | number) {
		return this.getMonthExt(date).slice(0, 3)
	}

	static getMonthList(): number[] {
		return Array.from(Array(12)).map((_, i) => i)
	}

	static getMonthListExt(): string[] {
		return this.getMonthList().map((_, i) => this.getMonthExt(i))
	}

	static getWeekDay(date: Date) {
		return weekDays[date.getDay()]
	}

	static getAge(dateParam: Date) {
		const date = this.convertToDate(dateParam)

		// Data atual
		var dataAtual = new Date()

		// Calcula a diferença em milissegundos
		var diferencaEmMilissegundos = (dataAtual as any) - (date as any)

		// Converte a diferença em milissegundos para anos
		return Math.floor(diferencaEmMilissegundos / 31536000000) // Aproximadamente 31536000000 milissegundos em um ano
	}

	static convertToDate(date: Date | string | undefined): Date {
		if (!date) return null as any
		return date instanceof Date ? date : new Date(date)
	}
}
