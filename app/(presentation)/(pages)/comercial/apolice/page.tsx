'use client'

import { PDFDocument } from 'pdf-lib'
import { useEffect, useState } from 'react'

import { Layout, LayoutBody, LogoBase64, SubMenu } from '@/(presentation)/components'
import {
	ApolicePage1Utils,
	ApolicePage2Utils,
	ApolicePage3Utils,
	ApoliceStyle,
	SubmenuUtils,
	makeRectangle
} from '@/utils'

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

		/* // PAGE 1
		const page = pdfDoc.addPage(pageSize)
		await ApolicePage1Utils.build({ page, pdfDoc })

		// PAGE 2
		const page2 = pdfDoc.addPage(pageSize)
		await ApolicePage2Utils.build({ page: page2, pdfDoc })
 */
		/* PAGE 3 */
		const page3 = pdfDoc.addPage(pageSize)
		// await ApolicePage3Utils.build({ page: page33, pdfDoc })
		const style = ApoliceStyle
		const padding = style.defaultPadding

		const imageLogo = await pdfDoc.embedPng(LogoBase64)
		/* HEADER */
		page3.drawImage(imageLogo, { x: padding, y: pageHeight - 80, width: 70, height: 48 })

		makeRectangle({
			page: page3,
			height: 16,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 115
		})
		page3.drawText(`OBRIGAÇÕES E CONDIÇÕES GERAIS`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 125,
			y: pageHeight - 112,
			size: style.fontSizeTitle
		})

		page3.drawText(`NOTA:`, {
			font: await pdfDoc.embedFont(style.fontBoldItalic),
			x: padding,
			y: pageHeight - 128,
			size: style.fontSizeText
		})
		page3.drawText(
			`Todos os dados estão sujeitos a alteração com 15 (quinze) dias de antecedência.`,
			{
				font: await pdfDoc.embedFont(style.fontBoldItalic),
				x: padding + 25,
				y: pageHeight - 128,
				size: style.fontSizeText,
				color: style.colorRed
			}
		)

		makeRectangle({
			page: page3,
			width: 140,
			x: padding,
			y: pageHeight - 148
		})
		page3.drawText(`TAXA DE CADASTRO`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 144,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			width: 355,
			x: padding + 140,
			y: pageHeight - 148
		})
		page3.drawText(`3 500,00 POR CONTRATO`, {
			x: padding + 142,
			y: pageHeight - 144,
			size: style.fontSizeText
		})

		makeRectangle({
			page: page3,
			width: 140,
			x: padding,
			y: pageHeight - 166
		})
		page3.drawText(`ESPECIALIDADES`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 162,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			width: 355,
			x: padding + 140,
			y: pageHeight - 166
		})
		// page3.drawText(`3 500,00 POR CONTRATO`, {
		// 	x: padding + 142,
		// 	y: pageHeight - 162,
		// 	size: style.fontSizeText
		// })

		makeRectangle({
			page: page3,
			width: 140,
			x: padding,
			y: pageHeight - 184
		})
		page3.drawText(`HORÁRIO DE ATENDIMENTO`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 180,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			width: 355,
			x: padding + 140,
			y: pageHeight - 184
		})
		page3.drawText(`ATENDIMENTO DAS 07:30 ÀS 20:00, DE SEGUNDA-FEIRA À SÁBADO`, {
			x: padding + 142,
			y: pageHeight - 180,
			size: style.fontSizeText
		})

		// DOCUMENTAÇÃO NECESSÁRIA
		makeRectangle({
			page: page3,
			height: 16,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 225
		})
		page3.drawText(`DOCUMENTAÇÃO NECESSÁRIA`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 135,
			y: pageHeight - 222,
			size: style.fontSizeTitle
		})

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
