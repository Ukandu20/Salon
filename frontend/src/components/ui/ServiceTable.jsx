import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export function ServicesTable({ data, itemsPerPage, totalPages, currentPage, onPageChange }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [editRow, setEditRow] = React.useState(null);
  const [formData, setFormData] = React.useState({
    service: '',
    subservice: '',
    price: ''
  });
  const toast = useToast();

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle edit action
  const handleEditService = (service) => {
    setEditRow(service._id);
    setFormData({
      service: service.service,
      subservice: service.subservice,
      price: service.price,
    });
  };

  // Handle save action
  const handleSaveService = async (serviceId) => {
    try {
      await axios.put(`/api/services/${serviceId}`, formData);
      toast({
        title: 'Service updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setEditRow(null);
      const updatedData = data.map((item) =>
        item._id === serviceId ? { ...item, ...formData } : item
      );
      onPageChange(currentPage, updatedData); // Refresh the data locally
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: 'Error updating service',
        description: error.response ? error.response.data.message : 'Server not reachable',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle delete action
  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`/api/services/${serviceId}`);
      toast({
        title: 'Service deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      const updatedData = data.filter((item) => item._id !== serviceId);
      onPageChange(currentPage, updatedData); // Refresh the data locally
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'Error deleting service',
        description: error.response ? error.response.data.message : 'Server not reachable',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Define columns for the table
  const columns = React.useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
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
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => (
        row.original._id === editRow ? (
          <Input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
          />
        ) : (
          row.original.service
        )
      )
    },
    {
      accessorKey: "subservice",
      header: "Subservice Name",
      cell: ({ row }) => (
        row.original._id === editRow ? (
          <Input
            type="text"
            name="subservice"
            value={formData.subservice}
            onChange={handleInputChange}
          />
        ) : (
          row.original.subservice
        )
      )
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        row.original._id === editRow ? (
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        ) : (
          `$${row.getValue("price")}`
        )
      )
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="space-x-2">
          {row.original._id === editRow ? (
            <Button variant="outline" onClick={() => handleSaveService(row.original._id)}>
              Save
            </Button>
          ) : (
            <Button variant="outline" onClick={() => handleEditService(row.original)}>
              Edit
            </Button>
          )}
          <Button variant="outline" onClick={() => handleDeleteService(row.original._id)}>
            Delete
          </Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ], [editRow, formData, handleInputChange]);

  // Initialize the table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      {/* Filter and column visibility controls */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by service..."
          value={table.getColumn("service")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("service")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table displaying services */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "solid" : "outline"}
              size="sm"
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
