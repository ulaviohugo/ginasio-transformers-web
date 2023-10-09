<?php

namespace App\Services;

use App\Models\Supplier;
use App\Models\SupplierProduct;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SupplierCreateService
{
	public function execute(Request $request)
	{
		try {
			DB::beginTransaction();
			$supplierProducts = $request->supplier_products;
			$countProducts = count($supplierProducts);

			$userId = User::currentUserId();

			$supplier =	Supplier::create([
				'name' => $request->name,
				'representative' => $request->representative,
				'email' => $request->email,
				'phone' => $request->phone,
				'photo' => $request->photo,
				'country_id' => $request->country_id,
				'province_id' => $request->province_id,
				'municipality_id' => $request->municipality_id,
				'address' => $request->address,
				'user_id' => $userId,
			]);

			for ($i = 0; $i < $countProducts; $i++) {
				$supplierProducts[$i]['supplier_id'] = $supplier->id;
			}
			SupplierProduct::insert($supplierProducts);
			DB::commit();
			return $supplier;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw $th;
		}
	}
}
