import { Suspense } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { OffersList } from "@/components/offers-list"
import { Input } from "@/components/ui/input"
import { Send, Search } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

function OfferSkeleton() {
  return (
    <div className="hidden border-border shadow-sm md:block">
      <div className="flex gap-8 p-6">
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="flex flex-col gap-1">
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="w-px self-stretch bg-border" />
        <div className="flex w-48 flex-col justify-center gap-6">
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OffersPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
          <div className="mb-8 flex items-center gap-3">
            <Send className="h-6 w-6 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Offers</h1>
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search title"
              className="pl-10"
            />
          </div>

          <Suspense fallback={
            <div className="flex flex-col gap-4">
              <OfferSkeleton />
              <OfferSkeleton />
              <OfferSkeleton />
            </div>
          }>
            <OffersList />
          </Suspense>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
    </div>
  )
}
