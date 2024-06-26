import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { AthleteModel } from '@/domain/models'
import {
	ListContainer,
	IconClose,
	IconSearch,
	Input,
	NoData,
	Spinner
} from '@/presentation/components'
import { DateUtils, ObjectUtils } from '@/utils'
import { useAthletes } from '@/presentation/hooks'
import { loadAthleteStore } from '@/presentation/redux'
import { LoadAthletes } from '@/domain/usecases'
import { QueryParams } from '@/data/protocols'

type FilterDataProps = {
	id: number
	name: string
	email: string
	phone: string
	date: Date
}

type AthleteListProps = {
	onSelect: (athlete: AthleteModel) => void
	loadAthletes: LoadAthletes
}

export function AthleteList({ onSelect, loadAthletes }: AthleteListProps) {
	const dispatch = useDispatch()
	const athletes = useSelector(useAthletes())

	const [loading, setLoading] = useState(true)

	const [selectedRow, setSelectedRow] = useState(0)

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}

	const handleSelect = (athlete: AthleteModel) => {
		handleSelectRow(athlete.id)
		onSelect(athlete)
	}

	const [filterData, setFilterData] = useState<FilterDataProps>({} as FilterDataProps)

	const hasFilter = useMemo(() => {
		return !ObjectUtils.isEmpty(filterData)
	}, [filterData])

	const handleChangeFilterInput = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFilterData({ ...filterData, [name]: value })
	}

	const fetchData = (queryParams?: QueryParams) => {
		setLoading(true)
		loadAthletes
			.load(queryParams)
			.then((response) => {
				dispatch(loadAthleteStore(response))
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => {
				setLoading(false)
			})
	}

	const handleRequestFilter = () => {
		if (ObjectUtils.isEmpty(filterData)) {
			return toast.error('Selecione alguns campos para filtrar resultados')
		}
		fetchData({ filter: filterData })
	}

	useEffect(() => {
		fetchData()
	}, [])

	const clearFilter = () => {
		setFilterData({} as any)
		fetchData()
	}

	return (
		<fieldset>
			<legend>Filtro {loading && <Spinner />}</legend>
			<div className="flex mb-3 gap-2">
				<div className="max-w-20">
					<Input
						type="number"
						name="id"
						label={'Código'}
						value={filterData?.id || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="flex-1">
					<Input
						name="name"
						label={'Nome'}
						value={filterData?.name || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="">
					<Input
						name="email"
						label={'E-mail'}
						value={filterData?.email || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="">
					<Input
						name="phone"
						label={'Telefone'}
						value={filterData?.phone || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="">
					<Input
						type="date"
						name="date"
						label={'Data'}
						value={filterData?.date?.toString() || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="flex items-end gap-2 pl-2">
					<button
						type="button"
						className="flex btn-primary h-8"
						onClick={handleRequestFilter}
					>
						{loading ? <Spinner /> : <IconSearch />}
					</button>
					{hasFilter && (
						<button type="button" className="flex btn-default h-8" onClick={clearFilter}>
							<IconClose />
						</button>
					)}
				</div>
			</div>
			<ListContainer>
				<table className="w-full text-sm">
					<thead className="">
						<tr className="font-semibold border-b">
							<td>ID</td>
							<td>Nome</td>
							<td>Telefone</td>
							<td>E-mail</td>
							<td>Estado</td>
							<td>Inscrição</td>
						</tr>
					</thead>
					<tbody className="pt-20">
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
			</ListContainer>
			{!loading && athletes.length < 1 && <NoData />}
		</fieldset>
	)
}
