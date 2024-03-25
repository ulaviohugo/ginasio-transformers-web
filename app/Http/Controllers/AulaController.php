<?php

namespace App\Http\Controllers;

use App\Models\Aula;
use App\Http\Controllers\Controller;
use App\Http\Requests\AulaCreateRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AulaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $request = request();

        $id = $request->query('id');
        $name = $request->query('name');
        $gym_id = $request->query('gym_id');
        $data = $request->query('data');
        $horario = $request->query('horario');
        $tipo = $request->query('tipo');
        $created_at = $request->query('created_at');

        $aula = Aula::orderBy('created_at');
        if ($id) {
            $aula = $aula->where('id', $id);
        }
        if ($name) {
            $aula = $aula->where('name', 'Like', "{$name}%");
        }
        if ($tipo) {
            $aula = $aula->where('tipo', 'Like', "{$tipo}%");
        }
        if ($horario) {
            $aula = $aula->where('horario', 'Like', "{$horario}%");
        }
        if ($data) {
            $aula = $aula->where('data', 'Like', "{$data}%");
        }
        if ($gym_id) {
            $aula = $aula->where('gym_id', 'Like', "{$gym_id}%");
        }
        if ($created_at) {
            $aula = $aula->whereDate('created_at', date('Y-m-d', strtotime($created_at)));
        }
        $aula = $aula->get();
        $aula->load('user');
        return $aula;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AulaCreateRequest $request)
    {
        $user_id = User::currentUserId();
        $aula = Aula::create([
            'name' => $request->name,
            'tipo' => $request->tipo,
            'horario' => $request->horario,
            'data' => $request->data,
            'gym_id' => $request->gym_id
        ]);
        $aula->load('user');
        return $aula;
    }

    /**
     * Display the specified resource.
     */
    public function show(Aula $aula)
    {
        return $aula;
    }

    
    /**
     * Update the specified resource in storage.
     */
    public function update(AulaCreateRequest $request, Aula $aula)
    {
        $aula->name = $request->name;
        $aula->tipo = $request->tipo;
        $aula->horario = $request->horario;
        $aula->data = $request->data;
        $aula->gym_id = $request->gym_id;
        $aula->user_id_update = User::currentUserId();
        $aula->save();
        return $aula;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Aula $aula)
    {
        $aula->delete();
        return response()->json(["mensager" => 'Aula excluida com sucesso']);
    }
}
