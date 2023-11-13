import React from 'react'
import { IconPlus } from '../icons'
import { LabelUtils } from '@/utils'
import { useDispatch } from 'react-redux'
import { formCategoryOpen } from '@/presentation/redux'

type CategoryLabelProps = {
	text?: string
}
export function CategoryLabel({ text }: CategoryLabelProps) {
	const dispatch = useDispatch()
	return (
		<div className="flex items-center gap-2">
			{!text && LabelUtils.translateField('category_id')}
			<span
				className="flex gap-1 items-center bg-primary text-white hover:scale-110 cursor-pointer px-1 py-1"
				title="Adicionar categoria"
				onClick={() => {
					dispatch(formCategoryOpen(true))
				}}
			>
				{text} <IconPlus />
			</span>
		</div>
	)
}
