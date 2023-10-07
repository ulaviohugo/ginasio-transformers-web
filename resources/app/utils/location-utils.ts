export type CountryProps = {
	id: number
	name: string
	provinces?: ProvinceProps[]
}

export type ProvinceProps = {
	id: number
	name: string
	country_id: number
	municipalities?: MunicipalityProps[]
}

export type MunicipalityProps = {
	id: number
	name: string
	province_id: number
}

export class LocationUtils {
	static countries(): CountryProps[] {
		return [
			{ id: 1, name: 'Angola', provinces: this.provinces(1) },
			{ id: 2, name: 'Brasil', provinces: this.provinces(2) },
			{ id: 3, name: 'China' },
			{ id: 4, name: 'Turquia' }
		]
	}

	static provinces(country_id?: number): ProvinceProps[] {
		const states = [
			//Angola
			{ id: 1, name: 'Bengo', country_id: 1, municipalities: this.municipalities(1) },
			{ id: 2, name: 'Benguela', country_id: 1, municipalities: this.municipalities(2) },
			{ id: 3, name: 'Bié', country_id: 1, municipalities: this.municipalities(3) },
			{ id: 4, name: 'Cabinda', country_id: 1, municipalities: this.municipalities(4) },
			{
				id: 5,
				name: 'Cuando-Cubango',
				country_id: 1,
				municipalities: this.municipalities(5)
			},
			{
				id: 6,
				name: 'Cuanza Norte',
				country_id: 1,
				municipalities: this.municipalities(6)
			},
			{
				id: 7,
				name: 'Cuanza Sul',
				country_id: 1,
				municipalities: this.municipalities(7)
			},
			{ id: 8, name: 'Cunene', country_id: 1, municipalities: this.municipalities(8) },
			{ id: 9, name: 'Huambo', country_id: 1, municipalities: this.municipalities(9) },
			{ id: 10, name: 'Huíla', country_id: 1, municipalities: this.municipalities(10) },
			{ id: 11, name: 'Luanda', country_id: 1, municipalities: this.municipalities(11) },
			{
				id: 12,
				name: 'Lunda Norte',
				country_id: 1,
				municipalities: this.municipalities(12)
			},
			{
				id: 13,
				name: 'Lunda Sul',
				country_id: 1,
				municipalities: this.municipalities(13)
			},
			{ id: 14, name: 'Malanje', country_id: 1, municipalities: this.municipalities(14) },
			{ id: 15, name: 'Moxico', country_id: 1, municipalities: this.municipalities(15) },
			{ id: 16, name: 'Namibe', country_id: 1, municipalities: this.municipalities(16) },
			{ id: 17, name: 'Uíge', country_id: 1, municipalities: this.municipalities(17) },
			{ id: 18, name: 'Zaire', country_id: 1, municipalities: this.municipalities(18) },
			//Brasil
			{ id: 19, name: 'Acre', country_id: 2, municipalities: this.municipalities(19) },
			{ id: 20, name: 'Alagoas', country_id: 2, municipalities: this.municipalities(20) },
			{ id: 21, name: 'Amapá', country_id: 2, municipalities: this.municipalities(21) },
			{
				id: 22,
				name: 'Amazonas',
				country_id: 2,
				municipalities: this.municipalities(22)
			},
			{ id: 23, name: 'Bahia', country_id: 2, municipalities: this.municipalities(23) },
			{ id: 24, name: 'Ceará', country_id: 2, municipalities: this.municipalities(24) },
			{
				id: 25,
				name: 'Distrito Federal',
				country_id: 2,
				municipalities: this.municipalities(25)
			},
			{
				id: 26,
				name: 'Espírito Santo',
				country_id: 2,
				municipalities: this.municipalities(26)
			},
			{ id: 27, name: 'Goiás', country_id: 2, municipalities: this.municipalities(27) },
			{
				id: 28,
				name: 'Maranhão',
				country_id: 2,
				municipalities: this.municipalities(28)
			},
			{
				id: 29,
				name: 'Mato Grosso',
				country_id: 2,
				municipalities: this.municipalities(29)
			},
			{
				id: 30,
				name: 'Mato Grosso do Sul',
				country_id: 2,
				municipalities: this.municipalities(30)
			},
			{
				id: 31,
				name: 'Minas Gerais',
				country_id: 2,
				municipalities: this.municipalities(31)
			},
			{ id: 32, name: 'Pará', country_id: 2, municipalities: this.municipalities(32) },
			{ id: 33, name: 'Paraíba', country_id: 2, municipalities: this.municipalities(33) },
			{ id: 34, name: 'Paraná', country_id: 2, municipalities: this.municipalities(34) },
			{
				id: 35,
				name: 'Pernambuco',
				country_id: 2,
				municipalities: this.municipalities(35)
			},
			{ id: 36, name: 'Piauí', country_id: 2, municipalities: this.municipalities(36) },
			{
				id: 37,
				name: 'Rio de Janeiro',
				country_id: 2,
				municipalities: this.municipalities(37)
			},
			{
				id: 38,
				name: 'Rio Grande do Norte',
				country_id: 2,
				municipalities: this.municipalities(38)
			},
			{
				id: 39,
				name: 'Rio Grande do Sul',
				country_id: 2,
				municipalities: this.municipalities(39)
			},
			{
				id: 40,
				name: 'Rondônia',
				country_id: 2,
				municipalities: this.municipalities(40)
			},
			{ id: 41, name: 'Roraima', country_id: 2, municipalities: this.municipalities(41) },
			{
				id: 42,
				name: 'Santa Catarina',
				country_id: 2,
				municipalities: this.municipalities(42)
			},
			{
				id: 43,
				name: 'São Paulo',
				country_id: 2,
				municipalities: this.municipalities(43)
			},
			{ id: 44, name: 'Sergipe', country_id: 2, municipalities: this.municipalities(44) },
			{
				id: 45,
				name: 'Tocantins',
				country_id: 2,
				municipalities: this.municipalities(45)
			}
		] as ProvinceProps[]

		return country_id
			? states.filter((province) => province.country_id == country_id)
			: states
	}

