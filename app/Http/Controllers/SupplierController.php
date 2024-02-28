<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Http\Controllers\Controller;
use App\Http\Requests\SuppliersCreateRequest;
use App\Models\Transaction;
use App\Services\TransactionCreateService;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $nameSuppliers = $request->query('nameSuppliers');
            $nameProduct = $request->query('nameProduct');
            $user_id = $request->query('user_id');
            $descriptionProduct = $request->query('descriptionProduct');
            $purchasesHistoric = $request->query('purchasesHistoric');
            $serviceProvided = $request->query('serviceProvided');
            $created_at = $request->query('created_at');
            $status = $request->query('status');
            $contactName = $request->query('contactName');
            $address = $request->query('address');
            $Phone = $request->query('Phone');
            $email = $request->query('email');
            $site = $request->query('site');
            $deliveryTimes = $request->query('deliveryTimes');
            $returnExchangePolicy = $request->query('returnExchangePolicy');
            $contractsAgreements = $request->query('contractsAgreements');
            $ratingsComments = $request->query('ratingsComments');
            $paymentMethod = $request->query('paymentMethod');

            $suppliers = Supplier::orderby('created_at');
            if ($nameSuppliers) {
                $suppliers = $suppliers->where('nameSuppliers', $nameSuppliers);
            }
            if ($status) {
                $suppliers = $suppliers->where('status', $status);
            }
            if ($nameProduct) {
                $suppliers = $suppliers->where('nameProduct', $nameProduct);
            }
            if ($descriptionProduct) {
                $suppliers = $suppliers->where('descriptionProduct', $descriptionProduct);
            }
            if ($purchasesHistoric) {
                $suppliers = $suppliers->where('purchasesHistoric', $purchasesHistoric);
            }
            if ($user_id) {
                $suppliers = $suppliers->where('user_id', $user_id);
            }
            if ($serviceProvided) {
                $suppliers = $suppliers->where('serviceProvided', $serviceProvided);
            }
            if ($created_at) {
                $suppliers = $suppliers->whereDate('created_at', date('Y-m-d', strtotime($created_at)));
            }
            if ($contactName) {
                $suppliers = $suppliers->where('contactName', ($contactName));
            }
            if ($address) {
                $suppliers = $suppliers->where('address', ($address));
            }
            if ($Phone) {
                $suppliers = $suppliers->where('Phone', ($Phone));
            }
            if ($email) {
                $suppliers = $suppliers->where('email', ($email));
            }
            if ($site) {
                $suppliers = $suppliers->where('site', ($site));
            }
            if ($deliveryTimes) {
                $suppliers = $suppliers->where('deliveryTimes', ($deliveryTimes));
            }
            if ($returnExchangePolicy) {
                $suppliers = $suppliers->where('returnExchangePolicy', ($returnExchangePolicy));
            }
            if ($contractsAgreements) {
                $suppliers = $suppliers->where('contractsAgreements', ($contractsAgreements));
            }
            if ($ratingsComments) {
                $suppliers = $suppliers->where('ratingsComments', ($ratingsComments));
            }
            if ($paymentMethod) {
                $suppliers = $suppliers->where('paymentMethod', ($paymentMethod));
            }
            
            // $sales = Product::all();
            // $sales->load('atleta');
            return response()->json($suppliers->get());
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function count(){
        return supplier::count();
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
    public function store(SuppliersCreateRequest $request, TransactionCreateService $cashService)
    {
        $payment = Supplier::create([
            'nameSuppliers' => $request->nameSuppliers,
            'nameProduct' => $request->nameProduct,
            'descriptionProduct' => $request->descriptionProduct,
            'serviceProvided' => $request->serviceProvided,
            'status' => $request->status,
            'contactName' => $request->contactName,
            'address' => $request->address,
            'Phone' => $request->Phone,
            'email' => $request->email,
            'purchasesHistoric' => $request->purchasesHistoric,
            'deliveryTimes' => $request->deliveryTimes,
            'returnExchangePolicy' => $request->returnExchangePolicy,
            'contractsAgreements' => $request->contractsAgreements,
            'ratingsComments' => $request->ratingsComments,
            'paymentMethod' => $request->paymentMethod,
        ]);
        
        //Adicionar campos no request (solicitação)
        $cashRequest = $request->merge([
            'description' => 'Sale',
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
    public function show(supplier $supplier)
    {
        return $supplier;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SuppliersCreateRequest $request, supplier $supplier)
    {
        $supplier->nameSuppliers = $request->nameSuppliers;
        $supplier->nameProduct = $request->nameProduct;
        $supplier->descriptionProduct = $request->descriptionProduct;
        $supplier->serviceProvided = $request->serviceProvided;
        $supplier->status = $request->status;
        $supplier->contactName = $request->contactName;
        $supplier->address = $request->address;
        $supplier->Phone = $request->Phone;
        $supplier->email = $request->email;
        $supplier->purchasesHistoric = $request->purchasesHistoric;
        $supplier->deliveryTimes = $request->deliveryTimes;
        $supplier->returnExchangePolicy = $request->returnExchangePolicy;
        $supplier->contractsAgreements = $request->contractsAgreements;
        $supplier->ratingsComments = $request->ratingsComments;
        $supplier->paymentMethod = $request->paymentMethod;
        $supplier->created_at = $request->created_at;
        $supplier->save();
        return $supplier;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(supplier $supplier)
    {
        $supplier->delete();
        return response()->json(["mensager" => 'Fornecedor excluido com sucesso']);
    }
}
