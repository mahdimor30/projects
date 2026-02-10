"use client"

import { OfferCard } from "@/components/offer-card"
import type { Offer } from "@/lib/types"

const mockOffers: Offer[] = [
  {
    id: 1,
    client_name: "Moras 201",
    created_at: "2025-11-15",
    title: "Back-End Developement",
    status: "new_offer",
    project_type: "full_project",
    contract_type: "Full Project",
    total_amount: 1998,
  },
  {
    id: 2,
    client_name: "Luna 505",
    created_at: "2025-11-14",
    title: "Front-End Development",
    status: "new_offer",
    project_type: "byo",
    contract_type: "Full Project",
    total_amount: 2500,
  },
  {
    id: 3,
    client_name: "Leo",
    created_at: "2025-11-10",
    title: "Full Stack Web Application",
    status: "offer_declined",
    project_type: "byo",
    contract_type: "Full Project",
    total_amount: 3500,
  },
  {
    id: 4,
    client_name: "Shahrooz N",
    created_at: "2025-11-08",
    title: "Mobile App Development",
    status: "offer_accepted",
    project_type: "full_project",
    contract_type: "Full Project",
    total_amount: 4200,
  },
]

export function OffersList() {
  return (
    <div className="flex flex-col gap-4">
      {mockOffers.map((offer) => (
        <OfferCard key={offer.id} data={offer} />
      ))}
    </div>
  )
}
