<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VistaSolicitudesTabla extends Model
{
    protected $table = 'vista_solicitudes_tabla';
    protected $primaryKey = 'acciones';

    public $timestamps = false;        
    public $incrementing = false;

    protected $fillable = [
        'folio',
        'fecha_solicitud',
        'nombre_departamento_solicitante',
        'nombre_solicitante',
        'descripcion_equipo',
        'descripcion_problema',
        'id_usuario_solicitante',
        'id_tecnico_asignado',  
        'fecha_asignacion',     
        'id_estado',
        'prioridad',
        'observaciones',
        'fecha_terminado',
    ];
}