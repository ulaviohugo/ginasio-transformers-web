<?php

namespace App\Services;

use App\Helpers\FileHelper;
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
			$supplierProducts = is_string($request->supplier_products) ? json_decode($request->supplier_products, 1) : $request->supplier_products;
			$countProducts = count($supplierProducts);

			$userId = User::currentUserId();

			$photo = null;
			if (FileHelper::isUploadable($request->photo)) {
				$photo = FileHelper::uploadBase64($request->photo, 'uploads/suppliers');
			}

			$supplier =	Supplier::create([
				'name' => $request->name,
				'representative' => $request->representative,
				'email' => $request->email,
				'phone' => $request->phone,
				'photo' => $photo,
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
