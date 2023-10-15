import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Input, InputPrice, Select } from '../form-controls'
import { DateUtils, SalaryUtils } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useEmployees } from '@/presentation/hooks'
import { loadEmployeeStore } from '@/presentation/redux'
import { makeRemoteLoadEmployees } from '@/main/factories'
import toast from 'react-hot-toast'
import { EmployeeModel } from '@/domain/models'
import { ProductionBudgetFabricEditor } from './production-budget-fabric-editor'
import { ProductionBudgetAccessoryEditor } from './production-budget-accessory-editor'

type FormDataProps = {
	date: any
}

export type SupplierProductCardChangeProps = {
	index: number
	name: string
	value: string
}

export function ProductionBudgetEditor() {
	const dispatch = useDispatch()
	const [formData, setFormData] = useState<FormDataProps>({ date: new Date() })

	const [fabricItems, setFabricItems] = useState<any>({
		0: {},
		1: {},
		2: {},
		3: {},
		4: {}
	})

	const [accessoryItems, setAccessoryItems] = useState<any>({
		0: {},
		1: {},
		2: {},
		3: {},
		4: {}
	})

	const fabricList = useMemo(() => Object.keys(fabricItems), [fabricItems])

	const employees = useSelector(useEmployees())

	useEffect(() => {
		makeRemoteLoadEmployees()
			.load()
			.then((response) => {
				dispatch(loadEmployeeStore(response))
			})
			.catch(({ message }) => toast.error(message))
	}, [])

	const handleChangeFabric = ({ index, name, value }: SupplierProductCardChangeProps) => {
		let data = fabricItems[index] || { [index]: { [name]: value } }[index]
		data = { ...data, [name]: value }
		setFabricItems({ ...fabricItems, [index]: data })
	}

	const handleChangeAccessory = ({
		index,
		name,
		value
	}: SupplierProductCardChangeProps) => {
		let data = accessoryItems[index] || { [index]: { [name]: value } }[index]
		data = { ...data, [name]: value }
		setAccessoryItems({ ...accessoryItems, [index]: data })
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		let data = { ...formData, [name]: value }

		if (name.indexOf('employee_id') >= 0) {
			const [prefix] = name.split('_')
			const employee = employees.find(({ id }) => id == Number(value)) as EmployeeModel
			data = {
				...data,
				[`${prefix}_base_salary`]: employee?.base_salary,
				[`${prefix}_day`]: SalaryUtils.getSalaryPerDay(employee?.base_salary),
				[`${prefix}_hour`]: SalaryUtils.getSalaryPerHour(employee?.base_salary),
				[`${prefix}_minute`]: SalaryUtils.getSalaryPerMinute(employee?.base_salary)
			}
		}
		setFormData(data)
	}

	return (
		<div className="flex flex-col gap-3 p-4 shadow-md">
			<fieldset>
				<legend>Cliente</legend>
				<div className="flex gap-1">
					<Select label="Nome do cliente" defaultText="Selecione" data={[]} />
					<Select label="Tipo de peça" defaultText="Selecione" data={[]} />
					<Input
						label="Data"
						type="date"
						value={DateUtils.getDate(formData.date) || ''}
						onChange={handleInputChange}
					/>
					<Select
						label="Avaliação"
						defaultText="Selecione"
						data={[{ text: 'Bom' }, { text: 'Mau' }, { text: 'Excelente' }]}
					/>
				</div>
			</fieldset>
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
						<EmployeeBox
							data={{
								title: 'Corte',
								employees,
								onChange: handleInputChange,
								prefix: 'cutting',
								formData
							}}
						/>
						<EmployeeBox
							data={{
								title: 'Costura',
								employees,
								onChange: handleInputChange,
								prefix: 'sewing',
								formData
							}}
						/>
					</tbody>
				</table>
			</fieldset>

			<div className="grid grid-cols-7 gap-4">
				<fieldset className="col-span-4">
					<legend>Tecidos</legend>
					<table className="w-full">
						<thead>
							<tr>
								<td className="px-2">Tipo de tecido</td>
								<td className="px-2">Cor</td>
								<td className="px-2">Metros</td>
								<td className="px-2">Custo</td>
							</tr>
						</thead>
						<tbody>
							{fabricList.map((key, i) => {
								return (
									<ProductionBudgetFabricEditor
										key={key}
										fabrics={[
											{ id: 1, name: 'Tecido' } as any,
											{ id: 2, name: 'Tecido 2' }
										]}
										fabricItem={fabricItems[key]}
										index={i}
										itemIndex={Number(key)}
										onChange={handleChangeFabric}
									/>
								)
							})}
						</tbody>
					</table>
				</fieldset>
				<fieldset className="col-span-3">
					<legend>Acessórios</legend>
					<table className="w-full">
						<thead>
							<tr>
								<td className="px-2">Tipo de acessórios</td>
								<td className="px-2">Quantidade</td>
								<td className="px-2">Preço</td>
							</tr>
						</thead>
						<tbody>
							{fabricList.map((key, i) => {
								return (
									<ProductionBudgetAccessoryEditor
										key={key}
										accessories={[
											{ id: 1, name: 'Acessório' } as any,
											{ id: 2, name: 'Acessório 2' }
										]}
										accessoryItem={accessoryItems[key]}
										index={i}
										itemIndex={Number(key)}
										onChange={handleChangeAccessory}
									/>
								)
							})}
						</tbody>
					</table>
				</fieldset>
			</div>

			<fieldset>
				<legend>Pagamentos</legend>
				<div className="flex gap-12">
					<div className="flex gap-1">
						<Input label="Custo corte" />
						<Input label="Custo costura" />
						<Input label="Custo variável" />
						<Input label="Acabamento" />
						<Input label="Custo Produção" />
					</div>
					<div className="flex gap-1 ml-auto">
						<Input label="Custo venda" />
						<Input label="Desconto" />
						<Input label="Total a pagar" />
					</div>
				</div>
			</fieldset>
		</div>
	)
}

type EmployeeBoxProps = {
	title: string
	prefix: 'cutting' | 'sewing'
	employees: EmployeeModel[]
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
	formData: any
}
const EmployeeBox = ({
	data: { employees, formData, onChange, prefix, title }
}: {
	data: EmployeeBoxProps
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
					// onChange={onChange}
					readOnly
				/>
			</td>
			<td className="pb-2">
				<InputPrice
					name={`${prefix}_day`}
					id={`${prefix}_day`}
					value={formData[`${prefix}_day`]}
					// onChange={onChange}
					readOnly
				/>
			</td>
			<td className="pb-2">
				<InputPrice
					name={`${prefix}_hour`}
					id={`${prefix}_hour`}
					value={formData[`${prefix}_hour`] || ''}
					// onChange={onChange}
					readOnly
				/>
			</td>
			<td className="pb-2">
				<InputPrice
					name={`${prefix}_minute`}
					id={`${prefix}_minute`}
					value={formData[`${prefix}_minute`] || ''}
					// onChange={onChange}
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
