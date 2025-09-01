"use client"

import useSWR from "swr"
import { useState } from "react"
import { AdminTopbar } from "@/components/admin/topbar"
import { useToast } from "@/hooks/use-toast"

type Result = {
  id: string
  drawId: string
  winningNumber: string
  publishedAt: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminResultsPage() {
  const { toast } = useToast()
  const { data, mutate, isLoading } = useSWR<Result[]>("/api/admin/results", fetcher)
  const [form, setForm] = useState<Partial<Result>>({
    drawId: "",
    winningNumber: "",
    publishedAt: new Date().toISOString().slice(0, 16),
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  async function submit() {
    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `/api/admin/results/${editingId}` : "/api/admin/results"
    const payload = {
      ...form,
      // allow datetime-local input
      publishedAt: form.publishedAt && !form.publishedAt.endsWith("Z") ? form.publishedAt + "Z" : form.publishedAt,
    }
    const res = await fetch(url, { method, body: JSON.stringify(payload) })
    if (!res.ok) return toast({ title: "Failed", description: "Could not save result" })
    await mutate()
    setForm({ drawId: "", winningNumber: "", publishedAt: new Date().toISOString().slice(0, 16) })
    setEditingId(null)
    toast({ title: "Saved", description: "Result saved successfully" })
  }

  async function onDelete(id: string) {
    const res = await fetch(`/api/admin/results/${id}`, { method: "DELETE" })
    if (!res.ok) return toast({ title: "Failed", description: "Could not delete result" })
    await mutate()
    toast({ title: "Deleted", description: "Result removed" })
  }

  function startEdit(r: Result) {
    setEditingId(r.id)
    setForm({
      drawId: r.drawId,
      winningNumber: r.winningNumber,
      publishedAt: r.publishedAt.slice(0, 16),
    })
  }

  return (
    <>
      <AdminTopbar title="Results & Winners" />
      <main className="p-4 md:p-6 space-y-4">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="font-heading text-lg font-semibold">{editingId ? "Edit Result" : "Add Result"}</h2>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
            <label className="text-sm">
              <div className="label">Draw ID</div>
              <input
                className="mt-1 w-full h-10 rounded-md border px-3"
                value={form.drawId || ""}
                onChange={(e) => setForm((f) => ({ ...f, drawId: e.target.value }))}
                placeholder="KR-612"
              />
            </label>
            <label className="text-sm">
              <div className="label">Winning Number</div>
              <input
                className="mt-1 w-full h-10 rounded-md border px-3"
                value={form.winningNumber || ""}
                onChange={(e) => setForm((f) => ({ ...f, winningNumber: e.target.value }))}
                placeholder="KR 732914"
              />
            </label>
            <label className="text-sm">
              <div className="label">Published At</div>
              <input
                type="datetime-local"
                className="mt-1 w-full h-10 rounded-md border px-3"
                value={form.publishedAt || ""}
                onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
              />
            </label>
            <div className="flex items-end gap-2">
              <button onClick={submit} className="btn btn-brand w-full">
                {editingId ? "Update" : "Add Result"}
              </button>
              {editingId ? (
                <button
                  className="btn btn-accent w-full"
                  onClick={() => {
                    setEditingId(null)
                    setForm({ drawId: "", winningNumber: "", publishedAt: new Date().toISOString().slice(0, 16) })
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
                  <th className="py-2 pr-4">Draw</th>
                  <th className="py-2 pr-4">Winning Number</th>
                  <th className="py-2 pr-4">Published At</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b">
                {(data || []).map((r) => (
                  <tr key={r.id}>
                    <td className="py-2 pr-4">{r.drawId}</td>
                    <td className="py-2 pr-4 font-semibold">{r.winningNumber}</td>
                    <td className="py-2 pr-4">{new Date(r.publishedAt).toLocaleString()}</td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <button className="h-8 px-3 rounded-md border hover:bg-accent" onClick={() => startEdit(r)}>
                          Edit
                        </button>
                        <button
                          className="h-8 px-3 rounded-md border text-white bg-[var(--accent-red)] hover:opacity-90"
                          onClick={() => onDelete(r.id)}
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
