import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { WorkStatementModel } from '@/domain/models'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { Button, IconPDF, PdfViewer, Spinner } from '@/presentation/components'
import { DateUtils } from '@/utils'
import { useWorkStatements } from '@/presentation/hooks'
import { loadWorkStatementStore } from '@/presentation/redux'

type WorkStatementListProps = {
	onSelect: (statement: WorkStatementModel) => void
}

export function WorkStatementList({ onSelect }: WorkStatementListProps) {
	const dispatch = useDispatch()
	const workStatements = useSelector(useWorkStatements())

	const [selectedWorkStatement, setSelectedWorkStatement] = useState<WorkStatementModel>()

	const [loading, setLoading] = useState(true)
	const [pdfUrl, setPdfUrl] = useState('')

	const [selectedRow, setSelectedRow] = useState(0)

	const handleShowPdf = (pdfUrl: string) => {
		setPdfUrl(pdfUrl)
	}

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}

	const handleSelect = (statement: WorkStatementModel) => {
		handleSelectRow(statement.id)
		setSelectedWorkStatement(statement)
		onSelect(statement)
	}

	useEffect(() => {
		setLoading(true)
		makeAuthorizeHttpClientDecorator()
			.request({
				url: makeApiUrl('/work-statements'),
				method: 'get'
			})
			.then(({ statusCode, body }) => {
				if (statusCode != 200) {
					toast.error(body)
				} else {
					dispatch(loadWorkStatementStore(body))
				}
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => {
				setLoading(false)
			})
	}, [])

	return (
		<fieldset>
			<legend>Filtro {loading && <Spinner />}</legend>
			<PdfViewer
				pdfUrl={pdfUrl}
				// title={`Recibo Salarial - ${selectedSalary?.employee?.name}`}
				onClose={() => setPdfUrl('')}
			/>
			<table className="w-full text-sm">
				<thead>
					<tr className="font-semibold border-b">
						<td>ID</td>
						<td>Data</td>
						<td>Funcionário</td>
						<td>Efeito</td>
						<td>Emitido por</td>
						<td>Acção</td>
					</tr>
				</thead>
				<tbody>
					{workStatements.map((statement, i) => (
						<tr
							key={statement.id}
							className={`
								cursor-pointer transition-all duration-150 
								${i % 2 !== 0 && 'bg-gray-100'} 
								${selectedRow == statement.id ? 'bg-primary text-white' : 'hover:bg-gray-200'}
								`}
							onClick={() => handleSelect(statement)}
						>
							<td>{statement.id}</td>
							<td>{DateUtils.getDatePt(statement.created_at)}</td>
							<td>{statement.employee?.name}</td>
							<td>{statement.purpose}</td>
							<td>{statement.user?.name}</td>
							<td>
								<Button
									variant="gray-light"
									text="Abrir"
									icon={IconPDF}
									onClick={() => handleShowPdf(statement.file_path)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</fieldset>
	)
}
