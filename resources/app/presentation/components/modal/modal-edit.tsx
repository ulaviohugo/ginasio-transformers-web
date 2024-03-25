import React, { ReactNode, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalTitle } from '.'
import { Button, IconClose, IconEdit, IconTrash } from '..'

type ModalEditProps = {
	entity?: ReactNode
	description?: ReactNode
	show: boolean
	onClose: () => void
	onSubmit: () => Promise<void>
}

export function ModalEdit({
	description,
	entity,
	onClose,
	show,
	onSubmit
}: ModalEditProps) {
	const [isLoading, setIsLoading] = useState(false)
	const handleSubmit = async () => {
		setIsLoading(true)
		await onSubmit()
		setIsLoading(false)
	}

	return (
		<Modal show={show} onClose={onClose} size="sm">
			<ModalTitle>
				<IconEdit /> Salvar {entity}
			</ModalTitle>
			<ModalBody>
				<div
					className="flex flex-col gap-2"
					dangerouslySetInnerHTML={{
						__html: description || `Deseja salvar as alterações feitas no(a) ${entity}?`
					}}
				/>
			</ModalBody>
			<ModalFooter>
				<Button
					variant="gray-light"
					text="Salvar"
					icon={IconEdit}
					disabled={isLoading}
					isLoading={isLoading}
					onClick={handleSubmit}
				/>
				<Button text="Cancelar" icon={IconClose} onClick={onClose} />
			</ModalFooter>
		</Modal>
	)
}
