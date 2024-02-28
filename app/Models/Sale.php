<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = ['totalPrice', 'unitPrice', 'user_id', 'athlete_id', 'paymentMethod', 'quantity', 'produto_id'];

    public function atleta()
    {
        return $this->belongsTo(Athlete::class, 'athlete_id');
    }
    public function utilizador()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function produto()
    {
        return $this->belongsTo(Product::class, 'produto_id');
    }
}
