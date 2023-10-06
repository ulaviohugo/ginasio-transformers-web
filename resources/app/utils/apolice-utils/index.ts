export * from './apolice-page1-utils'
export * from './apolice-page2-utils'
export * from './apolice-page3-utils'
export * from './apolice-page4-utils'

import { InsuredModel } from '@/domain/models'
import { PDFDocument, PDFPage, RGB, StandardFonts, rgb } from 'pdf-lib'

type RectangleProps = {
	page: PDFPage
	x: number
	y: number
	width: number
	height?: number
	borderColor?: RGB
}

export const ApoliceStyle = {
	fontSizeTitle: 12,
	fontSizeSubTitle: 10,
	fontSizeText: 7,
	borderWidth: 0.1,
	borderColor: rgb(230 / 255, 230 / 255, 230 / 255),
	borderColorBlack: rgb(0, 0, 0),
	colorRectangle: rgb(1, 1, 1),
	colorRed: rgb(1, 1 / 3, 1 / 3),
	fontItalic: StandardFonts.HelveticaOblique,
	fontBold: StandardFonts.HelveticaBold,
	fontBoldItalic: StandardFonts.HelveticaBoldOblique,
	cellHeight: 14,
	defaultPadding: 50
}

export type ApoliceProps = {
	page: PDFPage
	pdfDoc: PDFDocument
	insured: InsuredModel
}

export const makeRectangle = ({
	page,
	height = ApoliceStyle.cellHeight,
	width,
	borderColor = ApoliceStyle.borderColor,
	x,
	y
}: RectangleProps) => {
	page.drawRectangle({
		x,
		y,
		width,
		height,
		borderColor,
		borderWidth: ApoliceStyle.borderWidth,
		color: ApoliceStyle.colorRectangle
	})
}
