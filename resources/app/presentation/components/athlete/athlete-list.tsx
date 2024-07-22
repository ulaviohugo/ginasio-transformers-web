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
	Spinner,
	Button,
	Select
} from '@/presentation/components'
import { DateUtils, ObjectUtils } from '@/utils'
import { useAthletes, useAuth } from '@/presentation/hooks'
import { loadAthleteStore } from '@/presentation/redux'
import { LoadAthletes } from '@/domain/usecases'
import { QueryParams } from '@/data/protocols'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { GymModel } from '@/domain/models/gym'

export type FilterDataProps = {
	id: number
	name: string
	email: string
	phone: string
	date: Date
	gym_id: number
}

type AthleteListProps = {
	onSelect: (athlete: AthleteModel) => void
	loadAthletes: LoadAthletes
}

export function AthleteList({ onSelect, loadAthletes }: AthleteListProps) {
	const dispatch = useDispatch()
	const athletes = useSelector(useAthletes())

	const [gyms, setGyms] = useState<GymModel[]>([])

	const [loading, setLoading] = useState(true)

	const user = useSelector(useAuth())
	const isAdmin = user.gym_id != null

	const [selectedRow, setSelectedRow] = useState(0)

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}

	const handleSelect = (athlete: AthleteModel) => {
		handleSelectRow(athlete.id)
		onSelect(athlete)
	}

	const [filterData, setFilterData] = useState<FilterDataProps>({} as FilterDataProps)
	const [filtered, setFiltered] = useState<FilterDataProps>({
		id: '' as any,
		name: '',
		email: '',
		phone: '' as any,
		date: '' as any,
		gym_id: '' as any
	})

	const hasFilter = useMemo(() => {
		setFiltered(filterData)
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
		setFiltered(filterData)
		fetchData({ filter: filterData })
		// onFilter(filterData)
	}

	if (isAdmin == null) {
		useEffect(() => {
			fetchData()
		}, [])
	} else {
		const handleRequestFilter = () => {
			setFiltered(filterData)
			fetchData({ filter: filterData })
			// onFilter(filterData)
		}

		useEffect(() => {
			handleRequestFilter()
		}, [filterData])
	}

	

	const fetchDataGym = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/gym' + (queryParams || '')),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setGyms(httpResponse.body)
		} else {
			toast.error(httpResponse.body)
		}
	}

	useEffect(() => {
		fetchDataGym()
	}, [])

	useEffect(() => {
		if (user.gym_id) {
			setFilterData({...filterData,gym_id:user.gym_id})
		}
	}, [])

	const clearFilter = () => {
		setFilterData({} as any)
		fetchData()
	}

	const handleOpenPdf = () => {
		const { id, name, phone, email, date, gym_id } = filtered
		const queryParams = `?id=${id || ''}&name=${encodeURIComponent(name || '')}&phone=${phone || ''}&email=${encodeURIComponent(email || '')}&date=${date || ''}&gym_id=${gym_id || ''}`
		window.open(`/pdf/atletas${queryParams}`)
	}

	return (
		<fieldset className="p-4 md:p-6">
			<legend className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
				<div className="flex items-center">
					Filtro {loading && <Spinner />}
				</div>
				<Button text="Gerar PDF" onClick={handleOpenPdf} />
			</legend>
			<div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6 mb-4">
				<div className="flex-1 max-w-xs">
					<Input
						type="number"
						name="id"
						label="Código"
						value={filterData?.id || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="flex-1 max-w-xs">
					<Input
						name="name"
						label="Nome"
						value={filterData?.name || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="flex-1 max-w-xs">
					<Input
						name="email"
						label="E-mail"
						value={filterData?.email || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="flex-1 max-w-xs">
					<Input
						name="phone"
						label="Telefone"
						value={filterData?.phone || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="flex-1 max-w-xs">
					<Select
						name="gym_id"
						onChange={handleChangeFilterInput}
						label="Selecione a Filial"
						required
						data={gyms.map((gym) => ({ text: gym.name, value: gym.id }))}
						value={isAdmin ? user.gym_id : filterData?.gym_id || ''}
						defaultText="Selecione"
						disabled={isAdmin}
					/>
				</div>
				<div className="flex-1 max-w-xs">
					<Input
						type="date"
						name="date"
						label="Data"
						value={filterData?.date?.toString() || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="flex gap-2 mt-4 md:mt-0">
				<button
						type="button"
						className="flex btn-primary h-8"
						onClick={handleRequestFilter}
					>
						{loading ? <Spinner /> : <IconSearch />}
					</button>
					{hasFilter && (
						<Button
							type="button"
							className="flex items-center justify-center btn-default h-8"
							onClick={clearFilter}
						>
							<IconClose className="w-4 h-4" />
						</Button>
					)}
				</div>
			</div>
			<ListContainer>
				<table className="w-full text-sm">
					<thead className="bg-gray-100">
						<tr className="font-semibold border-b">
							<th>ID</th>
							<th>Nome</th>
							<th>Telefone</th>
							<th>E-mail</th>
							<th>Estado</th>
							<th>Inscrição</th>
						</tr>
					</thead>
					<tbody>
						{athletes.map((athlete, i) => {
							const status = athlete.status === 'active' ? 'Activo' : 'Inactivo'
							return (
								<tr
									key={athlete.id}
									className={`
										cursor-pointer transition-all duration-150 
										${i % 2 !== 0 && 'bg-gray-100'} 
										${selectedRow === athlete.id ? 'bg-primary text-white' : 'hover:bg-gray-200'}
									`}
									onClick={() => handleSelect(athlete)}
								>
									<td>{athlete.id}</td>
									<td>{athlete.name}</td>
									<td>{athlete.phone}</td>
									<td>{athlete.email}</td>
									<td>
										<div
											className={`inline-flex px-3 py-1 rounded-lg text-white ${
												athlete.status === 'active' ? 'bg-green-500' : 'bg-red-500'
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
