import {
	CustomerMeasurementItemProps,
	CustomerMeasurementProps,
	CustomerModel
} from '@/domain/models'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Button, Input, InputNumber } from '../form-controls'
import { IconCheck, IconPlus } from '../icons'
import { MeasurementUtils } from '@/utils'

type FormDataProps = {
	customer_id: number
	end_product: string
	phone?: string
	phone2?: string
}

type CustomerMeasurementsProps = {
	customer: CustomerModel
	endProduct: string
	onSave: (measurement: CustomerMeasurementProps) => void
	onClose: () => void
}

type ChangeInputProps = {
	index: number
	name: string
	value: string
}

export function CustomerMeasurements({
	customer,
	endProduct,
	onSave,
	onClose
}: CustomerMeasurementsProps) {
	const [formData, setFormData] = useState<FormDataProps>({} as any)

	const [upperLimbsObject, setUpperLimbsObject] = useState<any>(
		MeasurementUtils.initialUpperLimbsData
	)
	const upperLimbsList = useMemo(() => Object.keys(upperLimbsObject), [upperLimbsObject])

	const [lowerLimbsObject, setLowerLimbsObject] = useState<any>(
		MeasurementUtils.initialLowerLimbsData
	)
	const lowerLimbsList = useMemo(() => Object.keys(lowerLimbsObject), [lowerLimbsObject])

	useEffect(() => {
		setFormData({
			...formData,
			customer_id: customer.id,
			end_product: endProduct,
			phone: customer.phone
		})
	}, [customer, endProduct])

	const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target
		setFormData({ ...formData, [name]: value })
	}

	const handleChangeUpperLimbsInput = ({ index, name, value }: ChangeInputProps) => {
		const newDta = upperLimbsObject[index] || { [index]: { [name]: value } }[index]
		setUpperLimbsObject({ ...upperLimbsObject, [index]: { ...newDta, [name]: value } })
	}

	const handleChangeLowerLimbsInput = ({ index, name, value }: ChangeInputProps) => {
		const newDta = lowerLimbsObject[index] || { [index]: { [name]: value } }[index]
		setLowerLimbsObject({ ...lowerLimbsObject, [index]: { ...newDta, [name]: value } })
	}

	const handleAddUpperLimbsItem = () => {
		setUpperLimbsObject({ ...upperLimbsObject, [upperLimbsList.length]: {} })
	}

	const handleAddLowerLimbsItem = () => {
		setLowerLimbsObject({ ...lowerLimbsObject, [lowerLimbsList.length]: {} })
	}

	const handleSave = () => {
		onSave({
			lowerLimbs: Object.values(lowerLimbsObject),
			upperLimbs: Object.values(upperLimbsObject)
		})
		onClose()
	}

	return (
		<div className="flex flex-col gap-2">
			<fieldset>
				<legend>Dados pessoais</legend>
				<div className="flex gap-2">
					<div>Nome: </div> <div>{customer.name}</div>
				</div>
				<div className="grid grid-cols-2">
					<Input
						name="phone"
						label="Telefone"
						value={formData.phone}
						onChange={handleInputChange}
					/>
					<Input
						name="phone2"
						label="Telemóvel"
						value={formData.phone2}
						onChange={handleInputChange}
					/>
				</div>
				<Input
					name="end_product"
					label="Peça a ser produzida"
					value={endProduct}
					onChange={handleInputChange}
				/>
			</fieldset>
			<fieldset>
				<legend>Membros superiores</legend>
				<div className="grid grid-cols-2 gap-x-4">
					{upperLimbsList.map((key, i) => (
						<MeasurementItem
							key={i}
							itemIndex={Number(key)}
							index={i}
							measurement={upperLimbsObject[key]}
							onInputChange={handleChangeUpperLimbsInput}
						/>
					))}
				</div>
				<Button
					variant="gray-light"
					text="Adicionar"
					className="mt-2"
					icon={IconPlus}
					onClick={handleAddUpperLimbsItem}
				/>
			</fieldset>
			<fieldset>
				<legend>Membros inferiores</legend>
				<div className="grid grid-cols-2 gap-x-4">
					{lowerLimbsList.map((key, i) => (
						<MeasurementItem
							key={i}
							itemIndex={Number(key)}
							index={i}
							measurement={lowerLimbsObject[key]}
							onInputChange={handleChangeLowerLimbsInput}
						/>
					))}
				</div>
				<Button
					variant="gray-light"
					text="Adicionar"
					className="mt-2"
					icon={IconPlus}
					onClick={handleAddLowerLimbsItem}
				/>
			</fieldset>
			<div>
				<Button variant="green" text="Salvar" icon={IconCheck} onClick={handleSave} />
			</div>
		</div>
	)
}

type MeasurementItemProps = {
	measurement: CustomerMeasurementItemProps
	index: number
	itemIndex: number
	onInputChange: (data: ChangeInputProps) => void
}

const MeasurementItem = ({
	measurement,
	itemIndex,
	onInputChange
}: MeasurementItemProps) => {
	const [formData, setFormData] = useState<CustomerMeasurementItemProps>()

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value } as any)
		const data: any = { index: itemIndex, name, value }
		onInputChange(data)
	}

	useEffect(() => {
		setFormData(measurement)
	}, [measurement])

	return (
		<div className="flex border-b p-1 hover:bg-gray-50 text-sm">
			<div className="flex-1">
				<Input
					name="description"
					placeholder="Descrição"
					value={formData?.description}
					onChange={handleInputChange}
				/>
			</div>
			<div className="inline-flex w-20">
				<InputNumber
					name={`measurement`}
					placeholder="Medida"
					value={formData?.measurement}
					onChange={handleInputChange}
				/>
			</div>
		</div>
	)
}
