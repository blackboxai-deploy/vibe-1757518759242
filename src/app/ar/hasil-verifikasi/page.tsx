'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock data hasil verifikasi
const mockHasilVerifikasi = [
  {
    id: 1,
    nomor_kasus: 'PKP-2025-001',
    nama_wp: 'PT. Contoh Usaha Jaya',
    npwp: '12.345.678.9-012.345',
    tanggal_verifikasi: '2025-01-25',
    petugas_verifikasi: 'Test Petugas 2',
    wp_ditemukan: true,
    alamat_sesuai: true,
    alamat_baru: null,
    alamat_usaha_sama: true,
    alamat_usaha: null,
    kantor_virtual: false,
    klu_sesuai: true,
    klu_baru: null,
    deskripsi_usaha: 'Perusahaan manufaktur produk elektronik dengan produk utama speaker dan amplifier audio',
    omzet_sebelumnya: 2500000000,
    estimasi_omzet: 3000000000,
    foto_tersedia: true,
    maps_lokasi: 'Via Aplikasi Matoa',
    rate_wp: 8
  }
]

export default function HasilVerifikasiPage() {
  const handleLihatDetail = (data: any) => {
    // In real implementation, this would show detailed modal/page
    console.log('Detail verifikasi:', data)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hasil Verifikasi Lapangan</h1>
        <p className="text-gray-600 mt-2">Lihat detail hasil verifikasi yang dilakukan Petugas PKP</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{mockHasilVerifikasi.length}</div>
            <p className="text-sm text-gray-600">Total Verifikasi</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {mockHasilVerifikasi.filter(d => d.wp_ditemukan).length}
            </div>
            <p className="text-sm text-gray-600">WP Ditemukan</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(mockHasilVerifikasi.reduce((sum, d) => sum + d.rate_wp, 0) / mockHasilVerifikasi.length)}
            </div>
            <p className="text-sm text-gray-600">Rata-rata Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Hasil Verifikasi Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Hasil Verifikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nomor Kasus</TableHead>
                  <TableHead>Nama WP</TableHead>
                  <TableHead>Tanggal Verifikasi</TableHead>
                  <TableHead>Status Verifikasi</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHasilVerifikasi.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="font-mono text-sm">{data.nomor_kasus}</TableCell>
                    <TableCell className="font-medium">{data.nama_wp}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(data.tanggal_verifikasi).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="secondary" className={data.wp_ditemukan ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {data.wp_ditemukan ? 'WP Ditemukan' : 'WP Tidak Ditemukan'}
                        </Badge>
                        <br />
                        <Badge variant="secondary" className={data.alamat_sesuai ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {data.alamat_sesuai ? 'Alamat Sesuai' : 'Alamat Tidak Sesuai'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-purple-600">{data.rate_wp}</div>
                        <div className="text-sm text-gray-500">/10</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLihatDetail(data)}
                      >
                        Lihat Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Verifikasi Card */}
      {mockHasilVerifikasi.length > 0 && (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Detail Verifikasi Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            {mockHasilVerifikasi.map((data) => (
              <div key={data.id} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900">Informasi Dasar</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nama WP:</span>
                        <span className="font-medium">{data.nama_wp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">NPWP:</span>
                        <span className="font-mono">{data.npwp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">WP Ditemukan:</span>
                        <Badge variant={data.wp_ditemukan ? 'secondary' : 'destructive'} 
                               className={data.wp_ditemukan ? 'bg-green-100 text-green-800' : ''}>
                          {data.wp_ditemukan ? 'Ya' : 'Tidak'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alamat Sesuai:</span>
                        <Badge variant={data.alamat_sesuai ? 'secondary' : 'destructive'} 
                               className={data.alamat_sesuai ? 'bg-green-100 text-green-800' : ''}>
                          {data.alamat_sesuai ? 'Ya' : 'Tidak'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Business Info */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900">Informasi Usaha</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alamat Usaha:</span>
                        <span className="font-medium">{data.alamat_usaha_sama ? 'Sama dengan utama' : 'Berbeda'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kantor Virtual:</span>
                        <Badge variant={data.kantor_virtual ? 'destructive' : 'secondary'} 
                               className={!data.kantor_virtual ? 'bg-green-100 text-green-800' : ''}>
                          {data.kantor_virtual ? 'Ya' : 'Tidak'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">KLU Sesuai:</span>
                        <Badge variant={data.klu_sesuai ? 'secondary' : 'destructive'} 
                               className={data.klu_sesuai ? 'bg-green-100 text-green-800' : ''}>
                          {data.klu_sesuai ? 'Ya' : 'Tidak'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating WP:</span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-purple-600">{data.rate_wp}</span>
                          <span className="text-gray-500">/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Economic Data */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Data Ekonomi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Omzet Tahun Sebelumnya:</span>
                      <span className="font-medium text-blue-600">
                        {data.omzet_sebelumnya ? formatCurrency(data.omzet_sebelumnya) : 'WP Baru'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimasi Omzet Tahun Ini:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(data.estimasi_omzet)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Deskripsi Detail Usaha</h3>
                  <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                    {data.deskripsi_usaha}
                  </p>
                </div>

                {/* Documentation */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Dokumentasi</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Foto Tersedia:</span>
                      <Badge variant={data.foto_tersedia ? 'secondary' : 'destructive'} 
                             className={data.foto_tersedia ? 'bg-green-100 text-green-800' : ''}>
                        {data.foto_tersedia ? 'Ya' : 'Tidak'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lokasi Maps:</span>
                      <span className="font-medium">{data.maps_lokasi}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}