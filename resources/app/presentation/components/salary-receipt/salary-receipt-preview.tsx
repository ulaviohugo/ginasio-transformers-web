import React from 'react'
import { EmployeeModel, SalaryReceiptModel } from '@/domain/models'
import { DateUtils, NumberUtils, SalaryUtils } from '@/utils'

type SalaryReceiptProps = {
	employee: EmployeeModel
	receiptData: SalaryReceiptModel
	setReceiptDate: (receiptData: SalaryReceiptModel) => void
	currentUser: EmployeeModel
}

type HeaderProps = {
	employee: EmployeeModel
	receiptData: SalaryReceiptModel
	currentUser: EmployeeModel
}

export function SalaryReceiptPreview({
	employee,
	receiptData,
	currentUser,
	setReceiptDate
}: SalaryReceiptProps) {
	const items = getSalaryTable(employee, receiptData)
	return (
		<fieldset className="p-8 border text-sm">
			<legend>Pré-visualização</legend>
			<Header employee={employee} receiptData={receiptData} />
			<table className="w-full mt-4 border p-2">
				{items.map((rows, i) => (
					<tr key={i} style={{ gap: 8, width: i == 0 ? 250 : i == 1 ? 510 : '100%' }}>
						{rows.map((value, j) => {
							return (
								<td
									key={`${value}-${j}`}
									className={`px-1 ${i == 0 && 'uppercase border-b font-semibold'}`}
								>
									{value}
								</td>
							)
						})}
					</tr>
				))}
			</table>
			<ResumeContent
				employee={employee}
				receiptData={receiptData}
				currentUser={currentUser}
				setReceiptDate={setReceiptDate}
			/>
		</fieldset>
	)
}

function Header({ employee, receiptData }: Omit<HeaderProps, 'currentUser'>) {
	return (
		<div className="flex flex-col">
			<div className="flex justify-between gap-2 mb-4">
				<div className="font-bold uppercase">Recibo de Pagamento de Salário</div>
				<div className="font-semibold">{`${DateUtils.getMonthExt(
					receiptData.month - 1
				)} ${receiptData.year}`}</div>
			</div>
			<div className="flex w-full gap-2 justify-between">
				<div>
					<div className="font-semibold">ID</div>
					<div>{employee.id}</div>
				</div>
				<div>
					<div className="font-semibold">FUNCIONÁRIO</div>
					<div style={{ flexWrap: 'nowrap' }}>{employee.name}</div>
				</div>
				<div>
					<div className="font-semibold">FUNÇÃO</div>
					<div>{employee.position}</div>
				</div>
				<div>
					<div className="font-semibold">NIF</div>
					<div>{employee.nif}</div>
				</div>
				<div>
					<div className="font-semibold">Nº INSS</div>
					<div>{employee.social_security}</div>
				</div>
			</div>
		</div>
	)
}

