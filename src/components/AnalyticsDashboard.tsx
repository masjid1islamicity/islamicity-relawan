import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowUpRight, 
  Download, 
  Calendar, 
  PieChart, 
  Clock, 
  DollarSign,
  Activity,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { Campaign, DonationTransaction, ImpactMilestone } from '../types';
import { formatRupiah, formatNumber } from '../utils/formatters';

interface AnalyticsDashboardProps {
  campaigns: Campaign[];
  transactions: DonationTransaction[];
  milestones: ImpactMilestone[];
  onDownloadReport: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  campaigns,
  transactions,
  milestones,
  onDownloadReport,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('30d');

  // Aggregated totals
  const totalRaised = campaigns.reduce((acc, c) => acc + c.currentAmount, 0);
  const totalTarget = campaigns.reduce((acc, c) => acc + c.targetAmount, 0);
  const totalSpent = milestones.reduce((acc, m) => acc + m.spentAmount, 0);
  const totalBeneficiaries = campaigns.reduce((acc, c) => acc + c.beneficiariesReached, 0);
  const totalVolunteers = campaigns.reduce((acc, c) => acc + c.volunteerCount, 0);
  const totalDonors = campaigns.reduce((acc, c) => acc + c.donorCount, 0);

  const realizationRate = totalRaised > 0 ? ((totalRaised / totalTarget) * 100).toFixed(1) : '0';
  const disbursementRate = totalRaised > 0 ? ((totalSpent / totalRaised) * 100).toFixed(1) : '0';

  // Monthly trend mock series
  const monthlyData = [
    { month: 'Apr', raised: 95000000, disbursed: 82000000, donors: 420 },
    { month: 'Mei', raised: 140000000, disbursed: 130000000, donors: 650 },
    { month: 'Jun', raised: 185000000, disbursed: 168000000, donors: 890 },
    { month: 'Jul', raised: 220000000, disbursed: 198000000, donors: 1120 },
    { month: 'Agu', raised: 260000000, disbursed: 242000000, donors: 1340 },
    { month: 'Sep (Aktif)', raised: 289450000, disbursed: 265000000, donors: 1540 },
  ];

  const maxMonthValue = Math.max(...monthlyData.map(d => Math.max(d.raised, d.disbursed)));

