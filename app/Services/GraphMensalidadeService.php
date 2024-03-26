<?php

namespace App\Services;

use App\Helpers\DateHelper;
use App\Helpers\DBHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraphMensalidadeService
{
    public function execute(Request $request)
    {
        $year = $request->year;
        $gym_id = $request->gym_id;

        $monthly_fees = DB::table('mensalidades AS a')
            ->select('a.month AS field', DB::raw('CAST(SUM(a.monthlyValue) AS DOUBLE) AS value'))
            ->whereYear('a.created_at', $year);
            if($gym_id){
                $monthly_fees = $monthly_fees->join(DBHelper::TB_ATHLETE.' AS b', 'a.athlete_id', 'b.id')->where('b.gym_id',$gym_id);
            }
            $monthly_fees = $monthly_fees->groupBy('a.month')
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
