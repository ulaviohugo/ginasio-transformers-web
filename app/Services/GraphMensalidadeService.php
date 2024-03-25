<?php

namespace App\Services;

use App\Helpers\DateHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraphMensalidadeService
{
    public function execute(Request $request)
    {
        $year = $request->year;

        $monthly_fees = DB::table('mensalidades AS a')
            ->select('a.month AS field', DB::raw('CAST(SUM(a.monthlyValue) AS DOUBLE) AS value'))
            ->whereYear('a.created_at', $year)
            ->groupBy('a.month')
            ->get();

        $monthly_fees = $monthly_fees->map(function ($item) {
            return [
                'field' => DateHelper::months[$item->field],
                'value' => $item->value,
            ];
        });

        return [
            'monthly_fees' => $monthly_fees,
        ];
    }
}
