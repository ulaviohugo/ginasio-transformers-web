import React from 'react'
import { IconPlus } from '../icons'
import { LabelUtils } from '@/utils'
import { useDispatch } from 'react-redux'
import { formSupplierOpen } from '@/presentation/redux'

type SupplierLabelProps = {
	text?: string
}
export function SupplierLabel({ text }: SupplierLabelProps) {
	const dispatch = useDispatch()
	return (
		<div className="flex items-center gap-2">
			{!text && LabelUtils.translateField('supplier_id')}
			<span
				className="flex gap-1 items-center bg-primary text-white hover:scale-110 cursor-pointer px-1 py-1"
				title="Adicionar fornecedor"
				onClick={() => {
					dispatch(formSupplierOpen(true))
				}}
			>
				{text} <IconPlus />
			</span>
		</div>
	)
}
