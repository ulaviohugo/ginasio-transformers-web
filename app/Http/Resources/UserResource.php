<?php

namespace App\Http\Resources;

use App\Helpers\FileHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		return [
			'id' => $this->id,
			'name' => $this->name,
			'email' => $this->email,
			'photo' => $this->photo ? FileHelper::storageLink($this->photo) : null,
			'gender' => $this->gender,
			'date_of_birth' => $this->date_of_birth,
			'marital_status' => $this->marital_status,
			'document_type' => $this->document_type,
			'document_number' => $this->document_number,
			'nif' => $this->nif,
			'social_security' => $this->social_security,
			'dependents' => $this->dependents,
			'education_degree' => $this->education_degree,
			'phone' => $this->phone,
			'phone2' => $this->phone2,
			'country_id' => $this->country_id,
			'province_id' => $this->province_id,
			'municipality_id' => $this->municipality_id,
			'address' => $this->address,
			'department' => $this->department,
			'position' => $this->position,
			'base_salary' => $this->base_salary,
			'meal_allowance' => $this->meal_allowance,
			'productivity_allowance' => $this->productivity_allowance,
			'transportation_allowance' => $this->transportation_allowance,
			'family_allowance' => $this->family_allowance,
			'hire_date' => $this->hire_date,
			'contract_end_date' => $this->contract_end_date,
			'bank_name' => $this->bank_name,
			'iban' => $this->iban,
			'account_number' => $this->account_number,
			'can_login' => $this->can_login,
			'role' => $this->role,
			'user_name' => $this->user_name,
			'email_verified_at' => $this->email_verified_at,
			'user_id' => $this->user_id,
			'user_id_update' => $this->user_id_update,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
			'gym_id' => $this->gym_id,
		];
	}
}
