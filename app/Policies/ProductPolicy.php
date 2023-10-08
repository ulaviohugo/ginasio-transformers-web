<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;

class ProductPolicy
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
	public function delete(User $user, Product $category): bool
	{
		return $user->role == User::ROLE_ADMIN;
	}
}