  // Sector breakdown
  const sectorData = [
    { name: 'Tanggap Bencana', percentage: 34, color: '#059669', count: 'Rp 289.4 Jt' },
    { name: 'Zakat Produktif UMKM', percentage: 25, color: '#0d9488', count: 'Rp 215.0 Jt' },
    { name: 'Pendidikan & Tahfidz', percentage: 21, color: '#0284c7', count: 'Rp 182.5 Jt' },
    { name: 'Wakaf Air Bersih', percentage: 19, color: '#d97706', count: 'Rp 161.2 Jt' },
    { name: 'Kesehatan Mustahik', percentage: 11, color: '#dc2626', count: 'Rp 94.8 Jt' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>Dasbor Analitik Efektivitas & Performa Penggalangan Dana</span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 mt-1">
            Akuntabilitas Real-Time Penyelenggara & Donatur
          </h2>
          <p className="text-xs text-stone-500">
            Pembaruan metrik live • Standar Audit PSAK 109 Akuntansi Zakat & Infaq/Sedekah
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-stone-100 p-1 rounded-xl flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '7d' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600'
              }`}
            >
              7 Hari
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '30d' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600'
              }`}
            >
              30 Hari
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === 'all' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600'
              }`}
            >
              Semua Waktu
            </button>
          </div>

          <button
            onClick={onDownloadReport}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor PDF/Excel</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Terhimpun */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold">Total Dana Terhimpun</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-stone-900">
            {formatRupiah(totalRaised)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{realizationRate}% dari target total program</span>
          </div>
        </div>

        {/* Total Tersalurkan */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold">Dana Tersalurkan Lapangan</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-teal-800">
            {formatRupiah(totalSpent)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-teal-600 font-medium mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Efisiensi Penyaluran 98.4%</span>
          </div>
        </div>

        {/* Penerima Manfaat */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold">Mustahik / Penerima Manfaat</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-stone-900">
            {formatNumber(totalBeneficiaries)} Jiwa
          </div>
          <div className="text-[11px] text-stone-500 mt-2">
            Tersebar di 14 Kabupaten / Kota
          </div>
        </div>

        {/* Relawan & Ukhuwah */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold">Relawan & Jam Pengabdian</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-stone-900">
            {totalVolunteers} Relawan
          </div>
          <div className="flex items-center gap-1 text-[11px] text-blue-600 font-medium mt-2">
            <Clock className="w-3.5 h-3.5" />
            <span>1,840+ Jam Pengabdian Lapangan</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Performance Trend (SVG Chart) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Tren Penggalangan vs Realisasi Penyaluran Bulanan
              </h3>
              <p className="text-xs text-stone-500">
                Penyaluran langsung dieksekusi tanpa mengendapkan dana di rekening
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-emerald-600" />
                <span className="text-stone-600">Terhimpun</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-teal-400" />
                <span className="text-stone-600">Tersalurkan</span>
              </div>
            </div>
          </div>

          {/* SVG Bar & Area Chart Visualizer */}
          <div className="h-64 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-stone-100">
            {monthlyData.map((item, idx) => {
              const raisedHeight = (item.raised / maxMonthValue) * 100;
              const disbursedHeight = (item.disbursed / maxMonthValue) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full relative">
                    {/* Raised Bar */}
                    <div 
                      style={{ height: `${raisedHeight}%` }}
                      className="w-1/2 bg-emerald-700 rounded-t-md transition-all duration-300 group-hover:bg-emerald-600 relative"
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-20 shadow-md">
                        Terhimpun: {formatRupiah(item.raised)}
                      </div>
                    </div>

                    {/* Disbursed Bar */}
                    <div 
                      style={{ height: `${disbursedHeight}%` }}
                      className="w-1/2 bg-teal-400 rounded-t-md transition-all duration-300 group-hover:bg-teal-300 relative"
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-14 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-20 shadow-md">
                        Disalurkan: {formatRupiah(item.disbursed)}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-stone-500 font-medium whitespace-nowrap">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-stone-500">
            <span>Rata-rata Waktu Penyaluran: <strong>1-3 Hari sejak dana terkumpul</strong></span>
            <span className="text-emerald-700 font-bold">Tingkat Transparansi: 99.4%</span>
          </div>
        </div>

        {/* Sector Allocation Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-stone-900">
                Alokasi Sektor Program
              </h3>
              <PieChart className="w-4 h-4 text-stone-400" />
            </div>
            <p className="text-xs text-stone-500 mb-4">
              Distribusi proporsional 8 Asnaf sesuai kaidah fiqih zakat
            </p>

            <div className="space-y-3.5 text-xs">
              {sectorData.map((sec, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: sec.color }}
                      />
                      <span className="font-semibold text-stone-700">{sec.name}</span>
                    </div>
                    <span className="text-stone-500 font-mono">{sec.count}</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${sec.percentage}%`,
                        backgroundColor: sec.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs mt-4">
            <div className="font-bold text-stone-800 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Sertifikasi Kepatuhan Syariah</span>
            </div>
            <p className="text-[11px] text-stone-600">
              Audit independen berkala oleh Dewan Pengawas Syariah memastikan tidak ada percampuran dana zakat dengan operasional non-amil.
            </p>
          </div>
        </div>
      </div>

      {/* Real-time Ledger Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              Catatan Arus Kas Transparan Real-Time (Audit Trail)
            </h3>
            <p className="text-xs text-stone-500">
              Setiap transaksi donasi dan pengeluaran lapangan dapat dilacak nomor resi dan bukti fisiknya.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-semibold bg-stone-50/50">
                <th className="py-2.5 px-3">No. Resi & Waktu</th>
                <th className="py-2.5 px-3">Inisiatif Program</th>
                <th className="py-2.5 px-3">Muzaki / Donatur</th>
                <th className="py-2.5 px-3">Nominal Donasi</th>
                <th className="py-2.5 px-3">Metode Bayar</th>
                <th className="py-2.5 px-3">Status Lapangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {transactions.slice(0, 5).map((trx) => (
                <tr key={trx.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-mono font-bold text-emerald-800">{trx.receiptNumber}</div>
                    <div className="text-[10px] text-stone-400">{trx.timestamp}</div>
                  </td>
                  <td className="py-3 px-3 font-medium max-w-[200px] truncate">
                    {trx.campaignTitle}
                  </td>
                  <td className="py-3 px-3">
                    {trx.donorName}
                  </td>
                  <td className="py-3 px-3 font-bold text-emerald-700">
                    {formatRupiah(trx.amount)}
                  </td>
                  <td className="py-3 px-3">
                    <span className="bg-stone-100 text-stone-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                      {trx.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Tersalurkan
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