	static municipalities(province_id?: number): MunicipalityProps[] {
		const municipalities = [
			//Província do Bengo
			{ id: 1, name: 'Ambriz', province_id: 1 },
			{ id: 2, name: 'Dande', province_id: 1 },
			{ id: 3, name: 'Icolo e Bengo', province_id: 1 },
			{ id: 4, name: 'Muxima', province_id: 1 },
			{ id: 5, name: 'Nambuangongo', province_id: 1 },
			//Provincia de Benguela
			{ id: 6, name: 'Bocoio', province_id: 2 },
			{ id: 7, name: 'Lobito', province_id: 2 },
			{ id: 8, name: 'Bolongo', province_id: 2 },
			{ id: 9, name: 'Ganda', province_id: 2 },
			{ id: 10, name: 'Cubal', province_id: 2 },
			{ id: 11, name: 'Caiambambo', province_id: 2 },
			{ id: 12, name: 'Benguela', province_id: 2 },
			{ id: 13, name: 'Baía farta', province_id: 2 },
			{ id: 14, name: 'Chongoroi', province_id: 2 },
			{ id: 15, name: 'Porto de Benguela', province_id: 2 },
			//Provincia do Bié
			{ id: 16, name: 'Kuito', province_id: 3 },
			{ id: 17, name: 'Andulo', province_id: 3 },
			{ id: 18, name: 'Nharea', province_id: 3 },
			{ id: 19, name: 'Cuemba', province_id: 3 },
			{ id: 20, name: 'Cunhinga', province_id: 3 },
			{ id: 21, name: 'Catabola', province_id: 3 },
			{ id: 22, name: 'Camacupa', province_id: 3 },
			{ id: 23, name: 'Chinguar', province_id: 3 },
			{ id: 24, name: 'Chitembo', province_id: 3 },
			//Provincia de Cabinda
			{ id: 25, name: 'Cabinda', province_id: 4 },
			{ id: 26, name: 'Cacongo', province_id: 4 },
			{ id: 27, name: 'Buco-zau', province_id: 4 },
			{ id: 28, name: 'Belize', province_id: 4 },
			{ id: 29, name: '4 de Fevereiro', province_id: 4 },
			{ id: 30, name: 'Porto de Cabinda', province_id: 4 },
			{ id: 31, name: 'Fútila', province_id: 4 },
			{ id: 32, name: 'Deolinda Rodrigues', province_id: 4 },
			{ id: 33, name: 'Simulambuco', province_id: 4 },
			//Provincia do Cunene
			{ id: 34, name: 'Ondjiva', province_id: 5 },
			{ id: 35, name: 'Cuanhama', province_id: 5 },
			{ id: 36, name: 'Ombanja', province_id: 5 },
			{ id: 37, name: 'Cuvelai', province_id: 5 },
			{ id: 38, name: 'Curoca', province_id: 5 },
			{ id: 39, name: 'Cahama', province_id: 5 },
			{ id: 40, name: 'Namacunde', province_id: 5 },
			{ id: 41, name: 'Santa Clara', province_id: 5 },
			//Provincia da Huambo
			{ id: 42, name: 'Huambo', province_id: 6 },
			{ id: 43, name: 'Londuimbale', province_id: 6 },
			{ id: 44, name: 'Bailundo', province_id: 6 },
			{ id: 45, name: 'Mungo', province_id: 6 },
			{ id: 46, name: 'Tchindjenje', province_id: 6 },
			{ id: 47, name: 'Ucuma', province_id: 6 },
			{ id: 48, name: 'Ekuma', province_id: 6 },
			{ id: 49, name: 'Tichicala-Tcholoanga', province_id: 6 },
			{ id: 50, name: 'Catchiungo', province_id: 6 },
			{ id: 51, name: 'Longongo', province_id: 6 },
			{ id: 52, name: 'Caála', province_id: 6 },
			{ id: 53, name: 'Av. da República', province_id: 6 },
			//Provincia da Huambo
			{ id: 54, name: 'Quilengues', province_id: 7 },
			{ id: 55, name: 'Lubango', province_id: 7 },
			{ id: 56, name: 'Humpata', province_id: 7 },
			{ id: 57, name: 'Chibia', province_id: 7 },
			{ id: 58, name: 'Chiange', province_id: 7 },
			{ id: 59, name: 'Quipungo', province_id: 7 },
			{ id: 60, name: 'Caluquembe', province_id: 7 },
			{ id: 61, name: 'Cacomba', province_id: 7 },
			{ id: 62, name: 'Chicomba', province_id: 7 },
			{ id: 63, name: 'Matala', province_id: 7 },
			{ id: 64, name: 'Jamba Mineira', province_id: 7 },
			{ id: 65, name: 'Chipindo', province_id: 7 },
			{ id: 66, name: 'Kuvango', province_id: 7 },
			//Provincia do Cuando-Cubango
			{ id: 67, name: 'Menongue', province_id: 8 },
			{ id: 68, name: 'Chuito Cuanavale', province_id: 8 },
			{ id: 69, name: 'Cuchi', province_id: 8 },
			{ id: 70, name: 'Cuangar', province_id: 8 },
			{ id: 71, name: 'Longa', province_id: 8 },
			{ id: 72, name: 'Mavinga', province_id: 8 },
			{ id: 73, name: 'Calai', province_id: 8 },
			{ id: 74, name: 'Dirico', province_id: 8 },
			{ id: 75, name: 'Rivungo', province_id: 8 },
			//Provincia do Cuando-Cubango
			{ id: 76, name: 'Cazengo', province_id: 9 },
			{ id: 77, name: 'Lucala', province_id: 9 },
			{ id: 78, name: 'Ambaca', province_id: 9 },
			{ id: 79, name: 'Golungo Alto', province_id: 9 },
			{ id: 80, name: 'Dembos', province_id: 9 },
			{ id: 81, name: 'Bula Atumba', province_id: 9 },
			{ id: 82, name: 'Cambambe', province_id: 9 },
			{ id: 83, name: 'Quiculungo', province_id: 9 },
			{ id: 84, name: 'Bolongongo', province_id: 9 },
			{ id: 85, name: 'Banga', province_id: 9 },
			{ id: 86, name: 'Samba Cajú', province_id: 9 },
			{ id: 87, name: 'Gonguembo', province_id: 9 },
			{ id: 88, name: 'Pango Alúque', province_id: 9 },
			{ id: 89, name: "N'Dalatando", province_id: 9 },
			//Provincia do Cuando-Sul
			{ id: 90, name: 'Sumbe', province_id: 10 },
			{ id: 91, name: 'Porto Amboim', province_id: 10 },
			{ id: 92, name: 'Quibala', province_id: 10 },
			{ id: 93, name: 'Libolo', province_id: 10 },
			{ id: 94, name: 'Mussende', province_id: 10 },
			{ id: 95, name: 'Amboim', province_id: 10 },
			{ id: 96, name: 'Conda', province_id: 10 },
			{ id: 97, name: 'Ebo', province_id: 10 },
			{ id: 98, name: 'Quilenda', province_id: 10 },
			{ id: 99, name: 'Waku Kungo', province_id: 10 },
			{ id: 100, name: 'Seles', province_id: 10 },
			{ id: 101, name: 'Cassongue', province_id: 10 },
			//Provincia de Luanda
			{ id: 102, name: 'Sambinzanga', province_id: 11 },
			{ id: 103, name: 'São Paulo', province_id: 11 },
			{ id: 104, name: 'Comandante Valódia', province_id: 11 },
			{ id: 105, name: 'Combatentes', province_id: 11 },
			{ id: 106, name: 'São Pedro da Barra', province_id: 11 },
			{ id: 107, name: 'Porto Pesqueiro', province_id: 11 },
			{ id: 108, name: 'Boa Vista', province_id: 11 },
			{ id: 109, name: 'Petrangol', province_id: 11 },
			{ id: 110, name: 'Uíge', province_id: 11 },
			{ id: 111, name: 'Kwanzas', province_id: 11 },
			{ id: 112, name: 'Ngola Kiluange', province_id: 11 },
			{ id: 113, name: 'Miramar', province_id: 11 },
			{ id: 114, name: 'Marçal', province_id: 11 },
			{ id: 115, name: 'Bairro dos Ossos', province_id: 11 },
			{ id: 116, name: 'Bairro Operário', province_id: 11 },
			{ id: 117, name: 'Rangel', province_id: 11 },
			{ id: 118, name: 'Nelito Soares', province_id: 11 },
			{ id: 119, name: 'Vila Alice', province_id: 11 },
			{ id: 120, name: 'Maculusso', province_id: 11 },
			{ id: 121, name: 'Precol', province_id: 11 },
			{ id: 122, name: 'Tunga Ngó', province_id: 11 },
			{ id: 123, name: 'Bairro Popular', province_id: 11 },
			{ id: 124, name: 'Cidadela', province_id: 11 },
			{ id: 125, name: 'BS', province_id: 11 },
			{ id: 126, name: 'CS', province_id: 11 },
			{ id: 127, name: 'Cruzeiro', province_id: 11 },
			{ id: 128, name: 'Kinaxixi', province_id: 11 },
			{ id: 129, name: 'Chicala I', province_id: 11 },
			{ id: 130, name: 'Chicala II', province_id: 11 },
			{ id: 131, name: 'Mutamba', province_id: 11 },
			{ id: 132, name: 'Balizão', province_id: 11 },
			{ id: 133, name: 'Margial', province_id: 11 },
			{ id: 134, name: 'Coqueiros', province_id: 11 },
			{ id: 135, name: 'Ilha de Luanda', province_id: 11 },
			{ id: 136, name: 'Baía de Luanda', province_id: 11 },
			{ id: 137, name: 'Mussulo', province_id: 11 },
			{ id: 138, name: 'Benfica', province_id: 11 },
			{ id: 139, name: 'Cacuaco', province_id: 11 },
			{ id: 140, name: 'Cimangola', province_id: 11 },
			{ id: 141, name: 'Kikolo', province_id: 11 },
			{ id: 142, name: 'Kifangondo', province_id: 11 },
			{ id: 143, name: 'Panguila', province_id: 11 },
			{ id: 144, name: 'Maluéka', province_id: 11 },
			{ id: 145, name: 'Mulenvos', province_id: 11 },
			{ id: 146, name: 'Sequele', province_id: 11 },
			{ id: 147, name: 'Vidrul', province_id: 11 },
			{ id: 148, name: 'Bairro da Funda', province_id: 11 },
			{ id: 149, name: 'Viana', province_id: 11 },
			{ id: 150, name: 'Vila de Viana', province_id: 11 },
			{ id: 151, name: 'BCA', province_id: 11 },
			{ id: 152, name: 'Robaldina', province_id: 11 },
			{ id: 153, name: 'Km 30', province_id: 11 },
			{ id: 154, name: 'Luanda Sul', province_id: 11 },
			{ id: 155, name: 'Estalagem', province_id: 11 },
			{ id: 156, name: 'Bairro Huambo', province_id: 11 },
			{ id: 157, name: 'Grafanil', province_id: 11 },
			{ id: 158, name: 'Zango I', province_id: 11 },
			{ id: 159, name: 'Zango II', province_id: 11 },
			{ id: 160, name: 'Zango III', province_id: 11 },
			{ id: 161, name: 'Zango IV', province_id: 11 },
			{ id: 162, name: 'Zango 5000', province_id: 11 },
			{ id: 163, name: 'Zango 8000', province_id: 11 },
			{ id: 164, name: 'Vila Pacífica', province_id: 11 },
			{ id: 165, name: 'Calumbo', province_id: 11 },
			{ id: 166, name: 'Vila Flor', province_id: 11 },
			{ id: 167, name: 'Mabor', province_id: 11 },
			{ id: 168, name: 'Catambor', province_id: 11 },
			{ id: 169, name: 'Sapú', province_id: 11 },
			{ id: 170, name: 'Kicuxi', province_id: 11 },
			{ id: 171, name: 'Gamek', province_id: 11 },
			{ id: 172, name: 'Gamek a Direita', province_id: 11 },
			{ id: 173, name: 'Cazenga', province_id: 11 },
			{ id: 174, name: 'Hoji Ya Henda', province_id: 11 },
			{ id: 175, name: 'Cuca', province_id: 11 },
			{ id: 176, name: 'Nocal', province_id: 11 },
			{ id: 177, name: 'Sonefe', province_id: 11 },
			{ id: 178, name: 'Asa Branca', province_id: 11 },
			{ id: 179, name: 'Tala Hadi', province_id: 11 },
			{ id: 180, name: 'Socola', province_id: 11 },
			{ id: 181, name: '11 de Novembro', province_id: 11 },
			{ id: 182, name: 'Filda', province_id: 11 },
			{ id: 183, name: 'Samba', province_id: 11 },
			{ id: 184, name: 'Catintón', province_id: 11 },
			{ id: 185, name: 'Corimba', province_id: 11 },
			{ id: 186, name: 'Talatona', province_id: 11 },
			{ id: 187, name: 'Nova Vida', province_id: 11 },
			{ id: 188, name: 'Futungo do Belas', province_id: 11 },
			{ id: 189, name: 'Morro Bento', province_id: 11 },
			{ id: 190, name: 'Ramiros', province_id: 11 },
			{ id: 191, name: 'Morro da Luz', province_id: 11 },
			{ id: 192, name: 'Rocha Pinto', province_id: 11 },
			{ id: 193, name: 'Antigo Controle', province_id: 11 },
			{ id: 194, name: 'Multiperfil', province_id: 11 },
			{ id: 195, name: 'Cassenda', province_id: 11 },
			{ id: 196, name: 'Martíres do Kifangondo', province_id: 11 },
			{ id: 197, name: 'Pretrofe', province_id: 11 },
			{ id: 198, name: 'Codeme', province_id: 11 },
			{ id: 199, name: 'Prenda', province_id: 11 },
			{ id: 200, name: 'Alvalade', province_id: 11 },
			{ id: 201, name: 'Zamba 2', province_id: 11 },
			{ id: 202, name: 'Coreia', province_id: 11 },
			{ id: 203, name: 'Bairro Azul', province_id: 11 },
			{ id: 204, name: 'Nova Marginal', province_id: 11 },
			{ id: 205, name: '1º de Maio', province_id: 11 },
			{ id: 206, name: 'Sagrada Família', province_id: 11 },
			{ id: 207, name: 'Chabá', province_id: 11 },
			{ id: 208, name: 'Kilamba Kiaxi', province_id: 11 },
			{ id: 209, name: 'Centralidade do Kilamba', province_id: 11 },
			{ id: 210, name: 'Centralidade KK 5000', province_id: 11 },
			{ id: 211, name: 'Centralidade do Sequele', province_id: 11 },
			{ id: 212, name: 'Palanca', province_id: 11 },
			{ id: 213, name: 'Golf 1', province_id: 11 },
			{ id: 214, name: 'Golf ii', province_id: 11 },
			{ id: 215, name: 'Calemba', province_id: 11 },
			{ id: 216, name: 'Calemba II', province_id: 11 },
			{ id: 217, name: 'Camama', province_id: 11 },
			{ id: 218, name: 'Catete', province_id: 11 },
			{ id: 219, name: 'Bom Jesus', province_id: 11 },
			{ id: 220, name: 'Maianga', province_id: 11 },
			{ id: 221, name: 'Ingombota', province_id: 11 },
			//Província de Lunda Norte
			{ id: 222, name: 'Lucapa', province_id: 12 },
			{ id: 223, name: 'Tchitato', province_id: 12 },
			{ id: 224, name: 'Cambulo', province_id: 12 },
			{ id: 225, name: 'Chitato', province_id: 12 },
			{ id: 226, name: 'Cuilo', province_id: 12 },
			{ id: 227, name: 'Cangula', province_id: 12 },
			{ id: 228, name: 'Cuango', province_id: 12 },
			{ id: 229, name: 'Capenda Camulemba', province_id: 12 },
			{ id: 230, name: 'Xá Muteba', province_id: 12 },
			//Província de Lunda Sul
			{ id: 231, name: 'Saurimo', province_id: 13 },
			{ id: 232, name: 'Dala', province_id: 13 },
			{ id: 233, name: 'Muconda', province_id: 13 },
			{ id: 234, name: 'Cacolo', province_id: 13 },
			//Província de Malange
			{ id: 235, name: 'Malange', province_id: 14 },
			{ id: 236, name: 'Massango', province_id: 14 },
			{ id: 237, name: 'Marimba', province_id: 14 },
			{ id: 238, name: 'Calandula', province_id: 14 },
			{ id: 239, name: 'Caombo', province_id: 14 },
			{ id: 240, name: 'Cuanda-Dia-Baza', province_id: 14 },
			{ id: 241, name: 'Cacuzo', province_id: 14 },
			{ id: 242, name: 'Cuaba Nzoge', province_id: 14 },
			{ id: 243, name: 'Quela', province_id: 14 },
			{ id: 244, name: 'Mucari', province_id: 14 },
			{ id: 245, name: 'Cangandala', province_id: 14 },
			{ id: 246, name: 'Cambundi-Catembo', province_id: 14 },
			{ id: 247, name: 'Luquembo', province_id: 14 },
			{ id: 248, name: 'Quirima', province_id: 14 },
			{ id: 249, name: 'Quale', province_id: 14 },
			//Província de Moxico
			{ id: 250, name: 'Luena', province_id: 15 },
			{ id: 251, name: 'Moxico', province_id: 15 },
			{ id: 252, name: 'Camanongue', province_id: 15 },
			{ id: 253, name: 'Léua', province_id: 15 },
			{ id: 254, name: 'Luau', province_id: 15 },
			{ id: 255, name: 'Cameia', province_id: 15 },
			{ id: 256, name: 'Lucano', province_id: 15 },
			{ id: 257, name: 'Alto Zambeze', province_id: 15 },
			{ id: 258, name: 'Luchazes', province_id: 15 },
			{ id: 259, name: 'Bundas', province_id: 15 },
			//Província de Namibe
			{ id: 260, name: 'Namibe', province_id: 16 },
			{ id: 261, name: 'Camacuio', province_id: 16 },
			{ id: 262, name: 'Bibala', province_id: 16 },
			{ id: 263, name: 'Virei', province_id: 16 },
			{ id: 264, name: 'Tombwa', province_id: 16 },
			//Província de Uíge
			{ id: 265, name: 'Zombo', province_id: 17 },
			{ id: 266, name: 'Quimbele', province_id: 17 },
			{ id: 267, name: 'Damba', province_id: 17 },
			{ id: 268, name: 'Mucaba', province_id: 17 },
			{ id: 269, name: 'Macocola', province_id: 17 },
			{ id: 270, name: 'Bembe', province_id: 17 },
			{ id: 271, name: 'Songo', province_id: 17 },
			{ id: 272, name: 'Buengas', province_id: 17 },
			{ id: 273, name: 'Sanza Pombo', province_id: 17 },
			{ id: 274, name: 'Ambuíla', province_id: 17 },
			{ id: 275, name: 'Uíge', province_id: 17 },
			{ id: 276, name: 'Negage', province_id: 17 },
			{ id: 277, name: 'Puri', province_id: 17 },
			{ id: 278, name: 'Alto Cauale', province_id: 17 },
			{ id: 279, name: 'Quitexe', province_id: 17 },
			//Província do Zaire
			{ id: 280, name: "M'Banza Congo", province_id: 18 },
			{ id: 281, name: 'Soyo', province_id: 18 },
			{ id: 282, name: 'Nzeto', province_id: 18 },
			{ id: 283, name: 'Cuimba', province_id: 18 },
			{ id: 284, name: 'Noqui', province_id: 18 },
			{ id: 285, name: 'Tomboco', province_id: 18 },
			//Bahia
			{ id: 286, name: 'Salvador', province_id: 23 },
			{ id: 287, name: 'Curitiba', province_id: 34 },

			{ id: 288, name: 'São Paulo', province_id: 43 },
			{ id: 289, name: 'Diadema', province_id: 43 },
			{ id: 290, name: 'Campinas', province_id: 43 },
			{ id: 291, name: 'Pinheiros', province_id: 43 },
			{ id: 292, name: 'Cambuci', province_id: 43 },
			{ id: 293, name: 'São José dos Campos', province_id: 43 },
			{ id: 294, name: 'São Gonçalo', province_id: 43 },
			{ id: 295, name: 'São Bernado', province_id: 43 },
			{ id: 296, name: 'São Caetano', province_id: 43 }
		] as MunicipalityProps[]

		return province_id
			? municipalities.filter((municipality) => municipality.province_id == province_id)
			: municipalities
	}
}
