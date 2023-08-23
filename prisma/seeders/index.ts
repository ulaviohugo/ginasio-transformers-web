import { EmployeeSeeder } from './employee-seeder'
import { LocationSeeder } from './location-seeder'
import { ProductSeeder } from './product-seeders'

export class DBSeeder {
	static async run() {
		await LocationSeeder.run()
		await EmployeeSeeder.run()
		await ProductSeeder.run()
	}
}

DBSeeder.run()
