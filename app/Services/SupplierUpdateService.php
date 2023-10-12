<?php

namespace App\Services;

use App\Models\Supplier;
use App\Models\SupplierProduct;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SupplierUpdateService
{
	public function execute(Request $request, Supplier $supplier)
	{
		try {
			DB::beginTransaction();
			$userId = User::currentUserId();
			$supplierProducts = is_string($request->supplier_products) ? json_decode($request->supplier_products, 1) : $request->supplier_products;
			$countProducts = count($supplierProducts);

			$supplier->name = $request->name;
			$supplier->representative = $request->representative;
			$supplier->email = $request->email;
			$supplier->phone = $request->phone;
			$supplier->photo = $request->photo;
			$supplier->country_id = $request->country_id;
			$supplier->province_id = $request->province_id;
			$supplier->municipality_id = $request->municipality_id;
			$supplier->address = $request->address;
			$supplier->user_id_update = $userId;

			if ($countProducts) {
				$this->insertProducts($supplierProducts, $supplier->id);
			}

			DB::commit();
			return $supplier;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw $th;
		}
	}

	private function insertProducts(array $supplierProducts, $supplierId)
	{
		//Retrieve products id from request
		$productsId = (array) collect($supplierProducts)->pluck('product_id');

		//Retrieve supplier products
		$productsInDB = SupplierProduct::where('supplier_id', $supplierId)
			->whereIn('product_id', $productsId);
		$productsIdInDB = (array) $productsInDB->pluck('product_id');

		//Filter product to insert
		$productsToInsert = (array) collect($supplierProducts)->filter(function ($item, $i) use ($productsIdInDB) {
			return !in_array($item['product_id'], $productsIdInDB);
		});
		$countProductsToInsert = count($productsToInsert);

		//Delete supplier products from data base
		SupplierProduct::where('supplier_id', $supplierId)
			->whereNotIn('product_id', $productsId)
			->delete();

		//Add supplier id on products to insert on DB
		for ($i = 0; $i < $countProductsToInsert; $i++) {
			$productsToInsert[$i]['supplier_id'] = $supplierId;
		}

		//Insert products
		if ($countProductsToInsert) {
			SupplierProduct::insert($productsToInsert);
		}
	}
}
