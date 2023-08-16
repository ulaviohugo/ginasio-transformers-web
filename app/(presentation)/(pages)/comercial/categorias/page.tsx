'use client'

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
} from '@/app/(presentation)/components'
import { useCategories } from '@/app/(presentation)/hooks'
import { loadCategoryStore, removeCategoryStore } from '@/app/(presentation)/redux'
import { Category } from '@/app/domain/models'
import {
	makeRemoteAddCategory,
	makeRemoteDeleteCategory,
	makeRemoteLoadCategories,
	makeRemoteUpdateCategory
} from '@/app/main/factories/usecases/remote'
import { SubmenuUtils } from '@/app/utils'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export default function Categorias() {
	const dispatch = useDispatch()
	const categories = useCategories()
	const [isLoading, setIsLoading] = useState(true)
	const [selectedCategory, setSelectedCategory] = useState<Category>({} as Category)
	const [showEditor, setShowEditor] = useState(false)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const fetchData = async () => {
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
		setSelectedCategory({} as Category)
	}

	const handleOpenDetalhe = (product?: Category) => {
		if (product) setSelectedCategory(product)
		setShowEditor(true)
	}

	const handleCloseDetail = () => {
		clearSelectedCategory()
		setShowEditor(false)
	}

	const handleOpenFormDelete = (category: Category) => {
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
				<div className="flex flex-col gap-2">
					<SubMenu submenus={SubmenuUtils.commercial} />
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
