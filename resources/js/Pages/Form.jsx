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
import { useState } from 'react';

export default function Index({ subtitle , title, solicitudes = []}) {
    
       const [modalAbierto, setModalAbierto] = useState(false);
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
                                        {solicitudes.map((solicitud) => (
                                            <TableRow key={solicitud.id}>
                                                <TableCell>{solicitud.folio}</TableCell>                                                
                                                <TableCell>{solicitud.departamento}</TableCell>
                                                <TableCell>{solicitud.fecha}</TableCell>
                                                <TableCell>{solicitud.estado}</TableCell>
                                                <TableCell>{solicitud.prioridad}</TableCell>
                                                <TableCell align="center">
                                                    
                                                    <div className=" flex gap-2 justify-center mx-auto max-w-7xl sm:px-0 lg:px-8 LG:PY-10">
                                                       <Button variant="outline"  className="bg-white text-blue-400 hover:bg-gray-700  hover:text-white">
                                                            <Eye className="mr-1 h-3 w-3" />
                                                            <span>Ver</span>
                                                        </Button>  
                                                        <Button variant="outline"  className="bg-white text-blue-400 hover:bg-gray-700  hover:text-white">
                                                            <Edit className="mr-1 h-3 w-3" />
                                                            Editar
                                                        </Button>  
                                                        <Button variant="outline"  className="bg-white text-blue-400    hover:bg-gray-700  hover:text-white">
                                                            <Printer className="mr-1 h-3 w-3" />
                                                            Imprimir
                                                        </Button>   
                                                        <Button variant="outline"  className="bg-white text-blue-400    hover:bg-red-400  hover:text-white">
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


            {/* Modal */}
{modalAbierto && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-blue-800">Nueva Solicitud</h2>
                <button 
                    onClick={() => setModalAbierto(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                    ✕
                </button>
            </div>

            {/* Formulario */}
            <form className="flex flex-col gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Departamento</label>
                    <input type="text" className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre del departamento"/>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Descripción del equipo</label>
                    <input type="text" className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej. Computadora Dell"/>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Descripción del problema</label>
                    <textarea className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Describe el problema..."/>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Prioridad</label>
                    <select className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-2 mt-2">
                    <button 
                        type="button"
                        onClick={() => setModalAbierto(false)}
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 text-sm"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-orange-400 text-white hover:bg-orange-500 text-sm"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
)}

        </AuthenticatedLayout>
        
    );
}
