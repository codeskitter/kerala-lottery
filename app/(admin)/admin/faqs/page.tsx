"use client"

import useSWR from "swr"
import { useState } from "react"
import { AdminTopbar } from "@/components/admin/topbar"
import { useToast } from "@/hooks/use-toast"

type FAQ = {
  id: string
  question: string
  answer: string
  category: string
  display_order: number
  is_active: boolean
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminFAQsPage() {
  const { toast } = useToast()
  const { data, mutate, isLoading } = useSWR<FAQ[]>("/api/admin/content/faqs", fetcher)
  const [form, setForm] = useState<Partial<FAQ>>({
    question: "",
    answer: "",
    category: "general",
    display_order: 1,
    is_active: true,
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  async function submit() {
    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `/api/admin/content/faqs/${editingId}` : "/api/admin/content/faqs"
    const res = await fetch(url, { method, body: JSON.stringify(form) })
    if (!res.ok) return toast({ title: "Failed", description: "Could not save FAQ" })
    await mutate()
    setForm({
      question: "",
      answer: "",
      category: "general",
      display_order: 1,
      is_active: true,
    })
    setEditingId(null)
    toast({ title: "Saved", description: "FAQ saved successfully" })
  }

  async function onDelete(id: string) {
    const res = await fetch(`/api/admin/content/faqs/${id}`, { method: "DELETE" })
    if (!res.ok) return toast({ title: "Failed", description: "Could not delete FAQ" })
    await mutate()
    toast({ title: "Deleted", description: "FAQ removed" })
  }

  function startEdit(faq: FAQ) {
    setEditingId(faq.id)
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      display_order: faq.display_order,
      is_active: faq.is_active,
    })
  }

  return (
    <>
      <AdminTopbar title="FAQs" />
      <main className="p-4 md:p-6 space-y-4">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="font-heading text-lg font-semibold">{editingId ? "Edit FAQ" : "Add FAQ"}</h2>
          <div className="mt-3 space-y-4">
            <label className="text-sm">
              <div className="label">Question</div>
              <input
                className="mt-1 w-full h-10 rounded-md border px-3"
                value={form.question || ""}
                onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
                placeholder="Frequently asked question..."
              />
            </label>

            <label className="text-sm">
              <div className="label">Answer</div>
              <textarea
                className="mt-1 w-full rounded-md border px-3 py-2"
                rows={4}
                value={form.answer || ""}
                onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
                placeholder="Answer to the question..."
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="text-sm">
                <div className="label">Category</div>
                <select
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.category || "general"}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                >
                  <option value="general">General</option>
                  <option value="tickets">Tickets</option>
                  <option value="results">Results</option>
                  <option value="prizes">Prizes</option>
                  <option value="payment">Payment</option>
                  <option value="legal">Legal</option>
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
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.is_active ?? true}
                    onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                  />
                  Active
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={submit} className="btn btn-brand">
                {editingId ? "Update FAQ" : "Add FAQ"}
              </button>
              {editingId ? (
                <button
                  className="btn btn-accent"
                  onClick={() => {
                    setEditingId(null)
                    setForm({
                      question: "",
                      answer: "",
                      category: "general",
                      display_order: 1,
                      is_active: true,
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
                  <th className="py-2 pr-4">Question</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Order</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b">
                {(data || []).map((faq) => (
                  <tr key={faq.id}>
                    <td className="py-2 pr-4 max-w-xs truncate">{faq.question}</td>
                    <td className="py-2 pr-4">
                      <span className="nav-pill">{faq.category}</span>
                    </td>
                    <td className="py-2 pr-4">{faq.display_order}</td>
                    <td className="py-2 pr-4">
                      <span
                        className={`nav-pill ${faq.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {faq.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <button className="h-8 px-3 rounded-md border hover:bg-accent" onClick={() => startEdit(faq)}>
                          Edit
                        </button>
                        <button
                          className="h-8 px-3 rounded-md border text-white bg-[var(--accent-red)] hover:opacity-90"
                          onClick={() => onDelete(faq.id)}
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
