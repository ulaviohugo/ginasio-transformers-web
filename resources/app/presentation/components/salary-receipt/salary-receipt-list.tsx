import { SalaryReceiptModel } from '@/domain/models'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Spinner } from '../spinner'
import { DateUtils, NumberUtils } from '@/utils'
import { PdfViewer } from '../pdf-viewer'
import { IconPDF } from '../icons'
import { Button } from '../form-controls'
import { useDispatch, useSelector } from 'react-redux'
import { useSalaryReceipts } from '@/presentation/hooks'
import { loadSalaryReceiptStore } from '@/presentation/redux'
import { NoData } from '../no-data'

type SalaryReceiptListProps = {
	onSelect: (salaryReceipt: SalaryReceiptModel) => void
}

export function SalaryReceiptList({ onSelect }: SalaryReceiptListProps) {
	const dispatch = useDispatch()

	const salaryReceipts = useSelector(useSalaryReceipts())

	const [selectedSalary, setSelectedSalary] = useState<SalaryReceiptModel>()
	const [selectedRow, setSelectedRow] = useState(0)

	const [loading, setLoading] = useState(false)
	const [pdfUrl, setPdfUrl] = useState('')

	useEffect(() => {
		setLoading(true)
		makeAuthorizeHttpClientDecorator()
			.request({
				url: makeApiUrl('/salary-receipts'),
				method: 'get'
			})
			.then(({ statusCode, body }) => {
				if (statusCode != 200) return toast.error(body)

				dispatch(loadSalaryReceiptStore(body))
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => {
				setLoading(false)
			})
	}, [])

	const handleShowPdf = (pdfUrl: string) => {
		setPdfUrl(pdfUrl)
	}

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}

	const handleSelect = (salary: SalaryReceiptModel) => {
		handleSelectRow(salary.id)
		setSelectedSalary(salary)
		onSelect(salary)
	}

	return (
		<fieldset>
			<legend>Filtro {loading && <Spinner />}</legend>

			{/* Modal */}
			<PdfViewer
				pdfUrl={pdfUrl}
				title={`Recibo Salarial - ${selectedSalary?.employee?.name}`}
				onClose={() => setPdfUrl('')}
			/>

			<table className="w-full text-sm">
				<thead>
					<tr className="border-b font-semibold">
						<td className="px-2 py-1">Funcionário</td>
						<td className="px-2 py-1">Data</td>
						<td className="px-2 py-1">Mês/Ano Proc.</td>
						<td className="px-2 py-1">Salário líquido</td>
						<td className="px-2 py-1">Dias trabalhados</td>
						<td className="px-2 py-1">Descontos</td>
						<td className="px-2 py-1">Processado por</td>
						<td className="px-2 py-1">Acção</td>
					</tr>
				</thead>
				<tbody>
					{salaryReceipts.map((salary, i) => {
						return (
							<tr
								key={salary.id}
								className={`
								cursor-pointer transition-all duration-150 
								${i % 2 !== 0 && 'bg-gray-100'} 
								${selectedRow == salary.id ? 'bg-primary text-white' : 'hover:bg-gray-200'}
								`}
								onClick={() => handleSelect(salary)}
							>
								<td className="px-2 py-1">{salary.employee?.name}</td>
								<td className="px-2 py-1">{DateUtils.getDatePt(salary.created_at)}</td>
								<td className="px-2 py-1">
									{DateUtils.getMonthExtShort(salary.month - 1)}/{salary.year}
								</td>
								<td className="px-2 py-1">
									{NumberUtils.formatCurrency(salary.net_salary)}
								</td>
								<td className="px-2 py-1">{salary.work_days}</td>
								<td className="px-2 py-1">
									{NumberUtils.formatCurrency(salary.total_salary_discounts)}
								</td>
								<td className="px-2 py-1">{salary.user?.name}</td>
								<td className="px-2 py-1">
									<Button
										variant="gray-light"
										text="Ver recibo"
										icon={IconPDF}
										onClick={() => handleShowPdf(salary.file_path)}
									/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			{salaryReceipts.length < 1 && <NoData />}
		</fieldset>
	)
}
