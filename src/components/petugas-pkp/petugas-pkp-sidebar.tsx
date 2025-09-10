'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import type { AuthUser } from '@/lib/auth'
import { toast } from 'sonner'

interface PetugasPKPSidebarProps {
  user: AuthUser
}

export function PetugasPKPSidebar({ user }: PetugasPKPSidebarProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Logout berhasil')
        router.push('/login')
      }
    } catch (error) {
      toast.error('Gagal logout')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
            <div className="text-white text-lg font-bold">PKP</div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Petugas PKP</h1>
            <p className="text-sm text-gray-500">Panel Kontrol</p>
          </div>
        </div>

        {/* User Info */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <div className="text-green-600 text-lg font-semibold">
                {user.nama.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{user.nama}</p>
              <p className="text-sm text-gray-600 truncate">@{user.username}</p>
            </div>
          </div>
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
              Petugas PKP
            </Badge>
          </div>
        </Card>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          <Link href="/petugas-pkp" className="block">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 text-left font-normal hover:bg-green-50 hover:text-green-700"
            >
              <div className="w-5 h-5 mr-3 bg-green-100 rounded flex-shrink-0"></div>
              Dashboard
            </Button>
          </Link>
          
          <Link href="/petugas-pkp/data-pkp" className="block">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 text-left font-normal hover:bg-green-50 hover:text-green-700"
            >
              <div className="w-5 h-5 mr-3 bg-blue-100 rounded flex-shrink-0"></div>
              Data PKP
            </Button>
          </Link>
          
          <Link href="/petugas-pkp/wilayah-ar" className="block">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 text-left font-normal hover:bg-green-50 hover:text-green-700"
            >
              <div className="w-5 h-5 mr-3 bg-purple-100 rounded flex-shrink-0"></div>
              Wilayah AR
            </Button>
          </Link>
          
          <Link href="/petugas-pkp/survey" className="block">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 text-left font-normal hover:bg-green-50 hover:text-green-700"
            >
              <div className="w-5 h-5 mr-3 bg-orange-100 rounded flex-shrink-0"></div>
              Perencanaan Survey
            </Button>
          </Link>
          
          <Link href="/petugas-pkp/wawancara" className="block">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 text-left font-normal hover:bg-green-50 hover:text-green-700"
            >
              <div className="w-5 h-5 mr-3 bg-red-100 rounded flex-shrink-0"></div>
              Wawancara
            </Button>
          </Link>
          
          <Link href="/petugas-pkp/tarif-sik" className="block">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 text-left font-normal hover:bg-green-50 hover:text-green-700"
            >
              <div className="w-5 h-5 mr-3 bg-yellow-100 rounded flex-shrink-0"></div>
              Tarif SIK
            </Button>
          </Link>
          
          <Link href="/petugas-pkp/pencairan-sik" className="block">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 text-left font-normal hover:bg-green-50 hover:text-green-700"
            >
              <div className="w-5 h-5 mr-3 bg-indigo-100 rounded flex-shrink-0"></div>
              Pencairan SIK
            </Button>
          </Link>
          
          <Link href="/petugas-pkp/profile" className="block">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 text-left font-normal hover:bg-green-50 hover:text-green-700"
            >
              <div className="w-5 h-5 mr-3 bg-gray-100 rounded flex-shrink-0"></div>
              Profil
            </Button>
          </Link>
        </nav>

        <Separator className="my-6" />

        {/* Logout Button */}
        <Button 
          variant="outline" 
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
        >
          {isLoading ? 'Logging out...' : 'Keluar'}
        </Button>
      </div>
    </div>
  )
}