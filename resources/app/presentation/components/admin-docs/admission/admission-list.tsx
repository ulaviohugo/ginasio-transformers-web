import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { AdmissionModel } from '@/domain/models'
import { Button, IconPDF, NoData, PdfViewer, Spinner } from '@/presentation/components'
import { DateUtils } from '@/utils'
import { useAdmissions } from '@/presentation/hooks'
import { loadAdmissionStore } from '@/presentation/redux'
import { LoadAdmissions } from '@/domain/usecases'

type AdmissionListProps = {
	onSelect: (admission: AdmissionModel) => void
	loadAdmissions: LoadAdmissions
}

export function AdmissionList({ onSelect, loadAdmissions }: AdmissionListProps) {
	const dispatch = useDispatch()
	const admissions = useSelector(useAdmissions())

	const [selectedAdmission, setSelectedAdmission] = useState<AdmissionModel>()

	const [loading, setLoading] = useState(true)
	const [pdfUrl, setPdfUrl] = useState('')

	const [selectedRow, setSelectedRow] = useState(0)

	const handleShowPdf = (pdfUrl: string) => {
		setPdfUrl(pdfUrl)
	}

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}

	const handleSelect = (admission: AdmissionModel) => {
		handleSelectRow(admission.id)
		setSelectedAdmission(admission)
		onSelect(admission)
	}

	useEffect(() => {
		setLoading(true)
		loadAdmissions
			.load()
			.then((response) => {
				dispatch(loadAdmissionStore(response))
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
						<td>Instrumentos</td>
						<td>Formações</td>
						<td>Processado por</td>
						<td>Acção</td>
					</tr>
				</thead>
				<tbody>
					{admissions.map((admission, i) => {
						const [firstTool, ...tools] = admission.working_tools
						const [firstTraining, ...trainings] = admission.clothes_production_training
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
								<td>
									{firstTool}
									{tools?.length ? `+${tools.length} itens` : ''}
								</td>
								<td>
									{firstTraining}
									{trainings?.length ? `+${trainings.length} itens` : ''}
								</td>
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
