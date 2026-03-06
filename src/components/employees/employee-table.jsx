import { useState, useMemo } from "react";
import { Search } from "@mui/icons-material";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "./employee-data";
import { useDebounce } from "./use-debounce-hook";

// Country flag component using emoji flags
// Country flag component using FlagCDN
const CountryFlag = ({ countryCode, country }) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png 2x`}
        width="24"
        height="18"
        alt={country}
        className="rounded-sm object-cover border border-slate-200 shadow-sm"
      />
      <span className="text-slate-700 font-medium">{country}</span>
    </div>
  );
};

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Debounce search term to reduce API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch data with TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "employees",
      pagination.pageIndex + 1,
      pagination.pageSize,
      debouncedSearchTerm,
      sorting,
    ],
    queryFn: () =>
      fetchEmployees(
        pagination.pageIndex + 1,
        pagination.pageSize,
        debouncedSearchTerm,
        sorting[0]?.id,
        sorting[0]?.desc ? "desc" : "asc"
      ),
    keepPreviousData: true,
  });

  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Client",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={row.original.avatar}
                alt={row.original.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-md"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
            </div>
            <span className="font-semibold text-slate-800">{row.original.name}</span>
          </div>
        ),
      },
      {
        accessorKey: "CaseType",
        header: "CaseType",
        cell: ({ row }) => (
          <span className="text-slate-600 font-medium">{row.original.CaseType}</span>
        ),
      },
      {
        accessorKey: "country",
        header: "Country",
        cell: ({ row }) => (
          <CountryFlag
            countryCode={row.original.countryCode}
            country={row.original.country}
          />
        ),
      },
      {
        accessorKey: "hireDate",
        header: "Next Follow-up",
        cell: ({ row }) => (
          <span className="text-slate-600 font-mono text-sm">{row.original.hireDate}</span>
        ),
      },
      {
        accessorKey: "reportsTo",
        header: "Reports To",
        cell: ({ row }) => (
          <span className="text-slate-700 font-medium">{row.original.reportsTo}</span>
        ),
      },
      {
        accessorKey: "employeeId",
        header: "Client ID",
        cell: ({ row }) => (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-mono text-sm font-semibold">
            #{row.original.employeeId}
          </span>
        ),
      },
    ],
    []
  );

  // Create table instance
  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    state: {
      sorting,
      pagination,
    },
    pageCount: data ? Math.ceil(data.total / pagination.pageSize) : 0,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-800 font-semibold">Error loading employees</p>
              <p className="text-red-700 text-sm mt-1">{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-4 pr-12 py-3 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2 pointer-events-none">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="pointer-events-auto p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <Search className="text-slate-400" />
              </div>
            </div>

            {/* Results Info */}
            {data && (
              <div className="text-sm text-slate-600 font-medium bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-200">
                Showing <span className="text-indigo-600 font-semibold">{(pagination.pageIndex * pagination.pageSize) + 1}</span> to{" "}
                <span className="text-indigo-600 font-semibold">
                  {Math.min((pagination.pageIndex + 1) * pagination.pageSize, data.total)}
                </span>{" "}
                of <span className="text-indigo-600 font-semibold">{data.total}</span> clients
              </div>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={`flex items-center gap-2 ${header.column.getCanSort() ? "cursor-pointer select-none group" : ""
                              }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <span className="group-hover:text-indigo-300 transition-colors">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </span>
                            {header.column.getCanSort() && (
                              <span className="text-slate-400 group-hover:text-indigo-300 transition-colors">
                                {header.column.getIsSorted() === "asc" ? (
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  </svg>
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                  </svg>
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative w-12 h-12">
                          <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <span className="text-slate-600 font-medium">Loading employees...</span>
                      </div>
                    </td>
                  </tr>
                ) : table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-slate-600 font-medium text-lg">No employees found</p>
                        <p className="text-slate-400 text-sm">Try adjusting your search terms</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-indigo-50/50 transition-all duration-150"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">
            Page <span className="text-indigo-600 font-bold">{pagination.pageIndex + 1}</span> of{" "}
            <span className="text-indigo-600 font-bold">
              {data ? Math.ceil(data.total / pagination.pageSize) : 1}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* First Page */}
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 font-semibold shadow-sm hover:shadow-md disabled:hover:shadow-sm"
              aria-label="First page"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>

            {/* Previous Page */}
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 font-semibold shadow-sm hover:shadow-md disabled:hover:shadow-sm"
              aria-label="Previous page"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from(
                { length: Math.min(5, Math.ceil((data?.total ?? 0) / pagination.pageSize)) },
                (_, i) => {
                  const pageCount = Math.ceil((data?.total ?? 0) / pagination.pageSize);
                  let pageNumber;

                  if (pageCount <= 5) {
                    pageNumber = i;
                  } else if (pagination.pageIndex < 3) {
                    pageNumber = i;
                  } else if (pagination.pageIndex >= pageCount - 3) {
                    pageNumber = pageCount - 5 + i;
                  } else {
                    pageNumber = pagination.pageIndex - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => table.setPageIndex(pageNumber)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-150 ${pagination.pageIndex === pageNumber
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/50 scale-105"
                        : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm hover:shadow-md"
                        }`}
                    >
                      {pageNumber + 1}
                    </button>
                  );
                }
              )}
            </div>

            {/* Next Page */}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 font-semibold shadow-sm hover:shadow-md disabled:hover:shadow-sm"
              aria-label="Next page"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Last Page */}
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 font-semibold shadow-sm hover:shadow-md disabled:hover:shadow-sm"
              aria-label="Last page"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 font-medium">Rows per page:</label>
            <select
              value={pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer"
            >
              {[10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;