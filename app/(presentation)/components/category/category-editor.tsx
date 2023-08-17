'use client'

import { Category } from '@/app/domain/models'
import { AddCategory, UpdateCategory } from '@/app/domain/usecases'
import {
	ButtonCancel,
	ButtonSubmit,
	Input,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle
} from '..'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { LabelUtils } from '@/app/utils'
import { useCategories } from '../../hooks'
import { useDispatch } from 'react-redux'
import { makeRemoteLoadCategories } from '@/app/main/factories/usecases/remote'
import { addCategoryStore, loadCategoryStore, updateCategoryStore } from '../../redux'
import { toast } from 'react-hot-toast'

type CategoryEditorProps = {
	data?: Category
	show: boolean
	onClose: () => void
	addCategory: AddCategory
	updateCategory: UpdateCategory
}

export function CategoryEditor({
	addCategory,
	onClose,
	show,
	updateCategory,
	data
}: CategoryEditorProps) {
	const dispatch = useDispatch()
	const categories = useCategories()
	const [formDate, setFormData] = useState<Category>(data || ({} as Category))
	const [isLoading, setIsLoading] = useState(false)

	const fetchCategories = async () => {
		try {
			const httpResponse = await makeRemoteLoadCategories().load()
			dispatch(loadCategoryStore(httpResponse))
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	useEffect(() => {
		if (categories.length < 1) {
			fetchCategories()
		}
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: Category = { ...formDate, [name]: value }
		setFormData(data)
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)
		try {
			const httpResponse = (
				formDate.id
					? await updateCategory.update(formDate)
					: await addCategory.add(formDate)
			) as Category

			if (formDate.id) {
				dispatch(updateCategoryStore(httpResponse))
			} else {
				dispatch(addCategoryStore(httpResponse))
			}
			toast.success(`Categoria ${formDate.id ? 'actualizada' : 'cadastrada'} com sucesso`)
			onClose()
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<Modal show={show} onClose={onClose}>
			<ModalTitle>{data?.id ? 'Editar' : 'Cadastrar'} categoria</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<Input
						type="text"
						id="name"
						name="name"
						value={formDate?.name || ''}
						label={LabelUtils.translateField('name')}
						onChange={handleInputChange}
						autoFocus
					/>
					<ModalFooter>
						<ButtonSubmit isLoading={isLoading} />
						<ButtonCancel onClick={onClose} />
					</ModalFooter>
				</form>
			</ModalBody>
		</Modal>
	)
}
