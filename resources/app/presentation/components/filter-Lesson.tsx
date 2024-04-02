import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Select } from './form-controls'
import { IconClose, IconSearch } from './icons'
import { GymModel } from '@/domain/models/gym'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import toast from 'react-hot-toast'

export type FilterDataProps = {
	name: string
	created_at: string
	id: number
	gym_id: number
}

type FilterLessonProps = {
	onFilter: (data: FilterDataProps) => void
}

const initialData: FilterDataProps = {
	created_at: '',
	id: '' as any,
	gym_id: '' as any,
	name: ''
}

export function FilterLesson({ onFilter }: FilterLessonProps) {
	const [formData, setFormData] = useState<FilterDataProps>(initialData)
	const [gyms, setGyms] = useState<GymModel[]>([])
	const user = useSelector(useAuth())
	const isAdmin = user.gym_id != null

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const fetchDataGym = async () => {
		const queryParams = isAdmin ? '' : `?gym_id=${user.gym_id}`
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl(`/gym${queryParams}`),
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
	}, [formData]) // Adicionei formData para que a requisição seja feita novamente quando o formulário mudar

	const handleClear = () => {
		setFormData(initialData)
		onFilter(initialData)
	}

	return (
		<div className="flex items-end">
			<Input
				onChange={handleInput}
				name="id"
				value={formData.id || ''}
				label="Id"
				type="text"
			/>
			<Input
				onChange={handleInput}
				name="name"
				value={formData.name || ''}
				label="Nome"
				type="text"
			/>
			<Select
				name="gym_id"
				onChange={handleInput}
				label="Selecione a Filial"
				required
				data={gyms.map((gym) => ({ text: gym.name, value: gym.id }))}
				value={isAdmin ? user.gym_id : formData?.gym_id || ''} // Modificado para usar a condição isAdmin
				defaultText="Selecione"
				disabled={isAdmin}
			/>
			<Input
				onChange={handleInput}
				name="created_at"
				value={formData.created_at || ''}
				label="Data"
				type="date"
			/>
			<Button
				variant="gray-light"
				type="button"
				icon={IconSearch}
				className="h-8"
				onClick={() => onFilter(formData)}
			/>
			<Button variant="default" icon={IconClose} className="h-8" onClick={handleClear} />
		</div>
	)
}