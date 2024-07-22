import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Select } from './form-controls'
import { IconClose, IconSearch } from './icons'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import toast from 'react-hot-toast'
import { GymModel } from '@/domain/models/gym'
import { useAuth } from '../hooks'
import { useSelector } from 'react-redux'

export type FilterDataProps = {
	name: string
	gym_id: number
	created_at: string
	id: number
}

type FilterEquipmentProps = {
	onFilter: (data: FilterDataProps) => void
}

const initialData: FilterDataProps = {
	created_at: '',
	id: '' as any,
	name: '',
	gym_id: '' as any
}

export function FilterEquipment({ onFilter }: FilterEquipmentProps) {
	const [formData, setFormData] = useState<FilterDataProps>(initialData)
	const [gyms, setGyms] = useState<GymModel[]>([])
	const user = useSelector(useAuth())
	const isAdminBool = user.gym_id != null

	const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
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
			setFormData({ ...formData, gym_id: user.gym_id })
		}
	}, [])

	const handleClear = () => {
		setFormData(initialData)
		onFilter(initialData)
	}

	return (
		<div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
			<Input
				onChange={handleInput}
				name="id"
				value={formData.id || ''}
				label="Id"
				type="text"
				className="flex-1"
			/>
			<Input
				onChange={handleInput}
				name="name"
				value={formData.name || ''}
				label="Nome"
				type="text"
				className="flex-1"
			/>
			<Input
				onChange={handleInput}
				name="created_at"
				value={formData.created_at || ''}
				label="Data"
				type="date"
				className="flex-1"
			/>
			<Select
				name="gym_id"
				onChange={handleInput}
				label="Selecione a Filial"
				required
				data={gyms.map((gym) => ({ text: gym.name, value: gym.id }))}
				value={isAdminBool ? user.gym_id : formData?.gym_id || ''}
				defaultText="Selecione"
				disabled={isAdminBool}
				className="flex-1"
			/>
			<Button
				variant="gray-light"
				type="button"
				icon={IconSearch}
				className="h-8 flex-shrink-0"
				onClick={() => onFilter(formData)}
			/>
			<Button
				variant="default"
				icon={IconClose}
				className="h-8 flex-shrink-0"
				onClick={handleClear}
			/>
		</div>
	)
}
