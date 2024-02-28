<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaleCreateRequest;
use App\Models\Transaction;
use App\Services\TransactionCreateService;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $nameProduct = $request->query('nameProduct');
            $unitPrice = $request->query('unitPrice');
            $user_id = $request->query('user_id');
            $quantity = $request->query('quantity');
            $paymentMethod = $request->query('paymentMethod');
            $produto_id = $request->query('produto_id');
            $paymentMethod = $request->query('paymentMethod');
            $created_at = $request->query('created_at');
            $athlete_id = $request->query('athlete_id');

            $sales = Sale::from('sales AS a')
                ->select('a.*', 'b.nameProduct')
                ->join('products' . ' AS b', 'b.id', 'a.produto_id');
            if ($nameProduct) {
                $sales = $sales->where('b.nameProduct', $nameProduct);
            }
            if ($athlete_id) {
                $sales = $sales->where('athlete_id', $athlete_id);
            }
            if ($unitPrice) {
                $sales = $sales->where('a.unitPrice', $unitPrice);
            }
            if ($quantity) {
                $sales = $sales->where('a.quantity', $quantity);
            }
            if ($paymentMethod) {
                $sales = $sales->where('a.paymentMethod', $paymentMethod);
            }
            if ($user_id) {
                $sales = $sales->where('a.user_id', $user_id);
            }
            if ($produto_id) {
                $sales = $sales->where('a.produto_id', $produto_id);
            }
            if ($created_at) {
                $sales = $sales->whereDate('a.created_at', date('Y-m-d', strtotime($created_at)));
            }
            // $sales = Product::all();
            // $sales->load('atleta');
            return response()->json($sales->get());
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function count(){
        return Sale::count();
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaleCreateRequest $request, TransactionCreateService $cashService)
    {
        $payment = Sale::create([
            'paymentMethod' => $request->paymentMethod,
            'nameProduct' => $request->nameProduct,
            'quantity' => $request->quantity,
            'produto_id' => $request->produto_id,
        ]);
        
        //Adicionar campos no request (solicitação)
        $cashRequest = $request->merge([
            'description' => 'Sale',
            'operation_type' => Transaction::OPERATION_TYPE_IN,
            'amount' => $request->price,
            'payment_method' => $request->paymentMethod,
        ]);
        //Actualizar o caixa
        // $cashService->execute($cashRequest);

        return $payment;
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        return $sale;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaleCreateRequest $request, sale $sale)
    {
        $sale->produto_id = $request->produto_id;
        $sale->athlete_id = $request->athlete_id;
        $sale->user_id = $request->user_id;
        $sale->totalPrice = $request->totalPrice;
        $sale->quantity = $request->quantity;
        $sale->paymentMethod = $request->paymentMethod;
        $sale->save();
        return $sale;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        $sale->delete();
        return response()->json(["mensager" => 'Venda excluida com sucesso']);
    }
}
