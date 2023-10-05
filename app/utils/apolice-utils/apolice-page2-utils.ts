import { LogoBase64 } from '@/(presentation)/components'
import { ApoliceProps, ApoliceStyle, makeRectangle } from '.'
import { PDFDocument, PDFPage } from 'pdf-lib'
import { InsuredModel } from '@/domain/models'
import { DateUtils } from '..'

export class ApolicePage2Utils {
	static async build({ page, pdfDoc, insured }: ApoliceProps) {
		const pageHeight = page.getHeight()
		const style = ApoliceStyle

		const padding = style.defaultPadding

		const imageLogo = await pdfDoc.embedPng(LogoBase64)
		page.drawImage(imageLogo, { x: padding, y: pageHeight - 80, width: 70, height: 48 })

		let y = pageHeight
		for (let index = 0; index < 6; index++) {
			const insuredItem = insured?.insureds
				? insured?.insureds[index]
				: ({} as InsuredModel)

			insuredPeople({ index, height: y, page, pdfDoc, insured: insuredItem })
			y -= 120
		}
	}
}

const insuredPeople = async ({
	index,
	height,
	page,
	pdfDoc,
	insured
}: {
	index: number
	height: number
	page: PDFPage
	pdfDoc: PDFDocument
	insured?: InsuredModel
}) => {
	const style = ApoliceStyle
	const pageWidth = page.getWidth()
	const number = index + 1
	const padding = style.defaultPadding

	makeRectangle({
		page: page,
		height: 25,
		width: pageWidth - 100,
		x: padding,
		y: height - 115
	})
	page.drawText(`${number}ª PESSOA SEGURA`, {
		font: await pdfDoc.embedFont(style.fontBold),
		x: padding + 5,
		y: height - 108,
		size: style.fontSizeTitle
	})

	makeRectangle({
		page: page,
		width: 90,
		x: padding,
		y: height - 132
	})
	page.drawText('NOME COMPLETO', {
		x: padding + 5,
		y: height - 128,
		size: style.fontSizeText
	})
	makeRectangle({
		page: page,
		width: 410,
		x: padding + 85,
		y: height - 132
	})
	page.drawText(insured?.name || '', {
		x: padding + 88,
		y: height - 128,
		size: style.fontSizeText
	})

	makeRectangle({
		page: page,
		width: 130,
		x: padding,
		y: height - 149
	})
	page.drawText('NOME A CONSTAR NO CARTÃO', {
		x: padding + 5,
		y: height - 145,
		size: style.fontSizeText
	})
	makeRectangle({
		page: page,
		width: 150,
		x: padding + 148,
		y: height - 149
	})
	page.drawText(insured?.cardName || '', {
		x: padding + 151,
		y: height - 145,
		size: style.fontSizeText
	})

	makeRectangle({
		page: page,
		width: 95,
		x: padding + 280,
		y: height - 149
	})
	page.drawText('DATA NASCIMENTO', {
		x: padding + 282,
		y: height - 146,
		size: style.fontSizeText
	})
	makeRectangle({
		page: page,
		width: 140,
		x: padding + 355,
		y: height - 149
	})
	page.drawText(insured?.dateOfBirth ? DateUtils.getDatePt(insured.dateOfBirth) : '', {
		x: padding + 358,
		y: height - 146,
		size: style.fontSizeText
	})

	makeRectangle({
		page: page,
		width: 60,
		x: padding,
		y: height - 166
	})
	page.drawText('BI / CÉDULA', {
		x: padding + 5,
		y: height - 162,
		size: style.fontSizeText
	})
	makeRectangle({
		page: page,
		width: 100,
		x: padding + 60,
		y: height - 166
	})
	page.drawText(insured?.documentNumber || '', {
		x: padding + 63,
		y: height - 162,
		size: style.fontSizeText
	})

	makeRectangle({
		page: page,
		width: 70,
		x: padding + 160,
		y: height - 166
	})
	page.drawText('CONTRIBUINTE Nº', {
		x: padding + 162,
		y: height - 162,
		size: style.fontSizeText
	})
	makeRectangle({
		page: page,
		width: 100,
		x: padding + 230,
		y: height - 166
	})
	page.drawText(insured?.nif || '', {
		x: padding + 233,
		y: height - 162,
		size: style.fontSizeText
	})

	makeRectangle({
		page: page,
		width: 36,
		x: padding + 330,
		y: height - 166
	})
	page.drawText('SEXO', {
		x: padding + 332,
		y: height - 162,
		size: style.fontSizeText
	})

	makeRectangle({
		page: page,
		width: 60,
		x: padding + 365,
		y: height - 166
	})
	page.drawText('Feminino', {
		x: padding + 379,
		y: height - 162,
		size: style.fontSizeText
	})
	//checkbox
	makeRectangle({
		page: page,
		height: 8,
		width: 8,
		x: padding + 368,
		y: height - 162.5
	})
	if (insured?.gender == 'Feminino') {
		page.drawText('X', {
			x: padding + 369,
			y: height - 161,
			size: style.fontSizeText
		})
	}

	makeRectangle({
		page: page,
		width: 70,
		x: padding + 425,
		y: height - 166
	})
	page.drawText('Masculino', {
		x: padding + 438,
		y: height - 163,
		size: style.fontSizeText
	})
	//checkbox
	makeRectangle({
		page: page,
		height: 8,
		width: 8,
		x: padding + 428,
		y: height - 162.5
	})
	if (insured?.gender == 'Masculino') {
		page.drawText('X', {
			x: padding + 429,
			y: height - 161,
			size: style.fontSizeText
		})
	}

	makeRectangle({
		page: page,
		width: 60,
		x: padding,
		y: height - 183
	})
	page.drawText('ESTUDANTE', {
		x: padding + 5,
		y: height - 179,
		size: style.fontSizeText
	})

	makeRectangle({
		page: page,
		width: 35,
		x: padding + 60,
		y: height - 183
	})
	page.drawText('NÃO', {
		x: padding + 74,
		y: height - 179,
		size: style.fontSizeText
	})
	//checkbox
	makeRectangle({
		page: page,
		height: 8,
		width: 8,
		x: padding + 63,
		y: height - 179.5
	})
	if (insured?.student?.toLocaleLowerCase() == 'não') {
		page.drawText('X', {
			x: padding + 64,
			y: height - 178,
			size: style.fontSizeText
		})
	}

	makeRectangle({
		page: page,
		width: 35,
		x: padding + 95,
		y: height - 183
	})
	page.drawText('SIM', {
		x: padding + 109,
		y: height - 179,
		size: style.fontSizeText
	})
	//checkbox
	makeRectangle({
		page: page,
		height: 8,
		width: 8,
		x: padding + 98,
		y: height - 179.5
	})
	if (insured?.student?.toLocaleLowerCase() == 'sim') {
		page.drawText('X', {
			x: padding + 99,
			y: height - 178,
			size: style.fontSizeText
		})
	}

	makeRectangle({
		page: page,
		width: 120,
		x: padding + 130,
		y: height - 183
	})
	page.drawText('PROFISSÃO / ESCOLARIDADE', {
		x: padding + 134,
		y: height - 179,
		size: style.fontSizeText
	})
	makeRectangle({
		page: page,
		width: 250,
		x: padding + 245,
		y: height - 183
	})
	page.drawText(insured?.occupation || '', {
		x: padding + 248,
		y: height - 179,
		size: style.fontSizeText
	})

	makeRectangle({
		page: page,
		width: 90,
		x: padding,
		y: height - 200
	})
	page.drawText('TELEMÓVEL', {
		x: padding + 5,
		y: height - 197,
		size: style.fontSizeText
	})
	makeRectangle({
		page: page,
		width: 180,
		x: padding + 90,
		y: height - 200
	})
	page.drawText(insured?.phone || '', {
		x: padding + 93,
		y: height - 197,
		size: style.fontSizeText
	})

	makeRectangle({
		page: page,
		width: 135,
		x: padding + 180,
		y: height - 200
	})
	page.drawText('PARENTESCO / VÍNCULO LABORAL', {
		x: padding + 183,
		y: height - 197,
		size: style.fontSizeText
	})
	makeRectangle({
		page: page,
		width: 180,
		x: padding + 315,
		y: height - 200
	})
	page.drawText(insured?.relationship || '', {
		x: padding + 318,
		y: height - 197,
		size: style.fontSizeText
	})
}
