<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;

class CategoryPolicy
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
	public function delete(User $user, Category $category): bool
	{
		return $user->role == User::ROLE_ADMIN;
	}
}
