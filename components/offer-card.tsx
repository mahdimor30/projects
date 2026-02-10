"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronRight, Euro, Briefcase, Send } from "lucide-react"
import Link from "next/link"
import type { Offer } from "@/lib/types"
import { formatDateToLong } from "@/lib/format-date"

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

function getStatusBadge(status: string) {
  switch (status) {
    case "new_offer":
      return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">New Offer</Badge>
    case "offer_accepted":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Offer Accepted</Badge>
    case "offer_declined":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Offer Declined</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getProjectTypeBadge(projectType: string) {
  if (projectType === "byo") {
    return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">BYO</Badge>
  }
  return null
}

export function OfferCard({ data }: { data: Offer }) {
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
                      Date
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
                {getStatusBadge(data.status)}
                {getProjectTypeBadge(data.project_type)}
              </div>
            </div>

            <h3 className="text-lg font-bold text-foreground">{data.title}</h3>

            <div className="flex items-center gap-3">
              <Button
                variant="link"
                className="h-auto gap-1 p-0 font-bold text-teal-600 hover:text-teal-700"
              >
                Open Offer <ChevronRight className="h-4 w-4" />
              </Button>
              
              {data.status === "new_offer" && (
                <div className="flex gap-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Accept Offer
                  </Button>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    Decline Offer
                  </Button>
                </div>
              )}
              
              {data.status === "offer_accepted" && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Go to Contract
                </Button>
              )}
            </div>
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
            {getStatusBadge(data.status)}
            {getProjectTypeBadge(data.project_type)}
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

          <div className="flex flex-col gap-2">
            <Button
              variant="link"
              className="h-auto gap-1 p-0 text-sm font-bold text-teal-600 hover:text-teal-700"
            >
              Open Offer <ChevronRight className="h-4 w-4" />
            </Button>
            
            {data.status === "new_offer" && (
              <div className="flex gap-2">
                <Button className="bg-emerald-600 hover:bg-emerald-700" size="sm">
                  Accept Offer
                </Button>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" size="sm">
                  Decline Offer
                </Button>
              </div>
            )}
            
            {data.status === "offer_accepted" && (
              <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                Go to Contract
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
