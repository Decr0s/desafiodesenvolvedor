<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UsuarioResource;
use App\Usuario;
use Illuminate\Http\Request;

class CadastroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UsuarioResource::collection(Usuario::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|max:255',
            'dt_nascimento' => 'required|date|date_format:Y-m-d',
            'sexo' => 'required|max:1'
        ]);
        $data = [
            "nome" => $request->nome,
            "dt_nascimento" => $request->dt_nascimento,
            "sexo" => $request->sexo
        ];

        if($request->id != null){
            $usuario = Usuario::find($request->id);
            $usuario->update($data);


        }else {
            $usuario = Usuario::create($data); 
        }   

        return new UsuarioResource($usuario);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Usuario $usuario)
    {
            return new UsuarioResource($usuario);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Usuario $usuario)
    {
        $request->validate([
            'nome' => 'required|max:255',
            'dt_nascimento' => 'required|date|date_format:Y-m-d',
            'sexo' => 'required|max:1'
        ]);

        $usuario->update($request->all());

        return new UsuarioResource($usuario);
 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Usuario $usuario)
    {
        $usuario->delete();

        return response(['message' => 'Deleted!']);
    }
}
