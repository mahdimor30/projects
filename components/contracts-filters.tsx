"use client"

import React, { useCallback, useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, RotateCcw } from "lucide-react"
import Combobox from "@/components/combobox"
import ListItemFilter from "@/components/list-item-filter"
import { SKILLS_OPTION } from "@/lib/constants"
import type { ContractFilters } from "@/hooks/use-contract-filters"

interface FiltersProps {
  filters: ContractFilters
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
  onContractTypeChange: (value: string) => void
  onSkillAdd: (value: string) => void
  onSkillRemove: (value: string) => void
  onReset: () => void
  hasActiveFilters: boolean
  isFetching: boolean
}

export function ContractsFilters({
  filters,
  onSearchChange,
  onStatusChange,
  onContractTypeChange,
  onSkillAdd,
  onSkillRemove,
  onReset,
  hasActiveFilters,
  isFetching,
}: FiltersProps) {
  // Local input state for responsive typing (debounce happens in the hook)
  const [localSearch, setLocalSearch] = useState(filters.search)

  // Sync local search when URL params change externally (e.g. reset)
  useEffect(() => {
    setLocalSearch(filters.search)
  }, [filters.search])

  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setLocalSearch(value)
      onSearchChange(value)
    },
    [onSearchChange]
  )

  const handleSelectSkill = useCallback(
    (value: string) => {
      if (value && !filters.skills.includes(value)) {
        onSkillAdd(value)
      }
    },
    [filters.skills, onSkillAdd]
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search title"
            value={localSearch}
            onChange={handleSearchInput}
            className="pl-9"
          />
        </div>

        <Select
          value={filters.status || "all"}
          onValueChange={onStatusChange}
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Job Open">Job Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Finished">Finished</SelectItem>
          </SelectContent>
        </Select>

        <Combobox
          emptyMessage="No skill found"
          list={SKILLS_OPTION}
          placeholder="Skills"
          onSelectedValue={handleSelectSkill}
          className="flex-1 md:flex-none"
        />

        <Select
          value={filters.contractType || "all"}
          onValueChange={onContractTypeChange}
        >
          <SelectTrigger className="w-full md:w-44">
            <SelectValue placeholder="Contract Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Full Project">Full Project</SelectItem>
            <SelectItem value="Full-Time">Full-Time</SelectItem>
            <SelectItem value="Part-Time">Part-Time</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            className="shrink-0"
            disabled={isFetching}
          >
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">Reset filters</span>
          </Button>
        )}
      </div>

      <ListItemFilter
        list={filters.skills}
        constantsList={SKILLS_OPTION}
        deletedItem={(item) => onSkillRemove(item)}
      />
    </div>
  )
}
