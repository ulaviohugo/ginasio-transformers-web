import React from 'react'
import { IconPlus } from '../icons'
import { LabelUtils } from '@/utils'
import { useDispatch } from 'react-redux'
import { formCategoryOpen } from '@/presentation/redux'

export function CategoryLabel() {
	const dispatch = useDispatch()
	return (
		<div className="flex items-center gap-2">
			{LabelUtils.translateField('category_id')}
			<span
				className="bg-primary text-white hover:scale-110"
				title="Adicionar categoria"
				onClick={() => {
					dispatch(formCategoryOpen(true))
				}}
			>
				<IconPlus />
			</span>
		</div>
	)
}
