import { FabricModel } from '@/domain/models'
import React, { ChangeEvent } from 'react'
import { Input, InputPrice, Select } from '../form-controls'
import { ColorUtils } from '@/utils'

export type ProductionFabricCardChangeProps = {
	index: number
	name: string
	value: string
}

export type FabricItemProps = {
	fabric_id: number
	color: string
	meter: string
	cost: string
}

type ProductionFabricEditorProps = {
	fabrics: FabricModel[]
	fabricItem: FabricItemProps
	itemIndex: number
	index: number
	onChange: (data: ProductionFabricCardChangeProps) => void
}

export function ProductionBudgetFabricEditor({
	fabricItem,
	fabrics,
	index,
	itemIndex,
	onChange
}: ProductionFabricEditorProps) {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		const data: any = { index: itemIndex, name, value }
		onChange(data)
	}

	return (
		<tr>
			<td className="pb-2 px-2">
				<Select
					name="fabric_id"
					defaultText="Selecione"
					data={fabrics.map(({ id, name }) => ({ text: name, value: id }))}
					value={fabricItem.fabric_id || ''}
					onChange={handleInputChange}
				/>
			</td>
			<td className="pb-2 px-2">
				<Select
					name="color"
					defaultText="Selecione"
					data={ColorUtils.colors.map((color) => ({ text: color }))}
					value={fabricItem.color || ''}
					onChange={handleInputChange}
				/>
			</td>
			<td className="pb-2 px-2">
				<Input
					type="number"
					name="meter"
					value={fabricItem.meter || ''}
					onChange={handleInputChange}
				/>
			</td>
			<td className="pb-2 px-2">
				<InputPrice
					name="cost"
					value={fabricItem.cost || ''}
					onChange={handleInputChange}
				/>
			</td>
		</tr>
	)
}
