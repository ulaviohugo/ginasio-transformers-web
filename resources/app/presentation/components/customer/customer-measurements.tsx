import { CustomerModel } from '@/domain/models'
import React from 'react'

type CustomerMeasurementsProps = {
	customer: CustomerModel
}

export function CustomerMeasurements({ customer }: CustomerMeasurementsProps) {
	return (
		<fieldset>
			<legend>Medidas do cliente</legend>
			<div className="flex gap-2">
				<div>Nome: </div> <div>{customer.name}</div>
			</div>
			<div className="flex gap-2">
				<div>Telefone: </div> <div>{customer.phone}</div>
			</div>
		</fieldset>
	)
}
