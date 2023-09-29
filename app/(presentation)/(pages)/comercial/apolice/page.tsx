'use client'

import { PDFDocument } from 'pdf-lib'
import { useEffect, useState } from 'react'

import { Layout, LayoutBody, LogoBase64, SubMenu } from '@/(presentation)/components'
import {
	ApolicePage1Utils,
	ApolicePage2Utils,
	ApolicePage3Utils,
	ApoliceStyle,
	DateUtils,
	SubmenuUtils,
	makeRectangle
} from '@/utils'
import { InsuredModel } from '@/domain/models'

export default function Apolice() {
	const [pdfData, setPdfData] = useState<string | null>(null)
	useEffect(() => {
		generatePDF()
	}, [])

	const generatePDF = async () => {
		const pdfDoc = await PDFDocument.create()
		const pageHeight = 842
		const pageWidth = 595
		const pageSize = [pageWidth, pageHeight] as any

		// PAGE 1
		const page = pdfDoc.addPage(pageSize)
		await ApolicePage1Utils.build({ page, pdfDoc })

		// PAGE 2
		const page2 = pdfDoc.addPage(pageSize)
		await ApolicePage2Utils.build({ page: page2, pdfDoc })

		/* PAGE 3 */
		const page3 = pdfDoc.addPage(pageSize)
		await ApolicePage3Utils.build({ page: page3, pdfDoc })

		const page4 = pdfDoc.addPage(pageSize)

		// makeRectangle({
		// 	page: page4,
		// 	height: 16,
		// 	width: pageWidth - 100,
		// 	x: padding,
		// 	y: pageHeight - 509
		// })
		// page4.drawText(`FORMA DE PAGAMENTO`, {
		// 	font: await pdfDoc.embedFont(style.fontBold),
		// 	x: padding + 175,
		// 	y: pageHeight - 506,
		// 	size: style.fontSizeTitle
		// })

		const pdfBytes = await pdfDoc.save()
		const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })
		const pdfUrl = URL.createObjectURL(pdfBlob)

		setPdfData(pdfUrl)
	}

	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial} />
				<div className="mt-2">
					<button className="btn-primary inline-flex" onClick={generatePDF}>
						Actualizar
					</button>
				</div>
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
