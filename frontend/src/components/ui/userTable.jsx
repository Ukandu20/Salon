import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

export default function UserTable({ data, itemsPerPage, totalPages, currentPage, onPageChange }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [editRow, setEditRow] = React.useState(null);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false,
  });
  const toast = useToast();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle edit action
  const handleEditUser = (user) => {
    setEditRow(user._id);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    onOpen();
  };

  // Handle save action
  const handleSaveUser = async (userId) => {
    try {
      await axios.put(`/api/users/${userId}`, formData);
      toast({
        title: 'User updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setEditRow(null);
      const updatedData = data.map((item) =>
        item._id === userId ? { ...item, ...formData } : item
      );
      onPageChange(currentPage, updatedData); // Refresh the data locally
      onOpenChange(false); // Close the modal
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'Error updating user',
        description: error.response ? error.response.data.message : 'Server not reachable',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle delete action
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      toast({
        title: 'User deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      const updatedData = data.filter((item) => item._id !== userId);
      onPageChange(currentPage, updatedData); // Refresh the data locally
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error deleting user',
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
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => row.original.firstName
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => row.original.lastName
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email
    },
    {
      accessorKey: "isAdmin",
      header: "Admin",
      cell: ({ row }) => (row.original.isAdmin ? 'Yes' : 'No')
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteUser(user._id)} className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
          placeholder="Filter by User..."
          value={table.getColumn("firstName")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("firstName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Table displaying users */}
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

      {/* Modal for editing user */}
      {editRow && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          className='max-w-lg w-full mx-auto my-10 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border-primary flex items-center justify-center'
          backdrop="blur"
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            }
          }}
        >
          <ModalContent className='flex flex-col w-full'>
            <ModalHeader className="flex flex-col gap-5 font-bold text-xl text-primary dark:text-neutral">Edit User</ModalHeader>
            <form onSubmit={(e) => { handleSaveUser(editRow); e.preventDefault(); }} className="w-full">
              <ModalBody className="w-full">
                <div className='grid lg:grid-cols-2 gap-2 w-full'>
                  <Input
                    autoFocus
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    variant="bordered"
                    className="w-full"
                  />
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    variant="bordered"
                    className="w-full"
                  />
                </div>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="bordered"
                  className="w-full mt-2"
                />
                <div className="flex items-center mt-4 ">
                  <ModalFooter className="mt-auto">
                      <Button className='text-inherit-500' onClick={() => onOpenChange(false)}>
                        Close
                      </Button>
                      <Button color="primary" type="submit">
                        Save Changes
                      </Button>
                  </ModalFooter>
                  <input
                    type="checkbox"
                    name="isAdmin"
                    id="isAdmin"
                    checked={formData.isAdmin}
                    onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                  />
                  <label htmlFor="isAdmin" className="ml-2 text-primary gap-10">
                    Admin
                  </label>
                </div>
              </ModalBody>
              
            </form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
