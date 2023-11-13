import React from 'react'
import { IconPlus } from '../icons'
import { LabelUtils } from '@/utils'
import { useDispatch } from 'react-redux'
import { formProductOpen } from '@/presentation/redux'

export function ProductLabel() {
	const dispatch = useDispatch()
	return (
		<div className="flex items-center gap-2">
			{LabelUtils.translateField('product_id')}
			<span
				className="bg-primary text-white hover:scale-110"
				title="Adicionar produto"
				onClick={() => {
					dispatch(formProductOpen(true))
				}}
			>
				<IconPlus />
			</span>
		</div>
	)
}
