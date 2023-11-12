import React from 'react'
import { Modal, ModalBody, SupplierEditor } from '@/presentation/components'
import { makeRemoteAddSupplier, makeRemoteUpdateSupplier } from '../usecases'
import { useFormSupplier } from '@/presentation/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { formSupplierOpen } from '@/presentation/redux'

export const MakeSupplierEditor = () => {
	const dispatch = useDispatch()
	const formSupplier = useSelector(useFormSupplier())
	const handleClose = () => {
		dispatch(formSupplierOpen(false))
	}
	return (
		formSupplier.open && (
			<Modal onClose={handleClose} show={formSupplier.open}>
				<ModalBody>
					<SupplierEditor
						addSupplier={makeRemoteAddSupplier()}
						updateSupplier={makeRemoteUpdateSupplier()}
					/>
				</ModalBody>
			</Modal>
		)
	)
}
