<?php

namespace App\Http\Requests;

use App\Helpers\DBHelper;
use App\Models\Insured;
use Illuminate\Validation\Rule;

class InsuredUpdateRequest extends GlobalFormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		$id = request('id');
		$document_type = request('document_type');
		$document_number = request('document_number');
		return [
			'name' => 'required',
			'policyholder_id' => ['nullable', 'numeric', 'gt:0', Rule::exists(Insured::class, 'id')],
			'gender' => 'required',
			'marital_status' => 'required',
			// 'card_name' => 'nullable',
			'card_number' => 'nullable|unique:' . DBHelper::TB_INSUREDS,
			'date_of_birth' => 'required',
			'document_type' => 'required|string',
			'document_number' => [
				'required',
				Rule::unique(Student::class, 'document_number')->ignore($id)->where(function ($query) use ($document_type, $document_number) {
					$query->where('document_type', $document_type)
						->where('document_number', $document_number);
				})
			],
			'document_issue_date' => 'required|date',
			// 'nif' => 'nullable',
			// 'dependents' => '',
			// 'occupation' => '',
			// 'province_id' => '',
			// 'municipality_id' => '',
			'address' => 'required',
			'neighborhood' => 'required',
			'email' => ['nullable', 'email', Rule::unique(Insured::class)->ignore($id)],
			'phone' => 'required',
			// 'phone2' => '',
			// 'comercial' => '',
			'enrollment_date' => 'required|date',
			// 'renewal_date' => '',
			'plan' => 'required',
			'policy' => 'required',
			'proposal_type' => 'required',
			'proposal_number' => 'required',
			// 'proposal_currency' => '',
			// 'mediator' => '',
			// 'policy_number' => '',
			'payment_frequency' => 'required',
			'payment_method' => 'required',
			'student' => 'required',
			'relationship' => 'required',
			// 'review' => '',
		];
	}
}
