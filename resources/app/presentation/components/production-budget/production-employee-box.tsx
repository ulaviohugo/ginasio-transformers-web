import React, { ChangeEvent } from 'react'
import { EmployeeModel } from '@/domain/models'
import { Input, InputPrice, Select } from '../form-controls'

type ProductionEmployeeBoxProps = {
	title: string
	prefix: 'cutting' | 'sewing'
	employees: EmployeeModel[]
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
	formData: any
}

export const ProductionEmployeeBox = ({
	data: { employees, formData, onChange, prefix, title }
}: {
	data: ProductionEmployeeBoxProps
}) => {
	return (
		<tr>
			<td className="pb-2">
				<Input name="title" value={title || ''} onChange={onChange} />
			</td>
			<td className="pb-2">
				<Select
					name={`${prefix}_employee_id`}
					id={`${prefix}_employee_id`}
					value={formData[`${prefix}_employee_id`] || ''}
					defaultText="Selecione"
					data={employees.map(({ id, name }) => ({ text: name, value: id }))}
					onChange={onChange}
				/>
			</td>
			<td className="pb-2">
				<InputPrice
					name={`${prefix}_base_salary`}
					id={`${prefix}_base_salary`}
					value={formData[`${prefix}_base_salary`] || ''}
					onChange={onChange}
					readOnly
				/>
			</td>
			<td className="pb-2">
				<InputPrice
					name={`${prefix}_day`}
					id={`${prefix}_day`}
					value={formData[`${prefix}_day`] || ''}
					onChange={onChange}
					readOnly
				/>
			</td>
			<td className="pb-2">
				<InputPrice
					name={`${prefix}_hour`}
					id={`${prefix}_hour`}
					value={formData[`${prefix}_hour`] || ''}
					onChange={onChange}
					readOnly
				/>
			</td>
			<td className="pb-2">
				<InputPrice
					name={`${prefix}_minute`}
					id={`${prefix}_minute`}
					value={formData[`${prefix}_minute`] || ''}
					onChange={onChange}
					readOnly
				/>
			</td>
			<td className="pb-2">
				<Input
					type="number"
					name={`${prefix}_duration_per_minute`}
					id={`${prefix}_duration_per_minute`}
					value={formData[`${prefix}_duration_per_minute`] || ''}
					onChange={onChange}
				/>
			</td>
		</tr>
	)
}
