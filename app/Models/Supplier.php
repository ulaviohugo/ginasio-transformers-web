<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    const STATUS_ACTIVE = 'active',
		STATUS_INACTIVE = 'inactive';

    protected $fillable = [
        'nameSuppliers', 'nameProduct', 'user_id', 'descriptionProduct',
        'purchasesHistoric', 'serviceProvided', 'status', 'contactName',
        'address', 'Phone', 'email','site', 'deliveryTimes', 'returnExchangePolicy',
        'contractsAgreements', 'ratingsComments','paymentMethod'
    ];
    public function utilizador()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
