<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
	/**
	 * Determine whether the user can view any models.
	 */
	public function viewAny(User $user): bool
	{
		return $user->role == User::ROLE_ADMIN;
	}

	/**
	 * Determine whether the user can delete the model.
	 */
	public function delete(User $user, ?User $employee): bool
	{
		return $user->role == User::ROLE_ADMIN && $user->id != $employee?->id;
	}
}
