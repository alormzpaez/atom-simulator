import React from "react";

const Table = ({data, onOpenModalAtomicNumber, onOpenModalSpectralLine, onOpenModalNFinal, onOpenModalNInitial}) => {
    return (
        <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead class="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                Variable
                </th>
                <th scope="col" class="px-6 py-3">
                Valor
                </th>
            </tr>
            </thead>
            <tbody>
            {
                Object.keys(data).map((key) => (
                    <tr class="border-b bg-gray-800 border-gray-700">
                        <th
                        scope="row"
                        class="flex items-center gap-3 px-6 py-4 font-medium whitespace-nowrap text-white"
                        >
                        {key}
                        {
                            key == 'Linea espectral emitida' ?
                                <button type="button" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 bg-gray-600 hover:bg-gray-700 focus:ring-gray-900" onClick={onOpenModalSpectralLine}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                    <span class="sr-only">Edit</span>
                                </button>
                            : key == 'Órbita inicial' ?
                                <button type="button" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 bg-gray-600 hover:bg-gray-700 focus:ring-gray-900" onClick={onOpenModalNInitial}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span class="sr-only">Edit</span>
                                </button>
                            : key == 'Órbita final' ?
                                <button type="button" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 bg-gray-600 hover:bg-gray-700 focus:ring-gray-900" onClick={onOpenModalNFinal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span class="sr-only">Edit</span>
                                </button>
                            : key == 'Número atómico (Z)' ?
                                <button type="button" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 bg-gray-600 hover:bg-gray-700 focus:ring-gray-900" onClick={onOpenModalAtomicNumber}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span class="sr-only">Edit</span>
                                </button>
                            :
                                null
                        }
                        </th>
                        <td class="px-6 py-4">
                            <span className="flex items-center gap-3">
                                {data[key]}
                            </span>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </div>
    );
};

export default Table;
