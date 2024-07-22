import React, { ChangeEvent, useState } from 'react'
import { Button, Input } from './form-controls'
import { IconClose, IconSearch } from './icons'

export type FilterDataProps = {
	name: string
	created_at: string
	id: number
}

type FilterGymProps = {
	onFilter: (data: FilterDataProps) => void
}

const initialData: FilterDataProps = {
	created_at: '',
	id: '' as any,
	name: ''
}

export function FilterGym({ onFilter }: FilterGymProps) {
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
			<div className="flex gap-2">
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
		</div>
	)
}
