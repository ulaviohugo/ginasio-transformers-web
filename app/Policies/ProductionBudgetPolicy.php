<?php

namespace App\Policies;

use App\Models\ProductionBudget;
use App\Models\User;

class ProductionBudgetPolicy
{
	/**
	 * Determine whether the user can view any models.
	 */
	public function viewAny(User $user): bool
	{
		return $user->role == User::ROLE_ADMIN;
	}

	/**
	 * Determine whether the user can create models.
	 */
	public function create(User $user): bool
	{
		return $user->role == User::ROLE_ADMIN;
	}

	/**
	 * Determine whether the user can update the model.
	 */
	public function update(User $user, ProductionBudget $productionBudget): bool
	{
		return $user->role == User::ROLE_ADMIN;
	}

	/**
	 * Determine whether the user can delete the model.
	 */
	public function delete(User $user, ProductionBudget $productionBudget): bool
	{
		return $user->role == User::ROLE_ADMIN;
	}
}
