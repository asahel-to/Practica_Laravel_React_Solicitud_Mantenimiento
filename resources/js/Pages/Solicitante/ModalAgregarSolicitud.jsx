import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ModalAgregarSolicitud({ abierto, onCerrar }) {
    const [modalAbierto, setModalAbierto] = useState(abierto);

    const { data, setData, post, processing, reset } = useForm({
        nombre_departamento_solicitante: '',
        nombre_solicitante: '',
        descripcion_equipo: '',
        descripcion_problema: '',
        prioridad: 'media',
    });

    function handleSubmit(event) {
        event.preventDefault();
        post(route('solicitante.sol_mant.store'), {
            onSuccess: () => {
                reset();
                onCerrar();
            }
        });
    }

    if (!abierto) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-blue-800">Nueva Solicitud</h2>
                    <button 
                        onClick={onCerrar}
                        className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                    >✕</button>
                </div>

                {/* Formulario */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Área solicitante</label>
                        <input type="text"
                            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.nombre_departamento_solicitante}
                            onChange={e => setData('nombre_departamento_solicitante', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Nombre del solicitante</label>
                        <input type="text"
                            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.nombre_solicitante}
                            onChange={e => setData('nombre_solicitante', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Descripción del equipo</label>
                        <input type="text"
                            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.descripcion_equipo}
                            onChange={e => setData('descripcion_equipo', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Descripción del problema</label>
                        <textarea
                            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            value={data.descripcion_problema}
                            onChange={e => setData('descripcion_problema', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Prioridad</label>
                        <select
                            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.prioridad}
                            onChange={e => setData('prioridad', e.target.value)}
                        >
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                            <option value="baja">Baja</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <button type="button" onClick={onCerrar}
                            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 text-sm">
                            Cancelar
                        </button>
                        <button type="submit" disabled={processing}
                            className="px-4 py-2 rounded-lg bg-orange-400 text-white hover:bg-orange-500 text-sm">
                            {processing ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}