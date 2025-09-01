import type { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}
