'use client'

import { useEffect, useState } from 'react'
import { Supplier } from '@/app/domain/models'
import {
	CardActions,
	SupplierEditor,
	IconClock,
	IconPhone,
	IconPlus,
	IconSearch,
	IconUser,
	Input,
	Layout,
	LayoutBody,
	ModalDelete,
	Spinner,
	SubMenu,
	Title,
	IconEmail,
	IconCategory,
	IconProduct,
	IconSupplier
} from '@/app/(presentation)/components'
import { ArrayUtils, NumberUtils, SubmenuUtils } from '@/app/utils'
import { toast } from 'react-hot-toast'
import {
	makeRemoteDeleteSupplier,
	makeRemoteUpdateSupplier,
	makeRemoteAddSupplier,
	makeRemoteLoadSuppliers
} from '@/app/main/factories/usecases/remote'
import { loadSupplierStore, removeSupplierStore } from '../../../redux'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { useSuppliers } from '../../../hooks'

export default function Suppliers() {
	const [selectedSupplier, setSelectedSupplier] = useState<Supplier>({} as Supplier)
	const [isLoading, setIsLoading] = useState(true)
	const [showEditor, setShowEditor] = useState(false)
	const [showFormDelete, setShowFormDelete] = useState(false)
	const suppliers = useSuppliers()
	const dispatch = useDispatch()

	const fetchData = async () => {
		try {
			const httpResponse = await makeRemoteLoadSuppliers().load()
			dispatch(loadSupplierStore(httpResponse))
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const clearSelectedSupplier = () => {
		setSelectedSupplier({} as Supplier)
	}

	const handleCloseDetail = () => {
		clearSelectedSupplier()
		setShowEditor(false)
	}

	const handleOpenDetalhe = (supplier?: Supplier) => {
		if (supplier) setSelectedSupplier(supplier)
		setShowEditor(true)
	}

	const handleOpenFormDelete = (supplier: Supplier) => {
		setSelectedSupplier(supplier)
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		clearSelectedSupplier()
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteSupplier().delete(selectedSupplier.id)
			dispatch(removeSupplierStore(selectedSupplier.id))
			toast.success(`Fornecedor(a) ${selectedSupplier.name} foi excluído`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<Layout>
			{showEditor && (
				<SupplierEditor
					supplier={selectedSupplier}
					show={showEditor}
					onClose={handleCloseDetail}
					addSupplier={makeRemoteAddSupplier()}
					updateSupplier={makeRemoteUpdateSupplier()}
				/>
			)}
			{showFormDelete && (
				<ModalDelete
					entity="fornecedor"
					description={`Deseja realmente excluir ${selectedSupplier.name}?`}
					show={showFormDelete}
					onClose={handleCloseFormDelete}
					onSubmit={handleDelete}
				/>
			)}
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={SubmenuUtils.commercial} />
					<Title
						title={`Fornecedores ${isLoading ? '' : `(${suppliers?.length})`}`}
						icon={IconSupplier}
					/>
					<div className="flex items-center gap-2">
						<button
							className="bg-primary px-2 py-1 rounded-md text-gray-200"
							title="Novo fornecedor"
							onClick={() => handleOpenDetalhe()}
						>
							<IconPlus />
						</button>
						<div className="w-full max-w-xs">
							<Input placeholder="Pesquisar por ID, nome e e-mail" icon={IconSearch} />
						</div>
					</div>
					{isLoading ? (
						<Spinner data="Carregando fornecedores..." />
					) : suppliers?.length < 1 ? (
						<div>Nenhum fornecedor de momento.</div>
					) : (
						<ul className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
							{suppliers.map((supplier) => (
								<li key={supplier.id} className="flex flex-col gap-2 text-sm p-4 shadow">
									<div className="flex items-center gap-1">
										{supplier.photo ? (
											<Image
												src={supplier.photo}
												alt={`Foto de perfil`}
												width={50}
												height={50}
												className="rounded-full object-cover aspect-square"
											/>
										) : (
											<IconSupplier size={50} />
										)}
										<div>
											<div className="font-semibold text-base">{supplier.name}</div>
											<div className="flex items-center gap-1 font-normal">
												<IconPhone /> {NumberUtils.format(supplier.phone)}
											</div>
											<div className="flex items-center gap-1 font-normal">
												<IconEmail />{' '}
												<a href={`mailto:${supplier.email}`} className="link">
													{supplier.email}
												</a>
											</div>
										</div>
									</div>
									<div>Representante: {supplier.representative}</div>
									<div className="flex items-center gap-1">
										<div
											className="flex items-center gap-1 px-2 bg-gray-100 rounded-md"
											title="Categoria"
										>
											<IconCategory />
											{
												ArrayUtils.removeDuplicated(
													supplier?.supplierProducts?.map((cat) =>
														cat.categoryId.toString()
													) as any
												).length
											}
										</div>
										»
										<div
											className="flex items-center gap-1 px-2 bg-gray-100 rounded-md"
											title="Produto"
										>
											<IconProduct />
											{
												ArrayUtils.removeDuplicated(
													supplier?.supplierProducts?.map((cat) =>
														cat.productId.toString()
													) as any
												).length
											}
										</div>
									</div>
									{/* <div>
										Preço unitário:{' '}
										<span className="font-semibold">
											{NumberUtils.formatCurrency(supplier.unitPrice)}
										</span>{' '}
										kz
									</div> */}
									<CardActions
										onClickDelete={() => handleOpenFormDelete(supplier)}
										onClickEdit={() => handleOpenDetalhe(supplier)}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</LayoutBody>
		</Layout>
	)
}
