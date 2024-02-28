<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupliersProduct extends Model
{
    use HasFactory;

    protected $fillable = ['suppliers_id', 'produto_id'];

}
