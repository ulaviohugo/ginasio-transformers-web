import { RefundModel } from '@/domain/models'
import {
	AddRefund,
	DeleteRefund,
	LoadRefunds,
	LoadCustomers,
	UpdateRefund,
	LoadCategories,
	LoadProducts
} from '@/domain/usecases'
import {
	DocumentSubmenu,
	Layout,
	LayoutBody,
	SubMenu,
	RefundEditor,
	RefundList,
	ModalDelete
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { removeRefundStore } from '@/presentation/redux'
import { MenuUtils } from '@/utils'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

type RefundProps = {
	loadRefunds: LoadRefunds
	addRefund: AddRefund
	updateRefund: UpdateRefund
	deleteRefund: DeleteRefund
	loadCustomers: LoadCustomers
	loadCategories: LoadCategories
	loadProducts: LoadProducts
}

export function Refunds({
	loadRefunds,
	addRefund,
	deleteRefund,
	updateRefund,
	loadCustomers,
	loadCategories,
	loadProducts
}: RefundProps) {
	const [selectedRefund, setSelectedRefund] = useState<RefundModel>(undefined as any)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const dispatch = useDispatch()

	const user = useSelector(useAuth())

	const onDelete = async () => {
		if (!selectedRefund?.id) return toast.error('selecione um registo para excluir')
		setShowFormDelete(true)
	}

	const handleDelete = async () => {
		try {
			await deleteRefund.delete(selectedRefund.id)

			toast.success('Formulário de admissão excluído com sucesso')
			setShowFormDelete(false)
			dispatch(removeRefundStore(selectedRefund?.id))
			setSelectedRefund({} as any)
		} catch ({ message }) {
			toast.error(message)
		}
	}

	return (
		<Layout title="Declaração de trabalho">
			{showFormDelete && (
				<ModalDelete
					entity="recibo"
					description={`Deseja realmente excluir o reembolso de
					${selectedRefund?.customer?.name}?`}
					show={showFormDelete}
					onClose={() => setShowFormDelete(false)}
					onSubmit={handleDelete}
				/>
			)}
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.hrMenuItens({ role: user.role })} />
					<DocumentSubmenu />

					<RefundEditor
						data={selectedRefund}
						addRefund={addRefund}
						updateRefund={updateRefund}
						loadCustomers={loadCustomers}
						loadCategories={loadCategories}
						loadProducts={loadProducts}
						onDelete={onDelete}
					/>
					<RefundList onSelect={setSelectedRefund} loadRefunds={loadRefunds} />
				</div>
			</LayoutBody>
		</Layout>
	)
}
