import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Select } from './form-controls'
import { IconClose, IconSearch } from './icons'
import { DateUtils } from '@/utils'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import toast from 'react-hot-toast'

export type FilterDataProps = {
	athlete_id: number
	name: string
	created_at: string
	year: number
	month: number
	gym_id: string
}

type FilterPaymentProps = {
	onFilter: (data: FilterDataProps) => void
}

const initialData: FilterDataProps = {
	athlete_id: '' as any,
	month: '' as any,
	name: '' as any,
	gym_id: '' as any,
	created_at: '' as any,
	year: new Date().getFullYear()
}

export function FilterPayment({ onFilter }: FilterPaymentProps) {
	const [formData, setFormData] = useState<FilterDataProps>(initialData)
	const [gyms, setGyms] = useState([]);

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

	const handleClear = () => {
		setFormData(initialData)
		onFilter(initialData)
	}

	return (
		<div className="flex items-end">
			<Input
				onChange={handleInput}
				name="name"
				label="Nome"
				type="text"
				value={formData.name || ''}
			/>
			<Select
				onChange={handleInput}
				name="month"
				value={formData.month || ''}
				label="Mês"
				data={DateUtils.getMonthUtils().map((month, i) => ({
					text: month,
					value: i + 1
				}))}
				defaultText="Selecione"
			/>
			<Input
				onChange={handleInput}
				name="year"
				value={formData.year}
				label="Ano"
				type="number"
			/>
			<Input
				onChange={handleInput}
				name="athlete_id"
				value={formData.athlete_id}
				label="Id do atleta"
				type="text"
			/>
			<Select
				name="gym_id"
				onChange={handleInput}
				label="Selecione Ginásio"
				data={gyms.map(gym => ({ text: gym.name, value: gym.id }))}
				value={formData.gym_id || ''}
				defaultText="Selecione"
			/>
			<Input
				onChange={handleInput}
				name="created_at"
				value={formData.created_at}
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
