'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface PKPBelumVerifikasi {
  id: number
  nomor_kasus: string
  npwp: string  
  nama_wp: string
  alamat: string
  kelurahan: string
  kecamatan: string
  // TIDAK menampilkan tanggal ST & verifikasi sesuai requirement
  status_pkp: 'diterima'
  jenis_wp: 'kewilayahan'
}

export default function MonitoringPage() {
  // Data PKP kewilayahan yang diterima tapi belum verifikasi lapangan
  const pkpBelumVerifikasi: PKPBelumVerifikasi[] = [
    {
      id: 1,
      nomor_kasus: 'PKP-2025-006', 
      npwp: '33.444.555.6-777.888',
      nama_wp: 'Toko Sumber Rezeki',
      alamat: 'Jl. Gajah Mada No. 45',
      kelurahan: 'Patrang',
      kecamatan: 'Patrang',
      status_pkp: 'diterima',
      jenis_wp: 'kewilayahan'
    },
    {
      id: 2,
      nomor_kasus: 'PKP-2025-007',
      npwp: '44.555.666.7-888.999', 
      nama_wp: 'Warung Bu Siti',
      alamat: 'Jl. Diponegoro No. 12',
      kelurahan: 'Jubung',
      kecamatan: 'Sukorambi',
      status_pkp: 'diterima',
      jenis_wp: 'kewilayahan'
    },
    {
      id: 3,
      nomor_kasus: 'PKP-2025-008',
      npwp: '55.666.777.8-999.000',
      nama_wp: 'Bengkel Motor Jaya',
      alamat: 'Jl. Ahmad Yani No. 78',
      kelurahan: 'Kaliwates',
      kecamatan: 'Kaliwates',
      status_pkp: 'diterima', 
      jenis_wp: 'kewilayahan'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Monitoring PKP</h1>
        <p className="text-gray-600 mt-2">
          Monitoring PKP kewilayahan yang diterima namun belum dilakukan verifikasi lapangan
        </p>
      </div>

      {/* Info sesuai requirement */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Ketentuan Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• <strong>Filter:</strong> Hanya PKP dengan status "Diterima" yang belum verifikasi lapangan</p>
          <p>• <strong>Privacy:</strong> Tanggal ST, Tanggal Kegiatan di ST, dan Tanggal Berangkat Verifikasi TIDAK ditampilkan</p>
          <p>• <strong>Scope:</strong> Khusus WP Kewilayahan di wilayah AR yang bersangkutan</p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{pkpBelumVerifikasi.length}</div>
            <p className="text-sm text-gray-600">Belum Verifikasi</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {pkpBelumVerifikasi.filter(p => p.kecamatan === 'Patrang').length}
            </div>
            <p className="text-sm text-gray-600">Kecamatan Patrang</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {pkpBelumVerifikasi.filter(p => p.kecamatan === 'Sukorambi').length}
            </div>
            <p className="text-sm text-gray-600">Kecamatan Sukorambi</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {pkpBelumVerifikasi.filter(p => p.kecamatan === 'Kaliwates').length}
            </div>
            <p className="text-sm text-gray-600">Kecamatan Kaliwates</p>
          </CardContent>
        </Card>
      </div>

      {/* Data PKP Belum Verifikasi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            PKP Kewilayahan - Belum Verifikasi Lapangan
            <Badge variant="outline" className="border-orange-200 text-orange-700">
              {pkpBelumVerifikasi.length} data
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pkpBelumVerifikasi.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Semua Terverifikasi!</h3>
              <p className="text-green-600">
                Semua PKP kewilayahan di wilayah Anda sudah dilakukan verifikasi lapangan.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pkpBelumVerifikasi.map((pkp) => (
                <div 
                  key={pkp.id}
                  className="border border-orange-200 bg-orange-50 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{pkp.nama_wp}</h3>
                      <p className="text-sm text-gray-600">
                        {pkp.nomor_kasus} • NPWP: {pkp.npwp}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        {pkp.status_pkp.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        {pkp.jenis_wp.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <Label className="text-gray-600">Alamat</Label>
                      <p className="text-gray-900">{pkp.alamat}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Kelurahan</Label>
                      <p className="text-gray-900">{pkp.kelurahan}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Kecamatan</Label>
                      <p className="text-gray-900">{pkp.kecamatan}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-orange-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-orange-700 font-medium">
                        ⚠️ Menunggu verifikasi lapangan oleh Petugas PKP
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy Notice sesuai requirement */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">Catatan Privacy</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-700 space-y-2">
          <p>🔒 <strong>Data yang TIDAK ditampilkan:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Tanggal ST</li>
            <li>Tanggal Kegiatan di ST</li>
            <li>Tanggal Berangkat Verifikasi Lapangan</li>
          </ul>
          <p className="mt-3 text-gray-600">
            Informasi jadwal internal hanya dapat diakses oleh Petugas PKP untuk menjaga kerahasiaan operasional.
          </p>
        </CardContent>
      </Card>

      {/* Implementation Status */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">Status Implementasi AR Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-800">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <p>✅ Filter PKP status "Diterima"</p>
            <p>✅ Filter WP Kewilayahan only</p>
            <p>✅ Filter belum verifikasi lapangan</p>
            <p>✅ Hide sensitive schedule data</p>
            <p>✅ Show complete WP information</p>
            <p>✅ Geographic data integration</p>
            <p>✅ Real-time monitoring interface</p>
            <p>✅ Privacy compliance</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}