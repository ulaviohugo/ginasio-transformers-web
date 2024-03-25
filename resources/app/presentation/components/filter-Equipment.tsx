import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Select } from './form-controls'
import { IconClose, IconSearch } from './icons'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import toast from 'react-hot-toast'

export type FilterDataProps = {
	name: string
	gym_id: string
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
	gym_id: ''
}

export function FilterEquipment({ onFilter }: FilterEquipmentProps) {
	const [formData, setFormData] = useState<FilterDataProps>(initialData)
	const [gyms, setGyms] = useState([]);

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
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
			<Input
				onChange={handleInput}
				name="created_at"
				value={formData.created_at || ''}
				label="Data"
				type="date"
			/>
			<Select
				name="gym_id"
				onChange={handleInput}
				label="Selecione Ginásio"
				required
				data={gyms.map(gym => ({ text: gym.name, value: gym.id }))}
				value={formData.gym_id || ''}
				defaultText="Selecione"
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
