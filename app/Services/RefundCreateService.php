<?php

namespace App\Services;

use App\Http\Requests\RefundCreateRequest;
use App\Models\Refund;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class RefundCreateService
{
	public function __construct(private RefundService $service)
	{
	}

	public function  execute(RefundCreateRequest $request)
	{
		try {
			DB::beginTransaction();
			$request = $this->service->transformData($request);
			$refund = Refund::create([
				'customer_id' => $request->customer_id,
				'purchase_date' => $request->purchase_date,
				'category_id' => $request->category_id,
				'product_id' => $request->product_id,
				'phone' => $request->phone,
				'email' => $request->email,
				'province_id' => $request->province_id,
				'municipality_id' => $request->municipality_id,
				'iban' => $request->iban,
				'amount' => $request->amount,
				'description' => $request->description,
				'user_id' => User::currentUserId(),
			]);
			$pdfUrl = $this->service->buildPDF($refund);
			$refund->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $refund;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao processar reembolso.' . $th->getMessage());
		}
	}
}
