import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statusContract: Record<string, { label: string; variant: string }> = {
  "in-progress": {
    label: "Job Open",
    variant: "text-neutral-700 bg-green-300",
  },
  finished: {
    label: "Finished",
    variant: "text-gray-700 bg-neutral-300",
  },
  "open-to-further-progress": {
    label: "Open to Further Progress",
    variant: "text-green-800 bg-green-100",
  },
  "auto-build-byo": {
    label: "BYO",
    variant: "text-gray-50 bg-gray-700",
  },
  "normal-build": {
    label: "Normal",
    variant: "text-sky-700 bg-sky-100",
  },
  "contract-build": {
    label: "Contract",
    variant: "text-amber-700 bg-amber-100",
  },
}

export default function StatuseContract({
  status,
  className,
}: {
  status: string
  className?: string
}) {
  const config = statusContract[status]
  if (!config) return null

  return (
    <Badge
      variant="outline"
      className={cn(
        config.variant,
        "justify-center items-center border-0 px-4 py-1.5",
        className
      )}
    >
      {config.label}
    </Badge>
  )
}
