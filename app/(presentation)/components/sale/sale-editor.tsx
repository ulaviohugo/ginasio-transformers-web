'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { Category, Product, Sale } from '@/app/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconClose,
	Input,
	InputPrice,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select
} from '..'

import { ColorUtils, DateUtils, LabelUtils, NumberUtils } from '@/app/utils'
import {
	addSaleStore,
	loadCategoryStore,
	loadProductStore,
	loadSupplierStore,
	updateSaleStore
} from '../../redux'
import { AddSale, UpdateSale } from '@/app/domain/usecases'
import { useCategories, useProducts, useSuppliers } from '../../hooks'
import {
	makeRemoteLoadCategories,
	makeRemoteLoadProduct,
	makeRemoteLoadSuppliers
} from '@/app/main/factories/usecases/remote'

type SaleEditorProps = {
	data?: Sale
	show: boolean
	onClose: () => void
	addSale: AddSale
	updateSale: UpdateSale
}

export function SaleEditor({
	data,
	show,
	onClose,
	addSale,
	updateSale
}: SaleEditorProps) {
	const dispatch = useDispatch()
	const categories = useCategories()
	const products = useProducts()
	const suppliers = useSuppliers()

	const [productList, setProductList] = useState<Product[]>([])
	const [categoryList, setCategoryList] = useState<Category[]>([])

	const [formData, setFormData] = useState<Sale>({} as Sale)
	const [isLoading, setIsLoading] = useState(false)
	const [photoPreview, setPhotoPreview] = useState('')

	const fetchData = (
		remoteResource: { load: () => Promise<any> },
		callback: (response: any) => void
	) => {
		remoteResource
			.load()
			.then((response) => {
				callback(response)
			})
			.catch((_error) => {
				toast.error('Error ao consultar dados')
			})
	}

	useEffect(() => {
		if (categories.length < 1) {
			fetchData(makeRemoteLoadCategories(), (response) => {
				dispatch(loadCategoryStore(response))
			})
		}
		if (products.length < 1) {
			fetchData(makeRemoteLoadProduct(), (response) => {
				dispatch(loadProductStore(response))
			})
		}
		if (suppliers.length < 1) {
			fetchData(makeRemoteLoadSuppliers(), (response) => {
				dispatch(loadSupplierStore(response))
			})
		}
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: Sale = { ...formData, [name]: value }

		if (name == 'totalValue') {
			const totalValue = NumberUtils.convertToNumber(value)
			data = {
				...data,
				unitPrice: formData.quantity > 0 ? totalValue / formData.quantity : 0
			}
		}
		if (name == 'quantity') {
			const quantity = Number(value)
			data = {
				...data,
				unitPrice:
					quantity > 0 ? NumberUtils.convertToNumber(formData.totalValue) / quantity : 0
			}
		}
		setFormData(data)
	}

	const handleInputFile = (file: File) => {
		if (file) {
			const reader = new FileReader()

			reader.onload = function (e) {
				setPhotoPreview(String(e.target?.result))
			}

			reader.readAsDataURL(file)
		}
	}

	const clearInputFile = () => {
		setFormData((prev) => ({ ...prev, photo: '' }))
		setPhotoPreview('')
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)
		try {
			const httpResponse = (
				formData.id ? await updateSale.update(formData) : await addSale.add(formData)
			) as Sale

			if (formData.id) {
				dispatch(updateSaleStore(httpResponse))
			} else {
				dispatch(addSaleStore(httpResponse))
			}
			toast.success(
				`Funcionário ${formData.id ? 'actualizado' : 'cadastrado'} com sucesso`
			)
			onClose()
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<Modal show={show} onClose={onClose}>
			<ModalTitle>{data?.id ? 'Editar' : 'Cadastrar'} venda</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit}>
					<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
						<div className="flex flex-row xl:col-span-4 lg:col-span-3 md:col-span-2">
							<div className="flex">
								<div className="mr-auto">
									<Input
										type="file"
										id="photo"
										name="photo"
										// value={formDate?.photo || ''}
										label={'Imagem'}
										onChange={handleInputChange}
										accept="photo/*"
									/>
								</div>
								{photoPreview && (
									<div className="relative border rounded-md p-3">
										<Image
											src={photoPreview}
											width={120}
											height={100}
											alt="Pre-visualização"
											className="object-cover aspect-square"
										/>
										<IconClose
											className="absolute top-1 right-1 bg-red-600 text-white rounded-full"
											onClick={clearInputFile}
										/>
									</div>
								)}
							</div>
						</div>
						<div>
							<InputPrice
								id="totalValue"
								name="totalValue"
								value={formData?.totalValue || ''}
								label={LabelUtils.translateField('totalValue')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="number"
								id="quantity"
								name="quantity"
								value={formData?.quantity || ''}
								label={LabelUtils.translateField('quantity')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<InputPrice
								id="unitPrice"
								name="unitPrice"
								value={formData?.unitPrice || ''}
								label={LabelUtils.translateField('unitPrice')}
								onChange={handleInputChange}
								disabled
							/>
						</div>
						<div>
							<Select
								id="paymentMethod"
								name="paymentMethod"
								value={formData?.paymentMethod || ''}
								label={LabelUtils.translateField('paymentMethod')}
								data={['Dinheiro', 'TPA', 'Transferência'].map((paymentType) => ({
									text: paymentType
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<ModalFooter>
						<ButtonSubmit type="submit" disabled={isLoading} isLoading={isLoading} />
						<ButtonCancel onClick={onClose} />
					</ModalFooter>
				</form>
			</ModalBody>
		</Modal>
	)
}

const Divisor = ({ label }: { label?: string }) => (
	<div className="xl:col-span-4 lg:col-span-3 md:col-span-2 uppercase">{label || ''}</div>
)
