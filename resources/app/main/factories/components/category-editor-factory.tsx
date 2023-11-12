import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryEditor } from '@/presentation/components'
import { makeRemoteAddCategory, makeRemoteUpdateCategory } from '../usecases'
import { useFormCategory } from '@/presentation/hooks'
import { formCategoryOpen } from '@/presentation/redux'

export const MakeCategoryEditor = () => {
	const dispatch = useDispatch()
	const formCategory = useSelector(useFormCategory())
	const handleClose = () => {
		dispatch(formCategoryOpen(false))
	}
	return (
		formCategory.open && (
			<CategoryEditor
				addCategory={makeRemoteAddCategory()}
				updateCategory={makeRemoteUpdateCategory()}
				onClose={handleClose}
				show={formCategory.open}
			/>
		)
	)
}
