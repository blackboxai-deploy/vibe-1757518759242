'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

export default function WajibPajakPage() {
  const [step, setStep] = useState<'input' | 'result'>('input')
  const [npwp, setNpwp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [wpData, setWpData] = useState<{
    npwp: string
    nama_wp: string
    kekurangan_berkas: string[]
  } | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!npwp.trim()) {
      toast.error('NPWP harus diisi')
      return
    }

    setIsLoading(true)

    // Simulate API call - in real implementation this would check database
    setTimeout(() => {
      // Mock data untuk demo
      const mockData = {
        npwp: npwp,
        nama_wp: 'PT. CONTOH WAJIB PAJAK',
        kekurangan_berkas: [
          'Surat Keterangan Domisili',
          'NPWP Direktur',
          'Akta Pendirian Perusahaan',
          'Surat Izin Usaha'
        ]
      }
      
      setWpData(mockData)
      setStep('result')
      setIsLoading(false)
    }, 1000)
  }

  const handleFileUpload = (berkas: string, file: File) => {
    // In real implementation, this would upload to server
    toast.success(`${berkas} berhasil diupload`)
    
    // Remove from kekurangan_berkas list
    setWpData(prev => prev ? {
      ...prev,
      kekurangan_berkas: prev.kekurangan_berkas.filter(b => b !== berkas)
    } : null)
  }

  const resetForm = () => {
    setStep('input')
    setNpwp('')
    setWpData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <div className="text-white text-2xl font-bold">PKP</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Portal Wajib Pajak</h1>
          <p className="text-xl text-gray-600">Sistem KPD PKP - Kabupaten Jember</p>
          <p className="text-gray-500 mt-2">Upload berkas yang dibutuhkan untuk proses PKP Anda</p>
        </div>

        {step === 'input' && (
          <Card className="max-w-md mx-auto shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">Cari Data PKP</CardTitle>
              <CardDescription>
                Masukkan NPWP Anda untuk melihat berkas yang perlu dilengkapi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <Label htmlFor="npwp">Nomor Pokok Wajib Pajak (NPWP)</Label>
                  <Input
                    id="npwp"
                    type="text"
                    placeholder="Contoh: 12.345.678.9-012.345"
                    value={npwp}
                    onChange={(e) => setNpwp(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 text-center font-mono"
                    maxLength={20}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Format: XX.XXX.XXX.X-XXX.XXX
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Mencari...' : 'Cari Data PKP'}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600 mb-4">
                  Untuk staf pajak
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/login'}
                >
                  Login Staff
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'result' && wpData && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* WP Info Card */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center justify-between">
                  Data Wajib Pajak
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Aktif
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">NPWP</Label>
                    <p className="font-mono font-semibold text-lg">{wpData.npwp}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Nama Wajib Pajak</Label>
                    <p className="font-semibold text-lg">{wpData.nama_wp}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Berkas Card */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Berkas yang Perlu Dilengkapi
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {wpData.kekurangan_berkas.length} berkas
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Upload berkas-berkas berikut untuk melengkapi data PKP Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                {wpData.kekurangan_berkas.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Berkas Lengkap!</h3>
                    <p className="text-green-600">
                      Semua berkas yang diperlukan sudah diupload. Terima kasih!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wpData.kekurangan_berkas.map((berkas, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{berkas}</h3>
                          <Badge variant="outline" className="text-red-600 border-red-200">
                            Belum Upload
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            id={`file-${index}`}
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                handleFileUpload(berkas, file)
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById(`file-${index}`)?.click()}
                            className="flex-1"
                          >
                            Pilih File
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Format yang diterima: PDF, JPG, PNG (Maksimal 5MB)
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <Separator className="my-6" />

                <div className="flex gap-3">
                  <Button variant="outline" onClick={resetForm} className="flex-1">
                    Cari NPWP Lain
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={wpData.kekurangan_berkas.length > 0}
                  >
                    Selesai
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">Informasi Penting</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Upload berkas dalam format PDF, JPG, atau PNG</li>
                      <li>• Maksimal ukuran file 5MB per berkas</li>
                      <li>• Pastikan dokumen terbaca dengan jelas</li>
                      <li>• Untuk bantuan hubungi: (0331) 123456</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}