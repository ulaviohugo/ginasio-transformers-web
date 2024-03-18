<?php

namespace App\Http\Controllers;

use App\Models\Gym;
use App\Http\Controllers\Controller;
use App\Http\Requests\GymCreateRequest;
use App\Models\User;
use Illuminate\Http\Request;

class GymController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $request = request();

        $id = $request->query('id');
        $name = $request->query('name');
        $location = $request->query('location');
        $created_at = $request->query('created_at');

        $gyms = Gym::orderBy('created_at');
        if ($id) {
            $gyms = $gyms->where('id', $id);
        }
        if ($name) {
            $gyms = $gyms->where('name', 'Like', "{$name}%");
        }
        if ($location) {
            $gyms = $gyms->where('location', 'Like', "{$location}%");
        }
        if ($created_at) {
            $gyms = $gyms->whereDate('created_at', date('Y-m-d', strtotime($created_at)));
        }
        $gyms = $gyms->get();
        $gyms->load('user');
        return $gyms;
    }

    public function count()
    {
        return Gym::count();
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
    public function store(GymCreateRequest $request)
    {
        $user_id = User::currentUserId();
        $gym = Gym::create([
            'name' => $request->name,
            'location' => $request->location,
            'user_id' => $user_id
        ]);
        $gym->load('user');
        return $gym;
    }

    /**
     * Display the specified resource.
     */
    public function show(Gym $gym)
    {
        return $gym;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gym $gym)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GymCreateRequest $request, Gym $gym)
    {
        $gym->name = $request->name;
        $gym->location = $request->location;
        $gym->user_id_update = User::currentUserId();
        $gym->save();
        return $gym;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gym $gym)
    {
        $gym->delete();
        return response()->json(["mensager" => 'Ginásio excluido com sucesso']);
    }
}
