"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import type { ContractsResponse } from "@/lib/types"
import type { ContractFilters } from "./use-contract-filters"

function buildSearchParams(filters: ContractFilters): URLSearchParams {
  const params = new URLSearchParams()

  params.set("page", String(filters.page))
  params.set("page_size", String(filters.pageSize))

  if (filters.search) {
    params.set("search", filters.search.trim())
  }
  if (filters.status) {
    params.set("status", filters.status)
  }
  if (filters.contractType) {
    params.set("exact__project_type", filters.contractType)
  }
  if (filters.skills.length > 0) {
    params.set("skill_ids", filters.skills.join(","))
  }
  if (filters.countries.length > 0) {
    params.set("countries", filters.countries.join(","))
  }
  if (filters.sort) {
    params.set("sort", filters.sort)
  }

  return params
}

async function fetchContracts(
  filters: ContractFilters
): Promise<ContractsResponse> {
  const params = buildSearchParams(filters)
  const res = await fetch(`/api/contracts?${params.toString()}`)
  if (!res.ok) throw new Error("Failed to fetch contracts")
  return res.json()
}

export function useContractsQuery(filters: ContractFilters) {
  return useQuery({
    queryKey: [
      "contracts",
      filters.page,
      filters.pageSize,
      filters.search,
      filters.status,
      filters.contractType,
      filters.skills,
      filters.countries,
      filters.sort,
    ],
    queryFn: () => fetchContracts(filters),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}
