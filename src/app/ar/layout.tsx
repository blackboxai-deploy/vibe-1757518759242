import { requireRole } from '@/lib/auth'
import { ARSidebar } from '@/components/ar/ar-sidebar'

export default async function ARLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Require AR role
  const user = await requireRole(['ar'])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ARSidebar user={user} />
      <main className="flex-1 ml-64">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}