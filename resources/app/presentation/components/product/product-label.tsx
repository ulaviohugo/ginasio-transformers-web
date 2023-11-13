import React from 'react'
import { IconPlus } from '../icons'
import { LabelUtils } from '@/utils'
import { useDispatch } from 'react-redux'
import { formProductOpen } from '@/presentation/redux'

type ProductLabelProps = {
	text?: string
}
export function ProductLabel({ text }: ProductLabelProps) {
	const dispatch = useDispatch()
	return (
		<div className="flex items-center gap-2">
			{!text && LabelUtils.translateField('product_id')}
			<span
				className="flex gap-1 items-center bg-primary text-white hover:scale-110 cursor-pointer px-1 py-1"
				title="Adicionar produto"
				onClick={() => {
					dispatch(formProductOpen(true))
				}}
			>
				{text} <IconPlus />
			</span>
		</div>
	)
}
