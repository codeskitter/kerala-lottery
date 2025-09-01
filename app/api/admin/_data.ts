export type Draw = {
  id: string
  name: string
  date: string // ISO date
  status: "Scheduled" | "Published"
}

export type Result = {
  id: string
  drawId: string
  winningNumber: string
  publishedAt: string // ISO datetime
}

export type PrizeTier = {
  id: string
  tier: string
  amount: string
  count: number
}

let draws: Draw[] = [
  { id: "KR-612", name: "Karunya", date: "2025-08-28", status: "Published" },
  { id: "NR-340", name: "Nirmal", date: "2025-08-29", status: "Scheduled" },
]

let results: Result[] = [
  { id: "res_1", drawId: "KR-612", winningNumber: "KR 732914", publishedAt: "2025-08-28T17:02:00Z" },
  { id: "res_2", drawId: "W-733", winningNumber: "WW 120349", publishedAt: "2025-08-26T17:00:00Z" },
]

let prizes: PrizeTier[] = [
  { id: "pr_1", tier: "1st Prize", amount: "75,00,000", count: 1 },
  { id: "pr_2", tier: "2nd Prize", amount: "10,00,000", count: 1 },
  { id: "pr_3", tier: "3rd Prize", amount: "1,00,000", count: 12 },
]

// util id
export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

// Draws
export const store = {
  // Draws
  listDraws: () => draws,
  getDraw: (id: string) => draws.find((d) => d.id === id),
  addDraw: (d: Omit<Draw, "id"> & { id?: string }) => {
    const exists = d.id ? draws.find((x) => x.id === d.id) : undefined
    const id = d.id || d.name?.slice(0, 2).toUpperCase() + "-" + Math.floor(500 + Math.random() * 600)
    if (!exists) {
      const newD: Draw = { id, name: d.name, date: d.date, status: d.status }
      draws = [newD, ...draws]
      return newD
    }
    // update if exists (by id)
    Object.assign(exists, d, { id: exists.id })
    return exists
  },
  updateDraw: (id: string, patch: Partial<Omit<Draw, "id">>) => {
    const idx = draws.findIndex((d) => d.id === id)
    if (idx === -1) return null
    draws[idx] = { ...draws[idx], ...patch }
    return draws[idx]
  },
  deleteDraw: (id: string) => {
    const before = draws.length
    draws = draws.filter((d) => d.id !== id)
    return draws.length < before
  },

  // Results
  listResults: () => results,
  addResult: (r: Omit<Result, "id">) => {
    const newR: Result = { id: uid("res"), ...r }
    results = [newR, ...results]
    // auto-mark draw as Published
    const dr = draws.find((d) => d.id === r.drawId)
    if (dr) dr.status = "Published"
    return newR
  },
  updateResult: (id: string, patch: Partial<Omit<Result, "id">>) => {
    const idx = results.findIndex((r) => r.id === id)
    if (idx === -1) return null
    results[idx] = { ...results[idx], ...patch }
    return results[idx]
  },
  deleteResult: (id: string) => {
    const before = results.length
    results = results.filter((r) => r.id !== id)
    return results.length < before
  },

  // Prizes
  listPrizes: () => prizes,
  addPrize: (p: Omit<PrizeTier, "id">) => {
    const newP: PrizeTier = { id: uid("pr"), ...p }
    prizes = [...prizes, newP]
    return newP
  },
  updatePrize: (id: string, patch: Partial<Omit<PrizeTier, "id">>) => {
    const idx = prizes.findIndex((p) => p.id === id)
    if (idx === -1) return null
    prizes[idx] = { ...prizes[idx], ...patch }
    return prizes[idx]
  },
  deletePrize: (id: string) => {
    const before = prizes.length
    prizes = prizes.filter((p) => p.id !== id)
    return prizes.length < before
  },

  // Stats
  stats: () => ({
    totalDraws: draws.length,
    totalWinners: results.length,
    ticketsSold30d: 128450, // placeholder
    payoutThisMonthCr: 5.2, // placeholder
    recentResults: results.slice(0, 5),
    upcomingDraws: draws.filter((d) => d.status === "Scheduled").slice(0, 3),
  }),
}
