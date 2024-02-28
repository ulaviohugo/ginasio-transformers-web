<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Http\Controllers\Controller;
use App\Http\Requests\EquipmentCreateRequest;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $request = request();

        $id = $request->query('id');
        $name = $request->query('name');
        $created_at = $request->query('created_at');

        $equipments = Equipment::orderBy('created_at');
        if ($id) {
            $equipments = $equipments->where('id', $id);
        }
        if ($name) {
            $equipments = $equipments->where('name', 'Like', "{$name}%");
        }
        if ($created_at) {
            $equipments = $equipments->whereDate('created_at', date('Y-m-d', strtotime($created_at)));
        }
        $equipments = $equipments->get();
        $equipments->load('user');
        return $equipments;
    }
    public function count()
    {
        return Equipment::count();
    }

    public function gerarPDF()
    {
        $request = request();

        $id = $request->query('id');
        $name = $request->query('name');
        $created_at = $request->query('created_at');

        $equipments = Equipment::orderBy('created_at');
        if ($id) {
            $equipments = $equipments->where('id', $id);
        }
        if ($name) {
            $equipments = $equipments->where('name', 'Like', "{$name}%");
        }
        if ($created_at) {
            $equipments = $equipments->whereDate('created_at', date('Y-m-d', strtotime($created_at)));
        }
        $equipments = $equipments->get();
        $equipments->load('user');

        $pdf = Pdf::loadView('pdfs.materiais', ['equipments' => $equipments]);
        //return $pdf->download();
        return $pdf->stream();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EquipmentCreateRequest $request)
    {
        $user_id = User::currentUserId();
        $equipment = Equipment::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => $user_id
        ]);
        $equipment->load('user');
        return $equipment;
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipment $equipment)
    {
        return $equipment;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Equipment $equipment)
    {

        $equipment->name = $request->name;
        $equipment->description = $request->description;
        $equipment->user_id_update = User::currentUserId();
        $equipment->save();
        return $equipment;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipment $equipment)
    {
        $equipment->delete();
        return response()->json(["mensager" => 'Equipamento excluido com sucesso']);
    }
}
