import React, { ChangeEvent, useState } from 'react'
import { Button, Input, Select } from './form-controls'
import { IconClose, IconSearch } from './icons'
import { DateUtils } from '@/utils'

export type FilterDataProps = {
	nameSuppliers: string
	created_at: string
	nameProduct: string
}

type FilterSuppliersProps = {
	onFilter: (data: FilterDataProps) => void
}

const initialData: FilterDataProps = {
	nameSuppliers: '' as any,
	created_at: '' as any,
	nameProduct: '' as any
}

export function FilterSuppliers({ onFilter }: FilterSuppliersProps) {
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
				value={formData.nameSuppliers || ''}
			/>
			<Input
				onChange={handleInput}
				name="athlete_id"
				label="ID"
				type="number"
				value={formData.nameProduct || ''}
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
