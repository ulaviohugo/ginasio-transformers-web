<?php

namespace App\Http\Controllers;

use App\Helpers\DBHelper;
use App\Helpers\HttpResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentCreateRequest;
use App\Models\Mensalidade;
use App\Models\Transaction;
use App\Models\User;
use App\Services\TransactionCreateService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class MensalidadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $name = $request->query('name');
            $year = $request->query('year');
            $month = $request->query('month');
            $athlete_id = $request->query('athlete_id');
            $created_at = $request->query('created_at');


            $mensalidades = Mensalidade::from('mensalidades AS a')
                ->select('a.*', 'b.name')
                ->join(DBHelper::TB_ATHLETE . ' AS b', 'b.id', 'a.athlete_id');
            if ($name) {
                $mensalidades = $mensalidades->where('b.name', $name);
            }
            if ($year) {
                $mensalidades = $mensalidades->where('a.year', $year);
            }
            if ($month) {
                $mensalidades = $mensalidades->where('a.month', $month);
            }
            if ($athlete_id) {
                $mensalidades = $mensalidades->where('a.athlete_id', $athlete_id);
            }
            if ($created_at) {
                $mensalidades = $mensalidades->whereDate('a.created_at', date('Y-m-d', strtotime($created_at)));
            }
            // $mensalidades = Mensalidade::all();
            // $mensalidades->load('atleta');
            return response()->json($mensalidades->get());
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function gerarPDF(Request $request){
        try {
            $name = $request->query('name');
            $year = $request->query('year');
            $month = $request->query('month');
            $athlete_id = $request->query('athlete_id');
            $created_at = $request->query('created_at');


            $mensalidades = Mensalidade::from('mensalidades AS a')
                ->select('a.*', 'b.name')
                ->join(DBHelper::TB_ATHLETE . ' AS b', 'b.id', 'a.athlete_id');
            if ($name) {
                $mensalidades = $mensalidades->where('b.name', $name);
            }
            if ($year) {
                $mensalidades = $mensalidades->where('a.year', $year);
            }
            if ($month) {
                $mensalidades = $mensalidades->where('a.month', $month);
            }
            if ($athlete_id) {
                $mensalidades = $mensalidades->where('a.athlete_id', $athlete_id);
            }
            if ($created_at) {
                $mensalidades = $mensalidades->whereDate('a.created_at', date('Y-m-d', strtotime($created_at)));
            }

            // $mensalidades = Mensalidade::all();
            // $mensalidades->load('atleta');
            $pdf = Pdf::loadView('pdfs.mensalidades', ['mensalidades' => $mensalidades->get()]);
            //return $pdf->download();
            return $pdf->stream();
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaymentCreateRequest $request, TransactionCreateService $cashService)
    {
        $payment = Mensalidade::create([
            'year' => $request->year,
            'month' => $request->month,
            'monthlyValue' => $request->monthlyValue,
            'monthlyFine' => $request->monthlyFine,
            'paymentMethod' => $request->paymentMethod,
            'name' => $request->name,
            'athlete_id' => $request->athlete_id,
            'user_id' => User::currentUserId()
        ]);
        
        //Adicionar campos no request (solicitação)
        $cashRequest = $request->merge([
            'description' => 'Mensalidade',
            'operation_type' => Transaction::OPERATION_TYPE_IN,
            'amount' => $request->monthlyValue,
            'payment_method' => $request->paymentMethod,
        ]);
        //Actualizar o caixa
        $cashService->execute($cashRequest);

        return $payment;
    }

    /**
     * Display the specified resource.
     */
    public function show(Mensalidade $mensalidade)
    {
        return $mensalidade;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(mensalidade $mensalidade)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PaymentCreateRequest $request, Mensalidade $mensalidade)
    {
        $mensalidade->year = $request->year;
        $mensalidade->month = $request->month;
        $mensalidade->monthlyValue = $request->monthlyValue;
        $mensalidade->monthlyFine = $request->monthlyFine;
        $mensalidade->athlete_id = $request->athlete_id;
        $mensalidade->save();
        return $mensalidade;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mensalidade $mensalidade)
    {
        $mensalidade->delete();
        return response()->json(["mensager" => 'Mensalidade excluida com sucesso']);
    }
}
