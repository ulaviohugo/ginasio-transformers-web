import { CategoryModel, ProductModel } from '../domain/models'

export class ProductUtils {
	static categories(): CategoryModel[] {
		return [
			{ id: 1, name: 'Acessório Feminino', products: this.products(1) },
			{ id: 2, name: 'Bijuteria Feminina', products: this.products(2) },
			{ id: 3, name: 'Calçado Feminino', products: this.products(3) },
			{ id: 4, name: 'Calçado Masculino', products: this.products(4) },
			{ id: 5, name: 'Diversos', products: this.products(5) },
			{ id: 6, name: 'Perfumaria', products: this.products(6) },
			{ id: 7, name: 'Roupa Feminina', products: this.products(7) },
			{ id: 8, name: 'Roupa Masculina', products: this.products(8) }
		] as CategoryModel[]
	}

	static products(categoryId?: number): ProductModel[] {
		const products = [
			//Bijuteria Feminina
			{ id: 1, name: 'Bolsa', price: 50.0, categoryId: 1 },
			//Bijuteria Feminina
			{ id: 2, name: 'Anel', price: 50.0, categoryId: 2 },
			{ id: 3, name: 'Brinco', price: 25.0, categoryId: 2 },
			{ id: 4, name: 'Brinco + Anel', price: 70.0, categoryId: 2 },
			{ id: 5, name: 'Brinco + Colar', price: 60.0, categoryId: 2 },
			{ id: 6, name: 'Brinco + Pulseira', price: 55.0, categoryId: 2 },
			{ id: 7, name: 'Colar', price: 40.0, categoryId: 2 },
			{ id: 8, name: 'Pulseira', price: 30.0, categoryId: 2 },
			{ id: 9, name: 'Tornozeleira', price: 20.0, categoryId: 2 },
			//Calçado Feminino
			{ id: 10, name: 'Havaiana', price: 15.0, categoryId: 3 },
			{ id: 11, name: 'Sandália Alta', price: 45.0, categoryId: 3 },
			{ id: 12, name: 'Sandália Rasa', price: 35.0, categoryId: 3 },
			{ id: 13, name: 'Sapato', price: 55.0, categoryId: 3 },
			{ id: 14, name: 'Tênis Feminino', price: 65.0, categoryId: 3 },
			//Calçado Masculino
			{ id: 15, name: 'Havaiana Masculina', price: 20.0, categoryId: 4 },
			{ id: 16, name: 'Tênis Masculino', price: 70.0, categoryId: 4 },
			//Diversos
			{ id: 17, name: 'Etiqueta Cetim', price: 5.0, categoryId: 5 },
			{ id: 18, name: 'Etiqueta Papel', price: 3.0, categoryId: 5 },
			//Perfumaria
			{ id: 19, name: 'Creme Desodorante', price: 12.0, categoryId: 6 },
			{ id: 20, name: 'Desodorante Corporal', price: 8.0, categoryId: 6 },
			{ id: 21, name: 'Sabonete em Barra', price: 2.5, categoryId: 6 },
			//Roupa Feminina
			{ id: 22, name: 'Blazer Feminino', price: 80.0, categoryId: 7 },
			{ id: 23, name: 'Blusa Feminina', price: 30.0, categoryId: 7 },
			{ id: 24, name: 'Calça Jeans', price: 60.0, categoryId: 7 },
			{ id: 25, name: 'Calça Social', price: 70.0, categoryId: 7 },
			{ id: 26, name: 'Camisa Feminina', price: 40.0, categoryId: 7 },
			{ id: 27, name: 'Camiseta Feminina', price: 20.0, categoryId: 7 },
			{ id: 28, name: 'Fato Social Feminino', price: 150.0, categoryId: 7 },
			//Roupa Masculina
			{ id: 29, name: 'Camisa Masculina', price: 45.0, categoryId: 8 },
			{ id: 30, name: 'Camiseta Masculina', price: 25.0, categoryId: 8 }
		] as ProductModel[]
		return categoryId
			? products.filter((product) => product.categoryId == categoryId)
			: products
	}
}
