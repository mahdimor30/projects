"use client"

import { Command as CommandPrimitive } from "cmdk"
import { Check, ChevronDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

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

export default function Combobox<T extends { label: string; value: number }>({
  changedValue,
  onSelectedValue,
  placeholder = "Click to search...",
  inputPlaceholder = "Search...",
  emptyMessage = "No data found.",
  className,
  list,
}: {
  changedValue?: string
  onSelectedValue: (value: string) => void
  placeholder?: string
  inputPlaceholder?: string
  emptyMessage?: string
  className?: string
  list: T[]
}) {
  const [open, setOpen] = React.useState(false)
  const [filteredOptions, setFilteredOptions] = React.useState<
    Array<{ value: number; label: string }>
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleOnSearchChange = React.useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        const newFilteredOptions = list?.filter((option) =>
          option.label
            .toLowerCase()
            .includes(e?.target?.value?.toLowerCase() ?? "")
        )
        setFilteredOptions(newFilteredOptions)
        setIsLoading(false)
      }, 300),
    [list]
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (!input) return

      if (!open) {
        setOpen(true)
      }

      setIsLoading(true)

      if (event.key === "Escape") {
        input.blur()
      }

      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    },
    [open]
  )

  return (
    <div className={className} onKeyDown={handleKeyDown}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-10 w-full justify-between items-center border border-border md:w-[150px] bg-transparent"
          >
            <span className="truncate text-sm">
              {changedValue
                ? list.find((item) => item.value === Number(changedValue))
                    ?.label
                : placeholder}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <Input
              ref={inputRef}
              onChange={handleOnSearchChange}
              placeholder={inputPlaceholder}
              className="border-0 border-b rounded-none focus-visible:ring-0"
            />
            <CommandList>
              <ScrollArea className="max-h-[200px]">
                <CommandGroup>
                  {isLoading ? (
                    <CommandPrimitive.Loading>
                      <div className="p-1">
                        <Skeleton className="h-8 w-full" />
                      </div>
                    </CommandPrimitive.Loading>
                  ) : null}
                  {filteredOptions?.length > 0
                    ? filteredOptions.map(({ value, label }) => (
                        <CommandItem
                          key={value}
                          value={value.toString()}
                          onSelect={(currentValue) => {
                            onSelectedValue(
                              currentValue === changedValue ? "" : currentValue
                            )
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              changedValue === value.toString()
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {label}
                        </CommandItem>
                      ))
                    : !isLoading && (
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                      )}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
