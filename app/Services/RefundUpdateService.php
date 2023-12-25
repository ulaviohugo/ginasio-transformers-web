<?php

namespace App\Services;

use App\Http\Requests\RefundUpdateRequest;
use App\Models\Refund;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class RefundUpdateService
{
	public function __construct(private RefundService $service)
	{
	}

	public function  execute(RefundUpdateRequest $request, Refund $justification)
	{
		try {
			DB::beginTransaction();
			$request = $this->service->transformData($request);
			$justification->update([
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
				'user_id_update' => User::currentUserId(),
			]);
			$pdfUrl = $this->service->buildPDF($justification);
			$justification->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $justification;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao alterar reembolso.' . $th->getMessage());
		}
	}
}
