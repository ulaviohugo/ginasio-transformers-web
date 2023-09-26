'use client'

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

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

		const style = {
			fontSizeTitle: 12,
			fontSizeSubTitle: 11,
			fontSizeText: 9
		}
		const pl = 25
		const pageHeight = 842
		const pageWidth = 595
		const pageSize = [pageWidth, pageHeight] as any

		const page = pdfDoc.addPage(pageSize)

		const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

		const imageLogo = await pdfDoc.embedPng(LogoBase64)

		page.drawImage(imageLogo, { x: pl, y: pageHeight - 89, width: 89, height: 64 })

		page.drawRectangle({
			x: pl,
			y: pageHeight - 120,
			width: pageWidth - 50,
			height: 25,
			borderColor: rgb(151 / 255, 149 / 255, 149 / 255),
			borderWidth: 1 / 2,
			color: rgb(1, 1, 1)
		})

		const title = 'APÓLICE DE ADESÃO DO CO-SEGURO SOCIAL'
		const textTitleWidth = fontBold.widthOfTextAtSize(title, style.fontSizeText)
		page.drawText(title, {
			font: fontBold,
			x: (page.getWidth() - textTitleWidth) / 2,
			y: pageHeight - 110,
			size: style.fontSizeTitle
			// color: rgb(9 / 255, 9 / 255, 9 / 255)
		})

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
