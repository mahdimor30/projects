import { NextRequest, NextResponse } from "next/server"
import type { Contract } from "@/lib/types"

const mockContracts: Contract[] = [
  {
    id: 1,
    job_id: 101,
    title: "Back-End Development",
    client_name: "Hessam Z.",
    created_at: "2025-11-15",
    status: "in-progress",
    project_type: "auto-build-byo",
    contract_type: "Full Project",
    total_amount: 1998,
    cover_letter: "Experienced back-end developer specializing in Node.js and Python.",
    skills: [3, 4, 11],
  },
  {
    id: 2,
    job_id: 102,
    title: "Front-End Development",
    client_name: "Alice Kim",
    created_at: "2026-01-10",
    status: "in-progress",
    project_type: "normal-build",
    contract_type: "Full-Time",
    total_amount: 1200,
    cover_letter: "Frontend specialist with expertise in React and TypeScript.",
    skills: [1, 2],
  },
  {
    id: 3,
    job_id: 103,
    title: "UI/UX Design",
    client_name: "Mohamed Patel",
    created_at: "2026-02-05",
    status: "finished",
    project_type: "auto-build-byo",
    contract_type: "Full-Time",
    total_amount: 2500,
    cover_letter: "Creative designer with a keen eye for detail and usability.",
    skills: [10],
  },
  {
    id: 4,
    job_id: 104,
    title: "Mobile App Development",
    client_name: "Sara Johnson",
    created_at: "2026-03-20",
    status: "in-progress",
    project_type: "normal-build",
    contract_type: "Full Project",
    total_amount: 3500,
    cover_letter: "Mobile developer experienced in React Native and Flutter.",
    skills: [5, 6, 2],
  },
  {
    id: 5,
    job_id: 105,
    title: "DevOps Engineering",
    client_name: "James Lee",
    created_at: "2026-04-01",
    status: "open-to-further-progress",
    project_type: "contract-build",
    contract_type: "Part-Time",
    total_amount: 1800,
    cover_letter: "DevOps engineer skilled in CI/CD pipelines and cloud infrastructure.",
    skills: [7, 9, 15],
  },
  {
    id: 6,
    job_id: 106,
    title: "Data Analysis",
    client_name: "Emily Chen",
    created_at: "2026-05-15",
    status: "finished",
    project_type: "normal-build",
    contract_type: "Full-Time",
    total_amount: 2200,
    cover_letter: "Data analyst with expertise in Python and SQL.",
    skills: [4, 11],
  },
  {
    id: 7,
    job_id: 107,
    title: "Cloud Architecture",
    client_name: "David Brown",
    created_at: "2026-06-10",
    status: "in-progress",
    project_type: "auto-build-byo",
    contract_type: "Full Project",
    total_amount: 4200,
    cover_letter: "Cloud architect with deep AWS and Azure expertise.",
    skills: [7, 8, 9, 15],
  },
  {
    id: 8,
    job_id: 108,
    title: "QA Testing",
    client_name: "Nina Rossi",
    created_at: "2026-07-05",
    status: "open-to-further-progress",
    project_type: "contract-build",
    contract_type: "Part-Time",
    total_amount: 950,
    cover_letter: "QA engineer with experience in automated and manual testing.",
    skills: [2, 3],
  },
  {
    id: 9,
    job_id: 109,
    title: "Database Administration",
    client_name: "Omar Hassan",
    created_at: "2026-08-20",
    status: "in-progress",
    project_type: "normal-build",
    contract_type: "Full-Time",
    total_amount: 2800,
    cover_letter: "DBA experienced with PostgreSQL, MySQL, and MongoDB.",
    skills: [11, 12],
  },
  {
    id: 10,
    job_id: 110,
    title: "Security Audit",
    client_name: "Lina Muller",
    created_at: "2026-09-01",
    status: "finished",
    project_type: "auto-build-byo",
    contract_type: "Full Project",
    total_amount: 5000,
    cover_letter: "Security specialist focusing on penetration testing and compliance.",
    skills: [7, 9],
  },
  {
    id: 11,
    job_id: 111,
    title: "API Integration",
    client_name: "Tom Wilson",
    created_at: "2026-10-15",
    status: "in-progress",
    project_type: "contract-build",
    contract_type: "Part-Time",
    total_amount: 1500,
    cover_letter: "Backend engineer focused on RESTful and GraphQL APIs.",
    skills: [3, 13, 2],
  },
  {
    id: 12,
    job_id: 112,
    title: "Machine Learning Model",
    client_name: "Aisha Khan",
    created_at: "2026-11-10",
    status: "open-to-further-progress",
    project_type: "normal-build",
    contract_type: "Full Project",
    total_amount: 6000,
    cover_letter: "ML engineer experienced in TensorFlow and PyTorch.",
    skills: [4, 14],
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const page = parseInt(searchParams.get("page") || "1", 10)
  const pageSize = parseInt(searchParams.get("page_size") || "3", 10)
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""
  const projectType = searchParams.get("exact__project_type") || ""
  const skillsParam = searchParams.get("skill_ids") || ""
  const sort = searchParams.get("sort") || "-id"

  let filtered = [...mockContracts]

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.client_name.toLowerCase().includes(q)
    )
  }

  if (status) {
    filtered = filtered.filter(
      (c) => c.status.toLowerCase() === status.toLowerCase()
    )
  }

  if (projectType) {
    filtered = filtered.filter(
      (c) => c.project_type.toLowerCase() === projectType.toLowerCase()
    )
  }

  if (skillsParam) {
    const skillIds = skillsParam
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n))
    if (skillIds.length > 0) {
      filtered = filtered.filter((c) =>
        skillIds.some((skillId) => c.skills.includes(skillId))
      )
    }
  }

  // Sort
  if (sort) {
    const desc = sort.startsWith("-")
    const field = desc ? sort.slice(1) : sort
    filtered.sort((a, b) => {
      const aVal = a[field as keyof Contract]
      const bVal = b[field as keyof Contract]
      if (typeof aVal === "number" && typeof bVal === "number") {
        return desc ? bVal - aVal : aVal - bVal
      }
      return desc
        ? String(bVal).localeCompare(String(aVal))
        : String(aVal).localeCompare(String(bVal))
    })
  }

  const totalCount = filtered.length
  const totalPages = Math.ceil(totalCount / pageSize)
  const start = (page - 1) * pageSize
  const results = filtered.slice(start, start + pageSize)

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json({
    results,
    totalPages,
    currentPage: page,
    totalCount,
  })
}
