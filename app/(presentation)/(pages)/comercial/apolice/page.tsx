'use client'

import { PDFDocument, PDFPage, StandardFonts, rgb } from 'pdf-lib'
import { useEffect, useState } from 'react'

import { Layout, LayoutBody, LogoBase64, SubMenu } from '@/(presentation)/components'
import { DateUtils, SubmenuUtils } from '@/utils'

type RectangleProps = {
	page: PDFPage
	x: number
	y: number
	width: number
	height?: number
}

type InsuredProps = {
	name: string
	gender: 'Masculino' | 'Feminino'
	maritalStatus: string
	cardName: string
	birthday: Date
	documentNumber: string
	documentIssueDate: Date
	nif: string
	dependents: number
	occupation: string
	address: string
	neighborhood: string
	province: string
	municipality: string
	email: string
	phone: string
	comercial: string
	enrollmentDate: Date
	lastAutoRenewDate: Date
	plan: 'Empresarial' | 'Familiar' | 'Individual'
	policy: 'Cobre' | 'Prata' | 'Ouro'
}

type FormDataProps = {
	mediator: string
	policyNumber: string
	proposalNumber: string
	proposalType: 'Novo Co-Seguro' | 'Alteração do Plano'
	assistedBy: string
	assistedAt: Date
	proposalCurrency: string
}

