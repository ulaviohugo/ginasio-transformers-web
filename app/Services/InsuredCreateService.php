<?php

use App\Models\Insured;
use App\Models\User;

class InsuredCreateService
{
	public function execute($request)
	{
		return Insured::create([
			'name' => $request->name,
			'policyholder_id' => $request->policyholder_id,
			'gender' => $request->gender,
			'marital_status' => $request->marital_status,
			'card_name' => $request->card_name,
			'card_number' => $request->card_number,
			'date_of_birth' => $request->date_of_birth,
			'document_type' => $request->document_type,
			'document_number' => $request->document_number,
			'document_issue_date' => $request->document_issue_date,
			'nif' => $request->nif,
			'dependents' => $request->dependents,
			'occupation' => $request->occupation,
			'province_id' => $request->province_id,
			'municipality_id' => $request->municipality_id,
			'address' => $request->address,
			'neighborhood' => $request->neighborhood,
			'email' => $request->email,
			'phone' => $request->phone,
			'phone2' => $request->phone2,
			'comercial' => $request->comercial,
			'enrollment_date' => $request->enrollment_date,
			'renewal_date' => $request->renewal_date,
			'plan' => $request->plan,
			'policy' => $request->policy,
			'proposal_type' => $request->proposal_type,
			'proposal_number' => $request->proposal_number,
			'proposal_currency' => $request->proposal_currency,
			'mediator' => $request->mediator,
			'policy_number' => $request->policy_number,
			'payment_frequency' => $request->payment_frequency,
			'payment_method' => $request->payment_method,
			'student' => $request->student,
			'relationship' => $request->relationship,
			'review' => $request->review,
			'user_id' => User::currentUserId()
		]);
	}
}
