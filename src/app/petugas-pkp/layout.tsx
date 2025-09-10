import { requireRole } from '@/lib/auth'
import { PetugasPKPSidebar } from '@/components/petugas-pkp/petugas-pkp-sidebar'

export default async function PetugasPKPLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Require petugas_pkp role
  const user = await requireRole(['petugas_pkp'])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <PetugasPKPSidebar user={user} />
      <main className="flex-1 ml-64">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}