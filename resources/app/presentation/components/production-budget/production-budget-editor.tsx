import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Input, InputPrice, Select } from '../form-controls'
import { DateUtils, FileUtils, NumberUtils, SalaryUtils } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useCustomers, useEmployees } from '@/presentation/hooks'
import { loadCustomerStore, loadEmployeeStore } from '@/presentation/redux'
import {
	makeRemoteAddProductionBudget,
	makeRemoteLoadAccessories,
	makeRemoteLoadCustomers,
	makeRemoteLoadEmployees,
	makeRemoteLoadFabrics
} from '@/main/factories'
import toast from 'react-hot-toast'
import {
	AccessoryModel,
	EmployeeModel,
	FabricModel,
	ProductionBudgetModel
} from '@/domain/models'
import { ProductionBudgetFabricEditor } from './production-budget-fabric-editor'
import { ProductionBudgetAccessoryEditor } from './production-budget-accessory-editor'
import { ImagePreview } from '../image-preview'

export type SupplierProductCardChangeProps = {
	index: number
	name: string
	value: string
}

export function ProductionBudgetEditor() {
	const dispatch = useDispatch()
	const [formData, setFormData] = useState<ProductionBudgetModel>({
		date: new Date()
	} as any)
	const [photoPreview, setPhotoPreview] = useState('')
	const customers = useSelector(useCustomers())

	const [accessories, setAccessories] = useState<AccessoryModel[]>([])
	const [fabrics, setFabrics] = useState<FabricModel[]>([])

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

	const fetchLoad = (
		fetcher: { load: () => Promise<any> },
		callback: (response: any) => void
	) => {
		fetcher
			.load()
			.then(callback)
			.catch(({ message }) => toast.error(message))
	}

	useEffect(() => {
		Promise.all([
			fetchLoad(makeRemoteLoadEmployees(), (response) =>
				dispatch(loadEmployeeStore(response))
			),
			fetchLoad(makeRemoteLoadCustomers(), (response) =>
				dispatch(loadCustomerStore(response))
			),
			fetchLoad(makeRemoteLoadFabrics(), setFabrics),
			fetchLoad(makeRemoteLoadAccessories(), setAccessories)
		])
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

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
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
		if (name == 'photo') {
			const file = await FileUtils.toBase64((e.target as any)?.files[0])
			data = { ...data, [name]: file }
			setPhotoPreview(file)
		}
		setFormData(data)
	}

	const handleSubmit = async () => {
		console.log({ formData })

		try {
			const httpResponse = await makeRemoteAddProductionBudget().add(formData)
		} catch ({ message }) {
			toast.error(message)
		}
	}

	return (
		<div>
			<div className="flex gap-4">
				<div className="flex flex-col gap-3">
					<fieldset>
						<legend>Cliente</legend>
						<div className="flex gap-1 items-start">
							<ImagePreview
								photoPreview={photoPreview}
								onInputFileChange={handleInputChange}
							/>
							<Select
								name="customer_id"
								label="Nome do cliente"
								defaultText="Selecione"
								data={customers.map(({ id: value, name: text }) => ({
									text,
									value
								}))}
								onChange={handleInputChange}
							/>
							<Select label="Produto final" defaultText="Selecione" data={[]} />
							<Input
								label="Data"
								type="date"
								value={DateUtils.getDate(formData.date) || ''}
								onChange={handleInputChange}
							/>
							<Select
								label="Avaliação"
								defaultText="Selecione"
								data={[
									{ text: 'Insatisfeito' },
									{ text: 'Melhor' },
									{ text: 'Satisfeito' },
									{ text: 'Muito Satisfeito' }
								]}
								onChange={handleInputChange}
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
												fabrics={fabrics}
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
												accessories={accessories}
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
				</div>
				<fieldset className="w-80">
					<legend>Pagamentos</legend>
					<div className="flex gap-1 flex-col ml-auto">
						<Item label="Custo corte" value={0} />
						<Item label="Custo costura" value={0} />
						<Item label="Custo variável" value={0} />
						{/* Acabamento é uma constante */}
						<Input label="Acabamento" value={250} />

						<Item label="Custo Produção" value={0} />
						<Input label="Custo venda" />
						<Input label="Desconto" />
						<Item label="Total a pagar" value={0} />
					</div>
				</fieldset>
			</div>
			<div className="flex mt-2">
				<button className="btn-primary ml-auto" onClick={handleSubmit}>
					Salvar
				</button>
			</div>
		</div>
	)
}

type ItemProps = {
	label: string
	value: string | number
	className?: string
}
const Item = ({ className = '', label, value = 0 }: ItemProps) => (
	<div className={`flex flex-col h-full ${className}`}>
		<div>{label}</div>
		<div className="border px-2 py-1 rounded-md flex w-full h-full">{value}</div>
	</div>
)

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
					onChange={onChange}
					readOnly
				/>
			</td>
			<td className="pb-2">
				<InputPrice
					name={`${prefix}_day`}
					id={`${prefix}_day`}
					value={formData[`${prefix}_day`]}
					onChange={onChange}
					readOnly
				/>
			</td>
			<td className="pb-2">
				<InputPrice
					name={`${prefix}_hour`}
					id={`${prefix}_hour`}
					// value={NumberUtils.format(formData[`${prefix}_hour`]) || ''}
					value={formData[`${prefix}_hour`] || ''}
					onChange={onChange}
					readOnly
				/>
			</td>
			<td className="pb-2">
				<InputPrice
					name={`${prefix}_minute`}
					id={`${prefix}_minute`}
					// value={NumberUtils.format(formData[`${prefix}_minute`]) || ''}
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
