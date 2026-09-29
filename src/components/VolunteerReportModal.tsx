import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Printer,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Share2,
  ExternalLink,
  Copy,
  Check,
  X,
  Clock,
  MapPin,
  Calendar,
  Users,
  Award,
  BadgeCheck,
  Eye,
  Sparkles,
  Loader2
} from 'lucide-react';
import { VolunteerProfile } from '../types';
import { formatRupiah } from '../utils/formatters';
import {
  exportVolunteerReportToPdf,
  generateVolunteerQrDataUrl,
  getVolunteerVerificationUrl
} from '../utils/volunteerReportPdf';

interface VolunteerReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: VolunteerProfile;
  onOpenExternalVerification?: (registrationNumber: string) => void;
}

export const VolunteerReportModal: React.FC<VolunteerReportModalProps> = ({
  isOpen,
  onClose,
  profile,
  onOpenExternalVerification
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [includeHistory, setIncludeHistory] = useState<boolean>(true);
  const [includeBadges, setIncludeBadges] = useState<boolean>(true);
  const [includeSignatures, setIncludeSignatures] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    generateVolunteerQrDataUrl(profile).then((url) => {
      if (isMounted) setQrDataUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [profile]);

  if (!isOpen) return null;

  const verificationUrl = getVolunteerVerificationUrl(profile);
  const docCode = `DOC-REL-${profile.registrationNumber.slice(-8)}-2026`;

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      await exportVolunteerReportToPdf(profile, {
        includeHistory,
        includeBadges,
        includeSignatures
      });
      setToastMessage('✅ Dokumen PDF resmi berhasil diunduh ke perangkat Anda!');
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err) {
      console.error('Export error:', err);
      setToastMessage('❌ Terjadi kesalahan saat membuat file PDF.');
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-stone-900 text-white border border-emerald-500 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs animate-in fade-in slide-in-from-top-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-stone-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="bg-white rounded-3xl max-w-4xl w-full border border-stone-200 shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:my-0 print:rounded-none">
        {/* Top Control Bar (Hidden on print) */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MODUL EKSPOR LAPORAN INDIVIDUAL RELAWAN</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                Laporan Rekam Jejak Resmi: {profile.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>{isExporting ? 'Memproses PDF...' : 'Unduh File PDF'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-stone-700 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Cetak langsung menggunakan dialog print browser"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak</span>
            </button>

            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white p-2 rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Configuration Bar (Hidden on print) */}
        <div className="bg-stone-50 border-b border-stone-200 p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs print:hidden shrink-0">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-bold text-stone-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Opsi Muatan Dokumen:
            </span>
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-600">
              <input
                type="checkbox"
                checked={includeHistory}
                onChange={(e) => setIncludeHistory(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
              />
              <span>Tabel Riwayat Tugas ({profile.participationHistory?.length || 0})</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-600">
              <input
                type="checkbox"
                checked={includeBadges}
                onChange={(e) => setIncludeBadges(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
              />
              <span>Lencana & Sertifikasi</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-600">
              <input
                type="checkbox"
                checked={includeSignatures}
                onChange={(e) => setIncludeSignatures(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
              />
              <span>Tanda Tangan DPS & Segel</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenExternalVerification && onOpenExternalVerification(profile.registrationNumber)}
              className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-700" />
              <span>Simulasikan Pindai QR / Cek Keaslian</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Tersalin!' : 'Salin URL QR'}</span>
            </button>
          </div>
        </div>

        {/* Document Body (Printable A4 Preview) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-stone-100/70 print:bg-white print:p-0">
          <div className="max-w-3xl mx-auto bg-white border border-stone-300 print:border-none shadow-md print:shadow-none p-6 sm:p-10 rounded-2xl print:rounded-none space-y-6 text-stone-900">
            {/* Header Document Banner */}
            <div className="border-b-2 border-emerald-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
                  <ShieldCheck className="w-9 h-9 text-emerald-200" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase">
                    Lembaga Kemanusiaan & Amil Zakat Islamicity
                  </div>
                  <h1 className="text-base sm:text-xl font-black text-stone-900 leading-tight">
                    LAPORAN INDIVIDUAL REKAM JEJAK & AKREDITASI RELAWAN
                  </h1>
                  <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                    Sistem Audit Publik • Kode Dokumen: {docCode}
                  </p>
                </div>
              </div>

              {/* Status Pill */}
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-right shrink-0">
                <div className="text-[10px] font-black text-emerald-900 uppercase tracking-wider flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  STATUS TERAKREDITASI
                </div>
                <div className="text-xs font-bold text-emerald-700">
                  Skor Integritas: {profile.reliabilityScore}%
                </div>
                <div className="text-[10px] text-stone-500">
                  {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Volunteer Profile Block */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-600 shadow-sm shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                      {profile.registrationNumber}
                    </span>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      Tingkat {profile.volunteerLevel.currentLevel}: {profile.volunteerLevel.levelName}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-stone-900">{profile.name}</h2>
                  <p className="text-xs font-bold text-emerald-700">{profile.titleBadge}</p>
                  <p className="text-xs text-stone-600 max-w-lg leading-relaxed">{profile.bio}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-stone-600 border-t sm:border-t-0 sm:border-l border-stone-200 pt-3 sm:pt-0 sm:pl-5 shrink-0">
                <div><strong>Domisili:</strong> {profile.city}</div>
                <div><strong>Bergabung:</strong> {profile.joinDate}</div>
                <div><strong>Gol. Darah:</strong> {profile.bloodType}</div>
                <div><strong>Kontak:</strong> {profile.phone}</div>
                <div><strong>Email:</strong> {profile.email}</div>
              </div>
            </div>

            {/* 6 Core Contribution KPIs */}
            <div>
              <h3 className="text-xs font-black text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Ringkasan Statistik Kontribusi Lapangan</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="text-[11px] text-stone-500">Total Jam Pelayanan</div>
                  <div className="text-lg font-extrabold text-stone-900">{profile.stats.totalHours} Jam</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">Tercatat di Ledger</div>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="text-[11px] text-stone-500">Misi Kemanusiaan</div>
                  <div className="text-lg font-extrabold text-stone-900">{profile.stats.totalInitiatives} Misi</div>
                  <div className="text-[10px] text-blue-700 font-semibold">Selesai Bertugas</div>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="text-[11px] text-stone-500">Penerima Manfaat</div>
                  <div className="text-lg font-extrabold text-stone-900">{profile.stats.beneficiariesHelped.toLocaleString('id-ID')} Jiwa</div>
                  <div className="text-[10px] text-amber-700 font-semibold">Terbantu Langsung</div>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="text-[11px] text-stone-500">Bukti Terverifikasi</div>
                  <div className="text-lg font-extrabold text-stone-900">{profile.stats.verifiedProofsCount} Dokumen</div>
                  <div className="text-[10px] text-teal-700 font-semibold">Geotag & Nota Sah</div>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="text-[11px] text-stone-500">Suara Audit Warga</div>
                  <div className="text-lg font-extrabold text-stone-900">{profile.stats.communityVotesGiven} Suara</div>
                  <div className="text-[10px] text-purple-700 font-semibold">Konsensus Publik</div>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="text-[11px] text-stone-500">Amanah Didampingi</div>
                  <div className="text-sm font-extrabold text-stone-900 mt-1">{formatRupiah(profile.stats.fundsDistributedDirectly)}</div>
                  <div className="text-[10px] text-rose-700 font-semibold">100% Bebas Potongan</div>
                </div>
              </div>
            </div>

            {/* Badges Section */}
            {includeBadges && (
              <div>
                <h3 className="text-xs font-black text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Lencana Kehormatan & Akreditasi Terverifikasi ({profile.badges.filter(b => b.isUnlocked).length} Diraih)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {profile.badges.filter(b => b.isUnlocked).map(b => (
                    <div key={b.id} className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-stone-900 truncate">{b.name}</span>
                        <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-200/60 px-1.5 py-0.5 rounded">
                          {b.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 line-clamp-2">{b.description}</p>
                      <div className="text-[10px] font-mono text-stone-400 truncate pt-0.5">
                        Hash: {b.verificationHash || '0x49ab82...sah'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Participation History Table */}
            {includeHistory && (
              <div>
                <h3 className="text-xs font-black text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Log Riwayat Penugasan Lapangan ({profile.participationHistory?.length || 0})</span>
                </h3>
                <div className="overflow-x-auto border border-stone-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                        <th className="p-2.5">Inisiatif Kemanusiaan</th>
                        <th className="p-2.5">Peran</th>
                        <th className="p-2.5">Periode</th>
                        <th className="p-2.5">Jam</th>
                        <th className="p-2.5">Penerima</th>
                        <th className="p-2.5">Status & Saksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {(profile.participationHistory || []).map((m, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/60'}>
                          <td className="p-2.5 font-bold text-stone-900">
                            {m.campaignTitle}
                            <div className="text-[10px] font-normal text-stone-500">{m.location}</div>
                          </td>
                          <td className="p-2.5 font-semibold text-emerald-800">{m.roleTitle}</td>
                          <td className="p-2.5 text-stone-600">{m.period}</td>
                          <td className="p-2.5 font-bold">{m.serviceHours} Jam</td>
                          <td className="p-2.5">{m.beneficiariesHelped} Jiwa</td>
                          <td className="p-2.5">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                              ✓ {m.communityVerification.votesValid} Suara Warga
                            </span>
                            <div className="text-[10px] text-stone-400 truncate max-w-[120px]">
                              {m.communityVerification.verifiedByNames?.[0] || 'Saksi Warga'}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* QR Code & External Verification Anchor Block */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 border-2 border-emerald-500/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
              <div className="bg-white p-2.5 rounded-2xl border-2 border-emerald-600 shadow-md shrink-0 flex flex-col items-center">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="QR Code Verifikasi Eksternal"
                    className="w-32 h-32 object-contain"
                  />
                ) : (
                  <div className="w-32 h-32 bg-stone-100 rounded-xl flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-stone-400 animate-pulse" />
                  </div>
                )}
                <span className="text-[9px] font-mono text-emerald-900 font-bold mt-1">
                  KODE AUDIT RESMI
                </span>
              </div>

              <div className="space-y-2 text-xs flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    QR CODE VERIFIKASI KEASLIAN OLEH PIHAK EKSTERNAL
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-stone-900">
                  Pemeriksaan Faktual & Keaslian Tanpa Registrasi Akun
                </h4>
                <p className="text-stone-700 leading-relaxed">
                  Pihak luar (Pemerintah, Lembaga Penyalur, Perusahaan CSR, atau Tim Akreditasi) dapat memindai QR Code di samping menggunakan smartphone untuk mencocokkan data relawan ini secara langsung dengan buku induk audit Islamicity.
                </p>
                <div className="p-2.5 bg-white/90 rounded-xl border border-emerald-300 font-mono text-[11px] text-stone-700 truncate select-all">
                  Tautan Audit: {verificationUrl}
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                  <button
                    onClick={() => onOpenExternalVerification && onOpenExternalVerification(profile.registrationNumber)}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Buka Hasil Pengecekan Pihak Eksternal Sekarang
                  </button>
                </div>
              </div>
            </div>

            {/* Official Signatures Block */}
            {includeSignatures && (
              <div className="pt-4 border-t border-stone-200 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Mengetahui & Mensahkan,</div>
                  <div className="font-bold text-stone-800 mt-0.5">Dewan Pengawas Syariah Islamicity</div>
                  <div className="h-16 flex items-center justify-center font-serif italic text-base text-stone-700">
                    Dr. H. M. Nadzir, M.Ag
                  </div>
                  <div className="text-[11px] font-mono text-stone-500">NIP: 19780512-DPS-ISL</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">Tanda Tangan Elektronik Sah ✓</div>
                </div>

                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Diterbitkan Oleh,</div>
                  <div className="font-bold text-stone-800 mt-0.5">Koordinator Nasional Relawan Lapangan</div>
                  <div className="h-16 flex items-center justify-center font-serif italic text-base text-stone-700">
                    Ir. Arif Hidayat, S.T., M.Sc.
                  </div>
                  <div className="text-[11px] font-mono text-stone-500">NIP: 19840217-KNR-ISL</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">Tanda Tangan Elektronik Sah ✓</div>
                </div>
              </div>
            )}

            {/* Footer Disclaimer */}
            <div className="pt-4 border-t border-stone-200 text-[10px] text-stone-500 text-center leading-relaxed">
              Dokumen ini dihasilkan secara otomatis oleh Sistem Manajemen Relawan & Audit Terpadu Islamicity. Seluruh hak cipta dilindungi undang-undang.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
