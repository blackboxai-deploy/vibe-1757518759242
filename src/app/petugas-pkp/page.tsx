import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PetugasPKPDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Petugas PKP</h1>
        <p className="text-gray-600 mt-2">Selamat datang di panel Petugas Pengesahan Kontrak Pajak</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Data PKP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">0</div>
            <p className="text-sm text-gray-500 mt-1">Data PKP aktif</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">PKP Diterima</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">0</div>
            <p className="text-sm text-gray-500 mt-1">Status diterima</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Survey Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">0</div>
            <p className="text-sm text-gray-500 mt-1">Menunggu survey</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Deadline Warning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">0</div>
            <p className="text-sm text-gray-500 mt-1">Mendekati deadline</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                </div>
                <h3 className="font-medium text-gray-900">Tambah PKP</h3>
                <p className="text-sm text-gray-600 mt-1">Input data PKP baru</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <div className="w-6 h-6 bg-orange-500 rounded"></div>
                </div>
                <h3 className="font-medium text-gray-900">Jadwal Survey</h3>
                <p className="text-sm text-gray-600 mt-1">Atur perencanaan survey</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                </div>
                <h3 className="font-medium text-gray-900">Input Wawancara</h3>
                <p className="text-sm text-gray-600 mt-1">Form hasil wawancara</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <div className="w-6 h-6 bg-purple-500 rounded"></div>
                </div>
                <h3 className="font-medium text-gray-900">Kelola AR</h3>
                <p className="text-sm text-gray-600 mt-1">Mapping wilayah AR</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Status Sistem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-medium text-green-900">Database PKP</p>
                <p className="text-sm text-green-700">Sistem berjalan normal</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Online
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-medium text-blue-900">Geographic Data</p>
                <p className="text-sm text-blue-700">31 Kecamatan, 135 Kelurahan</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Ready
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <p className="font-medium text-orange-900">Monitoring</p>
                <p className="text-sm text-orange-700">Deadline tracking aktif</p>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Sistem PKP siap digunakan</p>
                <p className="text-xs text-gray-500">Dashboard petugas PKP telah diaktifkan</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Database geografis dimuat</p>
                <p className="text-xs text-gray-500">Data kecamatan dan kelurahan Jember tersedia</p>
              </div>
            </div>

            <div className="text-center py-4 text-gray-500 text-sm">
              Belum ada aktivitas PKP. Mulai dengan menambahkan data PKP pertama.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}