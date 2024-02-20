import React, { ChangeEvent, useState } from 'react'
import { Button, Input, Select } from './form-controls'
import { IconClose, IconSearch } from './icons'
import { DateUtils } from '@/utils'

export type FilterDataProps = {
	athlete_id: number
	name: string
	created_at: string
	year: number
	month: number
}

type FilterPaymentProps = {
	onFilter: (data: FilterDataProps) => void
}

const initialData: FilterDataProps = {
	athlete_id: '' as any,
	month: '' as any,
	name: '' as any,
	created_at: '' as any,
	year: new Date().getFullYear()
}

export function FilterPayment({ onFilter }: FilterPaymentProps) {
	const [formData, setFormData] = useState<FilterDataProps>(initialData)

	const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

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
