import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from '@/Components/ui/table'; 
import { Button } from '@/Components/ui/button';
import { Eye, Printer, Search, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import ModalCambiarEstado from '@/Pages/Tecnico/ModalCambiarEstado';
import { router } from '@inertiajs/react';

export default function Index({ subtitle, title, solicitudes = [], estados = [], tecnicoId }) {


     const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('todas');
  

    const solicitudesFiltradas = solicitudes
        .filter(s => filtro === 'mias' ? s.id_tecnico_asignado === tecnicoId : true)
        .filter(s => s.folio.toLowerCase().includes(busqueda.toLowerCase()));
    const [modalEstado, setModalEstado] = useState(false);
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  
    

    return (
        <AuthenticatedLayout className="py-12">
            <br /><br />

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-white shadow rounded-lg">

                <h2 className="text-xl font-semibold leading-tight text-blue-800" align="center">
                    {title}
                </h2>
                <Head title="Solicitud de Mantenimiento" />
                <br />

              
                {/* BUSCADOR */}
                <div className="mx-auto max-w-7xl sm:px-0 lg:px-8 flex justify-end gap-2">
                    <textarea
                        className="border-0 border-b-2 border-gray-300 px-4 py-2 w-64 focus:outline-none focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 bg-transparent"
                        placeholder="Buscar por folio..."
                        rows="1"
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                    />
                    <Button variant="outline" className="bg-blue-400 text-white rounded-lg px-6 py-6 hover:bg-gray-700">
                        <Search className="mr-2 h-4 w-4" />
                        Buscar
                    </Button>
                </div>

                <div className="py-1">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="p-6 text-blue-800 flex items-center justify-between">
                            <span>{subtitle}</span>
                        </div>
                        <div className="border rounded-lg overflow-hidden text-white">
                            <Table>
                                <TableHeader className="bg-blue-800 text-white">
                                    <TableRow>
                                        <TableHead>Folio</TableHead>
                                        <TableHead>Departamento</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Prioridad</TableHead>
                                        <TableHead>Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="text-black text-center">
                                    {solicitudesFiltradas.map((solicitud) => (
                                        <TableRow key={solicitud.acciones}>
                                            <TableCell>{solicitud.folio}</TableCell>
                                            <TableCell>{solicitud.departamento}</TableCell>
                                            <TableCell>{solicitud.fecha}</TableCell>
                                            <TableCell>{solicitud.estado}</TableCell>
                                            <TableCell>{solicitud.prioridad}</TableCell>
                                            <TableCell align="center">
                                                <div className="flex gap-2 justify-center">
                                                    <Button variant="outline"
                                                        className="bg-white text-blue-400 hover:bg-gray-700 hover:text-white"
                                                        onClick={() => window.open(route('tecnico.sol_mant.show', solicitud.acciones), '_blank')}>
                                                        <Eye className="mr-1 h-3 w-3" />
                                                        Ver
                                                    </Button>
                                                    <Button variant="outline"
                                                        className="bg-white text-blue-400 hover:bg-gray-700 hover:text-white"
                                                        onClick={() => window.open(route('tecnico.sol_mant.imprimir', solicitud.acciones), '_blank')}>
                                                        <Printer className="mr-1 h-3 w-3" />
                                                        Imprimir
                                                    </Button>
                                                     {solicitud.id_tecnico_asignado === tecnicoId && (
                                                     <Button variant="outline"
                                                      className="bg-white text-green-500 hover:bg-green-500 hover:text-white"
                                                       onClick={() => {
                                                              setSolicitudSeleccionada(solicitud);
                                                       setModalEstado(true);
                                                        }}>
                                                          <ClipboardList className="mr-1 h-3 w-3" />
                                                         Estado
                                                        </Button>
                                                     )}
                                                    {!solicitud.id_tecnico_asignado && (
                                                    <Button variant="outline"
                                                      className="bg-white text-orange-400 hover:bg-orange-400 hover:text-white"
                                                    onClick={() => router.put(route('tecnico.sol_mant.tomar', solicitud.acciones))}>
                                                       Tomar
                                                         </Button>
                                                        )}
                                                         {solicitud.id_tecnico_asignado && solicitud.id_tecnico_asignado !== tecnicoId && (
                                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs">
                                                          Asignada
                                                        </span>
                                                         )}

                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <br /><br />
                    </div>
                </div>
            </div>

            {/* Modal cambiar estado */}
            <ModalCambiarEstado
            abierto={modalEstado}
            onCerrar={() => setModalEstado(false)}
            solicitud={solicitudSeleccionada}
            estados={estados}
/>
        </AuthenticatedLayout>
    );
}
