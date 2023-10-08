<?php

namespace App\Services;

use App\Models\Insured;
use App\Models\User;

class InsuredUpdateService
{
	public function execute($request, Insured $employeePresence)
	{
		$employeePresence->name = $request->name;
		$employeePresence->policyholder_id = $request->policyholder_id;
		$employeePresence->gender = $request->gender;
		$employeePresence->marital_status = $request->marital_status;
		$employeePresence->card_name = $request->card_name;
		$employeePresence->card_number = $request->card_number;
		$employeePresence->date_of_birth = $request->date_of_birth;
		$employeePresence->document_type = $request->document_type;
		$employeePresence->document_number = $request->document_number;
		$employeePresence->document_issue_date = $request->document_issue_date;
		$employeePresence->nif = $request->nif;
		$employeePresence->dependents = $request->dependents;
		$employeePresence->occupation = $request->occupation;
		$employeePresence->province_id = $request->province_id;
		$employeePresence->municipality_id = $request->municipality_id;
		$employeePresence->address = $request->address;
		$employeePresence->neighborhood = $request->neighborhood;
		$employeePresence->email = $request->email;
		$employeePresence->phone = $request->phone;
		$employeePresence->phone2 = $request->phone2;
		$employeePresence->comercial = $request->comercial;
		$employeePresence->enrollment_date = $request->enrollment_date;
		$employeePresence->renewal_date = $request->renewal_date;
		$employeePresence->plan = $request->plan;
		$employeePresence->policy = $request->policy;
		$employeePresence->proposal_type = $request->proposal_type;
		$employeePresence->proposal_number = $request->proposal_number;
		$employeePresence->proposal_currency = $request->proposal_currency;
		$employeePresence->mediator = $request->mediator;
		$employeePresence->policy_number = $request->policy_number;
		$employeePresence->payment_frequency = $request->payment_frequency;
		$employeePresence->payment_method = $request->payment_method;
		$employeePresence->student = $request->student;
		$employeePresence->relationship = $request->relationship;
		$employeePresence->review = $request->review;
		$employeePresence->user_id_update = User::currentUserId();
		$employeePresence->save();

		return $employeePresence;
	}
}
