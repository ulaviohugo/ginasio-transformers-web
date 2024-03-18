<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Models\User;
use Illuminate\Http\Request;

class UserCreateService
{
	public function execute(Request $request)
	{
		$userId = User::currentUserId();
		$canLogin = $request->can_login == true || $request->can_login == "true";
		$photo = null;
		if (FileHelper::isUploadable($request->photo)) {
			$photo = FileHelper::uploadBase64($request->photo, 'uploads/employees');
		}
		$user =	User::create([
			'name' => trim($request->name),
			'email' => trim($request->email) ? trim(strtolower($request->email)) : null,
			'photo' => $photo,
			'gender' => $request->gender,
			'date_of_birth' => $request->date_of_birth,
			'marital_status' => $request->marital_status,
			'document_type' => $request->document_type,
			'document_number' => $request->document_number,
			'nif' => $request->nif ?? null,
			'social_security' => $request->social_security ?? null,
			'dependents' => $request->dependents ?? null,
			'education_degree' => $request->education_degree,
			'phone' => $request->phone,
			'phone2' => $request->phone2 ?? null,
			'country_id' => $request->country_id,
			'province_id' => $request->province_id,
			'municipality_id' => $request->municipality_id,
			'address' => $request->address,
			'department' => $request->department,
			'position' => $request->position,
			'base_salary' => $request->base_salary,
			'meal_allowance' => $request->meal_allowance,
			'productivity_allowance' => $request->productivity_allowance,
			'transportation_allowance' => $request->transportation_allowance,
			'family_allowance' => $request->family_allowance,
			'hire_date' => $request->hire_date,
			'contract_end_date' => $request->contract_end_date,
			'bank_name' => $request->bank_name,
			'gym_id' => $request->gym_id,
			'iban' => $request->iban ?? null,
			'account_number' => $request->account_number ?? null,
			'can_login' => $canLogin,
			'role' => $canLogin ? $request->role : null,
			'user_name' => $canLogin ? $request->user_name : null,
			'password' => $canLogin ? $request->password : null,
			'user_id' => $userId,
		]);
		return $user;
	}
}
