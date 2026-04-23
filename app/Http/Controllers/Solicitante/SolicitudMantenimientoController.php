<?php

namespace App\Http\Controllers\Solicitante;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\VistaSolicitudesTabla;
use App\Models\Solicitud;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;

class SolicitudMantenimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $solicitudes = VistaSolicitudesTabla::where('id_usuario_solicitante', Auth::id())->get();
        return Inertia::render('Solicitante/SolicitudMantenimiento',[
             'title' => 'SOLICITUD DE MANTENIMIENTO', 'subtitle' => 'Lista de Solicitudes:','solicitudes' => $solicitudes,
             ]);
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
    public function store(Request $request)
    {
            
          $request->validate([
        'nombre_departamento_solicitante' => 'required|string|max:100',
        'nombre_solicitante' => 'nullable|string|max:150',
        'descripcion_equipo'             => 'required|string',
        'descripcion_problema'           => 'required|string',
        'prioridad'                      => 'required|in:alta,media,baja',
    ]);

    Solicitud::create([
        'folio'                           => 'SOL-' . str_pad(Solicitud::count() + 1, 4, '0', STR_PAD_LEFT),
        'fecha_solicitud'                 => now()->toDateString(),
        'nombre_departamento_solicitante' => $request->nombre_departamento_solicitante,
        'nombre_solicitante'              => $request->nombre_solicitante,
        'descripcion_equipo'              => $request->descripcion_equipo,
        'descripcion_problema'            => $request->descripcion_problema,
        'id_usuario_solicitante'          => Auth::id(),
        'prioridad'                       => $request->prioridad,
        'id_estado'                       => 1,
    ]);

    return redirect()->route('solicitante.sol_mant.index');
    }

    /**
     * Display the specified resource.
     */
   public function show(string $id)
{
    $solicitud = Solicitud::findOrFail($id);
    $tecnico = $solicitud->id_tecnico_asignado 
        ? \App\Models\User::find($solicitud->id_tecnico_asignado) 
        : null;
    $pdf = Pdf::loadView('pdf.solicitud', compact('solicitud', 'tecnico'));
    return $pdf->stream('solicitud-' . $solicitud->folio . '.pdf');
}

public function imprimir(string $id)
{
    $solicitud = Solicitud::findOrFail($id);
    $tecnico = $solicitud->id_tecnico_asignado 
        ? \App\Models\User::find($solicitud->id_tecnico_asignado) 
        : null;
    $pdf = Pdf::loadView('pdf.solicitud', compact('solicitud', 'tecnico'));
    return $pdf->download('solicitud-' . $solicitud->folio . '.pdf');
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
         $solicitud = Solicitud::where('id_solicitud', $id)
                          ->where('id_usuario_solicitante', Auth::id())
                          ->firstOrFail();
        $request->validate([
        'nombre_departamento_solicitante' => 'required|string|max:100',
        'nombre_solicitante'             => 'nullable|string|max:150',
        'descripcion_equipo'             => 'required|string',
        'descripcion_problema'           => 'required|string',
        'prioridad'                      => 'required|in:alta,media,baja',
    ]);

    $solicitud = Solicitud::findOrFail($id);
    $solicitud->update($request->only([
        'nombre_departamento_solicitante',
        'nombre_solicitante',
        'descripcion_equipo',
        'descripcion_problema',
        'prioridad',
    ]));

    return redirect()->route('solicitante.sol_mant.index');
    }

    
    public function destroy(string $id)
    {

            $solicitud = Solicitud::where('id_solicitud', $id)
                          ->where('id_usuario_solicitante', Auth::id())
                          ->firstOrFail();
    $solicitud->delete();

    return redirect()->route('solicitante.sol_mant.index');
    }
}
