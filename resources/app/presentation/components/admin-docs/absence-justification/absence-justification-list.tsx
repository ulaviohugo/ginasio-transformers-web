import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { AbsenceJustificationModel } from '@/domain/models'
import { Button, IconPDF, NoData, PdfViewer, Spinner } from '@/presentation/components'
import { DateUtils } from '@/utils'
import { useAbsenceJustifications } from '@/presentation/hooks'
import { loadAbsenceJustificationStore } from '@/presentation/redux'
import { LoadAbsenceJustifications } from '@/domain/usecases'

type AbsenceJustificationListProps = {
	onSelect: (admission: AbsenceJustificationModel) => void
	loadAbsenceJustifications: LoadAbsenceJustifications
}

export function AbsenceJustificationList({
	onSelect,
	loadAbsenceJustifications
}: AbsenceJustificationListProps) {
	const dispatch = useDispatch()
	const admissions = useSelector(useAbsenceJustifications())

	const [loading, setLoading] = useState(true)
	const [pdfUrl, setPdfUrl] = useState('')

	const [selectedRow, setSelectedRow] = useState(0)

	const handleShowPdf = (pdfUrl: string) => {
		setPdfUrl(pdfUrl)
	}

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}

	const handleSelect = (admission: AbsenceJustificationModel) => {
		handleSelectRow(admission.id)
		onSelect(admission)
	}

	useEffect(() => {
		setLoading(true)
		loadAbsenceJustifications
			.load()
			.then((response) => {
				dispatch(loadAbsenceJustificationStore(response))
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
						<td>Motivo de Ausência</td>
						<td>Data Início</td>
						<td>Data Fim</td>
						<td>Dias ausentes</td>
						<td>Processado por</td>
						<td>Acção</td>
					</tr>
				</thead>
				<tbody>
					{admissions.map((admission, i) => {
						return (
							<tr
								key={admission.id}
								className={`
									cursor-pointer transition-all duration-150 
									${i % 2 !== 0 && 'bg-gray-100'} 
									${selectedRow == admission.id ? 'bg-primary text-white' : 'hover:bg-gray-200'}
									`}
								onClick={() => handleSelect(admission)}
							>
								<td>{admission.id}</td>
								<td>{DateUtils.getDatePt(admission.created_at)}</td>
								<td>{admission.employee?.name}</td>
								<td>{admission.absence_reason}</td>
								<td>{DateUtils.getDatePt(admission.starts_at)}</td>
								<td>{DateUtils.getDatePt(admission.ends_at)}</td>
								<td>{admission.absent_days}</td>

								<td>{admission.user?.name}</td>
								<td>
									<Button
										variant="gray-light"
										text="Visualizar"
										icon={IconPDF}
										onClick={() => handleShowPdf(admission.file_path)}
									/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			{!loading && admissions.length < 1 && <NoData />}
		</fieldset>
	)
}
