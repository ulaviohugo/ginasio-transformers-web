import { LogoBase64 } from '@/(presentation)/components'
import { ApoliceProps, ApoliceStyle, makeRectangle } from '.'
import { DateUtils } from '..'
import { InsuredModel } from '@/domain/models'

type FormDataProps = {
	mediator: string
	policyNumber: string
	proposalNumber: string
	proposalType: 'Novo Co-Seguro' | 'Alteração do Plano'
	assistedBy: string
	assistedAt: Date
	proposalCurrency: string
}

export class ApolicePage1Utils {
	static async build({ page, pdfDoc, insured }: ApoliceProps) {
		const currentDate = new Date()

		const formData: FormDataProps = {
			mediator: 'Samuel Freitas',
			policyNumber: '25',
			proposalNumber: '234',
			proposalType: 'Novo Co-Seguro',
			assistedBy: 'Samuel Levítico Francisco Freitas',
			assistedAt: currentDate,
			proposalCurrency: 'AOA'
		}

		const pageWidth = page.getWidth()
		const pageHeight = page.getHeight()
		const style = ApoliceStyle

		const padding = style.defaultPadding

		const imageLogo = await pdfDoc.embedPng(LogoBase64)
		/* HEADER */
		page.drawImage(imageLogo, { x: padding, y: pageHeight - 80, width: 70, height: 48 })

		makeRectangle({
			page,
			height: 25,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 115
		})
		page.drawText('APÓLICE DE ADESÃO DO CO-SEGURO SOCIAL', {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 110,
			y: pageHeight - 108,
			size: style.fontSizeTitle
		})

		//FOTO
		makeRectangle({
			page,
			height: 115,
			width: 110,
			x: padding,
			y: pageHeight - 235
		})

		page.drawText('NOTA:', {
			x: padding + 124,
			y: pageHeight - 130,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontItalic)
		})
		page.drawText('Área de preenchimento exclusivo ao Consultório MedLopes', {
			x: padding + 152,
			y: pageHeight - 130,
			size: style.fontSizeText,
			color: style.colorRed,
			font: await pdfDoc.embedFont(style.fontItalic)
		})

		// PROPOSTA
		makeRectangle({
			page,
			width: 65,
			x: padding + 124,
			y: pageHeight - 153
		})
		page.drawText('PROPOSTA Nº', {
			x: padding + 126,
			y: pageHeight - 149,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 66,
			x: padding + 188,
			y: pageHeight - 153
		})
		page.drawText(formData.proposalNumber, {
			x: padding + 190,
			y: pageHeight - 149,
			size: style.fontSizeText
		})

		// APÓLICE
		makeRectangle({
			page,
			width: 64,
			x: padding + 254,
			y: pageHeight - 153
		})
		page.drawText('APÓLICE Nº', {
			x: padding + 256,
			y: pageHeight - 149,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 65,
			x: padding + 317,
			y: pageHeight - 153
		})
		page.drawText(formData.policyNumber, {
			x: padding + 319,
			y: pageHeight - 149,
			size: style.fontSizeText
		})

		// PROPOSTA
		makeRectangle({
			page,
			width: 120,
			x: padding + 376,
			y: pageHeight - 153
		})
		page.drawText('PROPOSTA DE:', {
			x: padding + 378,
			y: pageHeight - 149,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 120,
			x: padding + 376,
			y: pageHeight - 167
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			borderColor: style.borderColorBlack,
			x: padding + 380,
			y: pageHeight - 164
		})
		if (formData.proposalType == 'Alteração do Plano') {
			page.drawText('X', {
				x: padding + 381.5,
				y: pageHeight - 162,
				size: style.fontSizeText
			})
		}
		page.drawText('Alteração do Plano', {
			x: padding + 392,
			y: pageHeight - 163,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 120,
			x: padding + 376,
			y: pageHeight - 181
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			borderColor: style.borderColorBlack,
			x: padding + 380.5,
			y: pageHeight - 178
		})
		if (formData.proposalType == 'Novo Co-Seguro') {
			page.drawText('X', {
				x: padding + 382,
				y: pageHeight - 176,
				size: style.fontSizeText
			})
		}
		page.drawText('Novo Co-Seguro', {
			x: padding + 392,
			y: pageHeight - 177,
			size: style.fontSizeText
		})

		// MEDIADOR
		makeRectangle({
			page,
			width: 65,
			x: padding + 124,
			y: pageHeight - 181
		})
		page.drawText('MEDIADOR (A):', {
			x: padding + 126,
			y: pageHeight - 177,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 188,
			x: padding + 188,
			y: pageHeight - 181
		})
		page.drawText(formData.mediator, {
			x: padding + 190,
			y: pageHeight - 177,
			size: style.fontSizeText
		})

