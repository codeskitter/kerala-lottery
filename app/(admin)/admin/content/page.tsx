"use client"

import useSWR from "swr"
import { useState } from "react"
import { AdminTopbar } from "@/components/admin/topbar"
import { useToast } from "@/hooks/use-toast"

type ContentSection = {
  id: string
  section_key: string
  section_name: string
  title: string
  subtitle?: string
  content?: string
  image_url?: string
  button_text?: string
  button_url?: string
  display_order: number
  is_active: boolean
}

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch")
  }
  const data = await response.json()
  // Ensure we always return an array
  return Array.isArray(data) ? data : []
}

export default function AdminContentPage() {
  const { toast } = useToast()
  const { data = [], mutate, isLoading, error } = useSWR<ContentSection[]>("/api/admin/content/sections", fetcher)
  const [form, setForm] = useState<Partial<ContentSection>>({
    section_key: "",
    section_name: "",
    title: "",
    subtitle: "",
    content: "",
    button_text: "",
    button_url: "",
    display_order: 1,
    is_active: true,
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  async function submit() {
    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `/api/admin/content/sections/${editingId}` : "/api/admin/content/sections"
    const res = await fetch(url, { method, body: JSON.stringify(form) })
    if (!res.ok) return toast({ title: "Failed", description: "Could not save content section" })
    await mutate()
    setForm({
      section_key: "",
      section_name: "",
      title: "",
      subtitle: "",
      content: "",
      button_text: "",
      button_url: "",
      display_order: 1,
      is_active: true,
    })
    setEditingId(null)
    toast({ title: "Saved", description: "Content section saved successfully" })
  }

  async function onDelete(id: string) {
    const res = await fetch(`/api/admin/content/sections/${id}`, { method: "DELETE" })
    if (!res.ok) return toast({ title: "Failed", description: "Could not delete content section" })
    await mutate()
    toast({ title: "Deleted", description: "Content section removed" })
  }

  function startEdit(section: ContentSection) {
    setEditingId(section.id)
    setForm({
      section_key: section.section_key,
      section_name: section.section_name,
      title: section.title,
      subtitle: section.subtitle || "",
      content: section.content || "",
      button_text: section.button_text || "",
      button_url: section.button_url || "",
      display_order: section.display_order,
      is_active: section.is_active,
    })
  }

  return (
    <>
      <AdminTopbar title="Content Management" />
      <main className="p-4 md:p-6 space-y-4">
        <div className="rounded-lg border bg-card p-4">
          <h2 className="font-heading text-lg font-semibold">
            {editingId ? "Edit Content Section" : "Add Content Section"}
          </h2>
          <div className="mt-3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="text-sm">
                <div className="label">Section Key</div>
                <input
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.section_key || ""}
                  onChange={(e) => setForm((f) => ({ ...f, section_key: e.target.value }))}
                  placeholder="hero, about, features"
                />
              </label>
              <label className="text-sm">
                <div className="label">Section Name</div>
                <input
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.section_name || ""}
                  onChange={(e) => setForm((f) => ({ ...f, section_name: e.target.value }))}
                  placeholder="Hero Section"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="text-sm">
                <div className="label">Title</div>
                <input
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.title || ""}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Section title"
                />
              </label>
              <label className="text-sm">
                <div className="label">Subtitle</div>
                <input
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.subtitle || ""}
                  onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                  placeholder="Section subtitle"
                />
              </label>
            </div>

            <label className="text-sm">
              <div className="label">Content</div>
              <textarea
                className="mt-1 w-full rounded-md border px-3 py-2"
                rows={4}
                value={form.content || ""}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Section content..."
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="text-sm">
                <div className="label">Button Text</div>
                <input
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.button_text || ""}
                  onChange={(e) => setForm((f) => ({ ...f, button_text: e.target.value }))}
                  placeholder="Learn More"
                />
              </label>
              <label className="text-sm">
                <div className="label">Button URL</div>
                <input
                  className="mt-1 w-full h-10 rounded-md border px-3"
                  value={form.button_url || ""}
                  onChange={(e) => setForm((f) => ({ ...f, button_url: e.target.value }))}
                  placeholder="/about"
                />
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
                  checked={form.is_active ?? true}
                  onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                />
                Active
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={submit} className="btn btn-brand">
                {editingId ? "Update Section" : "Add Section"}
              </button>
              {editingId ? (
                <button
                  className="btn btn-accent"
                  onClick={() => {
                    setEditingId(null)
                    setForm({
                      section_key: "",
                      section_name: "",
                      title: "",
                      subtitle: "",
                      content: "",
                      button_text: "",
                      button_url: "",
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
          ) : error ? (
            <div className="p-4 text-sm text-red-600">Failed to load content sections. Please try again.</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Key</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Order</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b">
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((section) => (
                    <tr key={section.id}>
                      <td className="py-2 pr-4 font-mono">{section.section_key}</td>
                      <td className="py-2 pr-4">{section.section_name}</td>
                      <td className="py-2 pr-4">{section.title}</td>
                      <td className="py-2 pr-4">{section.display_order}</td>
                      <td className="py-2 pr-4">
                        <span
                          className={`nav-pill ${section.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {section.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="h-8 px-3 rounded-md border hover:bg-accent"
                            onClick={() => startEdit(section)}
                          >
                            Edit
                          </button>
                          <button
                            className="h-8 px-3 rounded-md border text-white bg-[var(--accent-red)] hover:opacity-90"
                            onClick={() => onDelete(section.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-gray-500">
                      No content sections found. Add your first section above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  )
}
