'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface TarifSIK {
  id: number
  kecamatan_id: number
  nama_kecamatan: string
  tarif: number | null
  updated_at: string | null
}

export default function TarifSIKPage() {
  // Mock data 31 kecamatan Kabupaten Jember
  const [tarifData, setTarifData] = useState<TarifSIK[]>([
    { id: 1, kecamatan_id: 1, nama_kecamatan: 'Kencong', tarif: 50000, updated_at: '2025-01-15' },
    { id: 2, kecamatan_id: 2, nama_kecamatan: 'Gumukmas', tarif: null, updated_at: null },
    { id: 3, kecamatan_id: 3, nama_kecamatan: 'Puger', tarif: 75000, updated_at: '2025-01-10' },
    { id: 4, kecamatan_id: 4, nama_kecamatan: 'Wuluhan', tarif: null, updated_at: null },
    { id: 5, kecamatan_id: 5, nama_kecamatan: 'Ambulu', tarif: 60000, updated_at: '2025-01-12' },
    { id: 6, kecamatan_id: 6, nama_kecamatan: 'Tempurejo', tarif: null, updated_at: null },
    { id: 7, kecamatan_id: 7, nama_kecamatan: 'Silo', tarif: 45000, updated_at: '2025-01-08' },
    { id: 8, kecamatan_id: 8, nama_kecamatan: 'Mayang', tarif: null, updated_at: null },
    { id: 9, kecamatan_id: 9, nama_kecamatan: 'Mumbulsari', tarif: 55000, updated_at: '2025-01-14' },
    { id: 10, kecamatan_id: 10, nama_kecamatan: 'Jenggawah', tarif: null, updated_at: null },
    { id: 11, kecamatan_id: 11, nama_kecamatan: 'Ajung', tarif: 65000, updated_at: '2025-01-11' },
    { id: 12, kecamatan_id: 12, nama_kecamatan: 'Rambipuji', tarif: null, updated_at: null },
    { id: 13, kecamatan_id: 13, nama_kecamatan: 'Balung', tarif: 70000, updated_at: '2025-01-09' },
    { id: 14, kecamatan_id: 14, nama_kecamatan: 'Umbulsari', tarif: null, updated_at: null },
    { id: 15, kecamatan_id: 15, nama_kecamatan: 'Semboro', tarif: 50000, updated_at: '2025-01-13' },
    { id: 16, kecamatan_id: 16, nama_kecamatan: 'Jombang', tarif: null, updated_at: null },
    { id: 17, kecamatan_id: 17, nama_kecamatan: 'Sumberbaru', tarif: 45000, updated_at: '2025-01-07' },
    { id: 18, kecamatan_id: 18, nama_kecamatan: 'Tanggul', tarif: null, updated_at: null },
    { id: 19, kecamatan_id: 19, nama_kecamatan: 'Bangsalsari', tarif: 55000, updated_at: '2025-01-06' },
    { id: 20, kecamatan_id: 20, nama_kecamatan: 'Panti', tarif: null, updated_at: null },
    { id: 21, kecamatan_id: 21, nama_kecamatan: 'Sukorambi', tarif: 80000, updated_at: '2025-01-05' },
    { id: 22, kecamatan_id: 22, nama_kecamatan: 'Arjasa', tarif: null, updated_at: null },
    { id: 23, kecamatan_id: 23, nama_kecamatan: 'Pakusari', tarif: 60000, updated_at: '2025-01-04' },
    { id: 24, kecamatan_id: 24, nama_kecamatan: 'Kalisat', tarif: null, updated_at: null },
    { id: 25, kecamatan_id: 25, nama_kecamatan: 'Ledokombo', tarif: 50000, updated_at: '2025-01-03' },
    { id: 26, kecamatan_id: 26, nama_kecamatan: 'Sumberjambe', tarif: null, updated_at: null },
    { id: 27, kecamatan_id: 27, nama_kecamatan: 'Sukowono', tarif: 45000, updated_at: '2025-01-02' },
    { id: 28, kecamatan_id: 28, nama_kecamatan: 'Jelbuk', tarif: null, updated_at: null },
    { id: 29, kecamatan_id: 29, nama_kecamatan: 'Kaliwates', tarif: 100000, updated_at: '2025-01-01' },
    { id: 30, kecamatan_id: 30, nama_kecamatan: 'Sumberejo', tarif: null, updated_at: null },
    { id: 31, kecamatan_id: 31, nama_kecamatan: 'Patrang', tarif: 90000, updated_at: '2025-01-16' }
  ])

  const [editingTarif, setEditingTarif] = useState<number | null>(null)
  const [tarifValue, setTarifValue] = useState('')

  const handleEditTarif = (kecamatanId: number, currentTarif: number | null) => {
    setEditingTarif(kecamatanId)
    setTarifValue(currentTarif ? currentTarif.toString() : '')
  }

  const handleSaveTarif = (kecamatanId: number) => {
    const newTarif = parseInt(tarifValue)
    if (isNaN(newTarif) || newTarif < 0) {
      toast.error('Tarif harus berupa angka valid')
      return
    }

    setTarifData(prev => prev.map(item => {
      if (item.kecamatan_id === kecamatanId) {
        return {
          ...item,
          tarif: newTarif,
          updated_at: new Date().toISOString().split('T')[0]
        }
      }
      return item
    }))

    const kecamatanName = tarifData.find(item => item.kecamatan_id === kecamatanId)?.nama_kecamatan
    toast.success(`Tarif SIK untuk ${kecamatanName} berhasil diperbarui`)
    setEditingTarif(null)
    setTarifValue('')
  }

  const handleCancelEdit = () => {
    setEditingTarif(null)
    setTarifValue('')
  }

  const getStats = () => {
    const setTarif = tarifData.filter(item => item.tarif !== null).length
    const belumSet = tarifData.filter(item => item.tarif === null).length
    const avgTarif = tarifData
      .filter(item => item.tarif !== null)
      .reduce((sum, item) => sum + (item.tarif || 0), 0) / (setTarif || 1)

    return { setTarif, belumSet, avgTarif: Math.round(avgTarif) }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tarif SIK per Kecamatan</h1>
        <p className="text-gray-600 mt-2">Manajemen tarif Surat Izin Kerja untuk setiap kecamatan di Kabupaten Jember</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">31</div>
            <p className="text-sm text-gray-600">Total Kecamatan</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.setTarif}</div>
            <p className="text-sm text-gray-600">Sudah Set Tarif</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.belumSet}</div>
            <p className="text-sm text-gray-600">Belum Set Tarif</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              Rp {stats.avgTarif.toLocaleString('id-ID')}
            </div>
            <p className="text-sm text-gray-600">Rata-rata Tarif</p>
          </CardContent>
        </Card>
      </div>

      {/* Tarif Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Daftar Tarif SIK per Kecamatan
            <Badge variant="secondary">Kabupaten Jember</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tarifData.map((item) => (
              <div 
                key={item.id}
                className={`border rounded-lg p-4 space-y-3 ${
                  item.tarif ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{item.nama_kecamatan}</h3>
                  <Badge 
                    variant={item.tarif ? "secondary" : "outline"}
                    className={item.tarif ? "bg-green-100 text-green-800" : "border-orange-200 text-orange-700"}
                  >
                    {item.tarif ? 'Set' : 'Belum Set'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {item.tarif && editingTarif !== item.kecamatan_id && (
                    <div className="p-2 bg-white rounded border">
                      <p className="text-sm text-gray-600">Tarif Saat Ini:</p>
                      <p className="font-bold text-green-700">
                        Rp {item.tarif.toLocaleString('id-ID')}
                      </p>
                      {item.updated_at && (
                        <p className="text-xs text-gray-500">
                          Update: {new Date(item.updated_at).toLocaleDateString('id-ID')}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {editingTarif === item.kecamatan_id ? (
                    <div className="space-y-2">
                      <Label htmlFor={`tarif-${item.kecamatan_id}`}>Tarif SIK (Rupiah)</Label>
                      <Input
                        id={`tarif-${item.kecamatan_id}`}
                        type="number"
                        value={tarifValue}
                        onChange={(e) => setTarifValue(e.target.value)}
                        placeholder="50000"
                        min="0"
                        step="1000"
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleSaveTarif(item.kecamatan_id)}
                          className="flex-1"
                        >
                          Simpan
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleCancelEdit}
                          className="flex-1"
                        >
                          Batal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditTarif(item.kecamatan_id, item.tarif)}
                      className="w-full"
                    >
                      {item.tarif ? 'Edit Tarif' : 'Set Tarif'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Informasi Tarif SIK</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• <strong>Cakupan:</strong> Semua 31 kecamatan di Kabupaten Jember</p>
          <p>• <strong>Functionality:</strong> Set dan update tarif untuk setiap kecamatan</p>
          <p>• <strong>Validation:</strong> Input tarif dalam rupiah dengan validasi minimum</p>
          <p>• <strong>Tracking:</strong> Riwayat update dan statistik tarif</p>
        </CardContent>
      </Card>
    </div>
  )
}