		// ATENDIMENTO
		makeRectangle({
			page,
			width: 110,
			x: padding + 124,
			y: pageHeight - 208
		})
		page.drawText('ATENDIMENTO FEITO POR:', {
			x: padding + 126,
			y: pageHeight - 204,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 145,
			x: padding + 234,
			y: pageHeight - 208
		})
		page.drawText(formData.assistedBy, {
			x: padding + 236,
			y: pageHeight - 204,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 94,
			x: padding + 372,
			y: pageHeight - 208
		})
		page.drawText('MOEDA DE CONTRATO', {
			x: padding + 374,
			y: pageHeight - 204,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 30,
			x: padding + 466,
			y: pageHeight - 208
		})
		page.drawText(formData.proposalCurrency, {
			x: padding + 468,
			y: pageHeight - 204,
			size: style.fontSizeText
		})

		// DATA ATENDIMENTO
		makeRectangle({
			page,
			width: 110,
			x: padding + 124,
			y: pageHeight - 235
		})
		page.drawText('DATA DO ATENDIMENTO:', {
			x: padding + 126,
			y: pageHeight - 231,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 62,
			x: padding + 234,
			y: pageHeight - 235
		})
		page.drawText(String(DateUtils.getDatePt(formData.assistedAt)), {
			x: padding + 236,
			y: pageHeight - 231,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 70,
			x: padding + 284,
			y: pageHeight - 235
		})
		page.drawText('ASSINATURA:', {
			x: padding + 286,
			y: pageHeight - 231,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 148,
			x: padding + 348,
			y: pageHeight - 235
		})

		/* TITULAR DO CO_SEGURO */
		makeRectangle({
			page,
			height: 20,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 258
		})
		page.drawText('1. TITULAR DO CO-SEGURO SOCIAL', {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 252,
			size: style.fontSizeSubTitle
		})

