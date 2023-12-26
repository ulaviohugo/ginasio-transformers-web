import React from 'react'
import { Refunds } from '@/presentation/pages'
import {
	makeRemoteAddRefund,
	makeRemoteDeleteRefund,
	makeRemoteLoadRefunds,
	makeRemoteLoadCustomers,
	makeRemoteUpdateRefund,
	makeRemoteLoadCategories,
	makeRemoteLoadProduct
} from '../usecases'

export const MakeRefund = () => {
	return (
		<Refunds
			addRefund={makeRemoteAddRefund()}
			deleteRefund={makeRemoteDeleteRefund()}
			loadRefunds={makeRemoteLoadRefunds()}
			loadCustomers={makeRemoteLoadCustomers()}
			updateRefund={makeRemoteUpdateRefund()}
			loadCategories={makeRemoteLoadCategories()}
			loadProducts={makeRemoteLoadProduct()}
		/>
	)
}
