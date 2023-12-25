import { AbsenceJustificationModel } from '@/domain/models'
import {
	AddAbsenceJustification,
	DeleteAbsenceJustification,
	LoadAbsenceJustifications,
	LoadEmployees,
	UpdateAbsenceJustification
} from '@/domain/usecases'
import {
	DocumentSubmenu,
	Layout,
	LayoutBody,
	SubMenu,
	AbsenceJustificationEditor,
	AbsenceJustificationList,
	ModalDelete
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { removeAbsenceJustificationStore } from '@/presentation/redux'
import { MenuUtils } from '@/utils'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

type AbsenceJustificationProps = {
	loadAbsenceJustifications: LoadAbsenceJustifications
	addAbsenceJustification: AddAbsenceJustification
	updateAbsenceJustification: UpdateAbsenceJustification
	deleteAbsenceJustification: DeleteAbsenceJustification
	loadEmployees: LoadEmployees
}

export function AbsenceJustifications({
	loadAbsenceJustifications,
	addAbsenceJustification,
	deleteAbsenceJustification,
	updateAbsenceJustification,
	loadEmployees
}: AbsenceJustificationProps) {
	const [selectedAbsenceJustification, setSelectedAbsenceJustification] =
		useState<AbsenceJustificationModel>(undefined as any)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const dispatch = useDispatch()

	const user = useSelector(useAuth())

	const onDelete = async () => {
		if (!selectedAbsenceJustification?.id)
			return toast.error('selecione um registo para excluir')
		setShowFormDelete(true)
	}

	const handleDelete = async () => {
		try {
			await deleteAbsenceJustification.delete(selectedAbsenceJustification.id)

			toast.success('Formulário de admissão excluído com sucesso')
			setShowFormDelete(false)
			dispatch(removeAbsenceJustificationStore(selectedAbsenceJustification?.id))
			setSelectedAbsenceJustification({} as any)
		} catch ({ message }) {
			toast.error(message)
		}
	}

	return (
		<Layout title="Declaração de trabalho">
			{showFormDelete && (
				<ModalDelete
					entity="recibo"
					description={`Deseja realmente excluir o formulário de admissão de
					${selectedAbsenceJustification?.employee?.name}?`}
					show={showFormDelete}
					onClose={() => setShowFormDelete(false)}
					onSubmit={handleDelete}
				/>
			)}
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.hrMenuItens({ role: user.role })} />
					<DocumentSubmenu />

					<AbsenceJustificationEditor
						data={selectedAbsenceJustification}
						addAbsenceJustification={addAbsenceJustification}
						updateAbsenceJustification={updateAbsenceJustification}
						loadEmployees={loadEmployees}
						onDelete={onDelete}
					/>
					<AbsenceJustificationList
						onSelect={setSelectedAbsenceJustification}
						loadAbsenceJustifications={loadAbsenceJustifications}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
