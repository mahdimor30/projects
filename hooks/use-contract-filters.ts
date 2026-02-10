"use client"

import { useCallback, useMemo, useRef, useState } from "react"

export interface ContractFilters {
  search: string
  status: string
  contractType: string
  countries: string[]
  skills: string[]
  page: number
  pageSize: number
  sort: string
}

const DEFAULTS: ContractFilters = {
  search: "",
  status: "",
  contractType: "",
  countries: [],
  skills: [],
  page: 1,
  pageSize: 10,
  sort: "-id",
}

function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function useContractFilters() {
  const [filters, setFilters] = useState<ContractFilters>(DEFAULTS)

  const update = useCallback(
    (updates: Partial<ContractFilters>, resetPagination = false) => {
      setFilters((prev) => ({
        ...prev,
        ...(resetPagination ? { page: 1 } : null),
        ...updates,
      }))
    },
    []
  )

  /* Debounced search */
  const debouncedSearchRef = useRef(
    debounce((value: string) => {
      update({ search: value }, true)
    }, 400)
  )

  const setSearch = useCallback((value: string) => {
    debouncedSearchRef.current(value)
  }, [])

  const setStatus = useCallback(
    (value: string) => {
      update({ status: value === "all" ? "" : value }, true)
    },
    [update]
  )

  const setContractType = useCallback(
    (value: string) => {
      update({ contractType: value === "all" ? "" : value }, true)
    },
    [update]
  )

  const addSkill = useCallback(
    (value: string) => {
      if (filters.skills.includes(value)) return
      update({ skills: [...filters.skills, value] }, true)
    },
    [filters.skills, update]
  )

  const removeSkill = useCallback(
    (value: string) => {
      update(
        { skills: filters.skills.filter((s) => s !== value) },
        true
      )
    },
    [filters.skills, update]
  )

  const addCountry = useCallback(
    (value: string) => {
      if (filters.countries.includes(value)) return
      update({ countries: [...filters.countries, value] }, true)
    },
    [filters.countries, update]
  )

  const removeCountry = useCallback(
    (value: string) => {
      update(
        { countries: filters.countries.filter((c) => c !== value) },
        true
      )
    },
    [filters.countries, update]
  )

  const setPage = useCallback(
    (page: number) => {
      update({ page })
    },
    [update]
  )

  const setPageSize = useCallback(
    (pageSize: number) => {
      update({ pageSize }, true)
    },
    [update]
  )

  const setSort = useCallback(
    (sort: string) => {
      update({ sort }, true)
    },
    [update]
  )

  const resetFilters = useCallback(() => {
    setFilters(DEFAULTS)
  }, [])

  const hasActiveFilters = useMemo(
    () =>
      !!filters.search ||
      !!filters.status ||
      !!filters.contractType ||
      filters.countries.length > 0 ||
      filters.skills.length > 0,
    [filters]
  )

  return {
    filters,
    hasActiveFilters,
    setSearch,
    setStatus,
    setContractType,
    addCountry,
    removeCountry,
    addSkill,
    removeSkill,
    setPage,
    setPageSize,
    setSort,
    resetFilters,
  }
}
