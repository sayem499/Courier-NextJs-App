"use client"
import React from 'react';
import { getCoreRowModel, useReactTable, flexRender, RowModel} from '@tanstack/react-table';




const Table: React.FC<{data:unknown[], columns:any, hiddenCols: {}}> = ({data , columns, hiddenCols}) => {
    
    const table = useReactTable({
        data, columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnVisibility: hiddenCols,
        }
        
    });

    return (
        <div className='h-[100%] w-[100%] flex items-start justify-center text-center text-black dark:text-white mt-10 '>
            <table className=''> 
                       {/* Table Head */}
                <thead className=''>       
                {table.getHeaderGroups().map(headerGroup =>( 

                    <tr key={headerGroup.id} className='bg-blue-500 text-slate-200 shadow '>
                        {headerGroup.headers.map( (header, index) => (<th key={header.id} className={`text-sm p-2 ${index===0 ? 'rounded-tl-md':''  } ${index === columns.length - 1 ? 'rounded-tr-md':''  }`}>
                            {flexRender( header.column.columnDef.header,header.getContext() )}
                            </th>))}
                        
                    </tr>

                ))}
                </thead>
                <tbody className=''>
                    {table.getRowModel().rows.map((row, index )=> (
                        <tr key={row.id} className={`shadow ${index % 2 === 0 ? '' : 'bg-slate-200 dark:bg-slate-600'} `}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className='text-sm p-2'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    )
}

export default Table