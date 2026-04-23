<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoSolicitud extends Model
{
    protected $table = 'estados_solicitud';
    protected $primaryKey = 'id_estado';
    public $timestamps = false;

    protected $fillable = ['nombre_estado', 'descripcion'];
}