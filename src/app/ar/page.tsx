import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ARDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Account Representative</h1>
        <p className="text-gray-600 mt-2">Selamat datang di panel Account Representative</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Wilayah Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">0</div>
            <p className="text-sm text-gray-500 mt-1">Kelurahan ditugaskan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">PKP Kewilayahan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">0</div>
            <p className="text-sm text-gray-500 mt-1">PKP di wilayah</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Verifikasi Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">0</div>
            <p className="text-sm text-gray-500 mt-1">Sudah diverifikasi</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">KPD Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">0</div>
            <p className="text-sm text-gray-500 mt-1">Belum input KPD</p>
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
                <h3 className="font-medium text-gray-900">Input KPD</h3>
                <p className="text-sm text-gray-600 mt-1">Input KPD Kewilayahan</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                </div>
                <h3 className="font-medium text-gray-900">Lihat Verifikasi</h3>
                <p className="text-sm text-gray-600 mt-1">Hasil verifikasi lapangan</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <div className="w-6 h-6 bg-orange-500 rounded"></div>
                </div>
                <h3 className="font-medium text-gray-900">Monitor Status</h3>
                <p className="text-sm text-gray-600 mt-1">Monitoring PKP</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <div className="w-6 h-6 bg-purple-500 rounded"></div>
                </div>
                <h3 className="font-medium text-gray-900">Laporan</h3>
                <p className="text-sm text-gray-600 mt-1">Generate laporan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informasi Wilayah</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <p className="font-medium text-purple-900">Total Kecamatan</p>
                <p className="text-sm text-purple-700">Kabupaten Jember</p>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                31
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-medium text-blue-900">Total Kelurahan</p>
                <p className="text-sm text-blue-700">Tersedia di sistem</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                135
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Wilayah Assigned</p>
                <p className="text-sm text-gray-700">Kelurahan saya</p>
              </div>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                0
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
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Dashboard AR siap digunakan</p>
                <p className="text-xs text-gray-500">Account Representative panel telah diaktifkan</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Sistem wilayah tersedia</p>
                <p className="text-xs text-gray-500">Mapping kecamatan dan kelurahan dapat dilakukan</p>
              </div>
            </div>

            <div className="text-center py-4 text-gray-500 text-sm">
              Belum ada aktivitas. Mulai dengan melihat wilayah yang ditugaskan.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}