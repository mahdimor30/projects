import { Suspense } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ContractsList } from "@/components/contracts-list"
import { ContractListSkeleton } from "@/components/contract-skeleton"
import { FileCheck } from "lucide-react"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
          <div className="mb-8 flex items-center gap-3">
            <FileCheck className="h-6 w-6 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Contracts</h1>
          </div>

          <Suspense fallback={<ContractListSkeleton count={3} />}>
            <ContractsList />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
