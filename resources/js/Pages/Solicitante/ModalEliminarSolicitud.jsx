import { useForm } from '@inertiajs/react';

export default function ModalEliminarSolicitud({ abierto, onCerrar, solicitud }) {

    const { delete: destroy, processing } = useForm();

    function handleEliminar() {
        destroy(route('solicitante.sol_mant.destroy', solicitud.acciones), {
            onSuccess: () => onCerrar()
        });
    }

    if (!abierto) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-red-600">Eliminar Solicitud</h2>
                    <button onClick={onCerrar}
                        className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
                </div>

                <div className="flex flex-col items-center gap-4 py-4">
                    <div className="text-red-500 text-5xl"></div>
                    <p className="text-gray-700 text-center">
                        ¿Estás seguro de que deseas eliminar la solicitud 
                        <span className="font-bold text-red-600"> {solicitud?.folio}</span>?
                    </p>
                    <p className="text-gray-400 text-sm text-center">
                        Esta acción no se puede deshacer.
                    </p>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                    <button type="button" onClick={onCerrar}
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 text-sm">
                        Cancelar
                    </button>
                    <button onClick={handleEliminar} disabled={processing}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 text-sm">
                        {processing ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
}