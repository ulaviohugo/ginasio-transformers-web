import React, { ReactNode, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalTitle } from '.'
import { Button, IconClose, IconTrash } from '..'

type ModalDeleteProps = {
	entity?: ReactNode
	description?: ReactNode
	show: boolean
	onClose: () => void
	onSubmit: () => Promise<void>
}

export function ModalDelete({
	description,
	entity,
	onClose,
	show,
	onSubmit
}: ModalDeleteProps) {
	const [isLoading, setIsLoading] = useState(false)
	const handleSubmit = async () => {
		setIsLoading(true)
		await onSubmit()
		setIsLoading(false)
	}

	return (
		<Modal show={show} onClose={onClose} size="sm">
			<ModalTitle>
				<IconTrash /> Excluir {entity}
			</ModalTitle>
			<ModalBody>
				<div
					className="flex flex-col gap-2"
					dangerouslySetInnerHTML={{
						__html: description || `Deseja realmente excluir o(a) ${entity}?`
					}}
				/>
			</ModalBody>
			<ModalFooter>
				<Button
					variant="red"
					text="Excluir"
					icon={IconTrash}
					disabled={isLoading}
					isLoading={isLoading}
					onClick={handleSubmit}
				/>
				<Button text="Cancelar" icon={IconClose} onClick={onClose} />
			</ModalFooter>
		</Modal>
	)
}
