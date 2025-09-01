import { AdminTopbar } from "@/components/admin/topbar"

export default function AdminSettingsPage() {
  return (
    <>
      <AdminTopbar title="Settings" />
      <main className="p-4 md:p-6 space-y-6 max-w-2xl">
        <section className="rounded-lg border p-4 bg-card">
          <h2 className="font-heading text-lg font-semibold">General</h2>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <label className="text-sm">
              <div className="label">Site Name</div>
              <input className="mt-1 w-full h-10 rounded-md border px-3" defaultValue="Mega Kerala Lottery" />
            </label>
            <label className="text-sm">
              <div className="label">Support Phone</div>
              <input className="mt-1 w-full h-10 rounded-md border px-3" defaultValue="+91 12345 67890" />
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="btn btn-brand">Save</button>
            <button className="btn btn-accent">Reset</button>
          </div>
        </section>

        <section className="rounded-lg border p-4 bg-card">
          <h2 className="font-heading text-lg font-semibold">Security</h2>
          <p className="mt-2 text-sm text-muted">
            Authentication is not set up yet. We will add route protection and roles in a later step.
          </p>
        </section>
      </main>
    </>
  )
}
