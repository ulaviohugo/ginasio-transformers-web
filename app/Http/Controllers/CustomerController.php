<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\HttpResponse;
use App\Http\Requests\CustomerCreateRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
	public function index()
	{
		try {
			return Customer::all();
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar clientes');
		}
	}

	public function store(CustomerCreateRequest $request)
	{
		try {
			$photo = null;
			if ($request->file('photo')) {
				$photo = $request->file('photo')->store('customers');
			}
			$createdCustomer = Customer::create([
				'name' => trim($request->name),
				'photo' => $photo,
				'gender' => $request->gender,
				'date_of_birth' => $request->date_of_birth,
				'phone' => $request->phone,
				'email' => $request->email,
				'country_id' => $request->country_id,
				'province_id' => $request->province_id,
				'municipality_id' => $request->municipality_id,
				'address' => $request->address,
				'user_id' => User::currentUserId()
			]);
			return HttpResponse::success(data: $createdCustomer);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar categoria' . $th->getMessage());
		}
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(CustomerUpdateRequest $request, Customer $customer)
	{
		try {
			$photo = null;
			if ($request->file('photo')) {
				$photo = $request->file('photo')->store('customers');
				if ($customer->photo) {
					Storage::delete($customer->photo);
				}
			}
			$customer->name = trim($request->name);
			$customer->gender = $request->gender;
			$customer->date_of_birth = $request->date_of_birth;
			$customer->phone = $request->phone;
			$customer->email = $request->email;
			$customer->country_id = $request->country_id;
			$customer->province_id = $request->province_id;
			$customer->address = $request->address;
			$customer->municipality_id = $request->municipality_id;
			$customer->user_id_update = User::currentUserId();
			if ($photo) {
				$customer->photo = $photo;
			}
			$customer->save();
			return HttpResponse::success(data: $customer);
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao actualizar cliente' . $th->getMessage());
		}
	}

	public function count()
	{
		try {
			return HttpResponse::success(data: Customer::count());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar cliente');
		}
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Customer $customer)
	{
		try {
			$customer->delete();
			return HttpResponse::success(message: 'Cliente excluída com sucesso');
		} catch (\Throwable $th) {
			return ErrorHandler::handle(
				exception: $th,
				message: 'Erro ao excluir cliente',
			);
		}
	}
}
