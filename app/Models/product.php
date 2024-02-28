<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['suppliers_id','description', 'price','paymentMethod','quantity'];

    public function fornecedor()
    {
        return $this->belongsTo(Supplier::class, 'suppliers_id');
    }


}
