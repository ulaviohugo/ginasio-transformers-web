'use client'

import { ReactNode, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalTitle } from '.'
import { IconTrash, Spinner } from '..'

type ModalDeleteProps = {
	entity: ReactNode
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
		<Modal show={show} onClose={onClose}>
			<ModalTitle>
				<IconTrash /> Excluir {entity}
			</ModalTitle>
			<ModalBody>
				<div className="flex flex-col gap-2 max-w-xs">
					{description ?? `Deseja realmente excluir o(a) ${entity}?`}
				</div>
			</ModalBody>
			<ModalFooter>
				<button
					type="submit"
					disabled={isLoading}
					className="btn-primary"
					onClick={handleSubmit}
				>
					Excluir {isLoading ? <Spinner /> : <IconTrash />}
				</button>
				<span className="btn-default" onClick={onClose}>
					Cancelar
				</span>
			</ModalFooter>
		</Modal>
	)
}
