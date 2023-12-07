<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Helpers\DBHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
	use HasApiTokens, HasFactory, Notifiable;

	protected $table = DBHelper::TB_USERS;

	public const ROLE_ADMIN = 'Admin',
		ROLE_USER = 'Normal';


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


	public static function currentUser()
	{
		return auth('api')->user();
	}

	public static function currentUserId()
	{
		return auth('api')->id();
	}

	public function employee_presences()
	{
		return $this->hasMany(EmployeePresence::class, 'employee_id');
	}

	public function country()
	{
		return $this->belongsTo(Country::class);
	}

	public function province()
	{
		return $this->belongsTo(Province::class);
	}

	public function municipality()
	{
		return $this->belongsTo(Municipality::class);
	}

	/**
	 * Get the identifier that will be stored in the subject claim of the JWT.
	 *
	 * @return mixed
	 */
	public function getJWTIdentifier()
	{
		return $this->getKey();
	}

	/**
	 * Return a key value array, containing any custom claims to be added to the JWT.
	 *
	 * @return array
	 */
	public function getJWTCustomClaims()
	{
		return [];
	}
}
