import React, { FC, useCallback } from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import { defaultPageLimit } from '../../utils/constants'
// import Search from '../../assets/icons/Search.svg'
// import Left from '../../assets/icons/Left.svg'
// import Right from '../../assets/icons/Right.svg'
// import { InputAdornment, TextField } from '@mui/material'
// import EyeSlash from '../util/EyeSlash'
// import EyeOpen from '../util/Eye'

// export interface ITableComponentProps {
//   toggleMasking?: any
//   show?: boolean
//   offSort?: boolean
//   columns: any
//   data: any
//   title?: string
//   onClickRow?: any
//   fetchData?: any
//   loading: boolean
//   pageCount?: number
//   totalCount?: number
//   onFilter: (arg: string) => void
//   style?: React.CSSProperties 
// }

const TableComponent = ({
  toggleMasking,
  show,
  offSort = false,
  columns,
  data,
  title,
  onClickRow,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  totalCount,
  onFilter,
  selectableRows,
  onSelectedRowsChange,
  style = {},
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow, 
    setPageSize,
    page, 
    canPreviousPage, 
    canNextPage, 
    pageOptions, 
    pageCount, 
    gotoPage, 
    nextPage, 
    previousPage,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      manualPagination: true, 
      pageCount: controlledPageCount,
      manualSortBy: true,
    },
    useSortBy,
    usePagination
  )

  const PageSizeReset = React.useRef()
  const indexPage = React.useRef(0)

  React.useEffect(() => {
    if (totalCount < pageSize) {
      indexPage.current = 0
      gotoPage(0)
    } else {
      indexPage.current = pageIndex
    }

    if (fetchData) {
      fetchData({ pageIndex: indexPage.current, pageSize, sortBy })
    }
  }, [pageIndex, pageSize, sortBy])

  const renderPageNumbers = (pageCount) => {
    const pageList = []
    const maxPageNumbersToShow = 5
    let startPage = Math.max(0, pageIndex - Math.floor(maxPageNumbersToShow / 2))
    let endPage = Math.min(pageCount - 1, startPage + maxPageNumbersToShow - 1)
    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(0, endPage - maxPageNumbersToShow + 1)
    }
    endPage = Math.min(pageCount - 1, startPage + maxPageNumbersToShow - 1)
    for (let i = startPage; i <= endPage; i++) {
      pageList.push(i + 1)
    }

    return (
      <>
        {startPage > 0 && (
          <button
            className="px-2 py-1 text-sm border border-gray-400 rounded-md"
            onClick={(e) => {
              e.preventDefault()
              gotoPage(0)
            }}
          >
            1
          </button>
        )}
        {startPage > 1 && <span className="mx-2">...</span>}
        {pageList.map((page) => (
          <button
            key={`page-${page}`}
            className={`px-2 py-1 rounded-md text-sm border border-gray-400 ${pageIndex === page - 1 ? 'bg-blue-500 text-white' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              gotoPage(page - 1)
            }}
          >
            {page}
          </button>
        ))}
        {endPage < pageCount - 2 && <span className="mx-2">...</span>}
        {endPage < pageCount - 1 && (
          <button
            className="px-2 py-1 text-sm border border-gray-400 rounded-md"
            onClick={(e) => {
              e.preventDefault()
              gotoPage(pageCount - 1)
            }}
          >
            {pageCount}
          </button>
        )}
      </>
    )
  }

  return (
    <div className="p-4 overflow-hidden" style={style}>
      {title && <h6 className="mb-4 text-lg font-semibold">{title}</h6>}
      <div className="flex mb-2">
        <div className="w-full md:w-1/3">
          {/* <TextField
            type="text"
            placeholder="Search"
            onChange={(e) => onFilter(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                height: '2rem',
                fontSize: '14px',
              },
            }}
          /> */}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          className="min-w-full border-separate rounded-md table-auto border-spacing-0"
          {...getTableProps()}
        >
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup, index) => (
              <tr key={`header-${index}`} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={`header-tr-${index}`}
                    {...column.getHeaderProps(
                      column.Header === 'Card Number'
                        ? {} 
                        : column.getSortByToggleProps()
                    )}
                    className={`px-4 py-2 text-sm text-gray-600 ${column.isSorted ? (column.isSortedDesc ? 'text-blue-600' : 'text-blue-800') : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      {column.render('Header')}
                      {column.isSorted && (
                        column.isSortedDesc ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowUpIcon />
                        )
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row)
              return (
                <tr
                  onClick={() => onClickRow && onClickRow(row.original)}
                  key={`row-tr-${index}`}
                  {...row.getRowProps()}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {row.cells.map((cell, index) => (
                    <td
                      key={`col-td-${index}`}
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-sm text-gray-700"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-sm text-gray-600">
          <span>Show</span>
          <select
            className="p-1 ml-2 text-sm border rounded-md"
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              PageSizeReset.current = e.target.value
            }}
            value={PageSizeReset.current}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="ml-2">entries</span>
        </div>

        {loading ? (
          <span className="text-sm text-gray-500">Loading...</span>
        ) : (
          <span className="text-sm text-gray-500">
            Showing {page.length} of {totalCount} results
          </span>
        )}

        <div className="flex items-center">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-2 py-1 mr-2 border rounded-md"
          >
            {/* <img src={Left} alt="Previous" /> */}
            Previous
          </button>
          {renderPageNumbers(pageCount)}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-2 py-1 ml-2 border rounded-md"
          >
            {/* <img src={Right} alt="Next" /> */}
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default TableComponent
