import React, { ChangeEvent, useEffect, useState } from 'react'
import { useCategories, useProducts } from '@/presentation/hooks'
import { IconClose, InputPrice, Select } from '..'
import { LabelUtils } from '@/utils'
import { ProductModel, SupplierProductModel } from '@/domain/models'
import { useSelector } from 'react-redux'

export type ProductCardChangeProps = {
	index: number
	name: string
	value: string
}

export type SupplierProductEditorProps = {
	supplierProduct: SupplierProductModel
	itemIndex: number
	index: number
	onChange: (data: ProductCardChangeProps) => void
	onRemoveItem: (index: number) => void
}

export function SupplierProductEditor({
	supplierProduct,
	itemIndex,
	index,
	onChange,
	onRemoveItem
}: SupplierProductEditorProps) {
	const categories = useSelector(useCategories())
	const products = useSelector(useProducts())
	const [productList, setProductList] = useState<ProductModel[]>([])

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		let data: any = { index: itemIndex, name, value }
		if (name == 'category_id') {
			data = { ...data, product_id: undefined }
			setProductList(
				products.filter(
					(product) => product.category_id == Number(value)
				) as ProductModel[]
			)
		}
		onChange(data)
	}

	useEffect(() => {
		if (supplierProduct?.category_id) {
			setProductList(
				products.filter(
					(product) => product.category_id == supplierProduct?.category_id
				) as ProductModel[]
			)
		}
	}, [supplierProduct?.category_id])
	return (
		<div className="flex-1 grid lg:grid-cols-3 md:grid-cols-2 gap-4 relative bg-slate-100 p-3">
			<div className="lg:col-span-3 md:col-span-2 -mb-3">Produto {index + 1}</div>
			<div>
				<Select
					id={`category_id${itemIndex}`}
					name="category_id"
					value={supplierProduct?.category_id || ''}
					label={LabelUtils.translateField('category_id')}
					data={categories.map((category) => ({
						text: category.name,
						value: category.id
					}))}
					defaultText="Selecione"
					onChange={handleInputChange}
				/>
			</div>
			<div>
				<Select
					id={`product_id${itemIndex}`}
					name="product_id"
					value={supplierProduct?.product_id || ''}
					label={LabelUtils.translateField('product_id')}
					data={productList.map((product) => ({
						text: product.name,
						value: product.id
					}))}
					defaultText="Selecione"
					onChange={handleInputChange}
				/>
			</div>
			<div>
				<InputPrice
					id={`unit_price${itemIndex}`}
					name="unit_price"
					value={supplierProduct?.unit_price || ''}
					label={LabelUtils.translateField('unit_price')}
					onChange={handleInputChange}
				/>
			</div>
			<IconClose
				className="absolute top-2 right-2 bg-red-500 text-white cursor-pointer"
				onClick={() => onRemoveItem(itemIndex)}
				title="Remover produto"
			/>
		</div>
	)
}
