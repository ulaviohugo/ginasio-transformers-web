export const months = [
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

		const year = date.getFullYear(),
			month = (date.getMonth() + 1).toString().padStart(2, '0'),
			day = date.getDate().toString().padStart(2, '0')
		return `${year}${separator}${month}${separator}${day}`
	}

	static getDateTime(dateParam: Date | string, separator = '-'): string {
		if (!dateParam) return null as any
		const date = this.convertToDate(dateParam)

		return `${this.getDate(date, separator)} ${this.getTime(date)}`
	}

	static getTime(dateParam: Date): string {
		if (!dateParam) return null as any
		const date = this.convertToDate(dateParam)

		const hour = date.getHours(),
			minute = (date.getMinutes() + 1).toString().padStart(2, '0'),
			second = date.getSeconds().toString().padStart(2, '0')
		return `${hour}:${minute}:${second}`
	}

	static getDatePt(dateParam: Date | string | undefined, separator = '-') {
		if (!dateParam) return null as any
		const date = this.convertToDate(dateParam)

		const year = date.getFullYear(),
			month = (date.getMonth() + 1).toString().padStart(2, '0'),
			day = date.getUTCDate().toString().padStart(2, '0')
		return `${day}${separator}${month}${separator}${year}`
	}

	static getMonth(date: Date | string) {
		return this.convertToDate(date)?.getMonth()
	}

	static getMonthUtils(){
		return months
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
		const dataAtual = new Date()

		// Calcula a diferença em milissegundos
		const diferencaEmMilissegundos = (dataAtual as any) - (date as any)

		// Converte a diferença em milissegundos para anos
		return Math.floor(diferencaEmMilissegundos / 31536000000) // Aproximadamente 31536000000 milissegundos em um ano
	}

	static convertToDate(date: Date | string | undefined): Date {
		if (!date) return null as any
		return date instanceof Date ? date : new Date(date)
	}

	static timeToInt(tempo: string) {
		const partes = tempo.split(':') // Divide o tempo em horas e minutos
		const horas = parseInt(partes[0], 10) // Converte as horas para um número inteiro
		const minutos = parseInt(partes[1], 10) // Converte os minutos para um número inteiro

		// Calcula o valor inteiro representando o tempo total em minutos
		const tempoInteiro = horas * 60 + minutos

		return tempoInteiro
	}

	static intToTime(inteiro: number) {
		const horas = Math.floor(inteiro / 60) // Obtém as horas
		const minutos = inteiro % 60 // Obtém os minutos

		// Formata as horas e minutos como "H:i"
		const tempoFormatado =
			(horas < 10 ? '0' : '') + horas + ':' + (minutos < 10 ? '0' : '') + minutos

		return tempoFormatado
	}
}
