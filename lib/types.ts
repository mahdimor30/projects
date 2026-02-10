export interface Contract {
  id: number
  job_id: number
  title: string
  client_name: string
  client_logo?: string
  created_at: string
  status: string
  project_type: string
  contract_type: string
  total_amount: number
  cover_letter: string
  skills: number[]
}

export interface Offer {
  id: number
  client_name: string
  client_logo?: string
  created_at: string
  title: string
  status: "new_offer" | "offer_accepted" | "offer_declined"
  project_type: "full_project" | "byo"
  contract_type: string
  total_amount: number
}

export interface OffersResponse {
  results: Offer[]
  totalPages: number
  currentPage: number
  totalCount: number
}

export interface ContractsResponse {
  results: Contract[]
  totalPages: number
  currentPage: number
  totalCount: number
}
