import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ModalCambiarEstado({ abierto, onCerrar, solicitud, estados = [] }) {

    const { data, setData, put, processing, reset } = useForm({
        id_estado: '',
    });

    useEffect(() => {
        if (solicitud) {
            setData('id_estado', solicitud.id_estado ?? '');
        }
    }, [solicitud]);

    function handleSubmit(event) {
        event.preventDefault();
        put(route('tecnico.sol_mant.estado', solicitud.acciones), {
            onSuccess: () => {
                reset();
                onCerrar();
            }
        });
    }

    if (!abierto) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-blue-800">Cambiar Estado</h2>
                    <button onClick={onCerrar}
                        className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                    Solicitud: <span className="font-bold text-blue-800">{solicitud?.folio}</span>
                </p>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Nuevo Estado</label>
                        <select
                            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.id_estado}
                            onChange={e => setData('id_estado', e.target.value)}
                        >
                            <option value="">-- Selecciona un estado --</option>
                            {estados.map(estado => (
                                <option key={estado.id_estado} value={estado.id_estado}>
                                    {estado.nombre_estado}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <button type="button" onClick={onCerrar}
                            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 text-sm">
                            Cancelar
                        </button>
                        <button type="submit" disabled={processing}
                            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 text-sm">
                            {processing ? 'Guardando...' : 'Actualizar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}