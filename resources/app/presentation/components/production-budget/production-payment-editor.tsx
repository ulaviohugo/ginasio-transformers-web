import { NumberUtils } from '@/utils'
import React, { ChangeEvent } from 'react'
import { InputPrice } from '../form-controls'
import { ProductionBudgetModel } from '@/domain/models'

type ProductionPaymentEditorProps = {
	formData: ProductionBudgetModel
	handleInputChange: (e: ChangeEvent) => void
	totalToPay: number
	productionCost: number
	variableCost: number
}

export function ProductionPaymentEditor({
	formData,
	handleInputChange,
	productionCost,
	totalToPay,
	variableCost
}: ProductionPaymentEditorProps) {
	return (
		<fieldset className="w-80 bg-green-50">
			<legend>Pagamentos</legend>
			<div className="flex gap-2 flex-col ml-auto">
				<Item
					label="Custo Corte"
					value={NumberUtils.formatCurrency(formData.cutting_cost)}
				/>
				<Item
					label="Custo Costura"
					value={NumberUtils.formatCurrency(formData.sewing_cost)}
				/>
				<Item label="Custo Variável" value={NumberUtils.formatCurrency(variableCost)} />
				{/* Acabamento é uma constante */}
				<Item
					label="Acabamento"
					value={NumberUtils.formatCurrency(formData.finishing_cost)}
				/>
				<div className="">
					<div className="">
						<b>Custo Produção</b>
					</div>
					<div className="text-xl text-violet-500 font-semibold">
						{NumberUtils.formatCurrency(productionCost)}
					</div>
				</div>
				<div>
					Custo Venda
					<InputPrice
						name="selling_cost"
						value={formData?.selling_cost}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					Desconto
					<InputPrice
						name="discount"
						value={formData.discount}
						onChange={handleInputChange}
					/>
				</div>
				<div className="">
					<div className="">
						<b>Total a Pagar</b>
					</div>
					<div className="text-2xl text-red-500 font-semibold">
						{NumberUtils.formatCurrency(totalToPay)}
					</div>
				</div>
			</div>
		</fieldset>
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
		<div className="border px-2 py-1 rounded-md flex w-full h-full bg-white">{value}</div>
	</div>
)