function ResumeContent({ employee, receiptData }: SalaryReceiptProps) {
	const baseSalary = NumberUtils.convertToNumber(
		receiptData.base_salary || employee.base_salary
	)
	const workedDays = NumberUtils.convertToNumber(receiptData.work_days)
	const currentBaseSalary = SalaryUtils.getSalaryPerDay(baseSalary) * workedDays

	const totalDiscount =
		SalaryUtils.getIRTValue(currentBaseSalary) + SalaryUtils.getINSS(currentBaseSalary)

	const grossSalary =
		currentBaseSalary +
		NumberUtils.convertToNumber(receiptData.meal_allowance) +
		NumberUtils.convertToNumber(receiptData.productivity_allowance) +
		NumberUtils.convertToNumber(receiptData.transportation_allowance) +
		NumberUtils.convertToNumber(receiptData.family_allowance) +
		NumberUtils.convertToNumber(receiptData.christmas_allowance) +
		NumberUtils.convertToNumber(receiptData.holiday_allowance)

	const netSalary = grossSalary - totalDiscount

	const salaryPerDay = SalaryUtils.getSalaryPerDay(baseSalary)
	const salaryPerHour = SalaryUtils.getSalaryPerHour(baseSalary)

	return (
		<div className="border mt-2">
			<table className="w-full">
				<tr>
					<td>
						<div className="font-semibold">Total de Vencimentos</div>
						<div>{NumberUtils.formatCurrency(grossSalary)}</div>
					</td>

					<td>
						<div className="font-semibold">Total de Descontos</div>
						<div>{NumberUtils.formatCurrency(totalDiscount)}</div>
					</td>
					<td>
						<div className="font-semibold">Valor líquido</div>
						<div>{NumberUtils.formatCurrency(netSalary)}</div>
					</td>
				</tr>

				<tr>
					<td className="pt-3">
						<div className="font-semibold">Salário base</div>
						<div>{NumberUtils.formatCurrency(employee.base_salary)}</div>
					</td>
					<td className="pt-3">
						<div className="font-semibold">Salário por dia</div>
						<div>{NumberUtils.formatCurrency(salaryPerDay)}</div>
					</td>
					<td className="pt-3">
						<div className="font-semibold">Salário por hora</div>
						<div>{NumberUtils.formatCurrency(salaryPerHour)}</div>
					</td>
				</tr>
			</table>
		</div>
	)
}

type ItemProps = Array<string | number>

const getSalaryTable = (
	employee: EmployeeModel,
	receiptData: SalaryReceiptModel
): ItemProps[] => {
	const { base_salary } = employee
	const baseSalary = NumberUtils.convertToNumber(
		receiptData.base_salary_received || receiptData.base_salary || base_salary
	)
	const workedDays = NumberUtils.convertToNumber(receiptData.work_days)
	const currentBaseSalary = SalaryUtils.getSalaryPerDay(baseSalary) * workedDays

	const percent = SalaryUtils.getIRtPercent(currentBaseSalary)
	const irtPercent = percent ? `${percent}%` : 'Isento'

	const irt = SalaryUtils.getIRTValue(currentBaseSalary)

	const inssPercent = receiptData.inss_discount_percent
	const inssValue = SalaryUtils.getINSS(currentBaseSalary)

	const data = [
		['Código', 'Descrição', 'Referência', 'Vencimentos', 'Descontos'],
		[
			1,
			'Salário base',
			`${receiptData.work_days} Dias`,
			NumberUtils.formatCurrency(currentBaseSalary),
			0
		],
		[
			2,
			'Subsídio de alimentação',
			`${receiptData.work_days} Dias`,
			NumberUtils.formatCurrency(receiptData.meal_allowance),
			0
		],
		[
			3,
			'Subsídio de produtividade',
			`${receiptData.work_days} Dias`,
			NumberUtils.formatCurrency(receiptData.productivity_allowance),
			0
		],
		[
			4,
			'Subsídio de Transporte',
			`${receiptData.work_days} Dias`,
			NumberUtils.formatCurrency(receiptData.transportation_allowance),
			0
		]
	]
	if (receiptData.family_allowance) {
		data.push([
			5,
			'Abono de Família',
			'Mensal',
			NumberUtils.formatCurrency(receiptData.family_allowance),
			0
		])
	}
	if (receiptData.holiday_allowance) {
		data.push([
			6,
			'Subsídio de férias',
			'',
			NumberUtils.formatCurrency(receiptData.holiday_allowance),
			0
		])
	}
	if (receiptData.christmas_allowance) {
		data.push([
			7,
			'13º Décimo terceiro',
			'',
			NumberUtils.formatCurrency(receiptData.christmas_allowance),
			0
		])
	}
	data.push(
		[8, 'INSS', `${inssPercent}%`, 0, NumberUtils.formatCurrency(inssValue)],
		[9, 'IRT', irtPercent, 0, NumberUtils.formatCurrency(irt)]
	)
	return data
}
