import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  Eye, 
  Calendar, 
  FileCheck2, 
  Printer, 
  CheckCircle2, 
  X,
  ExternalLink 
} from 'lucide-react';
import { DonationTransaction } from '../types';
import { formatRupiah } from '../utils/formatters';

interface AuditedReportsViewProps {
  transactions: DonationTransaction[];
}

export const AuditedReportsView: React.FC<AuditedReportsViewProps> = ({ transactions }) => {
  const [selectedReceipt, setSelectedReceipt] = useState<DonationTransaction | null>(null);

  const reportsList = [
    {
      id: 'rep-2026-09',
      title: 'Laporan Audit Akuntabilitas Pekan ke-2 September 2026',
      period: '1 - 15 September 2026',
      totalDisbursed: 136000000,
      auditor: 'KAP Syariah Haryono & Rekan (Opini: Wajar Tanpa Pengecualian)',
      status: 'Terverifikasi PSAK 109',
      fileSize: '2.4 MB PDF'
    },
    {
      id: 'rep-2026-08',
      title: 'Laporan Penyaluran Tanggap Darurat Bencana Alam Sumatera & Pantura',
      period: 'Agustus 2026',
      totalDisbursed: 242000000,
      auditor: 'Dewan Pengawas Syariah BAZNAS Wilayah',
      status: 'Terverifikasi PSAK 109',
      fileSize: '4.1 MB PDF'
    },
    {
      id: 'rep-2026-07',
      title: 'Laporan Akuntabilitas Semester I 2026 (Zakat, Infaq, Sedekah, Wakaf)',
      period: 'Januari - Juni 2026',
      totalDisbursed: 890000000,
      auditor: 'Kantor Akuntan Publik Independen Terdaftar OJK & Kemenag',
      status: 'Wajar Tanpa Pengecualian (WTP)',
      fileSize: '6.8 MB PDF'
    }
  ];

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Transparansi Publik & Kepatuhan Regulasi</span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 mt-1">
              Pusat Laporan Akuntabilitas & Bukti Setor Zakat Sah
            </h2>
            <p className="text-xs text-stone-500 max-w-2xl">
              Seluruh laporan keuangan disusun berdasarkan standar PSAK 109 (Akuntansi Zakat dan Infak/Sedekah), diaudit secara independen, dan sah sebagai pengurang penghasilan bruto kena pajak (PPh).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <div className="font-bold">Opini Audit: WTP</div>
              <div className="text-[10px] text-emerald-700">Wajar Tanpa Pengecualian</div>
            </div>
          </div>
        </div>
      </div>

      {/* Audited Periodical Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportsList.map((rep) => (
          <div 
            key={rep.id}
            className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex flex-col justify-between hover:border-emerald-500/60 transition-all space-y-3"
          >
            <div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                {rep.status}
              </span>
              <h3 className="text-xs font-bold text-stone-900 mt-2 line-clamp-2">
                {rep.title}
              </h3>
              <p className="text-[11px] text-stone-500 mt-1">
                Periode: {rep.period}
              </p>
              <div className="text-[11px] text-emerald-800 font-semibold mt-1">
                Total Tersalurkan: {formatRupiah(rep.totalDisbursed)}
              </div>
              <div className="text-[10px] text-stone-500 mt-1">
                Auditor: {rep.auditor}
              </div>
            </div>

            <button
              onClick={() => alert(`Mengunduh berkas resmi: ${rep.title} (${rep.fileSize}). Berkas terverifikasi digital signature.`)}
              className="w-full flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-emerald-700 hover:text-white text-stone-800 text-xs font-semibold py-2 rounded-lg transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Dokumen Audit ({rep.fileSize})</span>
            </button>
          </div>
        ))}
      </div>

      {/* Donor Transactions & Official Receipts (BSZ) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              Bukti Setor Zakat (BSZ) Digital Terverifikasi
            </h3>
            <p className="text-xs text-stone-500">
              Dokumen sah dengan QR Code untuk lampiran SPT Tahunan Pribadi atau Badan
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-semibold bg-stone-50/50">
                <th className="py-2.5 px-3">No. BSZ Resmi</th>
                <th className="py-2.5 px-3">Tanggal</th>
                <th className="py-2.5 px-3">Muzaki / Donatur</th>
                <th className="py-2.5 px-3">Jenis Ibadah</th>
                <th className="py-2.5 px-3">Nominal Zakat</th>
                <th className="py-2.5 px-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-emerald-800">
                    {trx.receiptNumber}
                  </td>
                  <td className="py-3 px-3 text-stone-500">
                    {trx.timestamp}
                  </td>
                  <td className="py-3 px-3 font-medium">
                    {trx.donorName}
                  </td>
                  <td className="py-3 px-3 capitalize">
                    {trx.donationType.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-3 font-bold text-emerald-700">
                    {formatRupiah(trx.amount)}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => setSelectedReceipt(trx)}
                      className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat BSZ</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Receipt Dialog */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official BSZ Certificate Layout */}
            <div className="border-2 border-emerald-800/40 p-5 rounded-xl bg-gradient-to-b from-emerald-50/30 to-stone-50/30">
              <div className="text-center border-b-2 border-emerald-900 pb-3 mb-3">
                <div className="text-xs font-bold text-emerald-950 uppercase tracking-widest font-serif">
                  LEMBAGA AMIL ZAKAT & INFAQ ISLAMICITY RELAWAN
                </div>
                <div className="text-[10px] text-stone-500">
                  Izin Operasional Kemenag No. 492/2024 • Standar BAZNAS RI
                </div>
                <h3 className="text-base font-extrabold text-emerald-900 mt-2 tracking-wide font-serif">
                  BUKTI SETOR ZAKAT (BSZ) DIGITAL
                </h3>
                <div className="text-xs font-mono font-bold text-stone-700">
                  No: {selectedReceipt.receiptNumber}
                </div>
              </div>

              <div className="space-y-2 text-xs text-stone-800">
                <div className="flex justify-between">
                  <span className="text-stone-500">Nama Muzaki/Donatur:</span>
                  <span className="font-bold">{selectedReceipt.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Jenis Ibadah:</span>
                  <span className="font-semibold uppercase">{selectedReceipt.donationType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Inisiatif Penyaluran:</span>
                  <span className="font-semibold text-right max-w-[220px] truncate">{selectedReceipt.campaignTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Metode Pembayaran:</span>
                  <span className="font-semibold">{selectedReceipt.paymentMethod.toUpperCase()} (0% Admin)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Waktu Transaksi:</span>
                  <span>{selectedReceipt.timestamp}</span>
                </div>

                <div className="border-t border-emerald-800/30 pt-2 flex justify-between text-sm font-bold text-emerald-900">
                  <span>Jumlah Disetorkan:</span>
                  <span>{formatRupiah(selectedReceipt.amount)}</span>
                </div>
              </div>

              {/* Stamp & QR code verification */}
              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                <div className="text-[10px] text-stone-500 max-w-[200px]">
                  *Bukti setor ini diakui secara sah oleh Ditjen Pajak RI sebagai pengurang penghasilan bruto SPT PPh Pasal 22.
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center text-[9px] font-mono rounded mx-auto">
                    [QR VALID]
                  </div>
                  <div className="text-[9px] text-emerald-800 font-bold mt-1">
                    TERVERIFIKASI
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={handlePrintReceipt}
                className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Bukti</span>
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