		makeRectangle({
			page,
			width: 90,
			x: padding,
			y: pageHeight - 275
		})
		page.drawText('NOME COMPLETO', {
			x: padding + 5,
			y: pageHeight - 270,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 410,
			x: padding + 85,
			y: pageHeight - 275
		})
		page.drawText(insured.name, {
			x: padding + 87,
			y: pageHeight - 270,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 135,
			x: padding,
			y: pageHeight - 292
		})
		page.drawText('NOME A CONSTAR NO CARTÃO', {
			x: padding + 5,
			y: pageHeight - 288,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 150,
			x: padding + 135,
			y: pageHeight - 292
		})
		page.drawText(insured.cardName, {
			x: padding + 137,
			y: pageHeight - 288,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 200,
			x: padding + 240,
			y: pageHeight - 292
		})
		page.drawText('DATA NASCIMENTO / CONSTITUIÇÃO EMPRESA', {
			x: padding + 242,
			y: pageHeight - 288,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 60,
			x: padding + 435,
			y: pageHeight - 292
		})
		page.drawText(String(DateUtils.getDatePt(insured.birthDate)), {
			x: padding + 437,
			y: pageHeight - 288,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: pageWidth / 8,
			x: padding,
			y: pageHeight - 309
		})
		page.drawText('BI/PASSAPORTE', {
			x: padding + 5,
			y: pageHeight - 305,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: pageWidth / 7,
			x: padding + 75,
			y: pageHeight - 309
		})
		page.drawText(insured.documentNumber, {
			x: padding + 77,
			y: pageHeight - 305,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: pageWidth / 7,
			x: padding + 160,
			y: pageHeight - 309
		})
		page.drawText('DATA DE EMISSÃO', {
			x: padding + 165,
			y: pageHeight - 305,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: pageWidth / 7,
			x: padding + 244,
			y: pageHeight - 309
		})
		page.drawText(String(DateUtils.getDatePt(insured.documentIssueDate)), {
			x: padding + 246,
			y: pageHeight - 305,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: pageWidth / 7,
			x: padding + 330,
			y: pageHeight - 309
		})
		page.drawText('CONTRIBUINTE Nº', {
			x: padding + 335,
			y: pageHeight - 305,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: pageWidth / 7,
			x: padding + 410,
			y: pageHeight - 309
		})
		page.drawText(insured.nif, {
			x: padding + 412,
			y: pageHeight - 305,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 30,
			x: padding,
			y: pageHeight - 326
		})
		page.drawText('SEXO', {
			x: padding + 5,
			y: pageHeight - 322,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 60,
			x: padding + 30,
			y: pageHeight - 326
		})
		page.drawText('Feminino', {
			x: padding + 48,
			y: pageHeight - 322,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			borderColor: style.borderColorBlack,
			x: padding + 35,
			y: pageHeight - 322.5
		})
		if (insured.gender == 'Feminino') {
			page.drawText('X', {
				x: padding + 36.5,
				y: pageHeight - 321,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 70,
			x: padding + 90,
			y: pageHeight - 326
		})
		page.drawText('Masculino', {
			x: padding + 108,
			y: pageHeight - 322,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			borderColor: style.borderColorBlack,
			x: padding + 95,
			y: pageHeight - 322.5
		})
		if (insured.gender == 'Masculino') {
			page.drawText('X', {
				x: padding + 96.5,
				y: pageHeight - 321,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 115,
			x: padding + 155,
			y: pageHeight - 326
		})
		page.drawText('PROFISSÃO / ACTIVIDADE', {
			x: padding + 157,
			y: pageHeight - 322,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 140,
			x: padding + 265,
			y: pageHeight - 326
		})
		page.drawText(insured.occupation, {
			x: padding + 267,
			y: pageHeight - 322,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 90,
			x: padding + 405,
			y: pageHeight - 326
		})
		page.drawText('DEPENDENTES', {
			x: padding + 407,
			y: pageHeight - 322,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 20,
			x: padding + 475,
			y: pageHeight - 326
		})
		page.drawText(String(insured.dependents), {
			x: padding + 477,
			y: pageHeight - 322,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding,
			y: pageHeight - 343
		})
		page.drawText('ESTADO CIVIL', {
			x: padding + 5,
			y: pageHeight - 339,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 60,
			x: padding + 65,
			y: pageHeight - 343
		})
		page.drawText(String(insured.maritalStatus), {
			x: padding + 67,
			y: pageHeight - 339,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding + 125,
			y: pageHeight - 343
		})
		page.drawText('ENDEREÇO', {
			x: padding + 130,
			y: pageHeight - 339,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 310,
			x: padding + 185,
			y: pageHeight - 343
		})
		page.drawText(String(insured.address), {
			x: padding + 187,
			y: pageHeight - 339,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding,
			y: pageHeight - 360
		})
		page.drawText('BAIRRO', {
			x: padding + 5,
			y: pageHeight - 356,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 65,
			y: pageHeight - 360
		})
		page.drawText(String(insured.neighborhood), {
			x: padding + 67,
			y: pageHeight - 356,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding + 245,
			y: pageHeight - 360
		})
		page.drawText('MUNICÍPIO', {
			x: padding + 250,
			y: pageHeight - 356,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 305,
			y: pageHeight - 360
		})
		page.drawText(String(insured.municipality), {
			x: padding + 307,
			y: pageHeight - 356,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding,
			y: pageHeight - 377
		})
		page.drawText('PROVÍNCIA', {
			x: padding + 5,
			y: pageHeight - 373,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 65,
			y: pageHeight - 377
		})
		page.drawText(String(insured.province), {
			x: padding + 67,
			y: pageHeight - 373,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding + 245,
			y: pageHeight - 377
		})
		page.drawText('E-MAIL', {
			x: padding + 250,
			y: pageHeight - 373,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 305,
			y: pageHeight - 377
		})
		page.drawText(String(insured.email), {
			x: padding + 307,
			y: pageHeight - 373,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding,
			y: pageHeight - 394
		})
		page.drawText('TELEMÓVEL', {
			x: padding + 5,
			y: pageHeight - 390,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 65,
			y: pageHeight - 394
		})
		page.drawText(String(insured.phone), {
			x: padding + 67,
			y: pageHeight - 390,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding + 245,
			y: pageHeight - 394
		})
		page.drawText('COMERCIAL', {
			x: padding + 250,
			y: pageHeight - 390,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 305,
			y: pageHeight - 394
		})
		page.drawText(String(insured.comercial), {
			x: padding + 307,
			y: pageHeight - 390,
			size: style.fontSizeText
		})

		/* DADOS DA APÓLICE DO CO-SEGURO SOCIAL */
		makeRectangle({
			page,
			height: 20,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 417
		})
		page.drawText('2. DADOS DA APÓLICE DO CO-SEGURO SOCIAL', {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 410,
			size: style.fontSizeSubTitle
		})

		makeRectangle({
			page,
			width: 189,
			x: padding,
			y: pageHeight - 434
		})
		page.drawText('DATA DE ADESÃO', {
			x: padding + 5,
			y: pageHeight - 430,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 60,
			x: padding + 185,
			y: pageHeight - 434
		})
		page.drawText(String(DateUtils.getDatePt(insured.enrollmentDate)), {
			x: padding + 197,
			y: pageHeight - 430,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 189,
			x: padding + 245,
			y: pageHeight - 434
		})
		page.drawText('ÚLTIMA DATA DA RENOVAÇÃO AUTOMÁTICA', {
			x: padding + 250,
			y: pageHeight - 430,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 60,
			x: padding + 435,
			y: pageHeight - 434
		})
		page.drawText(String(DateUtils.getDatePt(insured.lastAutoRenewDate)), {
			x: padding + 437,
			y: pageHeight - 430,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 40,
			x: padding,
			y: pageHeight - 451
		})
		page.drawText('PLANO', {
			x: padding + 5,
			y: pageHeight - 447,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 70,
			x: padding + 40,
			y: pageHeight - 451
		})
		page.drawText('Empresarial', {
			x: padding + 58,
			y: pageHeight - 447,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			borderColor: style.borderColorBlack,
			x: padding + 45,
			y: pageHeight - 447.5
		})
		if (insured.plan == 'Empresarial') {
			page.drawText('X', {
				x: padding + 46.5,
				y: pageHeight - 446,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 70,
			x: padding + 110,
			y: pageHeight - 451
		})
		page.drawText('Familiar', {
			x: padding + 128,
			y: pageHeight - 447,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			borderColor: style.borderColorBlack,
			x: padding + 115,
			y: pageHeight - 447.5
		})
		if (insured.plan == 'Familiar') {
			page.drawText('X', {
				x: padding + 116.5,
				y: pageHeight - 446,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 70,
			x: padding + 180,
			y: pageHeight - 451
		})
		page.drawText('Individual', {
			x: padding + 198,
			y: pageHeight - 447,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			borderColor: style.borderColorBlack,
			x: padding + 185,
			y: pageHeight - 447.5
		})
		if (insured.plan == 'Individual') {
			page.drawText('X', {
				x: padding + 186.5,
				y: pageHeight - 446,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 70,
			x: padding + 248,
			y: pageHeight - 451
		})
		page.drawText('APÓLICE', {
			x: padding + 268,
			y: pageHeight - 447,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 60,
			x: padding + 315,
			y: pageHeight - 451
		})
		page.drawText('Cobre', {
			x: padding + 332,
			y: pageHeight - 447,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			borderColor: style.borderColorBlack,
			x: padding + 320,
			y: pageHeight - 447.5
		})
		if (insured.policy == 'Cobre') {
			page.drawText('X', {
				x: padding + 321.5,
				y: pageHeight - 446,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 60,
			x: padding + 375,
			y: pageHeight - 451
		})
		page.drawText('Prata', {
			x: padding + 391,
			y: pageHeight - 447,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			borderColor: style.borderColorBlack,
			x: padding + 380,
			y: pageHeight - 447.5
		})
		if (insured.policy == 'Prata') {
			page.drawText('X', {
				x: padding + 381.5,
				y: pageHeight - 446,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 60,
			x: padding + 435,
			y: pageHeight - 451
		})
		page.drawText('Ouro', {
			x: padding + 452,
			y: pageHeight - 447,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			borderColor: style.borderColorBlack,
			x: padding + 439,
			y: pageHeight - 447.5
		})
		if (insured.policy == 'Ouro') {
			page.drawText('X', {
				x: padding + 440.5,
				y: pageHeight - 446,
				size: style.fontSizeText
			})
		}

		/* PLANO DO CONSULTÓRIO MEDLOPES - CO-SEGURO SOCIAL */
		makeRectangle({
			page,
			height: 20,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 475
		})
		page.drawText('3. PLANO DO CONSULTÓRIO MEDLOPES - CO-SEGURO SOCIAL', {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 470,
			size: style.fontSizeSubTitle
		})

		makeRectangle({
			page,
			height: 20,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 498
		})
		page.drawText('3.1 CUSTO DOS SERVIÇOS', {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 488,
			size: style.fontSizeText
		})

		const cellHeight = style.cellHeight - 1

		const costServices = [
			['SERVIÇOS', 'PLANO COBRE', 'PLANO PRATA', 'PLANO OURO'],
			['CONSULTA', '50%', '60%', '70%'],
			['EXAMES', '30%', '40%', '50%'],
			['ECOGRAFIAS', '30%', '40%', '50%'],
			['ACTOS', '30%', '45%', '50%']
		]

		for (let row = 0; row < costServices.length; row++) {
			for (let col = 0; col < 4; col++) {
				const text = costServices[row][col]
				const width = col == 0 ? (pageWidth - 100) / 2 : (pageWidth - 101.2) / 5
				const x = padding + col * width + (col == 0 ? 0 : 100)
				const y = pageHeight - (row + 39) * cellHeight

				makeRectangle({
					page,
					width,
					x,
					y
				})
				page.drawText(text, {
					font: row == 0 ? await pdfDoc.embedFont(style.fontBold) : undefined,
					x: x + 5,
					y: y + 5,
					size: style.fontSizeText
				})
			}
		}

		makeRectangle({
			page,
			height: 20,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 582
		})
		page.drawText('3.2 PLANO DE CO-SEGURO SOCIAL', {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 572,
			size: style.fontSizeText
		})
		const coInsuranceServices = [
			['SERVIÇOS', 'PLANO COBRE', 'PLANO PRATA', 'PLANO OURO'],
			['INTERNAMENTO', 'SEM COBERTURA', 'SEM COBERTURA', 'SEM COBERTURA'],
			['DESCONTOS EM MEDICAMENTOS', '1%', '5%', '10%'],
			['DESCONTOS NAS CONSULTAS DE URGÊNCIA', '1%', '5%', '10%'],
			['CO-PARTICIPAÇÃO', '3 500,00', '2 000,00', '1 500,00'],
			['PRAZO DE CARÊNCIA', '30 DIAS', '15 DIAS', '5 DIAS ÚTEIS'],
			['IDADE: 0 À 18', '5 000,00', '7 500,00', '10 000,00'],
			['IDADE: 19 À 29', '7 000,00', '9 500,00', '12 000,00'],
			['IDADE: 30 À 45', '9 000,00', '11 500,00', '14 000,00'],
			['IDADE: 46 À 55', '11 000,00', '13 500,00', '16 000,00'],
			['IDADE: 56 OU +', '13 000,00', '15 500,00', '18 000,00'],
			['RETORNO PELA NÃO UTILIZAÇÃO ', '1,50%', '5%', '10%']
		]

		const coInsuranceServicesCount = coInsuranceServices.length
		for (let row = 0; row < coInsuranceServicesCount; row++) {
			for (let col = 0; col < 4; col++) {
				const text = coInsuranceServices[row][col]
				const width = col == 0 ? (pageWidth - 100) / 2 : (pageWidth - 101.2) / 5
				const x = padding + col * width + (col == 0 ? 0 : 100)
				const y = pageHeight - (row + 45.5) * cellHeight

				makeRectangle({
					page,
					width,
					x,
					y
				})
				page.drawText(text, {
					font:
						row == 0 || row == coInsuranceServicesCount - 1
							? await pdfDoc.embedFont(style.fontBold)
							: undefined,
					x: x + 5,
					y: y + 5,
					size: style.fontSizeText,
					color: row == 2 ? style.colorRed : undefined
				})
			}
		}

		makeRectangle({
			page,
			height: 20,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 758
		})
		page.drawText('3.3 FORMAÇÃO DE GRUPO', {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 747,
			size: style.fontSizeText
		})
		const formationOfGroups = [
			['SERVIÇOS', 'PLANO COBRE', 'PLANO PRATA', 'PLANO OURO'],
			['PACOTE INDIVIDUAL', 'SEM LIMITES', 'SEM LIMITES', 'SEM LIMITES'],
			['PACOTE FAMILIAR', 'SEM LIMITES', 'SEM LIMITES', 'SEM LIMITES'],
			['PACOTE EMPRESARIAL', 'SEM LIMITES', '10 À 25', '26 +']
		]

		const formationCountOfGroups = formationOfGroups.length
		for (let row = 0; row < formationCountOfGroups; row++) {
			for (let col = 0; col < 4; col++) {
				const text = formationOfGroups[row][col]
				const width = col == 0 ? (pageWidth - 100) / 2 : (pageWidth - 101.2) / 5
				const x = padding + col * width + (col == 0 ? 0 : 100)
				const y = pageHeight - (row + 59.1) * cellHeight

				makeRectangle({
					page,
					width,
					x,
					y
				})
				page.drawText(text, {
					font: row == 0 ? await pdfDoc.embedFont(style.fontBold) : undefined,
					x: x + 5,
					y: y + 5,
					size: style.fontSizeText
				})
			}
		}
	}
}
