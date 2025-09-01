"use client"

import useSWR from "swr"
import { useState } from "react"
import { AdminTopbar } from "@/components/admin/topbar"
import { useToast } from "@/hooks/use-toast"

type Draw = {
  id: string
  name: string
  date: string
  status: "Scheduled" | "Published"
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminDrawsPage() {
  const { toast } = useToast()
  const { data, mutate, isLoading } = useSWR<Draw[]>("/api/admin/draws", fetcher)
  const [form, setForm] = useState<Partial<Draw>>({ name: "", date: "", status: "Scheduled" })
  const [editingId, setEditingId] = useState<string | null>(null)

  async function submit() {
    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `/api/admin/draws/${editingId}` : "/api/admin/draws"
    const res = await fetch(url, { method, body: JSON.stringify(form) })
    if (!res.ok) return toast({ title: "Failed", description: "Could not save draw" })
    await mutate()
    setForm({ name: "", date: "", status: "Scheduled" })
    setEditingId(null)
    toast({ title: "Saved", description: "Draw saved successfully" })
  }

  async function onDelete(id: string) {
    const res = await fetch(`/api/admin/draws/${id}`, { method: "DELETE" })
    if (!res.ok) return toast({ title: "Failed", description: "Could not delete draw" })
    await mutate()
    toast({ title: "Deleted", description: "Draw removed" })
  }

  function startEdit(d: Draw) {
    setEditingId(d.id)
    setForm({ name: d.name, date: d.date, status: d.status })
  }

  return (
    <>
      <AdminTopbar title="Draws" />
      <main className="p-4 md:p-6 space-y-4">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="font-heading text-lg font-semibold">{editingId ? "Edit Draw" : "Add Draw"}</h2>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
            <label className="text-sm">
              <div className="label">Name</div>
              <input
                className="mt-1 w-full h-10 rounded-md border px-3"
                value={form.name || ""}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Karunya"
              />
            </label>
            <label className="text-sm">
              <div className="label">Date</div>
              <input
                type="date"
                className="mt-1 w-full h-10 rounded-md border px-3"
                value={form.date || ""}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </label>
            <label className="text-sm">
              <div className="label">Status</div>
              <select
                className="mt-1 w-full h-10 rounded-md border px-3"
                value={form.status || "Scheduled"}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Draw["status"] }))}
              >
                <option>Scheduled</option>
                <option>Published</option>
              </select>
            </label>
            <div className="flex items-end gap-2">
              <button onClick={submit} className="btn btn-brand w-full">
                {editingId ? "Update" : "Add Draw"}
              </button>
              {editingId ? (
                <button
                  className="btn btn-accent w-full"
                  onClick={() => {
                    setEditingId(null)
                    setForm({ name: "", date: "", status: "Scheduled" })
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
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b">
                {(data || []).map((d) => (
                  <tr key={d.id}>
                    <td className="py-2 pr-4 font-mono">{d.id}</td>
                    <td className="py-2 pr-4">{d.name}</td>
                    <td className="py-2 pr-4">{d.date}</td>
                    <td className="py-2 pr-4">
                      <span className="nav-pill">{d.status}</span>
                    </td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <button className="h-8 px-3 rounded-md border hover:bg-accent" onClick={() => startEdit(d)}>
                          Edit
                        </button>
                        <button
                          className="h-8 px-3 rounded-md border text-white bg-[var(--accent-red)] hover:opacity-90"
                          onClick={() => onDelete(d.id)}
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
