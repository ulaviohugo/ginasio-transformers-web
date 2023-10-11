import { AccessoryModel } from '@/domain/models'
import React, { ChangeEvent } from 'react'
import { Input, InputPrice, Select } from '../form-controls'

export type ProductionAccessoryCardChangeProps = {
	index: number
	name: string
	value: string
}

export type AccessoryItemProps = {
	accessory_id: number
	quantity: string
	price: string
}

type ProductionAccessoryEditorProps = {
	accessories: AccessoryModel[]
	accessoryItem: AccessoryItemProps
	itemIndex: number
	index: number
	onChange: (data: ProductionAccessoryCardChangeProps) => void
}

export function ProductionBudgetAccessoryEditor({
	accessoryItem,
	accessories,
	index,
	itemIndex,
	onChange
}: ProductionAccessoryEditorProps) {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		const data: any = { index: itemIndex, name, value }
		onChange(data)
	}

	return (
		<tr>
			<td className="pb-2 px-2 min-w-[176px]">
				<Select
					name="accessory_id"
					defaultText="Selecione"
					data={accessories.map(({ id, name }) => ({ text: name, value: id }))}
					value={accessoryItem.accessory_id || ''}
					onChange={handleInputChange}
				/>
			</td>
			<td className="pb-2 px-2">
				<Input
					type="number"
					name="quantity"
					value={accessoryItem.quantity || ''}
					onChange={handleInputChange}
				/>
			</td>
			<td className="pb-2 px-2">
				<InputPrice
					name="price"
					value={accessoryItem.price || ''}
					onChange={handleInputChange}
				/>
			</td>
		</tr>
	)
}
