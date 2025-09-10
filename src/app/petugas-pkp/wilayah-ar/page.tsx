'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'

interface WilayahMapping {
  kecamatan_id: number
  kecamatan_name: string
  kelurahan: Array<{
    id: number
    nama: string
    ar_id: number | null
    ar_name: string | null
  }>
}

export default function WilayahARPage() {
  // Mock data geografis Kabupaten Jember dengan AR mapping
  const [wilayahData, setWilayahData] = useState<WilayahMapping[]>([
    {
      kecamatan_id: 29,
      kecamatan_name: 'Kaliwates',
      kelurahan: [
        { id: 118, nama: 'Kaliwates', ar_id: 7, ar_name: 'Test AR' },
        { id: 119, nama: 'Tegalgede', ar_id: null, ar_name: null },
        { id: 120, nama: 'Sempusari', ar_id: 4, ar_name: 'Hanafi Khoiron' },
        { id: 121, nama: 'Jember Lor', ar_id: 7, ar_name: 'Test AR' },
        { id: 122, nama: 'Jember Kidul', ar_id: null, ar_name: null },
        { id: 123, nama: 'Kepatihan', ar_id: null, ar_name: null },
        { id: 124, nama: 'Mangli', ar_id: 4, ar_name: 'Hanafi Khoiron' }
      ]
    },
    {
      kecamatan_id: 31,
      kecamatan_name: 'Patrang',
      kelurahan: [
        { id: 129, nama: 'Patrang', ar_id: null, ar_name: null },
        { id: 130, nama: 'Banjarejo', ar_id: 7, ar_name: 'Test AR' },
        { id: 131, nama: 'Jumerto', ar_id: null, ar_name: null },
        { id: 132, nama: 'Slawu', ar_id: 4, ar_name: 'Hanafi Khoiron' },
        { id: 133, nama: 'Gebang', ar_id: null, ar_name: null },
        { id: 134, nama: 'Banjarsengon', ar_id: null, ar_name: null },
        { id: 135, nama: 'Baratan', ar_id: 7, ar_name: 'Test AR' }
      ]
    },
    {
      kecamatan_id: 21,
      kecamatan_name: 'Sukorambi',
      kelurahan: [
        { id: 86, nama: 'Sukorambi', ar_id: null, ar_name: null },
        { id: 87, nama: 'Jubung', ar_id: 4, ar_name: 'Hanafi Khoiron' },
        { id: 88, nama: 'Karangsari', ar_id: null, ar_name: null },
        { id: 89, nama: 'Sokosari', ar_id: null, ar_name: null }
      ]
    }
  ])

  const [arUsers] = useState([
    { id: 4, nama: 'Hanafi Khoiron' },
    { id: 7, nama: 'Test AR' }
  ])

  const handleARAssignment = (kelurahanId: number, arId: number | null, kecamatanId: number) => {
    setWilayahData(prev => prev.map(kecamatan => {
      if (kecamatan.kecamatan_id === kecamatanId) {
        return {
          ...kecamatan,
          kelurahan: kecamatan.kelurahan.map(kelurahan => {
            if (kelurahan.id === kelurahanId) {
              const arName = arId ? arUsers.find(ar => ar.id === arId)?.nama || null : null
              return {
                ...kelurahan,
                ar_id: arId,
                ar_name: arName
              }
            }
            return kelurahan
          })
        }
      }
      return kecamatan
    }))

    const arName = arId ? arUsers.find(ar => ar.id === arId)?.nama : 'Tidak ada AR'
    const kelurahanName = wilayahData
      .find(k => k.kecamatan_id === kecamatanId)
      ?.kelurahan.find(kel => kel.id === kelurahanId)?.nama

    toast.success(`${kelurahanName} berhasil di-assign ke AR: ${arName}`)
  }

  const getAssignmentStats = () => {
    let totalKelurahan = 0
    let assignedKelurahan = 0

    wilayahData.forEach(kecamatan => {
      totalKelurahan += kecamatan.kelurahan.length
      assignedKelurahan += kecamatan.kelurahan.filter(kel => kel.ar_id !== null).length
    })

    return { total: totalKelurahan, assigned: assignedKelurahan, unassigned: totalKelurahan - assignedKelurahan }
  }

  const stats = getAssignmentStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Wilayah AR</h1>
        <p className="text-gray-600 mt-2">Mapping Account Representative ke wilayah kelurahan</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-sm text-gray-600">Total Kelurahan</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.assigned}</div>
            <p className="text-sm text-gray-600">Sudah Ada AR</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.unassigned}</div>
            <p className="text-sm text-gray-600">Belum Ada AR</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{arUsers.length}</div>
            <p className="text-sm text-gray-600">Total AR Tersedia</p>
          </CardContent>
        </Card>
      </div>

      {/* Mapping Interface per Kecamatan */}
      <div className="space-y-6">
        {wilayahData.map((kecamatan) => (
          <Card key={kecamatan.kecamatan_id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Kecamatan {kecamatan.kecamatan_name}
                <Badge variant="secondary">
                  {kecamatan.kelurahan.filter(k => k.ar_id !== null).length}/{kecamatan.kelurahan.length} assigned
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kecamatan.kelurahan.map((kelurahan) => (
                  <div 
                    key={kelurahan.id}
                    className="p-4 border border-gray-200 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{kelurahan.nama}</h3>
                      <Badge 
                        variant={kelurahan.ar_id ? "secondary" : "outline"}
                        className={kelurahan.ar_id ? "bg-green-100 text-green-800" : "border-orange-200 text-orange-700"}
                      >
                        {kelurahan.ar_id ? 'Assigned' : 'No AR'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {kelurahan.ar_id && (
                        <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                          <p className="text-green-800 font-medium">Current AR:</p>
                          <p className="text-green-700">{kelurahan.ar_name}</p>
                        </div>
                      )}
                      
                      <Select
                        value={kelurahan.ar_id?.toString() || ""}
                        onValueChange={(value) => {
                          const arId = value === "" ? null : parseInt(value)
                          handleARAssignment(kelurahan.id, arId, kecamatan.kecamatan_id)
                        }}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Pilih AR" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tanpa AR</SelectItem>
                          {arUsers.map((ar) => (
                            <SelectItem key={ar.id} value={ar.id.toString()}>
                              {ar.nama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Ringkasan Assignment AR</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-blue-900 mb-3">Status Assignment</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Total Kelurahan:</span>
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    {stats.total}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Sudah ada AR:</span>
                  <Badge className="bg-green-100 text-green-800">
                    {stats.assigned}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-orange-700">Belum ada AR:</span>
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    {stats.unassigned}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-purple-900 mb-3">AR Available</h3>
              <div className="space-y-2">
                {arUsers.map((ar) => {
                  const assignedCount = wilayahData.reduce((total, kecamatan) => 
                    total + kecamatan.kelurahan.filter(kel => kel.ar_id === ar.id).length, 0
                  )
                  
                  return (
                    <div key={ar.id} className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm font-medium text-purple-900">{ar.nama}</span>
                      <Badge variant="outline" className="border-purple-200 text-purple-700">
                        {assignedCount} kelurahan
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}