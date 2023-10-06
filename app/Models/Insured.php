<?php

namespace App\Models;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insured extends Model
{
	use HasFactory;
	protected $table = DBHelper::TB_INSUREDS;

	protected $fillable = [
		'name',
		'policyholder_id',
		'gender',
		'marital_status',
		'card_name',
		'card_number',
		'date_of_birth',
		'document_type',
		'document_number',
		'document_issue_date',
		'nif',
		'dependents',
		'occupation',
		'province_id',
		'municipality_id',
		'address',
		'neighborhood',
		'email',
		'phone',
		'phone2',
		'comercial',
		'enrollment_date',
		'renewal_date',
		'plan',
		'policy',
		'proposal_type',
		'proposal_number',
		'proposal_currency',
		'mediator',
		'policy_number',
		'payment_frequency',
		'payment_method',
		'student',
		'relationship',
		'review',
		'user_id',
		'user_id_update',
	];
}
