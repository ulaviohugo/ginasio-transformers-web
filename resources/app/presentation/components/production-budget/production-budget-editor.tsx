import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { ArrayUtils, FileUtils, NumberUtils, SalaryUtils } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useCustomers, useEmployees } from '@/presentation/hooks'
import {
	addProductionBudgetStore,
	loadCustomerStore,
	loadEmployeeStore
} from '@/presentation/redux'
import {
	makeRemoteAddProductionBudget,
	makeRemoteLoadAccessories,
	makeRemoteLoadCustomers,
	makeRemoteLoadEmployees,
	makeRemoteLoadFabrics,
	makeRemoteLoadProductionBudgets
} from '@/main/factories'
import toast from 'react-hot-toast'
import {
	AccessoryModel,
	EmployeeModel,
	FabricModel,
	ProductionBudgetModel
} from '@/domain/models'
import {
	FabricItemProps,
	ProductionBudgetFabricEditor
} from './production-budget-fabric-editor'
import {
	AccessoryItemProps,
	ProductionBudgetAccessoryEditor
} from './production-budget-accessory-editor'
import { ProductionCustomerEditor } from './production-customer-editor'
import { ProductionPaymentEditor } from './production-payment-editor'
import { ProductionEmployeeRow } from './production-employee-row'
import { ProductionBudgetList } from './production-budget-list'
import { Button } from '../form-controls'
import { IconCheck, IconClose } from '../icons'

export type SupplierProductCardChangeProps = {
	index: number
	name: string
	value: string
}

type AccessoryRecordProps = Record<number, { [key in keyof AccessoryItemProps]: any }>
type FabricRecordProps = Record<number, { [key in keyof FabricItemProps]: any }>

const initialAccessoryItemValues: AccessoryRecordProps = {
	0: {} as AccessoryItemProps,
	1: {} as AccessoryItemProps,
	2: {} as AccessoryItemProps,
	3: {} as AccessoryItemProps,
	4: {} as AccessoryItemProps
}
const initialFabricItemValues: FabricRecordProps = {
	0: {} as FabricItemProps,
	1: {} as FabricItemProps,
	2: {} as FabricItemProps,
	3: {} as FabricItemProps,
	4: {} as FabricItemProps
}

const initialFormDataValues: ProductionBudgetModel = {
	date: new Date(),
	finishing_cost: 250
} as ProductionBudgetModel

