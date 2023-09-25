'use client'

import { PDFDocument } from 'pdf-lib'

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { Layout, LayoutBody, LogoBase64, SubMenu } from '@/(presentation)/components'
import { SubmenuUtils } from '@/utils'
import { useEffect, useState } from 'react'
import { table } from 'console'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export default function Factura() {
	const [pdfData, setPdfData] = useState<string | null>(null)

	useEffect(() => {
		generatePDF()
	}, [])

	const generatePDF = async () => {
		const pdfDoc = await PDFDocument.create()

		const page = pdfDoc.addPage([595, 842])

		const fontBold = await pdfDoc.embedFont('Helvetica-Bold')

		page.drawText('Texto em negrito', { font: fontBold, x: 50, y: 350 })

		const pdfBytes = await pdfDoc.save()

		const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })

		const pdfUrl = URL.createObjectURL(pdfBlob)

		setPdfData(pdfUrl)

		return
		const documentDefinition: TDocumentDefinitions = {
			content: [
				{
					image: LogoBase64,
					width: 192
				},
				{
					table: {
						widths: ['*', '*'],
						body: [
							[
								{
									text: 'APÓLICE DE ADESÃO DE CO-SEGURO SOCIAL',
									bold: true,
									alignment: 'center',
									colSpan: 2
									// border: [false, false, false, false]
								},
								''
							]
						]
					}
				},

				{
					table: {
						widths: ['*', '*', '*', '*', '*', '*'],
						body: [
							[{ text: 'Foto', rowSpan: 6 }, '', '', '', '', ''],
							[
								'',
								{
									text: 'NOTA: Área de preenchimento exclusivo ao Consultório MedLopes',
									colSpan: 5,
									borderColor: 'red'
								},
								'',
								'',
								'',
								''
							],
							['', 'PROPOSTA Nº', '', 'APÓLICE Nº', '', 'PROPOSTA DE:'],
							['', 'Ola', 'Ola', 'Ola', 'Ola', 'Ola'],
							['', 'Ola', 'Ola', 'Ola', 'Ola', 'Ola'],
							['', 'Ola', 'Ola', 'Ola', 'Ola', 'Ola']
						]
					}
				}
			]
		}

		const pdfDocGenerator = pdfMake.createPdf(documentDefinition)
		// pdfDocGenerator.open()

		pdfDocGenerator.getBase64((dataUrl) => {
			setPdfData(dataUrl)
		})
	}

	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial} />

				{pdfData && (
					<>
						<iframe title="PDF Preview" width="100%" height="500px" src={`${pdfData}`} />
					</>
				)}
			</LayoutBody>
		</Layout>
	)
}
