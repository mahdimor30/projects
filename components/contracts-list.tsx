"use client"

import React, { useMemo } from "react"
import { useContractFilters } from "@/hooks/use-contract-filters"
import { useContractsQuery } from "@/hooks/use-contracts-query"
import { ContractCard } from "./contract-card"
import { ContractListSkeleton } from "./contract-skeleton"
import { ContractsFilters } from "./contracts-filters"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { FileX } from "lucide-react"

function generatePagination(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}

export function ContractsList() {
  const {
    filters,
    setSearch,
    setStatus,
    setContractType,
    addSkill,
    removeSkill,
    setPage,
    resetFilters,
  } = useContractFilters()

  const { data, isLoading, isFetching } = useContractsQuery(filters)

  const totalPages = data?.totalPages || 0

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    newPage: number
  ) => {
    e.preventDefault()
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const paginationItems = useMemo(
    () => generatePagination(filters.page, totalPages),
    [filters.page, totalPages]
  )

  const hasActiveFilters =
    !!filters.search ||
    !!filters.status ||
    !!filters.contractType ||
    filters.skills.length > 0

  return (
    <div className="flex flex-col gap-6">
      <ContractsFilters
        filters={filters}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onContractTypeChange={setContractType}
        onSkillAdd={addSkill}
        onSkillRemove={removeSkill}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
        isFetching={isFetching}
      />

      {isLoading ? (
        <ContractListSkeleton count={filters.pageSize} />
      ) : !data?.results?.length ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-16">
          <FileX className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No contracts found</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="relative flex flex-col gap-4">
          {isFetching && (
            <div className="absolute inset-0 z-10 flex items-start justify-center bg-background/60 pt-12">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
          {data.results.map((item) => (
            <ContractCard key={item.id} data={item} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-muted-foreground">
            Page {filters.page} of {totalPages} ({data?.totalCount ?? 0}{" "}
            results)
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => handlePageChange(e, filters.page - 1)}
                  aria-disabled={filters.page <= 1}
                  className={
                    filters.page <= 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {paginationItems.map((p, idx) =>
                typeof p === "string" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={filters.page === p}
                      onClick={(e) => handlePageChange(e, p as number)}
                      className="cursor-pointer"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => handlePageChange(e, filters.page + 1)}
                  aria-disabled={filters.page >= totalPages}
                  className={
                    filters.page >= totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
