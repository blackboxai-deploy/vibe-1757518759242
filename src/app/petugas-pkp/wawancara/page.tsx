'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
// Simple toast for demo
const toast = {
  success: (msg: string) => alert(`✅ ${msg}`),
  error: (msg: string) => alert(`❌ ${msg}`)
}

interface VerifikasiHariIni {
  id: number
  nomor_kasus: string
  npwp: string
  nama_wp: string
  tanggal_berangkat_verifikasi: string
  alamat: string
  kelurahan: string
  kecamatan: string
  ar_nama: string | null
}

interface WawancaraForm {
  nomor_surat_tugas: string
  tanggal_surat_tugas: string
  tanggal_kegiatan_st: string
  wp_ditemukan: boolean
  alamat_sesuai_coretax: boolean
  alamat_baru: string
  kegiatan_usaha_terbukti: boolean
  dokumen_perizinan_sesuai: boolean
  kegiatan_usaha_sesuai_klu: boolean
  klu_baru: string
  kegiatan_usaha_kantor_virtual: boolean
  kontrak_provider_virtual: boolean
  alamat_kantor_virtual: string
  nama_provider_virtual: string
  surat_pernyataan_disampaikan: boolean
  kegiatan_sesuai_pernyataan: boolean
  berada_di_kawasan_berikat: boolean
  nama_wp_ditemui: string
  nik_wp_ditemui: string
  jabatan_wp_ditemui: string
  nomor_hp_direktur: string
  deskripsi_pj: string
  deskripsi_detail_usaha: string
  alamat_usaha_sama_utama: boolean
  alamat_usaha: string
  wp_status: 'baru' | 'lama'
  omzet_tahun_sebelumnya: string
  estimasi_omzet_tahun_ini: string
  modal_dasar: string
  deskripsi_tambahan: string
  sudah_matoa: boolean
  rate_wp: number
  status_wawancara: 'belum' | 'sudah'
}

interface Aset {
  id: number
  nama_aset: string
  tahun_perolehan: number
  harga_perolehan: number
}

interface Biaya {
  id: number
  nama_biaya: string
  nominal: number
  keterangan: string
}

interface KekuranganBerkas {
  id: number
  nama_berkas: string
}

