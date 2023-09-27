import { LogoBase64 } from '@/(presentation)/components'
import { ApoliceProps, ApoliceStyle, makeRectangle } from '.'

export class ApolicePage3Utils {
	static async build({ page, pdfDoc }: ApoliceProps) {
		const style = ApoliceStyle
		const pageWidth = page.getWidth()
		const pageHeight = page.getHeight()
		const padding = style.defaultPadding

		const imageLogo = await pdfDoc.embedPng(LogoBase64)
		/* HEADER */
		page.drawImage(imageLogo, { x: padding, y: pageHeight - 80, width: 70, height: 48 })

		makeRectangle({
			page: page,
			height: 25,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 115
		})
		page.drawText(`OBRIGAÇÕES E CONDIÇÕES GERAIS`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 105,
			y: pageHeight - 108,
			size: style.fontSizeTitle
		})

		page.drawText(`NOTA:`, {
			font: await pdfDoc.embedFont(style.fontBoldItalic),
			x: padding,
			y: pageHeight - 128,
			size: style.fontSizeText
		})
		page.drawText(
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
			page: page,
			width: 140,
			x: padding,
			y: pageHeight - 148
		})
		page.drawText(`TAXA DE CADASTRO`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 143,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page,
			width: 350,
			x: padding + 140,
			y: pageHeight - 148
		})
	}
}