export default function Apolice() {
	const [pdfData, setPdfData] = useState<string | null>(null)

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

	const insured: InsuredProps = {
		name: 'Josué Agostinho Cabral Simões',
		gender: 'Masculino',
		maritalStatus: 'Solteiro (a)',
		occupation: 'Engenheiro Informático',
		dependents: 4,
		cardName: 'Josué Simões',
		birthday: currentDate,
		documentNumber: '001322548LA035',
		documentIssueDate: currentDate,
		nif: '001322548LA035',
		address: 'Coreia',
		neighborhood: 'Ingombotas',
		province: 'Luanda',
		municipality: 'Luanda',
		email: 'joel@gmail.com',
		phone: '923 123 123',
		comercial: 'Paulo Vieira',
		enrollmentDate: currentDate,
		lastAutoRenewDate: currentDate,
		plan: 'Empresarial',
		policy: 'Ouro'
	}

	useEffect(() => {
		generatePDF()
	}, [])

	const generatePDF = async () => {
		const pdfDoc = await PDFDocument.create()

		const style = {
			fontSizeTitle: 12,
			fontSizeSubTitle: 10,
			fontSizeText: 8,
			borderWidth: 0.1,
			borderColor: rgb(230 / 255, 230 / 255, 230 / 255),
			colorRectangle: rgb(1, 1, 1),
			colorRed: rgb(1, 1 / 3, 1 / 3),
			fontItalic: await pdfDoc.embedFont(StandardFonts.HelveticaOblique),
			fontBold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
			heightCell: 16
		}

		const makeRectangle = ({
			page,
			height = style.heightCell,
			width,
			x,
			y
		}: RectangleProps) => {
			page.drawRectangle({
				x,
				y,
				width,
				height,
				borderColor: style.borderColor,
				borderWidth: style.borderWidth,
				color: style.colorRectangle
			})
		}

		const padding = 50
		const pageHeight = 842
		const pageWidth = 595
		const pageSize = [pageWidth, pageHeight] as any

		const page = pdfDoc.addPage(pageSize)

		const imageLogo = await pdfDoc.embedPng(LogoBase64)

		/* HEADER */
		page.drawImage(imageLogo, { x: padding, y: pageHeight - 89, width: 89, height: 64 })

		makeRectangle({
			page,
			height: 25,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 125
		})
		page.drawText('APÓLICE DE ADESÃO DO CO-SEGURO SOCIAL', {
			font: style.fontBold,
			x: padding + 110,
			y: pageHeight - 118,
			size: style.fontSizeTitle
		})

		makeRectangle({
			page,
			height: 120,
			width: pageWidth / 5,
			x: padding,
			y: pageHeight - 250
		})

		page.drawText('NOTA:', {
			x: padding + 124,
			y: pageHeight - 140,
			size: style.fontSizeText,
			font: style.fontItalic
		})
		page.drawText('Área de preenchimento exclusivo ao Consultório MedLopes', {
			x: padding + 152,
			y: pageHeight - 140,
			size: style.fontSizeText,
			color: style.colorRed,
			font: style.fontItalic
		})

		// PROPOSTA
		makeRectangle({
			page,
			width: 65,
			x: padding + 124,
			y: pageHeight - 163
		})
		page.drawText('PROPOSTA Nº', {
			x: padding + 126,
			y: pageHeight - 158,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 66,
			x: padding + 188,
			y: pageHeight - 163
		})
		page.drawText(formData.proposalNumber, {
			x: padding + 190,
			y: pageHeight - 158,
			size: style.fontSizeText
		})

		// APÓLICE
		makeRectangle({
			page,
			width: 64,
			x: padding + 254,
			y: pageHeight - 163
		})
		page.drawText('APÓLICE Nº', {
			x: padding + 256,
			y: pageHeight - 158,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 65,
			x: padding + 317,
			y: pageHeight - 163
		})
		page.drawText(formData.policyNumber, {
			x: padding + 319,
			y: pageHeight - 158,
			size: style.fontSizeText
		})

		// PROPOSTA
		makeRectangle({
			page,
			width: 120,
			x: padding + 376,
			y: pageHeight - 163
		})
		page.drawText('PROPOSTA DE:', {
			x: padding + 378,
			y: pageHeight - 158,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 120,
			x: padding + 376,
			y: pageHeight - 179
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			x: padding + 380,
			y: pageHeight - 175
		})
		if (formData.proposalType == 'Alteração do Plano') {
			page.drawText('X', {
				x: padding + 381.5,
				y: pageHeight - 174,
				size: style.fontSizeText
			})
		}
		page.drawText('Alteração do Plano', {
			x: padding + 392,
			y: pageHeight - 174,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 120,
			x: padding + 376,
			y: pageHeight - 195
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			x: padding + 380.5,
			y: pageHeight - 191
		})
		if (formData.proposalType == 'Novo Co-Seguro') {
			page.drawText('X', {
				x: padding + 382,
				y: pageHeight - 190,
				size: style.fontSizeText
			})
		}
		page.drawText('Novo Co-Seguro', {
			x: padding + 392,
			y: pageHeight - 190,
			size: style.fontSizeText
		})

		// MEDIADOR
		makeRectangle({
			page,
			width: 65,
			x: padding + 124,
			y: pageHeight - 195
		})
		page.drawText('MEDIADOR (A):', {
			x: padding + 126,
			y: pageHeight - 190,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 188,
			x: padding + 188,
			y: pageHeight - 195
		})
		page.drawText(formData.mediator, {
			x: padding + 190,
			y: pageHeight - 190,
			size: style.fontSizeText
		})

		// ATENDIMENTO
		makeRectangle({
			page,
			width: 110,
			x: padding + 124,
			y: pageHeight - 222
		})
		page.drawText('ATENDIMENTO FEITO POR:', {
			x: padding + 126,
			y: pageHeight - 217,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 145,
			x: padding + 234,
			y: pageHeight - 222
		})
		page.drawText(formData.assistedBy, {
			x: padding + 236,
			y: pageHeight - 217,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 94,
			x: padding + 372,
			y: pageHeight - 222
		})
		page.drawText('MOEDA DE CONTRATO', {
			x: padding + 374,
			y: pageHeight - 217,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 30,
			x: padding + 466,
			y: pageHeight - 222
		})
		page.drawText(formData.proposalCurrency, {
			x: padding + 468,
			y: pageHeight - 217,
			size: style.fontSizeText
		})

		// DATA ATENDIMENTO
		makeRectangle({
			page,
			width: 110,
			x: padding + 124,
			y: pageHeight - 250
		})
		page.drawText('DATA DO ATENDIMENTO:', {
			x: padding + 126,
			y: pageHeight - 245,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 62,
			x: padding + 234,
			y: pageHeight - 250
		})
		page.drawText(String(DateUtils.getDatePt(formData.assistedAt)), {
			x: padding + 236,
			y: pageHeight - 245,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 70,
			x: padding + 284,
			y: pageHeight - 250
		})
		page.drawText('ASSINATURA:', {
			x: padding + 286,
			y: pageHeight - 245,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 148,
			x: padding + 348,
			y: pageHeight - 250
		})

		/* TITULAR DO CO_SEGURO */
		makeRectangle({
			page,
			height: 20,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 275
		})
		page.drawText('1. TITULAR DO CO-SEGURO SOCIAL', {
			font: style.fontBold,
			x: padding + 5,
			y: pageHeight - 270,
			size: style.fontSizeSubTitle
		})

		makeRectangle({
			page,
			width: 90,
			x: padding,
			y: pageHeight - 295
		})
		page.drawText('NOME COMPLETO', {
			x: padding + 5,
			y: pageHeight - 290,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 410,
			x: padding + 85,
			y: pageHeight - 295
		})
		page.drawText(insured.name, {
			x: padding + 87,
			y: pageHeight - 290,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 135,
			x: padding,
			y: pageHeight - 315
		})
		page.drawText('NOME A CONSTAR NO CARTÃO', {
			x: padding + 5,
			y: pageHeight - 310,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 150,
			x: padding + 135,
			y: pageHeight - 315
		})
		page.drawText(insured.cardName, {
			x: padding + 137,
			y: pageHeight - 310,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 200,
			x: padding + 240,
			y: pageHeight - 315
		})
		page.drawText('DATA NASCIMENTO / CONSTITUIÇÃO EMPRESA', {
			x: padding + 242,
			y: pageHeight - 310,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 60,
			x: padding + 435,
			y: pageHeight - 315
		})
		page.drawText(String(DateUtils.getDatePt(insured.birthday)), {
			x: padding + 437,
			y: pageHeight - 310,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: pageWidth / 8,
			x: padding,
			y: pageHeight - 335
		})
		page.drawText('BI/PASSAPORTE', {
			x: padding + 5,
			y: pageHeight - 330,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: pageWidth / 7,
			x: padding + 75,
			y: pageHeight - 335
		})
		page.drawText(insured.documentNumber, {
			x: padding + 77,
			y: pageHeight - 330,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: pageWidth / 7,
			x: padding + 160,
			y: pageHeight - 335
		})
		page.drawText('DATA DE EMISSÃO', {
			x: padding + 165,
			y: pageHeight - 330,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: pageWidth / 7,
			x: padding + 244,
			y: pageHeight - 335
		})
		page.drawText(String(DateUtils.getDatePt(insured.documentIssueDate)), {
			x: padding + 246,
			y: pageHeight - 330,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: pageWidth / 7,
			x: padding + 330,
			y: pageHeight - 335
		})
		page.drawText('CONTRIBUINTE Nº', {
			x: padding + 335,
			y: pageHeight - 330,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: pageWidth / 7,
			x: padding + 410,
			y: pageHeight - 335
		})
		page.drawText(insured.nif, {
			x: padding + 412,
			y: pageHeight - 330,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 30,
			x: padding,
			y: pageHeight - 355
		})
		page.drawText('SEXO', {
			x: padding + 5,
			y: pageHeight - 350,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 60,
			x: padding + 30,
			y: pageHeight - 355
		})
		page.drawText('Feminino', {
			x: padding + 48,
			y: pageHeight - 350,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			x: padding + 35,
			y: pageHeight - 350.5
		})
		if (insured.gender == 'Feminino') {
			page.drawText('X', {
				x: padding + 36.5,
				y: pageHeight - 350,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 70,
			x: padding + 90,
			y: pageHeight - 355
		})
		page.drawText('Masculino', {
			x: padding + 108,
			y: pageHeight - 350,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			x: padding + 95,
			y: pageHeight - 350.5
		})
		if (insured.gender == 'Masculino') {
			page.drawText('X', {
				x: padding + 96.5,
				y: pageHeight - 350,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 115,
			x: padding + 155,
			y: pageHeight - 355
		})
		page.drawText('PROFISSÃO / ACTIVIDADE', {
			x: padding + 157,
			y: pageHeight - 350,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 140,
			x: padding + 265,
			y: pageHeight - 355
		})
		page.drawText(insured.occupation, {
			x: padding + 267,
			y: pageHeight - 350,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 90,
			x: padding + 405,
			y: pageHeight - 355
		})
		page.drawText('DEPENDENTES', {
			x: padding + 407,
			y: pageHeight - 350,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 20,
			x: padding + 475,
			y: pageHeight - 355
		})
		page.drawText(String(insured.dependents), {
			x: padding + 477,
			y: pageHeight - 350,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding,
			y: pageHeight - 375
		})
		page.drawText('ESTADO CIVIL', {
			x: padding + 5,
			y: pageHeight - 370,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 60,
			x: padding + 65,
			y: pageHeight - 375
		})
		page.drawText(String(insured.maritalStatus), {
			x: padding + 67,
			y: pageHeight - 370,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding + 125,
			y: pageHeight - 375
		})
		page.drawText('ENDEREÇO', {
			x: padding + 130,
			y: pageHeight - 370,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 310,
			x: padding + 185,
			y: pageHeight - 375
		})
		page.drawText(String(insured.address), {
			x: padding + 187,
			y: pageHeight - 370,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding,
			y: pageHeight - 395
		})
		page.drawText('BAIRRO', {
			x: padding + 5,
			y: pageHeight - 390,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 65,
			y: pageHeight - 395
		})
		page.drawText(String(insured.neighborhood), {
			x: padding + 67,
			y: pageHeight - 390,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding + 245,
			y: pageHeight - 395
		})
		page.drawText('MUNICÍPIO', {
			x: padding + 250,
			y: pageHeight - 390,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 305,
			y: pageHeight - 395
		})
		page.drawText(String(insured.municipality), {
			x: padding + 307,
			y: pageHeight - 390,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding,
			y: pageHeight - 415
		})
		page.drawText('PROVÍNCIA', {
			x: padding + 5,
			y: pageHeight - 410,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 65,
			y: pageHeight - 415
		})
		page.drawText(String(insured.province), {
			x: padding + 67,
			y: pageHeight - 410,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding + 245,
			y: pageHeight - 415
		})
		page.drawText('E-MAIL', {
			x: padding + 250,
			y: pageHeight - 410,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 305,
			y: pageHeight - 415
		})
		page.drawText(String(insured.email), {
			x: padding + 307,
			y: pageHeight - 410,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding,
			y: pageHeight - 435
		})
		page.drawText('TELEMÓVEL', {
			x: padding + 5,
			y: pageHeight - 430,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 65,
			y: pageHeight - 435
		})
		page.drawText(String(insured.phone), {
			x: padding + 67,
			y: pageHeight - 430,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 65,
			x: padding + 245,
			y: pageHeight - 435
		})
		page.drawText('COMERCIAL', {
			x: padding + 250,
			y: pageHeight - 430,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 190,
			x: padding + 305,
			y: pageHeight - 435
		})
		page.drawText(String(insured.comercial), {
			x: padding + 307,
			y: pageHeight - 430,
			size: style.fontSizeText
		})

		/* DADOS DA APÓLICE DO CO-SEGURO SOCIAL */
		makeRectangle({
			page,
			height: 20,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 460
		})
		page.drawText('2. DADOS DA APÓLICE DO CO-SEGURO SOCIAL', {
			font: style.fontBold,
			x: padding + 5,
			y: pageHeight - 455,
			size: style.fontSizeSubTitle
		})

		makeRectangle({
			page,
			width: 189,
			x: padding,
			y: pageHeight - 480
		})
		page.drawText('DATA DE ADESÃO', {
			x: padding + 5,
			y: pageHeight - 475,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 60,
			x: padding + 185,
			y: pageHeight - 480
		})
		page.drawText(String(DateUtils.getDatePt(insured.enrollmentDate)), {
			x: padding + 197,
			y: pageHeight - 475,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 189,
			x: padding + 245,
			y: pageHeight - 480
		})
		page.drawText('ÚLTIMA DATA DA RENOVAÇÃO AUTOMÁTICA', {
			x: padding + 250,
			y: pageHeight - 475,
			size: style.fontSizeText
		})
		makeRectangle({
			page,
			width: 60,
			x: padding + 435,
			y: pageHeight - 480
		})
		page.drawText(String(DateUtils.getDatePt(insured.lastAutoRenewDate)), {
			x: padding + 437,
			y: pageHeight - 475,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 40,
			x: padding,
			y: pageHeight - 500
		})
		page.drawText('PLANO', {
			x: padding + 5,
			y: pageHeight - 495,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 70,
			x: padding + 40,
			y: pageHeight - 500
		})
		page.drawText('Empresarial', {
			x: padding + 58,
			y: pageHeight - 495,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			x: padding + 45,
			y: pageHeight - 495.5
		})
		if (insured.plan == 'Empresarial') {
			page.drawText('X', {
				x: padding + 46.5,
				y: pageHeight - 495,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 70,
			x: padding + 110,
			y: pageHeight - 500
		})
		page.drawText('Familiar', {
			x: padding + 128,
			y: pageHeight - 495,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			x: padding + 115,
			y: pageHeight - 495.5
		})
		if (insured.plan == 'Familiar') {
			page.drawText('X', {
				x: padding + 116.5,
				y: pageHeight - 495,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 70,
			x: padding + 180,
			y: pageHeight - 500
		})
		page.drawText('Individual', {
			x: padding + 198,
			y: pageHeight - 495,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			x: padding + 185,
			y: pageHeight - 495.5
		})
		if (insured.plan == 'Individual') {
			page.drawText('X', {
				x: padding + 186.5,
				y: pageHeight - 495,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 70,
			x: padding + 248,
			y: pageHeight - 500
		})
		page.drawText('APÓLICE', {
			x: padding + 268,
			y: pageHeight - 495,
			size: style.fontSizeText
		})

		makeRectangle({
			page,
			width: 60,
			x: padding + 315,
			y: pageHeight - 500
		})
		page.drawText('Cobre', {
			x: padding + 332,
			y: pageHeight - 495,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			x: padding + 320,
			y: pageHeight - 495.5
		})
		if (insured.policy == 'Cobre') {
			page.drawText('X', {
				x: padding + 321.5,
				y: pageHeight - 495,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 60,
			x: padding + 375,
			y: pageHeight - 500
		})
		page.drawText('Prata', {
			x: padding + 391,
			y: pageHeight - 495,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			x: padding + 380,
			y: pageHeight - 495.5
		})
		if (insured.policy == 'Prata') {
			page.drawText('X', {
				x: padding + 381.5,
				y: pageHeight - 495,
				size: style.fontSizeText
			})
		}

		makeRectangle({
			page,
			width: 60,
			x: padding + 435,
			y: pageHeight - 500
		})
		page.drawText('Ouro', {
			x: padding + 452,
			y: pageHeight - 495,
			size: style.fontSizeText
		})
		//checkbox
		makeRectangle({
			page,
			height: 8,
			width: 8,
			x: padding + 439,
			y: pageHeight - 495.5
		})
		if (insured.policy == 'Ouro') {
			page.drawText('X', {
				x: padding + 440.5,
				y: pageHeight - 495,
				size: style.fontSizeText
			})
		}

		const pdfBytes = await pdfDoc.save()

		const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })

		const pdfUrl = URL.createObjectURL(pdfBlob)

		setPdfData(pdfUrl)
	}

	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial} />

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
