<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Http\Controllers\Controller;
use App\Http\Requests\EquipmentCreateRequest;
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
        return $equipments->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EquipmentCreateRequest $request)
    {
        return Equipment::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);
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
