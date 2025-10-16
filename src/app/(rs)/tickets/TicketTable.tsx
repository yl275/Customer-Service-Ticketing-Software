"use client"

// import type { selectTicketSchemaType } from "@/zod-schemas/tickets"

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    getFacetedUniqueValues,
    getFilteredRowModel,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    CircleCheckIcon,
    CircleXIcon,
} from 'lucide-react'

import { useRouter } from "next/navigation"
import { TicketSearchResultsType } from "@/lib/queries/getTickets"
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Filter from '@/components/react-table/Filter'

type Props = {
    data: TicketSearchResultsType,
}

type RowType = TicketSearchResultsType[0]

export default function TicketTable({data}: Props) {
    const router = useRouter();

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columnHeaderArray: Array<keyof RowType> = [
        "ticketDate",
        "title",
        "tech",
        "firstName",
        "lastName",
        "email",
        "completed",

    ]
    const columnHelper = createColumnHelper<RowType>();

    const columns = columnHeaderArray.map((columnName) => {
        return columnHelper.accessor((row) => {
            const value = row[columnName]
            if(columnName === "ticketDate" && value instanceof Date) {
                return value.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
            }
            if(columnName === "completed"){
                return value 
                ? "COMPLETED" 
                : "OPEN"
            }
            return value ?? "" ;
        }, {
            id: columnName,
            header: columnName[0].toUpperCase() + columnName.slice(1),
            cell: ({getValue}) => {
                // presentational
                const value = getValue()
                if (columnName === "completed"){
                    return (
                        <div className='grid place-content-center'>
                            {value==="OPEN" 
                            ? <CircleXIcon className='opacity-25'/>
                            : <CircleCheckIcon className='text-green-500'/>}
                        </div>
                    )
                }
                return value ?? "";
            }
        })
    })
    const table = useReactTable({
        data,
        columns,
        state:{
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 10,

            },
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
    })

    

    return (
        <div className="mt-6 flex flex-col gap-4">
        <div className="  rounded-lg overflow-hidden border border-border">
            <Table className="">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header)=>{
                        return (
                            <TableHead key={header.id} className="bg-secondary p-2">
                                <div>
                                    {header.isPlaceholder ? null:flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </div>
                                {header.column.getCanFilter() ? (
                                    <div className='grid place-content-center'>
                                        <Filter column={header.column}/>
                                    </div>
                                ): null}
                            </TableHead>
                        )})}
                    </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                        key={row.id}
                        className="cursor-pointer hover:bg-border/25
                        dark:hover:bg-ring/40"
                        onClick={() => router.push(`/tickets/form?ticketId=${row.original.id}`)}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="border">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
        </div>
        <div className='flex justify-between items-center'>
                    <div className='flex basis-1/3'>
                        <p className='whitespace-nowrap font-bold'>
                            {`Page ${table.getState().pagination.pageIndex + 1} 
                            of ${table.getPageCount()}`}
                            &nbsp;&nbsp;
                            {`[${table.getFilteredRowModel().rows.length} 
                            ${table.getFilteredRowModel().rows.length === 1
                                ? "total results" : "results" }]`}
                        </p>
                    </div>
                    <div className="space-x-1">

                        <Button 
                        variant="outline"
                        onClick={() => table.resetColumnFilters()}
                        
                        >
                            Reset Filters
                        </Button>
                        <Button 
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>

                        <Button 
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
            </div>
        </div>
    )
}



