'use client'

import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { Supplier } from '@/app/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconClose,
	IconPlus,
	Input,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	ProductCardChangeProps,
	Select,
	SupplierProductEditor
} from '..'

import {
	ArrayUtils,
	LabelUtils,
	MunicipalityProps,
	NumberUtils,
	ObjectUtils,
	ProvinceProps
} from '@/app/utils'
import {
	addSupplierStore,
	loadCategoryStore,
	loadProductStore,
	updateSupplierStore
} from '../../redux'
import { AddSupplier, UpdateSupplier } from '@/app/domain/usecases'
import { useCategories, useLocations, useProducts } from '../../hooks'
import {
	makeRemoteLoadCategories,
	makeRemoteLoadProduct
} from '@/app/main/factories/usecases/remote'

type SupplierEditorProps = {
	supplier?: Supplier
	show: boolean
	onClose: () => void
	addSupplier: AddSupplier
	updateSupplier: UpdateSupplier
}

const classFullWidth = 'flex flex-row gap-1 xl:col-span-12 lg:col-span-6 md:col-span-12'
export function SupplierEditor({
	supplier,
	show,
	onClose,
	addSupplier,
	updateSupplier
}: SupplierEditorProps) {
	const class2Cols = 'xl:col-span-6 lg:col-span-3 md:col-span-6'
	const class3Cols = 'flex flex-row gap-1 xl:col-span-4 lg:col-span-6 md:col-span-6'
	const dispatch = useDispatch()
	const { countries, provinces, municipalities } = useLocations()
	const categories = useCategories()
	const products = useProducts()

	const [productItems, setProductItems] = useState<any>({ 0: {} })

	const [provinceList, setProvinceList] = useState<ProvinceProps[]>([])
	const [municipalityList, setMunicipalityList] = useState<MunicipalityProps[]>([])

	const [formDate, setFormData] = useState<Supplier>(supplier || ({} as Supplier))
	const [isLoading, setIsLoading] = useState(false)
	const [photoPreview, setImagePreview] = useState('')

	const fetchData = (
		remoteResource: { load: () => Promise<any> },
		callback: (response: any) => void
	) => {
		remoteResource
			.load()
			.then((response) => {
				callback(response)
			})
			.catch((error) => {
				toast.error('Error ao consultar dados')
			})
	}

	useEffect(() => {
		if (supplier) {
			setProvinceList(
				provinces.filter((province) => province.countryId == supplier.countryId)
			)
			setMunicipalityList(
				municipalities.filter(
					(municipality) => municipality.provinceId == supplier.provinceId
				)
			)
			if (supplier.supplierProducts?.length) {
				setProductItems(ObjectUtils.convertToObject(supplier.supplierProducts))
			}
		}
	}, [supplier])

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
	})

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		let data: Supplier = { ...formDate, [name]: value }

		if (name == 'countryId') {
			data = { ...data, provinceId: undefined, municipalityId: undefined }
			setProvinceList(provinces.filter((province) => province.countryId == Number(value)))
		}
		if (name == 'provinceId') {
			data = { ...data, municipalityId: undefined }
			setMunicipalityList(
				municipalities.filter((municipality) => municipality.provinceId == Number(value))
			)
		}
		if (name == 'photo') {
			const file = (e.target as any)?.files[0]
			data = { ...formDate, [name]: file }
			handleInputFile(file)
		}
		setFormData(data)
	}

	const handleChangeProduct = ({ index, name, value }: ProductCardChangeProps) => {
		let data = productItems[index] || { [index]: { [name]: value } }[index]
		const supplierId = supplier?.id
		if (name == 'categoryId') {
			data = { ...data, [name]: value, productId: undefined, supplierId }
		} else {
			data = { ...data, [name]: value, supplierId }
		}

		setProductItems({ ...productItems, [index]: data })
	}

	const handleInputFile = (file: File) => {
		if (file) {
			const reader = new FileReader()

			reader.onload = function (e) {
				setImagePreview(String(e.target?.result))
			}

			reader.readAsDataURL(file)
		}
	}

	const clearInputFile = () => {
		setFormData((prev) => ({ ...prev, photo: '' }))
		setImagePreview('')
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)

		const supplierProducts = ArrayUtils.convertToArray(productItems)

		const data: Supplier = { ...formDate, supplierProducts }
		try {
			console.log(data)

			const httpResponse = (
				formDate.id ? await updateSupplier.update(data) : await addSupplier.add(data)
			) as Supplier

			if (formDate.id) {
				dispatch(updateSupplierStore(httpResponse))
			} else {
				dispatch(addSupplierStore(httpResponse))
			}
			toast.success(
				`Funcionário ${formDate.id ? 'actualizado' : 'cadastrado'} com sucesso`
			)
			onClose()
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleAddProductItem = () => {
		let data = { ...productItems }
		const keys = Object.keys(data)

		const key =
			ArrayUtils.getGreaterValue(
				keys.map((keyItem) => NumberUtils.convertToNumber(keyItem))
			) + 1
		Object.assign(data, { [key]: {} })
		setProductItems(data)
	}

	const handleRemoveProductItem = (index: number) => {
		let data = { ...productItems }
		data = ObjectUtils.removeProps(data, [`${index}`])

		setProductItems(data)
	}
	return (
		<Modal show={show} onClose={onClose}>
			<ModalTitle>{supplier?.id ? 'Editar' : 'Cadastrar'} fornecedor</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit}>
					<div className="grid xl:grid-cols-12 lg:grid-cols-6 md:grid-cols-3 gap-4">
						<div className={classFullWidth}>
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
						<div className={class2Cols}>
							<Input
								type="text"
								id="name"
								name="name"
								value={formDate?.name || ''}
								label={LabelUtils.translateField('name')}
								onChange={handleInputChange}
								autoFocus
							/>
						</div>
						<div className={class2Cols}>
							<Input
								type="text"
								id="representative"
								name="representative"
								value={formDate?.representative || ''}
								label={LabelUtils.translateField('representative')}
								onChange={handleInputChange}
							/>
						</div>
						<Divisor label="Contactos" />
						<div className={class2Cols}>
							<Input
								type="number"
								id="phone"
								name="phone"
								value={formDate?.phone || ''}
								label={LabelUtils.translateField('phone')}
								onChange={handleInputChange}
							/>
						</div>
						<div className={class2Cols}>
							<Input
								type="email"
								id="email"
								name="email"
								value={formDate?.email || ''}
								label={LabelUtils.translateField('email')}
								onChange={handleInputChange}
							/>
						</div>
						<Divisor label="Endereço" />
						<div className={class3Cols}>
							<Select
								id="countryId"
								name="countryId"
								value={formDate?.countryId || ''}
								label={LabelUtils.translateField('countryId')}
								data={countries.map(({ name, id }) => ({
									text: name,
									value: id
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div className={class3Cols}>
							<Select
								id="provinceId"
								name="provinceId"
								value={formDate?.provinceId || ''}
								label={LabelUtils.translateField('provinceId')}
								data={provinceList.map(({ name, id }) => ({
									text: name,
									value: id
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div className={class3Cols}>
							<Select
								id="municipalityId"
								name="municipalityId"
								value={formDate?.municipalityId || ''}
								label={LabelUtils.translateField('municipalityId')}
								data={municipalityList.map(({ name, id }) => ({
									text: name,
									value: id
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div className={class3Cols}>
							<Input
								type="text"
								id="businessAddress"
								name="businessAddress"
								value={formDate?.businessAddress || ''}
								label={LabelUtils.translateField('businessAddress')}
								onChange={handleInputChange}
							/>
						</div>
						<Divisor label="Produtos">
							<div>
								<span
									className="btn-primary"
									onClick={handleAddProductItem}
									title="Adicionar producto"
								>
									<IconPlus />
								</span>
							</div>
						</Divisor>
						{Object.keys(productItems)?.map((key, i) => (
							<div key={key} className={classFullWidth}>
								<SupplierProductEditor
									itemIndex={Number(key)}
									index={i}
									supplierProduct={productItems[key]}
									onChange={handleChangeProduct}
									onRemoveItem={handleRemoveProductItem}
								/>
							</div>
						))}
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

const Divisor = ({ label, children }: { label?: string; children?: ReactNode }) => (
	<div className={classFullWidth}>
		{label || ''} {children}
	</div>
)
