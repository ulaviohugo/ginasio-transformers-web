import { PDFDocument, PDFPage, StandardFonts, rgb } from 'pdf-lib'

export * from './apolice-page1-utils'
export * from './apolice-page2-utils'

type RectangleProps = {
	page: PDFPage
	x: number
	y: number
	width: number
	height?: number
}

export const ApoliceStyle = {
	fontSizeTitle: 12,
	fontSizeSubTitle: 10,
	fontSizeText: 7,
	borderWidth: 0.1,
	borderColor: rgb(230 / 255, 230 / 255, 230 / 255),
	colorRectangle: rgb(1, 1, 1),
	colorRed: rgb(1, 1 / 3, 1 / 3),
	fontItalic: StandardFonts.HelveticaOblique,
	fontBold: StandardFonts.HelveticaBold,
	cellHeight: 14,
	defaultPadding: 50
}

export type ApoliceProps = {
	page: PDFPage
	pdfDoc: PDFDocument
}

export const makeRectangle = ({
	page,
	height = ApoliceStyle.cellHeight,
	width,
	x,
	y
}: RectangleProps) => {
	page.drawRectangle({
		x,
		y,
		width,
		height,
		borderColor: ApoliceStyle.borderColor,
		borderWidth: ApoliceStyle.borderWidth,
		color: ApoliceStyle.colorRectangle
	})
}
