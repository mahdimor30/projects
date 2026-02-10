"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight, Euro, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Contract } from "@/lib/types"
import { formatDateToLong } from "@/lib/format-date"
import StatuseContract from "./statuse-contract"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getAvatarColor(name: string) {
  const colors = [
    "bg-amber-200 text-amber-800",
    "bg-rose-200 text-rose-800",
    "bg-teal-200 text-teal-800",
    "bg-sky-200 text-sky-800",
    "bg-orange-200 text-orange-800",
  ]
  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length
  return colors[index]
}

export function ContractCard({ data }: { data: Contract }) {
  const initials = getInitials(data.client_name)
  const avatarColor = getAvatarColor(data.client_name)

  return (
    <>
      {/* Desktop Layout */}
      <Card className="hidden border-border shadow-sm md:block">
        <CardContent className="flex gap-8 p-6">
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className={avatarColor}>
                    {initials}
                  </AvatarFallback>
                  <AvatarImage
                    src={data.client_logo || "/placeholder.svg"}
                    alt={data.client_name}
                  />
                </Avatar>
                <div className="flex flex-col gap-2">
                  <p className="text-base font-normal text-neutral-950">
                    {data.client_name}
                  </p>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-neutral-500">
                      Start date
                    </span>
                    <div className="flex items-center gap-1 text-neutral-700">
                      <Calendar className="size-4" aria-hidden="true" />
                      <time className="text-nowrap text-sm">
                        {formatDateToLong(data.created_at)}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatuseContract status={data.status} />
                <StatuseContract status={data.project_type} />
              </div>
            </div>

            <h3 className="text-lg font-bold text-foreground">{data.title}</h3>

            <Link href={`/contracts/${data.job_id}`}>
              <Button
                variant="link"
                className="h-auto gap-1 p-0 font-bold text-teal-600 hover:text-teal-700"
              >
                View Contract <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="w-px self-stretch bg-border" aria-hidden="true" />

          <div className="flex w-48 flex-col justify-center gap-6">
            <div className="flex items-start gap-3">
              <Briefcase className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Contract Type
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.contract_type}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Euro className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Total Amount
                </p>
                <p className="text-sm text-muted-foreground">
                  {"€"}{data.total_amount}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Layout */}
      <Card className="border-border shadow-sm md:hidden">
        <CardContent className="flex flex-col gap-4 p-4">
          <h3 className="text-base font-bold text-foreground">{data.title}</h3>

          <div className="flex items-center gap-2">
            <StatuseContract className="w-full" status={data.status} />
            <StatuseContract status={data.project_type} />
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className={`${avatarColor} text-xs`}>
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                {data.client_name}
              </p>
              <div className="flex items-center gap-1 text-neutral-700">
                <Calendar className="size-4" aria-hidden="true" />
                <time className="text-nowrap text-xs">
                  {formatDateToLong(data.created_at)}
                </time>
              </div>
            </div>
            <Link href={`/contracts/${data.job_id}`}>
              <Button
                variant="link"
                className="h-auto gap-1 p-0 text-sm font-bold text-teal-600 hover:text-teal-700"
              >
                View <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex justify-between gap-4">
            <div className="flex items-start gap-2">
              <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Contract Type
                </p>
                <p className="text-xs text-muted-foreground">
                  {data.contract_type}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Euro className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Total Amount
                </p>
                <p className="text-xs text-muted-foreground">
                  {"€"}{data.total_amount}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
