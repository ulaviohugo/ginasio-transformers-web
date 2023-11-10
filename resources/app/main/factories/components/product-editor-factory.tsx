import React from 'react'
import { ProductEditor } from '@/presentation/components'
import { makeRemoteAddProduct, makeRemoteUpdateProduct } from '../usecases'
import { useFormProduct } from '@/presentation/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { formProductStore } from '@/presentation/redux'

export const MakeProductEditor = () => {
	const dispatch = useDispatch()
	const formProduct = useSelector(useFormProduct())
	const handleClose = () => {
		dispatch(formProductStore(false))
	}
	return (
		formProduct.open && (
			<ProductEditor
				addProduct={makeRemoteAddProduct()}
				updateProduct={makeRemoteUpdateProduct()}
				onClose={handleClose}
				show={formProduct.open}
			/>
		)
	)
}
