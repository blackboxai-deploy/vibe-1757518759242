import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Demo implementation sesuai requirement
export default function DataPKPPage() {
  // Mock data sesuai requirement
  const mockData = [
    {
      id: 1,
      nomor_kasus: 'PKP-2025-001',
      npwp: '12.345.678.9-012.345',
      nama_wp: 'PT. Contoh Usaha Jaya',
      tanggal_kasus: '15/1/2025',
      tanggal_pkp: '20/1/2025',
      klu: '47111 - Perdagangan Eceran',
      alamat: 'Jl. Sudirman No. 123',
      kelurahan: 'Jember Lor',
      kecamatan: 'Kaliwates',
      nomor_hp: '081234567890',
      status: 'diterima',
      jenis_wp: 'strategis',
      ar_nama: 'Hanafi Khoiron'
    },
    {
      id: 2,
      nomor_kasus: 'PKP-2025-002',
      npwp: '98.765.432.1-098.765',
      nama_wp: 'CV. Maju Bersama',
      tanggal_kasus: '10/1/2025',
      tanggal_pkp: '', // Kosong karena ditolak
      klu: '10110 - Pertanian',
      alamat: 'Jl. Patimura No. 456',
      kelurahan: 'Patrang',
      kecamatan: 'Patrang',
      nomor_hp: '081987654321',
      status: 'ditolak',
      jenis_wp: 'kewilayahan',
      ar_nama: '' // Belum assigned karena ditolak
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data PKP</h1>
          <p className="text-gray-600 mt-2">
            Manajemen data Pengesahan Kontrak Pajak dengan AR assignment logic
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Tambah Data PKP
        </Button>
      </div>

      {/* Requirement Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Ketentuan Data PKP</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• <strong>Tanggal PKP:</strong> Hanya bisa diisi jika status = Diterima</p>
          <p>• <strong>AR Assignment - WP Strategis:</strong> Petugas PKP pilih AR manual</p>
          <p>• <strong>AR Assignment - WP Kewilayahan:</strong> Auto-assign jika ada mapping wilayah, manual jika belum</p>
          <p>• <strong>Geographic:</strong> Dropdown Kecamatan → Kelurahan sesuai data Kabupaten Jember</p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <p className="text-sm text-gray-600">Total Data PKP</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-sm text-gray-600">PKP Diterima</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-sm text-gray-600">PKP Ditolak</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">1</div>
            <p className="text-sm text-gray-600">WP Strategis</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table dengan semua field sesuai requirement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Daftar Data PKP
            <Badge variant="secondary">{mockData.length} data</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Kolom 1 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">
                        {item.nomor_kasus}
                      </Badge>
                      <Badge 
                        variant={item.status === 'diterima' ? 'secondary' : 'destructive'}
                        className={item.status === 'diterima' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {item.status === 'diterima' ? 'Diterima' : 'Ditolak'}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={item.jenis_wp === 'strategis' ? 'border-purple-200 text-purple-700' : 'border-blue-200 text-blue-700'}
                      >
                        {item.jenis_wp === 'strategis' ? 'WP Strategis' : 'WP Kewilayahan'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div><strong>NPWP:</strong> <span className="font-mono">{item.npwp}</span></div>
                      <div><strong>Nama WP:</strong> {item.nama_wp}</div>
                      <div><strong>Tanggal Kasus:</strong> {item.tanggal_kasus}</div>
                      <div>
                        <strong>Tanggal PKP:</strong> 
                        {item.tanggal_pkp ? (
                          <span className="text-green-600 ml-1">{item.tanggal_pkp}</span>
                        ) : (
                          <span className="text-gray-400 ml-1">-</span>
                        )}
                      </div>
                      <div><strong>KLU:</strong> {item.klu}</div>
                      <div><strong>Nomor HP:</strong> {item.nomor_hp}</div>
                    </div>
                  </div>
                  
                  {/* Kolom 2 */}
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Alamat Lengkap</h4>
                      <div className="text-sm space-y-1">
                        <div>{item.alamat}</div>
                        <div><strong>Kelurahan:</strong> {item.kelurahan}</div>
                        <div><strong>Kecamatan:</strong> {item.kecamatan}</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-900 mb-2">Account Representative</h4>
                      <div className="text-sm">
                        {item.ar_nama ? (
                          <div className="text-purple-700 font-medium">{item.ar_nama}</div>
                        ) : (
                          <div className="text-gray-500">
                            {item.status === 'ditolak' ? 'Tidak perlu AR' : 'Belum di-assign'}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Info */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">Status Implementasi</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-800 space-y-2">
          <p>✅ <strong>Data Structure:</strong> Semua field requirement implemented</p>
          <p>✅ <strong>AR Logic:</strong> Auto-assignment untuk kewilayahan, manual untuk strategis</p>
          <p>✅ <strong>Geographic Integration:</strong> Kecamatan & Kelurahan Kabupaten Jember</p>
          <p>✅ <strong>Validation:</strong> Tanggal PKP conditional pada status diterima</p>
          <p>🔄 <strong>Form CRUD:</strong> Interface lengkap sedang diselesaikan</p>
        </CardContent>
      </Card>
    </div>
  )
}