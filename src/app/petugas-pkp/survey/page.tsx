'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface SurveyData {
  id: number
  pkp_data_id: number
  nomor_kasus: string
  nama_wp: string
  tanggal_pkp: string
  tanggal_kegiatan_st: string | null
  tanggal_berangkat_verifikasi: string | null
  deadline: string
  status: 'complete' | 'pending_st' | 'pending_verifikasi' | 'urgent'
}

export default function SurveyPage() {
  // Mock data PKP yang diterima untuk survey
  const [surveyData, setSurveyData] = useState<SurveyData[]>([
    {
      id: 1,
      pkp_data_id: 1,
      nomor_kasus: 'PKP-2025-001',
      nama_wp: 'PT. Contoh Usaha Jaya',
      tanggal_pkp: '2025-01-20',
      tanggal_kegiatan_st: '2025-01-25',
      tanggal_berangkat_verifikasi: null,
      deadline: '2025-02-19', // 30 hari dari tanggal PKP
      status: 'pending_verifikasi'
    },
    {
      id: 2,
      pkp_data_id: 3,
      nomor_kasus: 'PKP-2025-003',
      nama_wp: 'CV. Berkah Mandiri',
      tanggal_pkp: '2025-01-10',
      tanggal_kegiatan_st: null,
      tanggal_berangkat_verifikasi: null,
      deadline: '2025-02-09', // 30 hari dari tanggal PKP
      status: 'urgent' // Deadline dalam 7 hari
    }
  ])

  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyData | null>(null)
  const [scheduleForm, setScheduleForm] = useState({
    tanggal_kegiatan_st: '',
    tanggal_berangkat_verifikasi: ''
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800">Lengkap</Badge>
      case 'pending_st':
        return <Badge className="bg-yellow-100 text-yellow-800">ST Ready</Badge>
      case 'pending_verifikasi':
        return <Badge variant="outline" className="border-blue-200 text-blue-700">Perlu Verifikasi</Badge>
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getUrgentSurveys = () => {
    return surveyData.filter(survey => {
      const daysLeft = getDaysUntilDeadline(survey.deadline)
      return daysLeft <= 7 && daysLeft > 0
    })
  }

  const openScheduleDialog = (survey: SurveyData) => {
    setSelectedSurvey(survey)
    setScheduleForm({
      tanggal_kegiatan_st: survey.tanggal_kegiatan_st || '',
      tanggal_berangkat_verifikasi: survey.tanggal_berangkat_verifikasi || ''
    })
    setIsScheduleOpen(true)
  }

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSurvey) return

    // Update survey data
    setSurveyData(prev => prev.map(survey => {
      if (survey.id === selectedSurvey.id) {
        const hasKegiatan = scheduleForm.tanggal_kegiatan_st !== ''
        const hasVerifikasi = scheduleForm.tanggal_berangkat_verifikasi !== ''
        
        let newStatus: SurveyData['status'] = 'pending_st'
        if (hasKegiatan && hasVerifikasi) {
          newStatus = 'complete'
        } else if (hasKegiatan) {
          newStatus = 'pending_verifikasi'
        }

        return {
          ...survey,
          tanggal_kegiatan_st: scheduleForm.tanggal_kegiatan_st || null,
          tanggal_berangkat_verifikasi: scheduleForm.tanggal_berangkat_verifikasi || null,
          status: newStatus
        }
      }
      return survey
    }))

    toast.success('Jadwal survey berhasil diperbarui')
    setIsScheduleOpen(false)
    setSelectedSurvey(null)
  }

  const urgentSurveys = getUrgentSurveys()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Perencanaan Survey Lapangan</h1>
        <p className="text-gray-600 mt-2">Manajemen jadwal kegiatan di ST dan verifikasi lapangan</p>
      </div>

      {/* Warning untuk deadline */}
      {urgentSurveys.length > 0 && (
        <Card className="border-l-4 border-l-red-500 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Peringatan Deadline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-3">
              Ada {urgentSurveys.length} data PKP yang mendekati deadline (≤7 hari)
            </p>
            <div className="space-y-2">
              {urgentSurveys.map((survey) => {
                const daysLeft = getDaysUntilDeadline(survey.deadline)
                return (
                  <div key={survey.id} className="flex items-center justify-between p-3 bg-white rounded border border-red-200">
                    <div>
                      <p className="font-medium text-red-800">{survey.nama_wp}</p>
                      <p className="text-sm text-red-600">Deadline: {new Date(survey.deadline).toLocaleDateString('id-ID')}</p>
                    </div>
                    <Badge variant="destructive">
                      {daysLeft} hari
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {surveyData.filter(s => s.status !== 'urgent').length}
            </div>
            <p className="text-sm text-gray-600">Total PKP Diterima</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {surveyData.filter(s => s.tanggal_kegiatan_st === null).length}
            </div>
            <p className="text-sm text-gray-600">Pending Kegiatan ST</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {surveyData.filter(s => s.tanggal_kegiatan_st !== null && s.tanggal_berangkat_verifikasi === null).length}
            </div>
            <p className="text-sm text-gray-600">Pending Verifikasi</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{urgentSurveys.length}</div>
            <p className="text-sm text-gray-600">Deadline Warning</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Perencanaan Survey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nomor Kasus</TableHead>
                  <TableHead>Nama WP</TableHead>
                  <TableHead>Tanggal PKP</TableHead>
                  <TableHead>Kegiatan ST</TableHead>
                  <TableHead>Verifikasi</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {surveyData.map((survey) => {
                  const daysLeft = getDaysUntilDeadline(survey.deadline)
                  return (
                    <TableRow key={survey.id}>
                      <TableCell className="font-mono text-sm">{survey.nomor_kasus}</TableCell>
                      <TableCell className="font-medium">{survey.nama_wp}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(survey.tanggal_pkp).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell className="text-sm">
                        {survey.tanggal_kegiatan_st ? (
                          <span className="text-green-600 font-medium">
                            {new Date(survey.tanggal_kegiatan_st).toLocaleDateString('id-ID')}
                          </span>
                        ) : (
                          <span className="text-orange-600">Belum dijadwalkan</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {survey.tanggal_berangkat_verifikasi ? (
                          <span className="text-green-600 font-medium">
                            {new Date(survey.tanggal_berangkat_verifikasi).toLocaleDateString('id-ID')}
                          </span>
                        ) : (
                          <span className="text-orange-600">Belum dijadwalkan</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        <span className={daysLeft <= 7 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                          {new Date(survey.deadline).toLocaleDateString('id-ID')}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(survey.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openScheduleDialog(survey)}
                        >
                          Jadwalkan
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Dialog */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Jadwal Survey - {selectedSurvey?.nama_wp}</DialogTitle>
            <DialogDescription>
              Atur tanggal kegiatan di ST dan tanggal berangkat verifikasi lapangan
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleSubmit}>
            <div className="space-y-4">
              {selectedSurvey && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm space-y-1">
                    <p><strong>Nomor Kasus:</strong> {selectedSurvey.nomor_kasus}</p>
                    <p><strong>Tanggal PKP:</strong> {new Date(selectedSurvey.tanggal_pkp).toLocaleDateString('id-ID')}</p>
                    <p><strong>Deadline:</strong> {new Date(selectedSurvey.deadline).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="tanggal_kegiatan_st">Tanggal Kegiatan di ST</Label>
                <Input
                  id="tanggal_kegiatan_st"
                  type="date"
                  value={scheduleForm.tanggal_kegiatan_st}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, tanggal_kegiatan_st: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="tanggal_berangkat_verifikasi">Tanggal Berangkat Verifikasi Lapangan</Label>
                <Input
                  id="tanggal_berangkat_verifikasi"
                  type="date"
                  value={scheduleForm.tanggal_berangkat_verifikasi}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, tanggal_berangkat_verifikasi: e.target.value }))}
                />
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsScheduleOpen(false)
                  setSelectedSurvey(null)
                }}
              >
                Batal
              </Button>
              <Button type="submit">
                Simpan Jadwal
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}