import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { RefundModel } from '@/domain/models'
import { Button, IconPDF, NoData, PdfViewer, Spinner } from '@/presentation/components'
import { DateUtils, NumberUtils } from '@/utils'
import { useRefunds } from '@/presentation/hooks'
import { loadRefundStore } from '@/presentation/redux'
import { LoadRefunds } from '@/domain/usecases'

type RefundListProps = {
	onSelect: (refund: RefundModel) => void
	loadRefunds: LoadRefunds
}

export function RefundList({ onSelect, loadRefunds }: RefundListProps) {
	const dispatch = useDispatch()
	const refunds = useSelector(useRefunds())

	const [loading, setLoading] = useState(true)
	const [pdfUrl, setPdfUrl] = useState('')

	const [selectedRow, setSelectedRow] = useState(0)

	const handleShowPdf = (pdfUrl: string) => {
		setPdfUrl(pdfUrl)
	}

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}

	const handleSelect = (refund: RefundModel) => {
		handleSelectRow(refund.id)
		onSelect(refund)
	}

	useEffect(() => {
		setLoading(true)
		loadRefunds
			.load()
			.then((response) => {
				dispatch(loadRefundStore(response))
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => {
				setLoading(false)
			})
	}, [])

	return (
		<fieldset>
			<legend>Filtro {loading && <Spinner />}</legend>
			<PdfViewer
				pdfUrl={pdfUrl}
				// title={`Recibo Salarial - ${selectedSalary?.customer?.name}`}
				onClose={() => setPdfUrl('')}
			/>
			<table className="w-full text-sm">
				<thead>
					<tr className="font-semibold border-b">
						<td>ID</td>
						<td>Data</td>
						<td>Cliente</td>
						<td>Data Compra</td>
						<td>Produto</td>
						<td>Valor</td>
						<td>Processado por</td>
						<td>Acção</td>
					</tr>
				</thead>
				<tbody>
					{refunds.map((refund, i) => {
						return (
							<tr
								key={refund.id}
								className={`
									cursor-pointer transition-all duration-150 
									${i % 2 !== 0 && 'bg-gray-100'} 
									${selectedRow == refund.id ? 'bg-primary text-white' : 'hover:bg-gray-200'}
									`}
								onClick={() => handleSelect(refund)}
							>
								<td>{refund.id}</td>
								<td>{DateUtils.getDatePt(refund.created_at)}</td>
								<td>{refund.customer?.name}</td>
								<td>{DateUtils.getDatePt(refund.purchase_date)}</td>
								<td>{refund.product?.name}</td>
								<td>{NumberUtils.formatCurrency(refund.amount)}</td>
								<td>{refund.user?.name}</td>
								<td>
									<Button
										variant="gray-light"
										text="Visualizar"
										icon={IconPDF}
										onClick={() => handleShowPdf(refund.file_path)}
									/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			{!loading && refunds.length < 1 && <NoData />}
		</fieldset>
	)
}
