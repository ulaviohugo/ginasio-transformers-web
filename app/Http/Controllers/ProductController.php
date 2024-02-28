<?php

namespace App\Http\Controllers;

use App\Helpers\DBHelper;
use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCreateRequest;
use App\Models\Supplier;
use App\Models\Transaction;
use App\Services\TransactionCreateService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $nameProduct = $request->query('nameProduct');
            $description = $request->query('description');
            $price = $request->query('price');
            $quantity = $request->query('quantity');
            $paymentMethod = $request->query('paymentMethod');
            $created_at = $request->query('created_at');
            $suppliers_id = $request->query('suppliers_id');

            $products = Supplier::from('products AS a')
                ->select('a.*', 'b.nameProduct')
                ->join('suppliers' . ' AS b', 'b.id', 'a.suppliers_id');

            // if ($name) {
            //     $products = $products->where('name', $name);
            // }
            if ($suppliers_id) {
                $products = $products->where('a.suppliers_id', $suppliers_id);
            }
            if ($nameProduct) {
                $products = $products->where('b.nameProduct', $nameProduct);
            }
            if ($description) {
                $products = $products->where('a.description', $description);
            }
            if ($quantity) {
                $products = $products->where('a.quantity', $quantity);
            }
            if ($paymentMethod) {
                $products = $products->where('a.paymentMethod', $paymentMethod);
            }
            if ($price) {
                $products = $products->where('a.price', $price);
            }
            if ($created_at) {
                $products = $products->whereDate('a.created_at', date('Y-m-d', strtotime($created_at)));
            }
            // $products = Product::all();
            // $products->load('atleta');
            return response()->json($products->get());
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function count(){
        return Product::count();
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
    public function store(ProductCreateRequest $request, TransactionCreateService $cashService)
    {
        $payment = Product::create([
            'description' => $request->description,
            'price' => $request->price,
            'paymentMethod' => $request->paymentMethod,
            'suppliers_id' => $request->suppliers_id,
            'quantity' => $request->quantity,
            'nameProduct' => $request->nameProduct,
        ]);
        
        //Adicionar campos no request (solicitação)
        $cashRequest = $request->merge([
            'description' => 'Product',
            'operation_type' => Transaction::OPERATION_TYPE_OUT,
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
    public function show(product $product)
    {
        return $product;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductCreateRequest $request, product $product)
    {
        $product->description = $request->description;
        $product->price = $request->price;
        $product->suppliers_id = $request->suppliers_id;
        $product->quantity = $request->quantity;
        $product->paymentMethod = $request->paymentMethod;
        $product->save();
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(product $product)
    {
        $product->delete();
        return response()->json(["mensager" => 'Produto excluido com sucesso']);
    }
}
