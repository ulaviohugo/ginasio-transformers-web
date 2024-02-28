<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Athlete;

class Mensalidade extends Model
{
    use HasFactory;

    protected $fillable = ['year', 'month', 'monthlyValue', 'monthlyFine', 'athlete_id','paymentMethod','user_id'];
    
    // Relacionamento com a tabela de atletas
    public function atleta()
    {
        return $this->belongsTo(Athlete::class, 'athlete_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Escopo para filtrar por ID
    public function scopeId($query, $id)
    {
        if ($id) {
            return $query->where('id', $id);
        }
    }

    // Escopo para filtrar por ano
    public function scopeYear($query, $year)
    {
        if ($year) {
            return $query->where('year', $year);
        }
    }

    // Escopo para filtrar por mês
    public function scopeMonth($query, $month)
    {
        if ($month) {
            return $query->where('month', $month);
        }
    }

    // Escopo para filtrar por valor mensal
    public function scopeMonthlyValue($query, $monthlyValue)
    {
        if ($monthlyValue) {
            return $query->where('monthlyValue', $monthlyValue);
        }
    }

    // Escopo para filtrar por multa mensal
    public function scopeMonthlyFine($query, $monthlyFine)
    {
        if ($monthlyFine) {
            return $query->where('monthlyFine', $monthlyFine);
        }
    }
}

