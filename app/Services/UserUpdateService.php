<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Models\User;
use Illuminate\Http\Request;

class UserUpdateService
{
	public function execute(Request $request, User $user)
	{
		$userId = User::currentUserId();

		if (FileHelper::isUploadable($request->photo)) {
			$photo = FileHelper::uploadBase64($request->photo, 'uploads/employees');
			if ($user->photo) {
				FileHelper::delete($user->photo);
			}
			$user->photo = $photo;
		}

		$canLogin = $request->can_login == true || $request->can_login == "true";
		$user->name = trim($request->name);
		$user->email = trim(strtolower($request->email));
		$user->gender = $request->gender;
		$user->date_of_birth = $request->date_of_birth;
		$user->marital_status = $request->marital_status;
		$user->document_type = $request->document_type;
		$user->document_number = $request->document_number;
		$user->nif = $request->nif;
		$user->social_security = $request->social_security;
		$user->dependents = $request->dependents;
		$user->education_degree = $request->education_degree;
		$user->phone = $request->phone;
		$user->phone2 = $request->phone2;
		$user->country_id = $request->country_id;
		$user->province_id = $request->province_id;
		$user->municipality_id = $request->municipality_id;
		$user->address = $request->address;
		$user->position = $request->position;
		$user->base_salary = $request->base_salary;

		$user->meal_allowance = $request->meal_allowance;
		$user->productivity_allowance = $request->productivity_allowance;
		$user->transportation_allowance = $request->transportation_allowance;
		$user->family_allowance = $request->family_allowance;

		$user->hire_date = $request->hire_date;
		$user->contract_end_date = $request->contract_end_date;
		$user->bank_name = $request->bank_name;
		$user->iban = $request->iban;
		$user->account_number = $request->account_number;
		$user->can_login = $canLogin;
		if ($canLogin) {
			$user->role = $request->role;
			$user->user_name = $request->user_name;
			if ($request->password) {
				$user->password = $request->password;
			}
		} else {
			$user->role =  null;
		}
		$user->user_id_update = $userId;
		$user->update();

		return $user;
	}
}
