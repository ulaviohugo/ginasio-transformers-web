import React from 'react'
import { IconPlus } from '../icons'
import { LabelUtils } from '@/utils'
import { useDispatch } from 'react-redux'
import { formSupplierOpen } from '@/presentation/redux'

export function SupplierLabel() {
	const dispatch = useDispatch()
	return (
		<div className="flex items-center gap-2">
			{LabelUtils.translateField('supplier_id')}
			<span
				className="bg-primary text-white hover:scale-110"
				title="Adicionar fornecedor"
				onClick={() => {
					dispatch(formSupplierOpen(true))
				}}
			>
				<IconPlus />
			</span>
		</div>
	)
}
