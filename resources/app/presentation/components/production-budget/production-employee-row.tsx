import React, { ChangeEvent } from 'react'
import { ProductionEmployeeBox } from './production-employee-box'
import { EmployeeModel, ProductionBudgetModel } from '@/domain/models'

type ProductionEmployeeRowProps = {
	formData: ProductionBudgetModel
	handleInputChange: (e: ChangeEvent) => void
	employeeList: EmployeeModel[]
}

export function ProductionEmployeeRow({
	formData,
	handleInputChange,
	employeeList
}: ProductionEmployeeRowProps) {
	return (
		<fieldset>
			<legend>Colaborador</legend>
			<table className="w-full">
				<thead>
					<tr>
						<td>Produção</td>
						<td>Funcionário</td>
						<td>Salário</td>
						<td>Dia</td>
						<td>Hora</td>
						<td>Minuto</td>
						<td>Tempo Min.</td>
					</tr>
				</thead>
				<tbody>
					<ProductionEmployeeBox
						data={{
							title: 'Corte',
							employees: employeeList,
							onChange: handleInputChange,
							prefix: 'cutting',
							formData
						}}
					/>
					<ProductionEmployeeBox
						data={{
							title: 'Costura',
							employees: employeeList,
							onChange: handleInputChange,
							prefix: 'sewing',
							formData
						}}
					/>
				</tbody>
			</table>
		</fieldset>
	)
}
