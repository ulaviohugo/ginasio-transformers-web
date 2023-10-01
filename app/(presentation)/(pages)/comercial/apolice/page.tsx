'use client'

import { PDFDocument } from 'pdf-lib'
import { ChangeEvent, useEffect, useState } from 'react'

import { InsuredEditor, Layout, LayoutBody, SubMenu } from '@/(presentation)/components'
import {
	ApolicePage1Utils,
	ApolicePage2Utils,
	ApolicePage3Utils,
	ApolicePage4Utils,
	SubmenuUtils
} from '@/utils'
import { mockInsured } from '@/test/model/mocks'

export default function Apolice() {
	const [pdfData, setPdfData] = useState<string | null>(null)
	useEffect(() => {
		generatePDF()
	}, [])

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}

	const generatePDF = async () => {
		const insured = mockInsured()

		const pdfDoc = await PDFDocument.create()
		pdfDoc.setTitle('Samuel')
		const pageHeight = 842
		const pageWidth = 595
		const pageSize = [pageWidth, pageHeight] as any

		// PAGE 1
		const page = pdfDoc.addPage(pageSize)
		await ApolicePage1Utils.build({ page, pdfDoc, insured })

		// PAGE 2
		const page2 = pdfDoc.addPage(pageSize)
		await ApolicePage2Utils.build({ page: page2, pdfDoc, insured })

		// PAGE 3
		const page3 = pdfDoc.addPage(pageSize)
		await ApolicePage3Utils.build({ page: page3, pdfDoc, insured })

		// PAGE 4
		const page4 = pdfDoc.addPage(pageSize)
		await ApolicePage4Utils.build({ page: page4, pdfDoc })

		const pdfBytes = await pdfDoc.save()
		const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })
		const pdfUrl = URL.createObjectURL(pdfBlob)

		setPdfData(pdfUrl)
	}

	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial} />
				<InsuredEditor onChange={handleInputChange} />
				{pdfData && (
					<>
						<iframe
							title="PDF Preview"
							width="100%"
							height="700px"
							src={`${pdfData}`}
							className="mt-4"
						/>
					</>
				)}
			</LayoutBody>
		</Layout>
	)
}
