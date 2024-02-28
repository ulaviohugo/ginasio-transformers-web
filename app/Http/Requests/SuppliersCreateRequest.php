<?php

namespace App\Http\Requests;

use App\Models\Athlete;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SuppliersCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nameSuppliers' => 'required',
            'nameProduct' => 'required',
            'descriptionProduct' => 'required',
            'serviceProvided' => 'required',
            'status' => 'required',
            'contactName' => 'required',
            'address' => 'required',
            'Phone' => 'required',
            'email' => 'required',
            'purchasesHistoric' => 'required',
            'deliveryTimes' => 'required',
            'returnExchangePolicy' => 'required',
            'contractsAgreements' => 'required',
            'ratingsComments' => 'required',
            'paymentMethod' => 'required',
        ];
    }
}
