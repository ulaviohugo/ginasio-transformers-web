<?php

namespace App\Http\Controllers;

use App\Models\Aula;
use App\Http\Controllers\Controller;
use App\Http\Requests\AulaCreateRequest;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
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
        $personal_trainer_id = $request->query('personal_trainer_id');
        $athlete_id = $request->query('athlete_id');
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
        if ($personal_trainer_id) {
            $aula = $aula->where('personal_trainer_id', 'Like', "{$personal_trainer_id}%");
        }
        if ($athlete_id) {
            $aula = $aula->where('athlete_id', 'Like', "{$athlete_id}%");
        }
        if ($created_at) {
            $aula = $aula->whereDate('created_at', date('Y-m-d', strtotime($created_at)));
        }
        $aula = $aula->get();
        $aula->load('user');
        return $aula;
    }

    public function gerarPDF()
    {
        $request = request();

        $id = $request->query('id');
        $name = $request->query('name');
        $gym_id = $request->query('gym_id');
        $personal_trainer_id = $request->query('personal_trainer_id');
        $athlete_id = $request->query('athlete_id');
        $data = $request->query('data');
        $horario = $request->query('horario');
        $tipo = $request->query('tipo');
        $created_at = $request->query('created_at');

        $aulas = Aula::orderBy('created_at');
        if ($id) {
            $aulas = $aulas->where('id', $id);
        }
        if ($name) {
            $aulas = $aulas->where('name', 'Like', "{$name}%");
        }
        if ($tipo) {
            $aulas = $aulas->where('tipo', 'Like', "{$tipo}%");
        }
        if ($horario) {
            $aulas = $aulas->where('horario', 'Like', "{$horario}%");
        }
        if ($data) {
            $aulas = $aulas->where('data', 'Like', "{$data}%");
        }
        if ($gym_id) {
            $aulas = $aulas->where('gym_id', 'Like', "{$gym_id}%");
        }
        if ($personal_trainer_id) {
            $aulas = $aulas->where('personal_trainer_id', 'Like', "{$personal_trainer_id}%");
        }
        if ($athlete_id) {
            $aulas = $aulas->where('athlete_id', 'Like', "{$athlete_id}%");
        }
        if ($created_at) {
            $aulas = $aulas->whereDate('created_at', date('Y-m-d', strtotime($created_at)));
        }
        $aulas = $aulas->get();
        $aulas->load('user');

        $pdf = Pdf::loadView('pdfs.aulas', ['aulas' => $aulas]);
        //return $pdf->download();
        return $pdf->stream();
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
            'user_id' => $user_id,
            'data' => $request->data,
            'personal_trainer_id' => $request->personal_trainer_id,
            'athlete_id' => $request->athlete_id,
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
