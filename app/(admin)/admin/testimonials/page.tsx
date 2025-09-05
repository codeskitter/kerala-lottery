"use client"

import useSWR from "swr"
import { useState } from "react"
import { AdminTopbar } from "@/components/admin/topbar"
import { useToast } from "@/hooks/use-toast"

type Testimonial = {
  id: string
  name: string
  location?: string
  avatar_url?: string
  testimonial: string
  prize_amount?: number
  win_date?: string
  rating: number
  is_featured: boolean
  is_active: boolean
  display_order: number
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminTestimonialsPage() {
  const { toast } = useToast()
  const { data, mutate, isLoading } = useSWR<Testimonial[]>("/api/admin/content/testimonials", fetcher)
  const [form, setForm] = useState<Partial<Testimonial>>({
    name: "",
    location: "",
    testimonial: "",
    prize_amount: 0,
    win_date: "",
    rating: 5,
    is_featured: false,
    is_active: true,
    display_order: 1,
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  async function submit() {
    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `/api/admin/content/testimonials/${editingId}` : "/api/admin/content/testimonials"
    const res = await fetch(url, { method, body: JSON.stringify(form) })
    if (!res.ok) return toast({ title: "Failed", description: "Could not save testimonial" })
    await mutate()
    setForm({
      name: "",
      location: "",
      testimonial: "",
      prize_amount: 0,
      win_date: "",
      rating: 5,
      is_featured: false,
      is_active: true,
      display_order: 1,
    })
    setEditingId(null)
    toast({ title: "Saved", description: "Testimonial saved successfully" })
  }

  async function onDelete(id: string) {
    const res = await fetch(`/api/admin/content/testimonials/${id}`, { method: "DELETE" })
    if (!res.ok) return toast({ title: "Failed", description: "Could not delete testimonial" })
    await mutate()
    toast({ title: "Deleted", description: "Testimonial removed" })
  }

  function startEdit(testimonial: Testimonial) {
    setEditingId(testimonial.id)
    setForm({
      name: testimonial.name,
      location: testimonial.location || "",
      testimonial: testimonial.testimonial,
      prize_amount: testimonial.prize_amount || 0,
      win_date: testimonial.win_date || "",
      rating: testimonial.rating,
      is_featured: testimonial.is_featured,
      is_active: testimonial.is_active,
      display_order: testimonial.display_order,
    })
  }

  return (
    <>
      <AdminTopbar title="Testimonials" />
      <main className="p-4 md:p-6 space-y-4">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="font-heading text-lg font-semibold">{editingId ? "Edit Testimonial" : "Add Testimonial"}</h2>
          <div className="mt-3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="text-sm">
                <div className="label">Name</div>
                <input
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.name || ""}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Winner name"
                />
              </label>
              <label className="text-sm">
                <div className="label">Location</div>
                <input
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.location || ""}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  placeholder="City, State"
                />
              </label>
            </div>

            <label className="text-sm">
              <div className="label">Testimonial</div>
              <textarea
                className="mt-1 w-full rounded-md border px-3 py-2"
                rows={4}
                value={form.testimonial || ""}
                onChange={(e) => setForm((f) => ({ ...f, testimonial: e.target.value }))}
                placeholder="Winner's testimonial..."
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <label className="text-sm">
                <div className="label">Prize Amount (₹)</div>
                <input
                  type="number"
                  min={0}
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.prize_amount ?? 0}
                  onChange={(e) => setForm((f) => ({ ...f, prize_amount: Number(e.target.value) }))}
                />
              </label>
              <label className="text-sm">
                <div className="label">Win Date</div>
                <input
                  type="date"
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.win_date || ""}
                  onChange={(e) => setForm((f) => ({ ...f, win_date: e.target.value }))}
                />
              </label>
              <label className="text-sm">
                <div className="label">Rating</div>
                <select
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.rating ?? 5}
                  onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </label>
              <label className="text-sm">
                <div className="label">Display Order</div>
                <input
                  type="number"
                  min={1}
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.display_order ?? 1}
                  onChange={(e) => setForm((f) => ({ ...f, display_order: Number(e.target.value) }))}
                />
              </label>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_featured ?? false}
                  onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))}
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active ?? true}
                  onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                />
                Active
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={submit} className="btn btn-brand">
                {editingId ? "Update Testimonial" : "Add Testimonial"}
              </button>
              {editingId ? (
                <button
                  className="btn btn-accent"
                  onClick={() => {
                    setEditingId(null)
                    setForm({
                      name: "",
                      location: "",
                      testimonial: "",
                      prize_amount: 0,
                      win_date: "",
                      rating: 5,
                      is_featured: false,
                      is_active: true,
                      display_order: 1,
                    })
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
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Location</th>
                  <th className="py-2 pr-4">Prize</th>
                  <th className="py-2 pr-4">Rating</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b">
                {(data || []).map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td className="py-2 pr-4">{testimonial.name}</td>
                    <td className="py-2 pr-4">{testimonial.location}</td>
                    <td className="py-2 pr-4">₹{testimonial.prize_amount?.toLocaleString()}</td>
                    <td className="py-2 pr-4">{testimonial.rating} ⭐</td>
                    <td className="py-2 pr-4">
                      <div className="flex gap-1">
                        {testimonial.is_featured && (
                          <span className="nav-pill bg-yellow-100 text-yellow-800">Featured</span>
                        )}
                        <span
                          className={`nav-pill ${testimonial.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {testimonial.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="h-8 px-3 rounded-md border hover:bg-accent"
                          onClick={() => startEdit(testimonial)}
                        >
                          Edit
                        </button>
                        <button
                          className="h-8 px-3 rounded-md border text-white bg-[var(--accent-red)] hover:opacity-90"
                          onClick={() => onDelete(testimonial.id)}
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
