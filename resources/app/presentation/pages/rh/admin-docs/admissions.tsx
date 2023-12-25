import { AdmissionModel } from '@/domain/models'
import {
	AddAdmission,
	DeleteAdmission,
	LoadAdmissions,
	LoadEmployees,
	UpdateAdmission
} from '@/domain/usecases'
import {
	DocumentSubmenu,
	Layout,
	LayoutBody,
	SubMenu,
	AdmissionEditor,
	AdmissionList,
	ModalDelete
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { removeAdmissionStore } from '@/presentation/redux'
import { MenuUtils } from '@/utils'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

type AdmissionProps = {
	loadAdmissions: LoadAdmissions
	addAdmission: AddAdmission
	updateAdmission: UpdateAdmission
	deleteAdmission: DeleteAdmission
	loadEmployees: LoadEmployees
}

export function Admissions({
	loadAdmissions,
	addAdmission,
	deleteAdmission,
	updateAdmission,
	loadEmployees
}: AdmissionProps) {
	const [selectedAdmission, setSelectedAdmission] = useState<AdmissionModel>(
		undefined as any
	)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const dispatch = useDispatch()

	const user = useSelector(useAuth())

	const onDelete = async () => {
		if (!selectedAdmission?.id) return toast.error('selecione um registo para excluir')
		setShowFormDelete(true)
	}

	const handleDelete = async () => {
		try {
			await deleteAdmission.delete(selectedAdmission.id)

			toast.success('Formulário de admissão excluído com sucesso')
			setShowFormDelete(false)
			dispatch(removeAdmissionStore(selectedAdmission?.id))
			setSelectedAdmission({} as any)
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
					${selectedAdmission?.employee?.name}?`}
					show={showFormDelete}
					onClose={() => setShowFormDelete(false)}
					onSubmit={handleDelete}
				/>
			)}
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.hrMenuItens({ role: user.role })} />
					<DocumentSubmenu />

					<AdmissionEditor
						data={selectedAdmission}
						addAdmission={addAdmission}
						updateAdmission={updateAdmission}
						loadEmployees={loadEmployees}
						onDelete={onDelete}
					/>
					<AdmissionList
						onSelect={setSelectedAdmission}
						loadAdmissions={loadAdmissions}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
