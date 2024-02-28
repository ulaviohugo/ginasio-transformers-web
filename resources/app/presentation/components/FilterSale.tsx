import React, { ChangeEvent, useState } from 'react'
import { Button, Input, Select } from './form-controls'
import { IconClose, IconSearch } from './icons'
import { DateUtils } from '@/utils'

export type FilterDataProps = {
	nameProduct: string
	created_at: string
	athlete_id: number
}

type FilterSaleProps = {
	onFilter: (data: FilterDataProps) => void
}

const initialData: FilterDataProps = {
	nameProduct: '' as any,
	created_at: '' as any,
	athlete_id: '' as any
}

export function FilterProduto({ onFilter }: FilterSaleProps) {
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
				name="nameProduct"
				label="Nome"
				type="text"
				value={formData.nameProduct || ''}
			/>
			<Input
				onChange={handleInput}
				name="athlete_id"
				label="ID"
				type="number"
				value={formData.athlete_id || ''}
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
