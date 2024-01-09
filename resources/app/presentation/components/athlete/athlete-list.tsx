import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { AthleteModel } from '@/domain/models'
import { NoData, PdfViewer, Spinner } from '@/presentation/components'
import { DateUtils } from '@/utils'
import { useAthletes } from '@/presentation/hooks'
import { loadAthleteStore } from '@/presentation/redux'
import { LoadAthletes } from '@/domain/usecases'

type AthleteListProps = {
	onSelect: (athlete: AthleteModel) => void
	loadAthletes: LoadAthletes
}

export function AthleteList({ onSelect, loadAthletes }: AthleteListProps) {
	const dispatch = useDispatch()
	const athletes = useSelector(useAthletes())

	const [selectedAthlete, setSelectedAthlete] = useState<AthleteModel>()

	const [loading, setLoading] = useState(true)
	const [pdfUrl, setPdfUrl] = useState('')

	const [selectedRow, setSelectedRow] = useState(0)

	const handleShowPdf = (pdfUrl: string) => {
		setPdfUrl(pdfUrl)
	}

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}

	const handleSelect = (athlete: AthleteModel) => {
		handleSelectRow(athlete.id)
		setSelectedAthlete(athlete)
		onSelect(athlete)
	}

	useEffect(() => {
		setLoading(true)
		loadAthletes
			.load()
			.then((response) => {
				dispatch(loadAthleteStore(response))
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
						<td>Nome</td>
						<td>Telefone</td>
						<td>E-mail</td>
						<td>Estado</td>
						<td>Inscrição</td>
					</tr>
				</thead>
				<tbody>
					{athletes.map((athlete, i) => {
						const status = athlete.status == 'active' ? 'Activo' : 'Inactivo'
						return (
							<tr
								key={athlete.id}
								className={`
									cursor-pointer transition-all duration-150 
									${i % 2 !== 0 && 'bg-gray-100'} 
									${selectedRow == athlete.id ? 'bg-primary text-white' : 'hover:bg-gray-200'}
									`}
								onClick={() => handleSelect(athlete)}
							>
								<td>{athlete.id}</td>
								<td>{athlete.name}</td>
								<td>{athlete.phone}</td>
								<td>{athlete.email}</td>
								<td>
									<div
										className={`inline-flex px-3 py-[2px] rounded-lg text-white ${
											athlete.status == 'active' ? 'bg-green-500' : 'bg-red-500'
										}`}
									>
										{status}
									</div>
								</td>
								<td>{DateUtils.getDatePt(athlete.created_at)}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			{!loading && athletes.length < 1 && <NoData />}
		</fieldset>
	)
}
