import React, { ChangeEvent } from 'react'
import { IconClose, Input, InputPhone, Select } from '..'
import { DateUtils, DocumentUtils, LabelUtils } from '@/utils'
import { InsuredModel } from '@/domain/models'

export type InsuredCardChangeProps = {
	index: number
	name: string
	value: string
}

export type InsuredEditorProps = {
	insured: InsuredModel
	itemIndex: number
	index: number
	onChange: (data: InsuredCardChangeProps) => void
	onRemoveItem: (index: number) => void
}

export function PolicyholderInsuredEditor({
	index,
	insured,
	itemIndex,
	onChange,
	onRemoveItem
}: InsuredEditorProps) {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		onChange({ index: itemIndex, name, value })
	}

	return (
		<div className="relative m-1 shadow p-4 hover:bg-gray-50">
			<h2 className="font-bold border-b pb-1 mb-1 uppercase">
				{index + 1}ª Pessoa segurada
			</h2>
			<div className="grid grid-cols-2 gap-2">
				<Input
					name="name"
					id={`name-${itemIndex}`}
					value={insured?.name || ''}
					label={LabelUtils.translateField('name')}
					onChange={handleInputChange}
				/>
				<Input
					name="card_name"
					id={`card_name-${itemIndex}`}
					value={insured?.card_name || ''}
					label={LabelUtils.translateField('card_name')}
					onChange={handleInputChange}
				/>
				<Input
					type="date"
					name="date_of_birth"
					id={`date_of_birth-${itemIndex}`}
					value={insured?.date_of_birth ? DateUtils.getDate(insured?.date_of_birth) : ''}
					label={LabelUtils.translateField('date_of_birth')}
					onChange={handleInputChange}
				/>
				<Input
					name="age"
					id={`age-${itemIndex}`}
					value={insured?.date_of_birth ? DateUtils.getAge(insured?.date_of_birth) : ''}
					label={'Idade'}
					disabled
					onChange={handleInputChange}
				/>
				<Select
					name="document_type"
					id={`document_type-${itemIndex}`}
					value={insured?.document_type || ''}
					label={LabelUtils.translateField('document_type')}
					data={DocumentUtils.docs.map((doc) => ({ text: doc }))}
					defaultText="Selecione"
					onChange={handleInputChange}
				/>
				<Input
					name="document_number"
					id={`document_number-${itemIndex}`}
					value={insured?.document_number || ''}
					label={LabelUtils.translateField('document_number')}
					disabled={!insured?.document_type}
					onChange={handleInputChange}
				/>
				<Input
					name="nif"
					id={`nif-${itemIndex}`}
					value={insured?.nif || ''}
					label={LabelUtils.translateField('nif')}
					onChange={handleInputChange}
				/>
				<Select
					name="gender"
					id={`gender-${itemIndex}`}
					value={insured?.gender || ''}
					label={LabelUtils.translateField('gender')}
					data={[{ text: 'Masculino' }, { text: 'Feminino' }]}
					defaultText="Selecione"
					onChange={handleInputChange}
				/>
				<Select
					name="student"
					id={`student-${itemIndex}`}
					value={insured?.student || ''}
					label={LabelUtils.translateField('student')}
					data={[{ text: 'SIM' }, { text: 'NÃO' }]}
					defaultText="Selecione"
					onChange={handleInputChange}
				/>
				<Input
					name="occupation"
					id={`occupation-${itemIndex}`}
					value={(insured?.occupation as any) || ''}
					label={LabelUtils.translateField('occupation')}
					onChange={handleInputChange}
				/>
				<InputPhone
					name="phone"
					id={`phone-${itemIndex}`}
					value={insured?.phone || ''}
					label={LabelUtils.translateField('phone')}
					onChange={handleInputChange}
				/>
				<Select
					name="relationship"
					id={`relationship-${itemIndex}`}
					value={insured?.relationship || ''}
					label={LabelUtils.translateField('relationship')}
					data={[
						{ text: 'Pai' },
						{ text: 'Mãe' },
						{ text: 'Esposo (a)' },
						{ text: 'Filho (a)' },
						{ text: 'Irmão (a)' },
						{ text: 'Primo (a)' }
					]}
					defaultText="Selecione"
					onChange={handleInputChange}
				/>
			</div>
			<IconClose
				className="absolute top-2 right-2 bg-red-500 text-white cursor-pointer"
				onClick={() => onRemoveItem(itemIndex)}
			/>
		</div>
	)
}
