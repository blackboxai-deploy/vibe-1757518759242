'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

interface PKPKewilayahan {
  id: number
  nomor_kasus: string
  npwp: string
  nama_wp: string
   alamat: string
  kelurahan: string
  kecamatan: string
  sudah_input_kpd: boolean
  hasil_wawancara?: {
    wp_ditemukan: boolean
    alamat_sesuai: boolean
    alamat_baru?: string
    alamat_usaha_sama: boolean
    alamat_usaha?: string
    kantor_virtual: boolean
    surat_pernyataan?: boolean
    klu_sesuai: boolean
    klu_baru?: string
    deskripsi_detail_usaha: string
    omzet_tahun_sebelumnya?: number
    estimasi_omzet: number
    aset: Array<{ nama: string; tahun: number; harga: number }>
    biaya: Array<{ nama: string; nominal: number }>
    foto?: string
    maps_lokasi: string
  }
}

export default function KPDKewilayahanPage() {
  const [pkpData, setPKPData] = useState<PKPKewilayahan[]>([
    {
      id: 1,
      nomor_kasus: 'PKP-2025-004',
      npwp: '11.222.333.4-555.666',
      nama_wp: 'UD. Berkah Jaya',
       alamat: 'Jl. Raya Patrang No. 100',
      kelurahan: 'Patrang',
      kecamatan: 'Patrang',
      sudah_input_kpd: false,
      hasil_wawancara: {
        wp_ditemukan: true,
        alamat_sesuai: false,
        alamat_baru: 'Jl. Raya Patrang No. 102',
        alamat_usaha_sama: true,
        kantor_virtual: false,
        klu_sesuai: true,
        deskripsi_detail_usaha: 'Usaha pertanian jagung varietas hibrida, merk Pioneer',
        estimasi_omzet: 500000000,
        aset: [
          { nama: 'Tanah Pertanian', tahun: 2020, harga: 200000000 },
          { nama: 'Traktor', tahun: 2022, harga: 150000000 }
        ],
        biaya: [
          { nama: 'Biaya Sewa Lahan', nominal: 10000000 },
          { nama: 'Biaya Pupuk', nominal: 5000000 }
        ],
        maps_lokasi: 'Lewat Aplikasi Matoa'
      }
    },
    {
      id: 2,
      nomor_kasus: 'PKP-2025-005',
      npwp: '22.333.444.5-666.777',
      nama_wp: 'CV. Mitra Usaha',
       alamat: 'Jl. Sukorambi Raya No. 50',
      kelurahan: 'Jubung',
      kecamatan: 'Sukorambi',
      sudah_input_kpd: true,
      hasil_wawancara: {
        wp_ditemukan: true,
        alamat_sesuai: true,
        alamat_usaha_sama: false,
        alamat_usaha: 'Kawasan Industri Sukorambi Blok A-5',
        kantor_virtual: true,
        surat_pernyataan: true,
        klu_sesuai: false,
        klu_baru: '25110',
        deskripsi_detail_usaha: 'Produksi furniture kayu jati dan mahoni untuk ekspor',
        omzet_tahun_sebelumnya: 2000000000,
        estimasi_omzet: 2500000000,
        aset: [
          { nama: 'Mesin Potong Kayu', tahun: 2021, harga: 500000000 },
          { nama: 'Gudang Pabrik', tahun: 2019, harga: 1000000000 }
        ],
        biaya: [
          { nama: 'Biaya Listrik Pabrik', nominal: 50000000 },
          { nama: 'Biaya Transport', nominal: 25000000 }
        ],
        foto: 'foto_cv_mitra_usaha.jpg',
        maps_lokasi: '-8.1578, 113.7063'
      }
    }
  ])

  const [selectedPKP, setSelectedPKP] = useState<PKPKewilayahan | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  const handleMarkKPDInput = (id: number) => {
    setPKPData(prev => prev.map(item => 
      item.id === id 
        ? { ...item, sudah_input_kpd: true }
        : item
    ))
    
    const pkpName = pkpData.find(p => p.id === id)?.nama_wp
    toast.success(`KPD untuk ${pkpName} berhasil ditandai sebagai sudah input`)
  }

  const viewHasilWawancara = (pkp: PKPKewilayahan) => {
    setSelectedPKP(pkp)
    setShowDetail(true)
  }

  const pendingKPD = pkpData.filter(p => !p.sudah_input_kpd)
  const completedKPD = pkpData.filter(p => p.sudah_input_kpd)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Input KPD Kewilayahan</h1>
        <p className="text-gray-600 mt-2">Manajemen input KPD untuk WP kewilayahan yang sudah diverifikasi</p>
      </div>

      {/* Warning untuk pending input */}
      {pendingKPD.length > 0 && (
        <Card className="border-l-4 border-l-orange-500 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Peringatan Input KPD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-3">
              Ada {pendingKPD.length} WP yang sudah diverifikasi namun belum diinput KPD
            </p>
            <div className="space-y-2">
              {pendingKPD.map((pkp) => (
                <div key={pkp.id} className="flex items-center justify-between p-3 bg-white rounded border border-orange-200">
                  <div>
                    <p className="font-medium text-orange-800">{pkp.nama_wp}</p>
                     <p className="text-sm text-orange-600">
                      {pkp.nomor_kasus} • NPWP: {pkp.npwp}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewHasilWawancara(pkp)}
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      Lihat Hasil
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleMarkKPDInput(pkp.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Tandai Input KPD
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{pkpData.length}</div>
            <p className="text-sm text-gray-600">Total WP Kewilayahan</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{completedKPD.length}</div>
            <p className="text-sm text-gray-600">Sudah Input KPD</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{pendingKPD.length}</div>
            <p className="text-sm text-gray-600">Pending Input KPD</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {pkpData.filter(p => p.hasil_wawancara).length}
            </div>
            <p className="text-sm text-gray-600">Sudah Verifikasi</p>
          </CardContent>
        </Card>
      </div>

      {/* Data KPD */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar WP Kewilayahan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pkpData.map((pkp) => (
              <div 
                key={pkp.id}
                className={`border rounded-lg p-4 space-y-3 ${
                  pkp.sudah_input_kpd ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{pkp.nama_wp}</h3>
                    <p className="text-sm text-gray-600">
                      {pkp.nomor_kasus} • NPWP: {pkp.npwp}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      variant={pkp.sudah_input_kpd ? "secondary" : "outline"}
                      className={pkp.sudah_input_kpd ? "bg-green-100 text-green-800" : "border-orange-200 text-orange-700"}
                    >
                      {pkp.sudah_input_kpd ? 'KPD Input' : 'Pending'}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewHasilWawancara(pkp)}
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      Lihat Verifikasi
                    </Button>
                    {!pkp.sudah_input_kpd && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkKPDInput(pkp.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Input KPD
                      </Button>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-600">Alamat</Label>
                    <p>{pkp.alamat}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Wilayah</Label>
                    <p>{pkp.kecamatan}, {pkp.kelurahan}</p>
                  </div>
 
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <p className={pkp.sudah_input_kpd ? 'text-green-700 font-medium' : 'text-orange-700'}>
                      {pkp.sudah_input_kpd ? 'Selesai' : 'Perlu Input KPD'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog Detail Hasil Wawancara */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Hasil Verifikasi Lapangan</DialogTitle>
            <DialogDescription>
              Data hasil wawancara oleh Petugas PKP untuk {selectedPKP?.nama_wp}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPKP?.hasil_wawancara && (
            <div className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informasi Dasar WP</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-gray-600">WP Ditemukan?</Label>
                      <p className={selectedPKP.hasil_wawancara.wp_ditemukan ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                        {selectedPKP.hasil_wawancara.wp_ditemukan ? 'Ya' : 'Tidak'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Alamat WP</Label>
                      <p className={selectedPKP.hasil_wawancara.alamat_sesuai ? 'text-green-700' : 'text-orange-700'}>
                        {selectedPKP.hasil_wawancara.alamat_sesuai ? 'Sesuai' : 'Tidak Sesuai'}
                      </p>
                      {selectedPKP.hasil_wawancara.alamat_baru && (
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Alamat Baru:</strong> {selectedPKP.hasil_wawancara.alamat_baru}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alamat Usaha */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Alamat Usaha</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-gray-600">Alamat Usaha sama dengan Alamat Utama?</Label>
                      <p className={selectedPKP.hasil_wawancara.alamat_usaha_sama ? 'text-green-700 font-medium' : 'text-orange-700 font-medium'}>
                        {selectedPKP.hasil_wawancara.alamat_usaha_sama ? 'Sama' : 'Tidak Sama'}
                      </p>
                    </div>
                    {selectedPKP.hasil_wawancara.alamat_usaha && (
                      <div>
                        <Label className="text-gray-600">Alamat Usaha WP:</Label>
                        <p className="font-medium">{selectedPKP.hasil_wawancara.alamat_usaha}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Kantor Virtual */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kantor Virtual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-gray-600">Apakah WP Berada Di Kantor Virtual?</Label>
                      <p className={selectedPKP.hasil_wawancara.kantor_virtual ? 'text-orange-700 font-medium' : 'text-green-700 font-medium'}>
                        {selectedPKP.hasil_wawancara.kantor_virtual ? 'Ya' : 'Tidak'}
                      </p>
                    </div>
                    {selectedPKP.hasil_wawancara.kantor_virtual && (
                      <div>
                        <Label className="text-gray-600">Sudah Menyampaikan Surat Pernyataan?</Label>
                        <p className={selectedPKP.hasil_wawancara.surat_pernyataan ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                          {selectedPKP.hasil_wawancara.surat_pernyataan ? 'Ya' : 'Tidak'}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* KLU */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Klasifikasi Lapangan Usaha (KLU)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-gray-600">KLU Sesuai Data?</Label>
                      <p className={selectedPKP.hasil_wawancara.klu_sesuai ? 'text-green-700 font-medium' : 'text-orange-700 font-medium'}>
                        {selectedPKP.hasil_wawancara.klu_sesuai ? 'Sesuai' : 'Tidak Sesuai'}
                      </p>
                    </div>
                    {selectedPKP.hasil_wawancara.klu_baru && (
                      <div>
                        <Label className="text-gray-600">KLU Baru:</Label>
                        <p className="font-medium">{selectedPKP.hasil_wawancara.klu_baru}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Detail Usaha */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Deskripsi Detail Usaha</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedPKP.hasil_wawancara.deskripsi_detail_usaha}</p>
                </CardContent>
              </Card>

              {/* Data Ekonomi */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Detail Data Ekonomi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedPKP.hasil_wawancara.omzet_tahun_sebelumnya && (
                      <div>
                        <Label className="text-gray-600">Omzet Tahun Sebelumnya:</Label>
                        <p className="font-bold text-blue-700">
                          Rp {selectedPKP.hasil_wawancara.omzet_tahun_sebelumnya.toLocaleString('id-ID')}
                        </p>
                      </div>
                    )}
                    <div>
                      <Label className="text-gray-600">Estimasi Omzet Tahun Ini:</Label>
                      <p className="font-bold text-green-700">
                        Rp {selectedPKP.hasil_wawancara.estimasi_omzet.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Daftar Aset */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Daftar Aset</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedPKP.hasil_wawancara.aset.map((aset, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded border">
                        <div>
                          <p className="font-medium text-blue-900">{aset.nama}</p>
                          <p className="text-sm text-blue-700">Tahun: {aset.tahun}</p>
                        </div>
                        <p className="font-bold text-blue-700">
                          Rp {aset.harga.toLocaleString('id-ID')}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Daftar Biaya Riil */}
              {selectedPKP.hasil_wawancara.biaya.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Daftar Biaya Riil</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedPKP.hasil_wawancara.biaya.map((biaya, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded border">
                          <p className="font-medium text-yellow-900">{biaya.nama}</p>
                          <p className="font-bold text-yellow-700">
                            Rp {biaya.nominal.toLocaleString('id-ID')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Foto & Lokasi */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Foto & Maps Lokasi WP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600">Foto:</Label>
                      {selectedPKP.hasil_wawancara.foto ? (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded">
                          <p className="text-green-700 font-medium">✅ Foto tersimpan</p>
                          <p className="text-sm text-green-600">{selectedPKP.hasil_wawancara.foto}</p>
                        </div>
                      ) : (
                        <p className="text-gray-500 mt-2">Tidak ada foto</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-gray-600">Maps Lokasi WP:</Label>
                      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-blue-700 font-medium">📍 {selectedPKP.hasil_wawancara.maps_lokasi}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <DialogFooter className="mt-6">
            <Button onClick={() => setShowDetail(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}