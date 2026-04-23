
import ModalEliminarSolicitud from '@/Pages/Solicitante/ModalEliminarSolicitud';
import ModalAgregarSolicitud from '@/Pages/Solicitante/ModalAgregarSolicitud';
import ModalEditarSolicitud from '@/Pages/Solicitante/ModalEditarSolicitud';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table'; 
import { Button } from '@/Components/ui/button';
import { 
    Eye, 
    Edit, 
    Printer, 
    Trash2, 
    Search, 
    Plus,
    FileText 
} from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ subtitle , title, solicitudes = []}) {

    const [busqueda, setBusqueda] = useState('');
    const solicitudesFiltradas = solicitudes.filter(s =>
    s.folio.toLowerCase().includes(busqueda.toLowerCase()));

    const [modalEliminar, setModalEliminar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
    
    const [modalAbierto, setModalAbierto] = useState(false);
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
            setModalAbierto(false);
        }
    });
}
    return (
        <AuthenticatedLayout className="py-12"
            
        > <br /> <br />
           
     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8  bg-white shadow rounded-lg">
                        
                    
            <h2 className="text-xl font-semibold leading-tight text-blue-800" align="center">
                    {title} 
                </h2>
            <Head title="Solicitud de Mantenimiento" /> <br />

            {/* boton agregar */}
             <div className="mx-auto max-w-7xl sm:px-0 lg:px-8 LG:PY-10 flex justify-end">
                
                <Button variant="outline" className=" mt-4 bg-orange-400 text-white rounded-lg px-12 py-5 hover:bg-gray-700" onClick={() => setModalAbierto(true)}>
                     <Plus className="mr-2 h-4 w-4" />
                  Agregar
                </Button>    
            </div> <br />

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
                   {/* subtitulo */}
                    <div className="p-6 text-blue-800 flex items-center justify-between">
                         <span>{subtitle}</span>
                       </div>
                    <div className="overflow-hidden  shadow-sm sm:rounded-lg">
                        
                          {/*tabla  */}
                        <div className="border rounded-lg overflow-hidden text-white" flex>
                     <Table>
                                    <TableHeader className="bg-blue-800 text-white" justify-content: center>
                                        <TableRow>
                                            <TableHead>Folio</TableHead>
                                            <TableHead>Deparatamento</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Prioridad</TableHead>
                                            <TableHead justify-content: center >Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="text-black text-center" >
                                        {solicitudesFiltradas.map((solicitud) => (
                                            <TableRow key={solicitud.id}>
                                                <TableCell>{solicitud.folio}</TableCell>                                                
                                                <TableCell>{solicitud.departamento}</TableCell>
                                                <TableCell>{solicitud.fecha}</TableCell>
                                                <TableCell>{solicitud.estado}</TableCell>
                                                <TableCell>{solicitud.prioridad}</TableCell>
                                                <TableCell align="center">
                                                    
                                                    <div className=" flex gap-2 justify-center mx-auto max-w-7xl sm:px-0 lg:px-8 LG:PY-10">
                                                      <Button variant="outline" className="bg-white text-blue-400 hover:bg-gray-700 hover:text-white" onClick={() => window.open(route('solicitante.sol_mant.show', solicitud.acciones), '_blank')}>
                                                         <Eye className="mr-1 h-3 w-3" />
                                                         Ver
                                                        </Button>
                                                        <Button variant="outline"  className="bg-white text-blue-400 hover:bg-gray-700  hover:text-white"  onClick={() => {
                                                            setSolicitudSeleccionada(solicitud);
                                                                   setModalEditar(true);
                                                            }}>
                                                            <Edit className="mr-1 h-3 w-3" />
                                                            
                                                            Editar
                                                        </Button>  
                                                        <Button variant="outline" className="bg-white text-blue-400 hover:bg-gray-700 hover:text-white" onClick={() => window.open(route('solicitante.sol_mant.imprimir', solicitud.acciones), '_blank')}>
                                                            <Printer className="mr-1 h-3 w-3" />
                                                             Imprimir
                                                                </Button>  
                                                        <Button variant="outline"  className="bg-white text-blue-400    hover:bg-red-400  hover:text-white" onClick={() => {
                                                          setSolicitudSeleccionada(solicitud);
                                                          setModalEliminar(true);
                                                            }}>
                                                            <Trash2 className="mr-1 h-3 w-3" />
                                                            Eliminar
                                                        </Button>          
                                                            
                                                    </div>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                    </div> 

                    </div> <br /> <br />
                    
                </div>
            </div>
            </div>


             
            <ModalAgregarSolicitud 
             abierto={modalAbierto} 
             onCerrar={() => setModalAbierto(false)} 
            />

            <ModalEditarSolicitud
            abierto={modalEditar}
            onCerrar={() => setModalEditar(false)}
             solicitud={solicitudSeleccionada}/>

            <ModalEliminarSolicitud
            abierto={modalEliminar}
            onCerrar={() => setModalEliminar(false)}
            solicitud={solicitudSeleccionada}
            />

        </AuthenticatedLayout>
    );
}
