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

type ItemProps = {
	title: 'Código' | 'Descrição' | 'Referência' | 'Vencimentos' | 'Descontos'
	contents: string[] | number[]
}

export const getSalaryItems = (
	employee: EmployeeModel,
	receiptDate: SalaryReceiptModel
): ItemProps[] => {
	const { base_salary = 0 } = employee
	const workedDays = NumberUtils.convertToNumber(receiptDate.work_days)
	const currentBaseSalary = SalaryUtils.getSalaryPerDay(base_salary) * workedDays

	const percent = SalaryUtils.getIRtPercent(currentBaseSalary)
	const irtPercent = percent ? `${percent}%` : 'Isento'
	return [
		{
			title: 'Código',
			contents: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
		},
		{
			title: 'Descrição',
			contents: [
				'Salário base',
				'Subsídio de alimentação',
				'Subsídio de produtividade',
				'Subsídio de Transporte',
				'Abono de Família',
				'INSS',
				'IRT',
				'Outros descontos',
				'Subsídio de férias',
				'13º Décimo terceiro'
			]
		},
		{
			title: 'Referência',
			contents: [
				`${workedDays} Dias`,
				`${workedDays} Dias`,
				`${workedDays} Dias`,
				`${workedDays} Dias`,
				'Mensal',
				'3%',
				irtPercent,
				'',
				'',
				''
			]
		},
		{
			title: 'Vencimentos',
			contents: [currentBaseSalary, 5000, 10000, 1000, 0, 0, 0, 0, 0, 0]
		},
		{
			title: 'Descontos',
			contents: [
				0,
				0,
				0,
				0,
				0,
				SalaryUtils.getINSS(currentBaseSalary),
				SalaryUtils.getIRTValue(currentBaseSalary),
				0,
				0,
				0
			]
		}
	]
}

export function SalaryReceiptTemplate({
	employee,
	receiptData,
	currentUser,
	setReceiptDate
}: SalaryReceiptProps) {
	const items = getSalaryItems(employee, receiptData)
	return (
		<div className="max-w-[80%] p-8 border text-sm">
			<Header employee={employee} receiptData={receiptData} />
			<Body items={items} />
			<ResumeContent
				employee={employee}
				receiptData={receiptData}
				currentUser={currentUser}
				setReceiptDate={setReceiptDate}
			/>
		</div>
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

function Body({ items }: { items: ItemProps[] }) {
	return (
		<table className="w-full mt-4 border p-2">
			<tr className="font-bold border-b">
				{items.map((item, i) => (
					<td key={i} className="uppercase xp-1">
						{item.title}
					</td>
				))}
			</tr>
			{items[0].contents.map((item, i) => (
				<tr
					key={i}
					style={{ gap: 8, width: i == 0 ? 250 : i == 1 ? 510 : '100%' }}
					className=""
				>
					{items.map((_, j) => {
						const content = items[j].contents[i]
						return (
							<td key={`${content}-${j}`} className=" px-1">
								{typeof content == 'number'
									? NumberUtils.formatCurrency(content)
									: content}
							</td>
						)
					})}
				</tr>
			))}
		</table>
	)
}

function ResumeContent({ employee, receiptData }: SalaryReceiptProps) {
	const salaryHeaders = getSalaryItems(employee, receiptData)
	const totalSalary =
		(
			salaryHeaders.find((salary) => salary.title == 'Vencimentos')?.contents as number[]
		)?.reduce((acc, current) => Number(acc) + Number(current), 0) || 0

	const totalDiscount =
		(
			salaryHeaders.find((salary) => salary.title == 'Descontos')?.contents as number[]
		)?.reduce((acc, current) => Number(acc) + Number(current), 0) || 0

	const netSalary = Number(totalSalary) - Number(totalDiscount)

	const salaryPerDay = SalaryUtils.getSalaryPerDay(employee.base_salary)
	const salaryPerHour = SalaryUtils.getSalaryPerHour(employee.base_salary)

	return (
		<div className="border mt-2">
			<table className="w-full">
				<tr>
					<td>
						<div className="font-semibold">Total de Vencimentos</div>
						<div>{NumberUtils.formatCurrency(totalSalary)}</div>
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
