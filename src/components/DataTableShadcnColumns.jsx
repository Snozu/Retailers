// Asegúrate de que este archivo se llame "DataTableShadcnColumns.jsx"
import { Badge, Button, Checkbox } from "@/components/ui"
import { MoreVerticalIcon } from "lucide-react"

// Define tus columnas mapeando tus campos reales (full_name, email, status, etc.)
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "full_name",
    header: "Nombre",
  },
  {
    accessorKey: "phone_number",
    header: "Teléfono",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Estatus",
    cell: ({ row }) => {
      const status = row.original.status
      if (status === "pending") {
        return (
          <Badge variant="outline" className="text-yellow-600">
            Pendiente
          </Badge>
        )
      } else if (status === "approved") {
        return (
          <Badge variant="outline" className="text-green-600">
            Aprobado
          </Badge>
        )
      } else if (status === "rejected") {
        return (
          <Badge variant="outline" className="text-red-600">
            Rechazado
          </Badge>
        )
      }
      return "N/A"
    },
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon">
        <MoreVerticalIcon />
      </Button>
    ),
  },
]