export function ProductionBudgetEditor() {
	const dispatch = useDispatch()

	const employees = useSelector(useEmployees())
	const customers = useSelector(useCustomers())

	const [formData, setFormData] = useState<ProductionBudgetModel>(initialFormDataValues)
	const [isLoading, setIsLoading] = useState(false)

	const [accessories, setAccessories] = useState<AccessoryModel[]>([])
	const [fabrics, setFabrics] = useState<FabricModel[]>([])

	const [fabricItems, setFabricItems] = useState<FabricRecordProps>(
		initialFabricItemValues
	)
	const [accessoryItems, setAccessoryItems] = useState<AccessoryRecordProps>(
		initialAccessoryItemValues
	)

	const totalFabricsCost = useMemo(
		() =>
			Object.values<FabricItemProps>(fabricItems).reduce(
				(prev, current) => prev + NumberUtils.convertToNumber(current.cost),
				0
			),
		[fabricItems]
	)
	const totalAccessoriesCost = useMemo(
		() =>
			Object.values<AccessoryItemProps>(accessoryItems).reduce(
				(prev, current) => prev + NumberUtils.convertToNumber(current.price),
				0
			),
		[accessoryItems]
	)
	const variableCost = totalAccessoriesCost + totalFabricsCost
	const productionCost =
		NumberUtils.convertToNumber(formData.cutting_cost) +
		NumberUtils.convertToNumber(formData.sewing_cost) +
		NumberUtils.convertToNumber(variableCost) +
		NumberUtils.convertToNumber(formData.finishing_cost)

	const totalToPay =
		productionCost +
		productionCost *
			(formData.selling_cost
				? NumberUtils.convertToNumber(formData.selling_cost) / 100
				: 0) -
		NumberUtils.convertToNumber(formData.discount)

	const fabricList = useMemo(() => Object.keys(fabricItems), [fabricItems])

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

		if (
			name.indexOf('cost') >= 0 ||
			name.indexOf('_id') >= 0 ||
			name.indexOf('meter') >= 0
		) {
			data = { ...data, [name]: NumberUtils.convertToNumber(value) }
		}

		setFabricItems({ ...fabricItems, [index]: data })
	}

	const handleChangeAccessory = ({
		index,
		name,
		value
	}: SupplierProductCardChangeProps) => {
		let data = accessoryItems[index] || { [index]: { [name]: value } }[index]
		data = { ...data, [name]: value }
		if (
			name.indexOf('price') >= 0 ||
			name.indexOf('_id') >= 0 ||
			name.indexOf('quantity') >= 0
		) {
			data = { ...data, [name]: NumberUtils.convertToNumber(value) }
		}
		setAccessoryItems({ ...accessoryItems, [index]: data })
	}

	const handleVIPCustomerDiscount = (sellingPrice: number) => {
		const vipDiscount = 0.05 //5%
		const sellingPercent = sellingPrice
			? NumberUtils.convertToNumber(sellingPrice) / 100
			: 0

		return (productionCost + productionCost * sellingPercent) * vipDiscount
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
		}
		if (name == 'selling_cost') {
			const customer = customers.find(({ id }) => id == Number(formData.customer_id))
			if (customer?.customer_type == 'VIP') {
				const discount = handleVIPCustomerDiscount(value as any)
				data = { ...data, discount }
			}
		}
		if (name.indexOf('duration_per_minute') >= 0) {
			const [prefix] = name.split('_')
			let costValue = NumberUtils.convertToNumber(value)
			const fieldCost = `${prefix}_cost`

			if (costValue < 1) {
				costValue = 0
			}

			const employee = employees.find(
				({ id }) => id == Number((formData as any)[`${prefix}_employee_id`])
			) as EmployeeModel

			const sewingOrCuttingCost =
				SalaryUtils.getSalaryPerMinute(employee.base_salary) * costValue

			data = {
				...data,
				[name]: costValue,
				[fieldCost]: sewingOrCuttingCost
			}
		}
		setFormData(data)
	}

	const handleSelectBudget = async (selectedBudget: ProductionBudgetModel) => {
		const photo: any = selectedBudget.photo
			? await FileUtils.urlToBase64(selectedBudget.photo)
			: undefined
		setFormData({ ...selectedBudget, photo })

		let accessory: AccessoryRecordProps = { ...initialAccessoryItemValues }
		selectedBudget.production_accessories.forEach(
			({ accessory_id, price, quantity }, i: number) => {
				accessory = {
					...accessory,
					[i]: { accessory_id, price, quantity }
				}
			}
		)
		setAccessoryItems(accessory)

		let fabric: FabricRecordProps = { ...initialFabricItemValues }
		selectedBudget.production_fabrics.forEach(
			({ fabric_id, color, cost, meters }, i: number) => {
				console.log({ [i]: { fabric_id, color, cost, meters } })

				fabric = {
					...fabric,
					[i]: { fabric_id, color, cost, meters }
				}
			}
		)

		setFabricItems(fabric)
	}

	const handleSubmit = async () => {
		if (isLoading) return

		setIsLoading(true)

		const production_accessories = ArrayUtils.convertToArray(accessoryItems).filter(
			(item: AccessoryItemProps) => NumberUtils.convertToNumber(item?.accessory_id) > 0
		)
		const production_fabrics = ArrayUtils.convertToArray(fabricItems).filter(
			(item: FabricItemProps) => NumberUtils.convertToNumber(item?.fabric_id) > 0
		)

		const data: ProductionBudgetModel = {
			...formData,
			variable_cost: variableCost,
			production_cost: productionCost,
			total_to_pay: totalToPay,
			production_accessories,
			production_fabrics,
			selling_cost: NumberUtils.convertToNumber(formData.selling_cost)
		}

		try {
			const httpResponse = await makeRemoteAddProductionBudget().add(data)
			dispatch(addProductionBudgetStore(httpResponse))
			handleClearForm()
			toast.success('Orçamento registado com sucesso')
		} catch ({ message }) {
			toast.error(message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleClearForm = () => {
		setFormData(initialFormDataValues)
		setFabricItems(initialFabricItemValues)
		setAccessoryItems(initialAccessoryItemValues)
	}

	return (
		<div>
			<div className="flex gap-4">
				<div className="flex flex-col gap-3">
					<ProductionCustomerEditor
						formData={formData}
						setFormData={setFormData}
						handleInputChange={handleInputChange}
					/>
					<ProductionEmployeeRow
						employeeList={employees}
						formData={formData}
						handleInputChange={handleInputChange}
					/>
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
									{fabricList.map((key: any, i) => {
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
									<tr className="font-bold">
										<td className="px-2 text-right" colSpan={3}>
											Total
										</td>
										<td className="px-2">
											{NumberUtils.formatCurrency(totalFabricsCost)}
										</td>
									</tr>
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
									{fabricList.map((key: any, i) => {
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
									<tr className="font-bold">
										<td className="px-2"></td>
										<td className="px-2 text-right">Total</td>
										<td className="px-2">
											{NumberUtils.formatCurrency(totalAccessoriesCost)}
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</div>
				</div>
				<div className="flex flex-col justify-between">
					<ProductionPaymentEditor
						formData={formData}
						handleInputChange={handleInputChange}
						productionCost={productionCost}
						totalToPay={totalToPay}
						variableCost={variableCost}
					/>
					<div className="flex gap-2 my-2">
						<Button
							variant="green"
							text="Cadastrar"
							icon={IconCheck}
							onClick={handleSubmit}
							disabled={isLoading}
							isLoading={isLoading}
						/>
						<Button text="Limpar" icon={IconClose} onClick={handleClearForm} />
					</div>
				</div>
			</div>
			<ProductionBudgetList
				loadProductionBudgets={makeRemoteLoadProductionBudgets()}
				onSelectBudget={handleSelectBudget}
			/>
		</div>
	)
}
