<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    protected $table = 'solicitudes';
    protected $primaryKey = 'id_solicitud';

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