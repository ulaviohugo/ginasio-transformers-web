<?php

namespace App\Services;

use App\Http\Requests\SalaryReceiptUpdateRequest;
use App\Models\SalaryReceipt;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class SalaryReceiptUpdateService
{
	public function __construct(private SalaryReceiptService $service)
	{
	}

	public function  execute(SalaryReceiptUpdateRequest $request, SalaryReceipt $salaryReceipt)
	{
		try {
			DB::beginTransaction();
			$employee = User::find($request->employee_id);

			$request = $this->service->transformData(request: $request, base_salary: $employee->base_salary);

			$salaryReceipt->update([
				'employee_id' => $request->employee_id,
				'work_days' => $request->work_days,
				'year' => $request->year,
				'month' => $request->month,
				'observation' => $request->observation,
				'base_salary' => $request->base_salary,
				'base_salary_received' => $request->base_salary_received,
				'net_salary' => $request->net_salary,
				'gross_salary' => $request->gross_salary,
				'meal_allowance' => $request->meal_allowance,
				'productivity_allowance' => $request->productivity_allowance,
				'transportation_allowance' => $request->transportation_allowance,
				'family_allowance' => $request->family_allowance,
				'christmas_allowance' => $request->christmas_allowance,
				'holiday_allowance' => $request->holiday_allowance,
				'total_salary_discounts' => $request->total_salary_discounts,
				'inss_discount' => $request->inss_discount,
				'inss_discount_percent' => $request->inss_discount_percent,
				'irt_discount' => $request->irt_discount,
				'irt_discount_percent' => $request->irt_discount_percent,
				'user_id_update' => User::currentUserId(),
			]);

			$salaryReceipt->fresh();

			$salaryInfo = $this->service->buildTable($salaryReceipt);
			$pdfUrl = $this->service->buildPDF($salaryInfo, $salaryReceipt);

			$salaryReceipt->update(['file_path' => $pdfUrl]);
			DB::commit();
			return $salaryReceipt;
		} catch (\Throwable $th) {
			DB::rollBack();
			throw new Exception(message: 'Erro ao alterar processamento de salário.' . $th->getMessage());
		}
	}
}
