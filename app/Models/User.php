<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
	use HasApiTokens, HasFactory, Notifiable;

	protected $table = DBHelper::TB_USERS;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'name',
		'email',
		'photo',
		'gender',
		'date_of_birth',
		'marital_status',
		'document_type',
		'document_number',
		'nif',
		'social_security',
		'dependents',
		'education_degree',
		'phone',
		'phone2',
		'role',
		'country_id',
		'province_id',
		'municipality_id',
		'address',
		'position',
		'base_salary',
		'hire_date',
		'contract_end_date',
		'bank_name',
		'iban',
		'account_number',
		'can_login',
		'user_name',
		'password',
		'email_verified_at',
		'user_id',
		'user_id_update',
	];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var array<int, string>
	 */
	protected $hidden = [
		'password',
		'remember_token',
	];

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
		'password' => 'hashed',
	];
}
