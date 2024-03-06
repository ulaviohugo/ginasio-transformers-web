import React, { ChangeEvent, useState } from 'react'
import { Button, Input } from './form-controls'
import { IconClose, IconSearch } from './icons'

export type FilterDataProps = {
	name: string
	created_at: string
	id: number
}

type FilterEquipmentProps = {
	onFilter: (data: FilterDataProps) => void
}

const initialData: FilterDataProps = {
	created_at: '',
	id: '' as any,
	name: ''
}

export function FilterEquipment({ onFilter }: FilterEquipmentProps) {
	const [formData, setFormData] = useState<FilterDataProps>(initialData)

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
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