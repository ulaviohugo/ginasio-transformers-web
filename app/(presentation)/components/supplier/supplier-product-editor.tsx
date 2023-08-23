'use client'

import { ChangeEvent, useState } from 'react'
import { useCategories, useProducts } from '../../hooks'
import { Product } from '@prisma/client'
import { IconClose, InputPrice, Select } from '..'
import { LabelUtils } from '@/app/utils'

export type ProductCardChangeProps = {
	index: number
	name: string
	value: string
}

export type SupplierProductEditorProps = {
	supplierProduct: any
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
	const categories = useCategories()
	const products = useProducts()
	const [productList, setProductList] = useState<Product[]>([])

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		let data: any = { index: itemIndex, name, value }
		if (name == 'categoryId') {
			data = { ...data, productId: undefined }
			setProductList(
				products.filter((product) => product.categoryId == Number(value)) as Product[]
			)
		}

		onChange(data)
	}
	return (
		<div className="flex-1 grid lg:grid-cols-3 md:grid-cols-2 gap-4 relative bg-slate-100 p-3">
			<div className="lg:col-span-3 md:col-span-2 -mb-3">Produto {index + 1}</div>
			<div>
				<Select
					id={`categoryId${itemIndex}`}
					name="categoryId"
					value={supplierProduct.categoryId}
					label={LabelUtils.translateField('categoryId')}
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
					id={`productId${itemIndex}`}
					name="productId"
					value={supplierProduct.productId}
					label={LabelUtils.translateField('productId')}
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
					id={`unitPrice${itemIndex}`}
					name="unitPrice"
					value={supplierProduct.unitPrice}
					label={LabelUtils.translateField('unitPrice')}
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
