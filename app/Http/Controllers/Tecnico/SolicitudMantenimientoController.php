<?php

namespace App\Http\Controllers\Tecnico;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\VistaSolicitudesTabla;
use App\Models\Solicitud;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;

class SolicitudMantenimientoController extends Controller
{

public function index()
{
    $solicitudes = VistaSolicitudesTabla::all();
    $estados = \App\Models\EstadoSolicitud::all();

    return Inertia::render('Tecnico/SolicitudMantenimiento', [
        'title'       => 'SOLICITUD DE MANTENIMIENTO',
        'subtitle'    => 'Lista de Solicitudes:',
        'solicitudes' => $solicitudes,
        'estados'     => $estados,
        'tecnicoId'   => Auth::id(),
    ]);
}

public function tomar(string $id)
{
    $solicitud = Solicitud::where('id_solicitud', $id)
                          ->whereNull('id_tecnico_asignado')
                          ->firstOrFail();

    $solicitud->update([
        'id_tecnico_asignado' => Auth::id(),
        'fecha_asignacion'    => now()->toDateString(),
    ]);

    return redirect()->route('tecnico.sol_mant.index');
}


    public function cambiarEstado(Request $request, string $id)
    {
        $request->validate([
            'id_estado' => 'required|exists:estados_solicitud,id_estado',
        ]);

        $solicitud = Solicitud::findOrFail($id);
        $solicitud->update([
            'id_estado'          => $request->id_estado,
            'id_tecnico_asignado'=> Auth::id(),
            'fecha_asignacion'   => now()->toDateString(),
        ]);

        return redirect()->route('tecnico.sol_mant.index');
    }

   
    public function create()
    {
        //
    }

   
    public function store(Request $request)
    {
        //
    }
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
    
    public function edit(string $id)
    {
        //
    }

    
    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
