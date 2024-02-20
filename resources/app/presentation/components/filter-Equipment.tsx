import React, { ChangeEvent, useState } from 'react'
import { Button, Input } from './form-controls'
import { IconSearch } from './icons'

export type FilterDataProps = {
	name: string
	created_at: string
	id: number
}

type FilterEquipmentProps = {
	onFilter: (data: FilterDataProps) => void
}

export function FilterEquipment({ onFilter }: FilterEquipmentProps) {
	const [formData, setFormData] = useState<FilterDataProps>({} as FilterDataProps)

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	return (
		<div className="flex items-end">
			<Input onChange={handleInput} name="id" label="Id" type="text" />
			<Input onChange={handleInput} name="name" label="Nome" type="text" />
			<Input onChange={handleInput} name="created_at" label="Data" type="date" />
			<Button
				variant="gray-light"
				type="button"
				icon={IconSearch}
				className="h-8"
				onClick={() => onFilter(formData)}
			/>
		</div>
	)
}
