// src/components/DataTableShadcn.jsx
"use client"

import React, { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  // etc.
} from "@tanstack/react-table"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { columns as defaultColumns } from "./DataTableShadcnColumns"
import { CSS } from "@dnd-kit/utilities"

// Fila arrastrable
function DraggableRow({ row }) {
  // Lógica de arrastre con dnd-kit
  // ...
  return (
    <tr /* ... */>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {/* flexRender(cell.column.columnDef.cell, cell.getContext()) */}
        </td>
      ))}
    </tr>
  )
}

export default function DataTableShadcn({ data }) {
  const [tableData, setTableData] = useState(data || [])
  const rowIds = React.useMemo(() => tableData.map((d) => d.user_id), [tableData])

  const table = useReactTable({
    data: tableData,
    columns: defaultColumns,
    getRowId: (row) => row.user_id.toString(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // etc.
  })

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setTableData((prev) => {
      const oldIndex = rowIds.indexOf(active.id)
      const newIndex = rowIds.indexOf(over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header(
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <DraggableRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  )
}
