import React from 'react'
import {
	CardActions,
	CategoryEditor,
	IconCategory,
	IconPlus,
	Layout,
	LayoutBody,
	ModalDelete,
	NoData,
	Spinner,
	SubMenu,
	Title
} from '@/presentation/components'
import { useAuth, useCategories } from '@/presentation/hooks'
import { loadCategoryStore, removeCategoryStore } from '@/presentation/redux'
import { CategoryModel } from '@/domain/models'
import {
	makeRemoteAddCategory,
	makeRemoteDeleteCategory,
	makeRemoteLoadCategories,
	makeRemoteUpdateCategory
} from '@/main/factories/usecases'
import { MenuUtils } from '@/utils'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { NotFound } from '../../notfound'

export function Categories() {
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const dispatch = useDispatch()
	const categories = useSelector(useCategories())
	const [isLoading, setIsLoading] = useState(true)
	const [selectedCategory, setSelectedCategory] = useState<CategoryModel>(
		{} as CategoryModel
	)
	const [showEditor, setShowEditor] = useState(false)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const fetchData = async () => {
		if (!isAdmin) return setIsLoading(false)
		try {
			const httpResponse = await makeRemoteLoadCategories().load()
			dispatch(loadCategoryStore(httpResponse))
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const clearSelectedCategory = () => {
		setSelectedCategory({} as CategoryModel)
	}

	const handleOpenDetalhe = (product?: CategoryModel) => {
		if (product) setSelectedCategory(product)
		setShowEditor(true)
	}

	const handleCloseDetail = () => {
		clearSelectedCategory()
		setShowEditor(false)
	}

	const handleOpenFormDelete = (category: CategoryModel) => {
		setSelectedCategory(category)
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		clearSelectedCategory()
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteCategory().delete(selectedCategory.id)
			dispatch(removeCategoryStore(selectedCategory.id))
			toast.success(`A categoria ${selectedCategory.name} foi excluída`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	if (!isAdmin) return <NotFound />

	return (
		<Layout>
			{showEditor && (
				<CategoryEditor
					data={selectedCategory}
					show={showEditor}
					onClose={handleCloseDetail}
					addCategory={makeRemoteAddCategory()}
					updateCategory={makeRemoteUpdateCategory()}
				/>
			)}
			{showFormDelete && (
				<ModalDelete
					entity="categoria"
					description={`Deseja realmente excluir ${selectedCategory.name}?`}
					show={showFormDelete}
					onClose={handleCloseFormDelete}
					onSubmit={handleDelete}
				/>
			)}

			<LayoutBody>
				<div className="flex flex-col gap-2 mb-2">
					<SubMenu submenus={MenuUtils.commercialMenuItens({ role: user.role })} />
					<Title
						title={`Categorias ${isLoading ? '' : `(${categories?.length})`}`}
						icon={IconCategory}
					/>
					<div>
						<button
							className="bg-primary px-2 py-1 rounded-md text-gray-200"
							title="Novo funcionário"
							onClick={() => handleOpenDetalhe()}
						>
							<IconPlus />
						</button>
					</div>
				</div>
				{isLoading ? (
					<Spinner />
				) : categories.length < 1 ? (
					<NoData />
				) : (
					<ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
						{categories.map((category) => (
							<li key={category.id} className="p-4 shadow">
								<div className="font-semibold">{category.name}</div>
								<CardActions
									onClickDelete={() => handleOpenFormDelete(category)}
									onClickEdit={() => handleOpenDetalhe(category)}
								/>
							</li>
						))}
					</ul>
				)}
			</LayoutBody>
		</Layout>
	)
}
