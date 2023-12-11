import { CustomerModel } from '@/domain/models'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Input } from '../form-controls'

type FormDataProps = {
	customer_id: number
	end_product: string
	phone?: string
	phone2?: string
}

type CustomerMeasurementsProps = {
	customer: CustomerModel
	endProduct: string
}

type MeasurementItemDataProps = {
	description: string
	measurement: number
}

type ChangeInputProps = {
	index: number
	name: string
	value: string
}

const initialData = {
	0: { description: 'Contorno Acima do Peito (Frente/Costas)', measurement: 10 },
	1: { description: 'Contorno Abaixo do Peito', measurement: 10 },
	2: { description: 'Largura de Frente (Zona do Peito)', measurement: 10 },
	3: { description: 'Largura de Costas (Lateral a Lateral)', measurement: 10 },
	4: { description: 'Largura das Costas', measurement: 10 },
	5: { description: 'Contorno da Cintura', measurement: 10 },
	6: { description: 'Altura de Frente do Ombro à Cintura', measurement: 10 },
	7: { description: 'Altura das Costas', measurement: 10 },
	8: { description: 'Altura da Cava à Cintura', measurement: 10 },
	9: { description: 'Altura do Peito', measurement: 10 },
	10: { description: 'Ombro', measurement: 10 },
	11: { description: 'Distância entre Vértices', measurement: 10 },
	12: { description: 'Contorno do Pescoço', measurement: 10 },
	13: { description: 'Comprimento Total da Manga', measurement: 10 },
	14: { description: 'Comprimento Meia Manga/Cotovelo', measurement: 10 },
	15: { description: 'Contorno do Braço', measurement: 10 },
	16: { description: 'Contorno do Pulso', measurement: 10 },
	17: { description: 'Altura do Vestido', measurement: 10 },
	18: { description: 'Altura da Blusa/Casaco', measurement: 10 }
}

export function CustomerMeasurements({
	customer,
	endProduct
}: CustomerMeasurementsProps) {
	const [formData, setFormData] = useState<FormDataProps>({} as any)

	const [highMembersObject, setHighMembersObject] = useState<any>(initialData)

	const highMembers = useMemo(() => Object.keys(highMembersObject), [highMembersObject])

	const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target
		setFormData({ ...formData, [name]: value })
	}

	const handleItemInputChange = ({ index, name, value }: ChangeInputProps) => {
		const newDta = highMembersObject[index] || { [index]: { [name]: value } }[index]
		setHighMembersObject({ ...highMembersObject, [index]: { ...newDta, [name]: value } })
	}

	useEffect(() => {
		setFormData({
			...formData,
			customer_id: customer.id,
			end_product: endProduct,
			phone: customer.phone
		})
	}, [customer, endProduct])

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
					{highMembers.map((key, i) => (
						<MeasurementItem
							key={i}
							itemIndex={Number(key)}
							index={i}
							measurement={highMembersObject[key]}
							onInputChange={handleItemInputChange}
						/>
					))}
				</div>
			</fieldset>
		</div>
	)
}

type MeasurementItemProps = {
	measurement: MeasurementItemDataProps
	index: number
	itemIndex: number
	onInputChange: (data: ChangeInputProps) => void
}

const MeasurementItem = ({
	measurement,
	itemIndex,
	onInputChange
}: MeasurementItemProps) => {
	const [formData, setFormData] = useState<MeasurementItemDataProps>()

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value } as any)
		const data: any = { index: itemIndex, name, value }
		onInputChange(data)
	}

	useEffect(() => {
		setFormData(measurement)
	}, [])

	return (
		<div className="flex border-b p-1 hover:bg-gray-50">
			<div className="flex-1">{formData?.description}</div>
			<Input
				name={`measurement`}
				value={formData?.measurement}
				onChange={handleInputChange}
			/>
		</div>
	)
}
