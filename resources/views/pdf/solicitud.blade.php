<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { 
            font-family: Arial, sans-serif; 
            font-size: 12px; 
            margin: 20px; 
        }
        .header-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 20px; 
        }
        .header-table td { 
            border: 1px solid black; 
            padding: 8px; 
            vertical-align: middle;
        }
        .logo { 
            width: 60px; 
        }
        .section { 
            border: 1px solid black; 
            padding: 10px; 
            margin-bottom: 15px; 
        }
        .label { 
            font-weight: bold; 
            display: inline-block;
            min-width: 180px;
        }
        .folio { 
            text-align: right; 
            font-size: 14px; 
            margin-bottom: 15px; 
            margin-top: 10px;
        }
        .right-table { 
            float: right; 
            border-collapse: collapse; 
            margin-bottom: 10px;
        }
        .right-table td { 
            border: 1px solid black; 
            padding: 8px; 
        }
        .clearfix::after { 
            content: ""; 
            display: table; 
            clear: both; 
        }
        .footer { 
            margin-top: 50px; 
            font-size: 11px; 
            border-top: 1px solid #ccc;
            padding-top: 10px;
        }
        .content-line {
            margin-bottom: 10px;
        }
        .checkbox {
            font-size: 14px;
        }
    </style>
</head>
<body>

    
    <table class="header-table">
        <tr>
            <td width="150" style="text-align: center;" style="vertical-align: top;">
                <img src="{{ public_path('escudo_itt_grande.png') }}" class="logo" alt="Logo" style="width: 40px; height: auto;"">
            </td>
            <td style="text-align: center;">
                <strong>Solicitud de Mantenimiento Correctivo</strong><br>
                Código: ITT-POE-06-02<br>
                Referencia a la Norma ISO 9001:2015: 7.1.3, 7.1.4
            </td>
            <td width="150" style="text-align: center;">
                Fecha de revisión: {{ \Carbon\Carbon::parse($solicitud->fecha_solicitud)->subDay()->format('d/m/Y') }}
            </td>
        </tr>
    </table>

    
    <div class="clearfix">
        <table class="right-table">
            <tr>
                <td><strong>Recursos Materiales y Servicios</strong></td>
            </tr>
            <tr>
                <td><strong>Mantenimiento de Equipo</strong></td>
            </tr>
            <tr>
                <td>
                    <strong>Centro de Cómputo</strong> 
                    <span style="margin-left: 20px;">✗</span>
                </td>
            </tr>
         </table>
    </div>

    
    <div class="folio">
        <strong>Folio:</strong> {{ $solicitud->folio }}
    </div>

    
    <div class="section">
        <strong>Área Solicitante:</strong><br>
        {{ $solicitud->nombre_departamento_solicitante }}
    </div>

    
    <div class="section">
        <strong>Nombre y Firma del Solicitante:</strong><br>
        {{ $solicitud->nombre_solicitante }}
    </div>

    
    <div class="section">
        <strong>Fecha de Elaboración:</strong><br>
        {{ \Carbon\Carbon::parse($solicitud->fecha_solicitud)->subDay()->format('d/m/Y') }}
    </div>

    
    <div class="section">
        <strong>Descripción del equipo:</strong><br>
        {{ $solicitud->descripcion_equipo }}
    </div>

    
    <div class="section">
        <strong>Descripción del problema:</strong><br>
        {{ $solicitud->descripcion_problema }}
    </div>
    
    
@if($solicitud->id_tecnico_asignado)
<div class="section">
    <strong>Técnico Asignado:</strong><br>
    {{ $tecnico->name ?? 'No asignado' }}
    <br>
    <strong>Fecha de Asignación:</strong> 
    {{ \Carbon\Carbon::parse($solicitud->fecha_asignacion)->format('d/m/Y') }}
</div>
@endif
    


    <div class="footer">
        c.c.p. Área Solicitante.
    </div>

</body>
</html>