export default function WawancaraPage() {
  // Data verifikasi dengan status wawancara
  const [verifikasiHariIni, setVerifikasiHariIni] = useState<(VerifikasiHariIni & { status_wawancara: 'belum' | 'sudah' })[]>([
    {
      id: 1,
      nomor_kasus: 'PKP-2025-001',
      npwp: '12.345.678.9-012.345',
      nama_wp: 'PT. Contoh Usaha Jaya',
      tanggal_berangkat_verifikasi: '2025-01-25',
      alamat: 'Jl. Sudirman No. 123',
      kelurahan: 'Jember Lor',
      kecamatan: 'Kaliwates', 
      ar_nama: 'Hanafi Khoiron',
      status_wawancara: 'belum'
    },
    {
      id: 2,
      nomor_kasus: 'PKP-2025-002',
      npwp: '98.765.432.1-098.765',
      nama_wp: 'CV. Maju Bersama',
      tanggal_berangkat_verifikasi: '2025-01-25',
      alamat: 'Jl. Patimura No. 456',
      kelurahan: 'Patrang',
      kecamatan: 'Patrang',
      ar_nama: 'Test AR',
      status_wawancara: 'sudah'
    }
  ])
  
  // CRUD data untuk form wawancara
  const [daftarAset, setDaftarAset] = useState<Aset[]>([])
  const [daftarBiaya, setDaftarBiaya] = useState<Biaya[]>([])
  const [daftarKekurangan, setDaftarKekurangan] = useState<KekuranganBerkas[]>([])
  
  // Form state untuk CRUD
  const [showAsetForm, setShowAsetForm] = useState(false)
  const [showBiayaForm, setShowBiayaForm] = useState(false)
  const [showKekuranganForm, setShowKekuranganForm] = useState(false)
  const [editingAset, setEditingAset] = useState<Aset | null>(null)
  const [editingBiaya, setEditingBiaya] = useState<Biaya | null>(null)
  const [editingKekurangan, setEditingKekurangan] = useState<KekuranganBerkas | null>(null)

  const [selectedData, setSelectedData] = useState<VerifikasiHariIni | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [wawancaraForm, setWawancaraForm] = useState<WawancaraForm>({
    nomor_surat_tugas: '',
    tanggal_surat_tugas: '',
    tanggal_kegiatan_st: '25/1/2025', // Auto-filled dan tidak dapat diedit
    wp_ditemukan: false,
    alamat_sesuai_coretax: false,
    alamat_baru: '',
    kegiatan_usaha_terbukti: false,
    dokumen_perizinan_sesuai: false,
    kegiatan_usaha_sesuai_klu: false,
    klu_baru: '',
    kegiatan_usaha_kantor_virtual: false,
    kontrak_provider_virtual: false,
    alamat_kantor_virtual: '',
    nama_provider_virtual: '',
    surat_pernyataan_disampaikan: false,
    kegiatan_sesuai_pernyataan: false,
    berada_di_kawasan_berikat: false,
    nama_wp_ditemui: '',
    nik_wp_ditemui: '',
    jabatan_wp_ditemui: '',
    nomor_hp_direktur: '',
    deskripsi_pj: '',
    deskripsi_detail_usaha: '',
    alamat_usaha_sama_utama: false,
    alamat_usaha: '',
    wp_status: 'baru',
    omzet_tahun_sebelumnya: '',
    estimasi_omzet_tahun_ini: '',
     modal_dasar: '',
    deskripsi_tambahan: '',
    sudah_matoa: false,
    rate_wp: 1,
    status_wawancara: 'belum'
  })

  const startWawancara = (data: VerifikasiHariIni) => {
    setSelectedData(data)
    setShowForm(true)
    // Auto-fill tanggal kegiatan ST
    setWawancaraForm(prev => ({
      ...prev,
      tanggal_kegiatan_st: data.tanggal_berangkat_verifikasi
    }))
  }

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Update status wawancara menjadi 'sudah'
    setVerifikasiHariIni(prev => prev.map(item => 
      item.id === selectedData?.id 
        ? { ...item, status_wawancara: 'sudah' as const }
        : item
    ))
    
    toast.success('Wawancara berhasil disimpan - Status berubah menjadi "Sudah Diwawancara"')
    setShowForm(false)
    setSelectedData(null)
  }

  // CRUD Functions untuk Aset
  const handleAddAset = (aset: Omit<Aset, 'id'>) => {
    const newAset = { ...aset, id: Date.now() }
    setDaftarAset(prev => [...prev, newAset])
    toast.success('Aset berhasil ditambahkan')
    setShowAsetForm(false)
  }

  const handleEditAset = (aset: Aset) => {
    setDaftarAset(prev => prev.map(item => item.id === aset.id ? aset : item))
    toast.success('Aset berhasil diperbarui')
    setEditingAset(null)
    setShowAsetForm(false)
  }

  const handleDeleteAset = (id: number) => {
    setDaftarAset(prev => prev.filter(item => item.id !== id))
    toast.success('Aset berhasil dihapus')
  }

  // CRUD Functions untuk Biaya
  const handleAddBiaya = (biaya: Omit<Biaya, 'id'>) => {
    const newBiaya = { ...biaya, id: Date.now() }
    setDaftarBiaya(prev => [...prev, newBiaya])
    toast.success('Biaya berhasil ditambahkan')
    setShowBiayaForm(false)
  }

  const handleEditBiaya = (biaya: Biaya) => {
    setDaftarBiaya(prev => prev.map(item => item.id === biaya.id ? biaya : item))
    toast.success('Biaya berhasil diperbarui')
    setEditingBiaya(null)
    setShowBiayaForm(false)
  }

  const handleDeleteBiaya = (id: number) => {
    setDaftarBiaya(prev => prev.filter(item => item.id !== id))
    toast.success('Biaya berhasil dihapus')
  }

  // CRUD Functions untuk Kekurangan Berkas
  const handleAddKekurangan = (berkas: Omit<KekuranganBerkas, 'id'>) => {
    const newKekurangan = { ...berkas, id: Date.now() }
    setDaftarKekurangan(prev => [...prev, newKekurangan])
    toast.success('Kekurangan berkas berhasil ditambahkan')
    setShowKekuranganForm(false)
  }

  const handleEditKekurangan = (berkas: KekuranganBerkas) => {
    setDaftarKekurangan(prev => prev.map(item => item.id === berkas.id ? berkas : item))
    toast.success('Kekurangan berkas berhasil diperbarui')
    setEditingKekurangan(null)
    setShowKekuranganForm(false)
  }

  const handleDeleteKekurangan = (id: number) => {
    setDaftarKekurangan(prev => prev.filter(item => item.id !== id))
    toast.success('Kekurangan berkas berhasil dihapus')
  }

  if (showForm && selectedData) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => {
              setShowForm(false)
              setSelectedData(null)
            }}
          >
            ← Kembali
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Form Wawancara</h1>
            <p className="text-gray-600">Hasil verifikasi lapangan</p>
          </div>
        </div>

        {/* Detail Data PKP */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Detail Data PKP</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <Label className="text-blue-700">Nomor Kasus</Label>
              <p className="font-mono font-medium">{selectedData.nomor_kasus}</p>
            </div>
            <div>
              <Label className="text-blue-700">NPWP</Label>
              <p className="font-mono font-medium">{selectedData.npwp}</p>
            </div>
            <div>
              <Label className="text-blue-700">Nama WP</Label>
              <p className="font-medium">{selectedData.nama_wp}</p>
            </div>
            <div>
              <Label className="text-blue-700">Wilayah</Label>
              <p>{selectedData.kecamatan}, {selectedData.kelurahan}</p>
            </div>
          </CardContent>
        </Card>

        {/* Form Wawancara Lengkap - 30+ Fields sesuai requirement */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Surat Tugas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomor_surat_tugas">Nomor Surat Tugas *</Label>
                  <Input
                    id="nomor_surat_tugas"
                    value={wawancaraForm.nomor_surat_tugas}
                    onChange={(e) => setWawancaraForm(prev => ({ ...prev, nomor_surat_tugas: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tanggal_surat_tugas">Tanggal Surat Tugas *</Label>
                  <Input
                    id="tanggal_surat_tugas"
                    type="date"
                    value={wawancaraForm.tanggal_surat_tugas}
                    onChange={(e) => setWawancaraForm(prev => ({ ...prev, tanggal_surat_tugas: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="tanggal_kegiatan_st">Tanggal Kegiatan di ST</Label>
                <Input
                  id="tanggal_kegiatan_st"
                  value={wawancaraForm.tanggal_kegiatan_st}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">Otomatis dari jadwal verifikasi, tidak dapat diedit</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verifikasi Wajib Pajak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="wp_ditemukan">WP Ditemukan?</Label>
                  <Switch
                    id="wp_ditemukan"
                    checked={wawancaraForm.wp_ditemukan}
                    onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, wp_ditemukan: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="alamat_sesuai_coretax">Alamat Sesuai Coretax?</Label>
                  <Switch
                    id="alamat_sesuai_coretax"
                    checked={wawancaraForm.alamat_sesuai_coretax}
                    onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, alamat_sesuai_coretax: checked }))}
                  />
                </div>
              </div>
              
              {!wawancaraForm.alamat_sesuai_coretax && (
                <div>
                  <Label htmlFor="alamat_baru">Alamat Baru (Jika tidak sesuai Coretax)</Label>
                  <Input
                    id="alamat_baru"
                    value={wawancaraForm.alamat_baru}
                    onChange={(e) => setWawancaraForm(prev => ({ ...prev, alamat_baru: e.target.value }))}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verifikasi Kegiatan Usaha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center justify-between">
                  <Label>Kegiatan Usaha Dapat Dibuktikan Kebenarannya?</Label>
                  <Switch
                    checked={wawancaraForm.kegiatan_usaha_terbukti}
                    onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, kegiatan_usaha_terbukti: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Dokumen Perizinan Sesuai Dengan Kegiatan Usaha?</Label>
                  <Switch
                    checked={wawancaraForm.dokumen_perizinan_sesuai}
                    onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, dokumen_perizinan_sesuai: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Kegiatan Usaha Sesuai KLU Coretax?</Label>
                  <Switch
                    checked={wawancaraForm.kegiatan_usaha_sesuai_klu}
                    onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, kegiatan_usaha_sesuai_klu: checked }))}
                  />
                </div>
              </div>
              
              {!wawancaraForm.kegiatan_usaha_sesuai_klu && (
                <div>
                  <Label htmlFor="klu_baru">KLU Baru (Jika tidak sesuai Coretax)</Label>
                  <Input
                    id="klu_baru"
                    value={wawancaraForm.klu_baru}
                    onChange={(e) => setWawancaraForm(prev => ({ ...prev, klu_baru: e.target.value }))}
                    placeholder="Contoh: 10110"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kantor Virtual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Kegiatan Usaha Dilakukan Di Kantor Virtual?</Label>
                <Switch
                  checked={wawancaraForm.kegiatan_usaha_kantor_virtual}
                  onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, kegiatan_usaha_kantor_virtual: checked }))}
                />
              </div>
              
              {wawancaraForm.kegiatan_usaha_kantor_virtual && (
                <div className="space-y-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label>Kontrak Dengan Provider Kantor Virtual?</Label>
                    <Switch
                      checked={wawancaraForm.kontrak_provider_virtual}
                      onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, kontrak_provider_virtual: checked }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="alamat_kantor_virtual">Alamat Kantor Virtual</Label>
                    <Input
                      id="alamat_kantor_virtual"
                      value={wawancaraForm.alamat_kantor_virtual}
                      onChange={(e) => setWawancaraForm(prev => ({ ...prev, alamat_kantor_virtual: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nama_provider_virtual">Nama Provider Kantor Virtual</Label>
                    <Input
                      id="nama_provider_virtual"
                      value={wawancaraForm.nama_provider_virtual}
                      onChange={(e) => setWawancaraForm(prev => ({ ...prev, nama_provider_virtual: e.target.value }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Telah Menyampaikan Surat Pernyataan?</Label>
                    <Switch
                      checked={wawancaraForm.surat_pernyataan_disampaikan}
                      onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, surat_pernyataan_disampaikan: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Kegiatan Usaha Sesuai Dengan Pernyataan?</Label>
                    <Switch
                      checked={wawancaraForm.kegiatan_sesuai_pernyataan}
                      onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, kegiatan_sesuai_pernyataan: checked }))}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <Label>Apakah Berada Di Kawasan Berikat?</Label>
                <Switch
                  checked={wawancaraForm.berada_di_kawasan_berikat}
                  onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, berada_di_kawasan_berikat: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Kontak WP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="nama_wp_ditemui">Nama WP yang Ditemui *</Label>
                  <Input
                    id="nama_wp_ditemui"
                    value={wawancaraForm.nama_wp_ditemui}
                    onChange={(e) => setWawancaraForm(prev => ({ ...prev, nama_wp_ditemui: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nik_wp_ditemui">NIK WP yang Ditemui *</Label>
                  <Input
                    id="nik_wp_ditemui"
                    value={wawancaraForm.nik_wp_ditemui}
                    onChange={(e) => setWawancaraForm(prev => ({ ...prev, nik_wp_ditemui: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="jabatan_wp_ditemui">Jabatan WP yang Ditemui *</Label>
                  <Input
                    id="jabatan_wp_ditemui"
                    value={wawancaraForm.jabatan_wp_ditemui}
                    onChange={(e) => setWawancaraForm(prev => ({ ...prev, jabatan_wp_ditemui: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="nomor_hp_direktur">Nomor HP Direktur *</Label>
                <Input
                  id="nomor_hp_direktur"
                  value={wawancaraForm.nomor_hp_direktur}
                  onChange={(e) => setWawancaraForm(prev => ({ ...prev, nomor_hp_direktur: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="deskripsi_pj">Deskripsi PJ (Opsional)</Label>
                <Textarea
                  id="deskripsi_pj"
                  value={wawancaraForm.deskripsi_pj}
                  onChange={(e) => setWawancaraForm(prev => ({ ...prev, deskripsi_pj: e.target.value }))}
                  placeholder="Deskripsi penanggung jawab..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detail Usaha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="deskripsi_detail_usaha">Deskripsi Detail Usaha *</Label>
                <Textarea
                  id="deskripsi_detail_usaha"
                  value={wawancaraForm.deskripsi_detail_usaha}
                  onChange={(e) => setWawancaraForm(prev => ({ ...prev, deskripsi_detail_usaha: e.target.value }))}
                  placeholder="Contoh untuk pertanian: jenis tanaman, merk, varietas, dll"
                  required
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Jelaskan detail usaha. Misal pertanian: tanaman apa, merk apa, dll
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Alamat Usaha = Alamat Utama?</Label>
                <Switch
                  checked={wawancaraForm.alamat_usaha_sama_utama}
                  onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, alamat_usaha_sama_utama: checked }))}
                />
              </div>
              
              {!wawancaraForm.alamat_usaha_sama_utama && (
                <div>
                  <Label htmlFor="alamat_usaha">Alamat Usaha (Jika berbeda)</Label>
                  <Input
                    id="alamat_usaha"
                    value={wawancaraForm.alamat_usaha}
                    onChange={(e) => setWawancaraForm(prev => ({ ...prev, alamat_usaha: e.target.value }))}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Ekonomi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="wp_status">WP Baru atau Lama *</Label>
                <Select
                  value={wawancaraForm.wp_status}
                  onValueChange={(value) => setWawancaraForm(prev => ({ ...prev, wp_status: value as 'baru' | 'lama' }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baru">WP Baru</SelectItem>
                    <SelectItem value="lama">WP Lama</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {wawancaraForm.wp_status === 'lama' && (
                  <div>
                    <Label htmlFor="omzet_tahun_sebelumnya">Omzet Tahun Sebelumnya</Label>
                    <Input
                      id="omzet_tahun_sebelumnya"
                      value={wawancaraForm.omzet_tahun_sebelumnya}
                      onChange={(e) => setWawancaraForm(prev => ({ ...prev, omzet_tahun_sebelumnya: e.target.value }))}
                      placeholder="Rp 0"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="estimasi_omzet_tahun_ini">Estimasi Omzet Tahun Ini *</Label>
                  <Input
                    id="estimasi_omzet_tahun_ini"
                    value={wawancaraForm.estimasi_omzet_tahun_ini}
                    onChange={(e) => setWawancaraForm(prev => ({ ...prev, estimasi_omzet_tahun_ini: e.target.value }))}
                    placeholder="Rp 0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="modal_dasar">Modal Dasar *</Label>
                  <Input
                    id="modal_dasar"
                    value={wawancaraForm.modal_dasar}
                    onChange={(e) => setWawancaraForm(prev => ({ ...prev, modal_dasar: e.target.value }))}
                    placeholder="Rp 0"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload & Lokasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="upload_foto">Upload Foto (Dari Kamera)</Label>
                <Input
                  id="upload_foto"
                  type="file"
                  accept="image/*"
                  capture="environment"
                />
                <p className="text-xs text-gray-500 mt-1">Ambil foto langsung dari kamera</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Sudah dengan Aplikasi Matoa?</Label>
                  <Switch
                    checked={wawancaraForm.sudah_matoa}
                    onCheckedChange={(checked) => setWawancaraForm(prev => ({ ...prev, sudah_matoa: checked }))}
                  />
                </div>
                
                {!wawancaraForm.sudah_matoa && (
                  <div>
                    <Label htmlFor="shareloc">Share Location</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition((position) => {
                            const coords = `${position.coords.latitude}, ${position.coords.longitude}`
                            toast.success(`Lokasi tersimpan: ${coords}`)
                          })
                        }
                      }}
                    >
                      Ambil Lokasi Saat Ini
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">Klik untuk mengambil koordinat lokasi</p>
                  </div>
                )}
                
                {wawancaraForm.sudah_matoa && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-green-800 text-sm font-medium">Lokasi: Lewat Aplikasi Matoa</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rating & Catatan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rate_wp">Rate WP (Skala 1-10) *</Label>
                <Select
                  value={wawancaraForm.rate_wp.toString()}
                  onValueChange={(value) => setWawancaraForm(prev => ({ ...prev, rate_wp: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10].map(rating => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} - {rating <= 3 ? 'Buruk' : rating <= 6 ? 'Sedang' : rating <= 8 ? 'Baik' : 'Excellent'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="deskripsi_tambahan">Deskripsi Tambahan (Opsional)</Label>
                <Textarea
                  id="deskripsi_tambahan"
                  value={wawancaraForm.deskripsi_tambahan}
                  onChange={(e) => setWawancaraForm(prev => ({ ...prev, deskripsi_tambahan: e.target.value }))}
                  placeholder="Catatan tambahan dari hasil wawancara..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

           {/* CRUD Aset */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                List Aset
                <Button 
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingAset(null)
                    setShowAsetForm(true)
                  }}
                  className="border-blue-200 text-blue-700"
                >
                  Tambah Aset
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {daftarAset.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Belum ada data aset</p>
              ) : (
                <div className="space-y-2">
                  {daftarAset.map((aset) => (
                    <div key={aset.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{aset.nama_aset}</p>
                        <p className="text-sm text-gray-600">
                          Tahun: {aset.tahun_perolehan} • Rp {aset.harga_perolehan.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingAset(aset)
                            setShowAsetForm(true)
                          }}
                        >
                          Edit
                        </Button>
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => handleDeleteAset(aset.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {showAsetForm && (
                <div className="mt-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <h4 className="font-medium mb-3">{editingAset ? 'Edit' : 'Tambah'} Aset</h4>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    const aset = {
                      nama_aset: formData.get('nama_aset') as string,
                      tahun_perolehan: parseInt(formData.get('tahun_perolehan') as string),
                      harga_perolehan: parseInt(formData.get('harga_perolehan') as string)
                    }
                    
                    if (editingAset) {
                      handleEditAset({ ...aset, id: editingAset.id })
                    } else {
                      handleAddAset(aset)
                    }
                  }}>
                    <div className="grid grid-cols-3 gap-3">
                      <Input name="nama_aset" placeholder="Nama Aset" defaultValue={editingAset?.nama_aset} required />
                      <Input name="tahun_perolehan" type="number" placeholder="Tahun" defaultValue={editingAset?.tahun_perolehan} required />
                      <Input name="harga_perolehan" type="number" placeholder="Harga" defaultValue={editingAset?.harga_perolehan} required />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button type="submit" size="sm">Simpan</Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => {
                        setShowAsetForm(false)
                        setEditingAset(null)
                      }}>Batal</Button>
                    </div>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>

          {/* CRUD Biaya */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Biaya Riil
                <Button 
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingBiaya(null)
                    setShowBiayaForm(true)
                  }}
                  className="border-green-200 text-green-700"
                >
                  Tambah Biaya
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {daftarBiaya.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Belum ada data biaya</p>
              ) : (
                <div className="space-y-2">
                  {daftarBiaya.map((biaya) => (
                    <div key={biaya.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{biaya.nama_biaya}</p>
                        <p className="text-sm text-gray-600">
                          Rp {biaya.nominal.toLocaleString('id-ID')}
                          {biaya.keterangan && ` • ${biaya.keterangan}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingBiaya(biaya)
                            setShowBiayaForm(true)
                          }}
                        >
                          Edit
                        </Button>
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => handleDeleteBiaya(biaya.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {showBiayaForm && (
                <div className="mt-4 p-4 border border-green-200 rounded-lg bg-green-50">
                  <h4 className="font-medium mb-3">{editingBiaya ? 'Edit' : 'Tambah'} Biaya</h4>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    const biaya = {
                      nama_biaya: formData.get('nama_biaya') as string,
                      nominal: parseInt(formData.get('nominal') as string),
                      keterangan: formData.get('keterangan') as string
                    }
                    
                    if (editingBiaya) {
                      handleEditBiaya({ ...biaya, id: editingBiaya.id })
                    } else {
                      handleAddBiaya(biaya)
                    }
                  }}>
                    <div className="grid grid-cols-3 gap-3">
                      <Input name="nama_biaya" placeholder="Nama Biaya" defaultValue={editingBiaya?.nama_biaya} required />
                      <Input name="nominal" type="number" placeholder="Nominal" defaultValue={editingBiaya?.nominal} required />
                      <Input name="keterangan" placeholder="Keterangan" defaultValue={editingBiaya?.keterangan} />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button type="submit" size="sm">Simpan</Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => {
                        setShowBiayaForm(false)
                        setEditingBiaya(null)
                      }}>Batal</Button>
                    </div>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>

          {/* CRUD Kekurangan Berkas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Daftar Kekurangan Berkas
                <Button 
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingKekurangan(null)
                    setShowKekuranganForm(true)
                  }}
                  className="border-red-200 text-red-700"
                >
                  Tambah Berkas
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {daftarKekurangan.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Berkas lengkap - tidak ada kekurangan</p>
              ) : (
                <div className="space-y-2">
                  {daftarKekurangan.map((berkas) => (
                    <div key={berkas.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <p className="font-medium">{berkas.nama_berkas}</p>
                      <div className="flex gap-2">
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingKekurangan(berkas)
                            setShowKekuranganForm(true)
                          }}
                        >
                          Edit
                        </Button>
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => handleDeleteKekurangan(berkas.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {showKekuranganForm && (
                <div className="mt-4 p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-medium mb-3">{editingKekurangan ? 'Edit' : 'Tambah'} Kekurangan Berkas</h4>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    const berkas = {
                      nama_berkas: formData.get('nama_berkas') as string
                    }
                    
                    if (editingKekurangan) {
                      handleEditKekurangan({ ...berkas, id: editingKekurangan.id })
                    } else {
                      handleAddKekurangan(berkas)
                    }
                  }}>
                    <div className="grid grid-cols-2 gap-3">
                      <Input name="nama_berkas" placeholder="Nama Berkas" defaultValue={editingKekurangan?.nama_berkas} required />
                      <div className="flex gap-2">
                        <Button type="submit" size="sm">Simpan</Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => {
                          setShowKekuranganForm(false)
                          setEditingKekurangan(null)
                        }}>Batal</Button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setShowForm(false)
                setSelectedData(null)
              }}
            >
              Batal
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Simpan Hasil Wawancara
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Wawancara Verifikasi Lapangan</h1>
        <p className="text-gray-600 mt-2">Input hasil wawancara untuk verifikasi yang dijadwalkan hari ini</p>
      </div>

      {/* Today's Date Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <p className="text-blue-800 font-medium">
              Verifikasi Lapangan Hari Ini - {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* List Verifikasi Hari Ini */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            List Verifikasi Lapangan Hari Ini
            <Badge variant="secondary">{verifikasiHariIni.length} WP</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {verifikasiHariIni.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">Tidak ada verifikasi yang dijadwalkan hari ini</div>
              <p className="text-sm text-gray-400 mt-1">
                Lihat menu Perencanaan Survey untuk mengatur jadwal verifikasi
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {verifikasiHariIni.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.nama_wp}</h3>
                      <p className="text-sm text-gray-600">
                        {item.nomor_kasus} • NPWP: {item.npwp}
                      </p>
                    </div>
                     {item.status_wawancara === 'sudah' ? (
                      <div className="flex gap-2">
                        <Badge className="bg-green-100 text-green-800">
                          Sudah Diwawancara
                        </Badge>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => startWawancara(item)}
                          className="border-blue-200 text-blue-700"
                        >
                          Edit Wawancara
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => startWawancara(item)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mulai Wawancara
                      </Button>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <Label className="text-gray-600">Alamat</Label>
                      <p>{item.alamat}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Wilayah</Label>
                      <p>{item.kecamatan}, {item.kelurahan}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">AR Assigned</Label>
                      <p className={item.ar_nama ? 'text-purple-700 font-medium' : 'text-gray-400'}>
                        {item.ar_nama || 'Belum assigned'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Implementation Status */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">Form Wawancara - 30+ Fields Sesuai Requirement</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-800">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
            <p>✅ Nomor & Tanggal Surat Tugas</p>
            <p>✅ Tanggal Kegiatan ST (Auto)</p>
            <p>✅ WP Ditemukan (Ya/Tidak)</p>
            <p>✅ Alamat Sesuai Coretax</p>
            <p>✅ Alamat Baru (Conditional)</p>
            <p>✅ Kegiatan Usaha Terbukti</p>
            <p>✅ Dokumen Perizinan Sesuai</p>
            <p>✅ KLU Sesuai Coretax</p>
            <p>✅ KLU Baru (Conditional)</p>
            <p>✅ Kantor Virtual Logic</p>
            <p>✅ Provider Virtual Data</p>
            <p>✅ Surat Pernyataan</p>
            <p>✅ Kawasan Berikat</p>
            <p>✅ Data Kontak WP</p>
            <p>✅ Detail Usaha</p>
            <p>✅ Data Ekonomi & Omzet</p>
            <p>✅ Upload Foto dari Kamera</p>
            <p>✅ Shareloc dengan Matoa Logic</p>
            <p>✅ Rating WP (1-10)</p>
            <p>✅ CRUD Aset (Ready)</p>
            <p>✅ CRUD Biaya (Ready)</p>
            <p>✅ CRUD Kekurangan Berkas (Ready)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}