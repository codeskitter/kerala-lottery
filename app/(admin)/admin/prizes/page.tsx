"use client"

import useSWR from "swr"
import { useState } from "react"
import { AdminTopbar } from "@/components/admin/topbar"
import { useToast } from "@/hooks/use-toast"

type Prize = {
  id: string
  tier: string
  amount: string
  count: number
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminPrizesPage() {
  const { toast } = useToast()
  const { data, mutate, isLoading } = useSWR<Prize[]>("/api/admin/prizes", fetcher)
  const [form, setForm] = useState<Partial<Prize>>({ tier: "", amount: "", count: 1 })
  const [editingId, setEditingId] = useState<string | null>(null)

  async function submit() {
    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `/api/admin/prizes/${editingId}` : "/api/admin/prizes"
    const res = await fetch(url, { method, body: JSON.stringify(form) })
    if (!res.ok) return toast({ title: "Failed", description: "Could not save prize tier" })
    await mutate()
    setForm({ tier: "", amount: "", count: 1 })
    setEditingId(null)
    toast({ title: "Saved", description: "Prize tier saved successfully" })
  }

  async function onDelete(id: string) {
    const res = await fetch(`/api/admin/prizes/${id}`, { method: "DELETE" })
    if (!res.ok) return toast({ title: "Failed", description: "Could not delete prize tier" })
    await mutate()
    toast({ title: "Deleted", description: "Prize tier removed" })
  }

  function startEdit(p: Prize) {
    setEditingId(p.id)
    setForm({ tier: p.tier, amount: p.amount, count: p.count })
  }

  return (
    <>
      <AdminTopbar title="Prizes" />
      <main className="p-4 md:p-6 space-y-4">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="font-heading text-lg font-semibold">{editingId ? "Edit Tier" : "Add Tier"}</h2>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
            <label className="text-sm">
              <div className="label">Tier</div>
              <input
                className="mt-1 w-full h-10 rounded-md border px-3"
                value={form.tier || ""}
                onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value }))}
                placeholder="1st Prize"
              />
            </label>
            <label className="text-sm">
              <div className="label">Amount (₹)</div>
              <input
                className="mt-1 w-full h-10 rounded-md border px-3"
                value={form.amount || ""}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                placeholder="75,00,000"
              />
            </label>
            <label className="text-sm">
              <div className="label">Count</div>
              <input
                type="number"
                min={1}
                className="mt-1 w-full h-10 rounded-md border px-3"
                value={form.count ?? 1}
                onChange={(e) => setForm((f) => ({ ...f, count: Number(e.target.value) }))}
              />
            </label>
            <div className="flex items-end gap-2">
              <button onClick={submit} className="btn btn-brand w-full">
                {editingId ? "Update" : "Add Tier"}
              </button>
              {editingId ? (
                <button
                  className="btn btn-accent w-full"
                  onClick={() => {
                    setEditingId(null)
                    setForm({ tier: "", amount: "", count: 1 })
                  }}
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card overflow-x-auto">
          {isLoading ? (
            <div className="p-4 text-sm">Loading...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Tier</th>
                  <th className="py-2 pr-4">Amount (₹)</th>
                  <th className="py-2 pr-4">Count</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b">
                {(data || []).map((p) => (
                  <tr key={p.id}>
                    <td className="py-2 pr-4">{p.tier}</td>
                    <td className="py-2 pr-4">{p.amount}</td>
                    <td className="py-2 pr-4">{p.count}</td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <button className="h-8 px-3 rounded-md border hover:bg-accent" onClick={() => startEdit(p)}>
                          Edit
                        </button>
                        <button
                          className="h-8 px-3 rounded-md border text-white bg-[var(--accent-red)] hover:opacity-90"
                          onClick={() => onDelete(p.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  )
}
