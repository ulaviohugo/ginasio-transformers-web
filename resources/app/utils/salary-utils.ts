import { NumberUtils } from '.'

export class SalaryUtils {
	static getIRtValue(salary: number): number {
		return (salary * this.getIRtPercent(salary)) / 100
	}

	static getIRtPercent(salary_: number): number {
		const salary = NumberUtils.convertToNumber(salary_)
		if (salary > 10000000) return 25
		if (salary > 5000000) return 24.5
		if (salary > 2500000) return 24
		if (salary > 2000000) return 23
		if (salary > 1500000) return 22
		if (salary > 1000000) return 21
		if (salary > 500000) return 20
		if (salary > 300000) return 19
		if (salary > 200000) return 18
		if (salary > 150000) return 16
		if (salary > 100000) return 13
		if (salary > 70000) return 10
		return 0
	}

	static getINSS(salary_: number): number {
		const salary = NumberUtils.convertToNumber(salary_)

		return (salary * 3) / 100
	}

	static getSalaryPerDay(base_salary: number, workDays = 26) {
		return NumberUtils.convertToNumber(base_salary) / workDays
	}

	static getSalaryPerHour(base_salary: number, workDays = 26) {
		return (this.getSalaryPerDay(base_salary, workDays) * 4) / 9
	}
}
