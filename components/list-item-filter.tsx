"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface ListItemFilterProps {
  list?: Array<string>
  deletedItem: (item: string) => void
  constantsList: Array<{ label: string; value: number }>
}

export default function ListItemFilter({
  list,
  constantsList,
  deletedItem,
}: ListItemFilterProps) {
  if (!list || list.length === 0) return null

  return (
    <ScrollArea className="w-full">
      <div className="flex items-center gap-2 py-1">
        {list.map((item) => {
          const matched = constantsList?.find(
            (skill) => skill.value === Number(item)
          )
          if (!matched) return null

          return (
            <div
              className="relative flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 pr-9 text-sm font-medium text-foreground whitespace-nowrap"
              key={`skill-${item}`}
            >
              <span>{matched.label}</span>
              <Button
                onClick={() => deletedItem(item)}
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full hover:bg-transparent"
              >
                <XCircle className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Remove {matched.label}</span>
              </Button>
            </div>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
