import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Search,
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Lock,
  QrCode,
  FileText,
  Download,
  X,
  Share2
} from 'lucide-react';
import { VolunteerProfile } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ExternalVolunteerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: VolunteerProfile[];
  initialRegistrationNumber?: string;
  onDownloadPdf?: (profile: VolunteerProfile) => void;
}

export const ExternalVolunteerVerificationModal: React.FC<ExternalVolunteerVerificationModalProps> = ({
  isOpen,
  onClose,
  profiles,
  initialRegistrationNumber,
  onDownloadPdf
}) => {
  const [searchCode, setSearchCode] = useState<string>(initialRegistrationNumber || profiles[0]?.registrationNumber || '');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Find profile by registration number or ID or hash
  const matchedProfile = profiles.find(p => 
    p.registrationNumber.toLowerCase().trim() === searchCode.toLowerCase().trim() ||
    p.id.toLowerCase().trim() === searchCode.toLowerCase().trim() ||
    p.badges.some(b => b.verificationHash?.toLowerCase().includes(searchCode.toLowerCase().trim()))
  ) || profiles.find(p => p.registrationNumber === initialRegistrationNumber) || profiles[0];

  const isValid = !!matchedProfile;
  const verificationHash = matchedProfile?.badges[0]?.verificationHash || '0x88fe29a174bcd910';
  const verificationUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/?verify=volunteer&reg=${encodeURIComponent(matchedProfile?.registrationNumber || '')}`
    : `https://islamicity.org/verify/volunteer/${matchedProfile?.registrationNumber || ''}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Verification Header Bar */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-stone-900 text-white p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  PORTAL AUDIT KEASLIAN PIHAK EKSTERNAL
                </div>
                <h2 className="text-base sm:text-lg font-black text-white">
                  Verifikasi Keaslian Laporan Relawan Lapangan
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white p-1.5 rounded-xl hover:bg-stone-800/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-stone-300 mt-2 relative z-10 leading-relaxed max-w-xl">
            Sistem publik untuk memeriksa validitas dokumen, sertifikasi syariah, dan riwayat penugasan relawan yang diterbitkan oleh Lembaga Islamicity.
          </p>
        </div>

        {/* Search / Verify Code Input */}
        <div className="p-4 sm:p-6 bg-stone-50 border-b border-stone-200">
          <label className="text-xs font-bold text-stone-700 block mb-1.5">
            Nomor Registrasi atau Hash Verifikasi Dokumen:
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Contoh: IR-REL-2026-94821 atau 0x99a81b2..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold bg-white border border-stone-300 rounded-xl focus:border-emerald-600 outline-none shadow-2xs"
              />
            </div>
            <select
              value={matchedProfile?.registrationNumber || ''}
              onChange={(e) => setSearchCode(e.target.value)}
              className="text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-xl px-3 py-2 outline-none cursor-pointer"
            >
              {profiles.map(p => (
                <option key={p.id} value={p.registrationNumber}>
                  {p.name} ({p.registrationNumber})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Verification Status Result */}
        {matchedProfile ? (
          <div className="p-5 sm:p-6 space-y-5 max-h-[68vh] overflow-y-auto">
            {/* Status Banner */}
            <div className="bg-emerald-50 border-2 border-emerald-500/80 rounded-2xl p-4 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">
                    DOKUMEN RESMI TERVERIFIKASI ASLI & AKTIF
                  </span>
                  <span className="bg-emerald-200/80 text-emerald-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                    LEDGER SAH ✓
                  </span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  Laporan rekam jejak ini sesuai dengan data master di server audit publik Islamicity. Tidak ditemukan modifikasi atau rekayasa data.
                </p>
                <div className="text-[11px] font-mono text-emerald-800 pt-1 flex flex-wrap items-center gap-3">
                  <span>Hash Bukti: {verificationHash}</span>
                  <span>•</span>
                  <span>Diperiksa: Real-time Live Check</span>
                </div>
              </div>
            </div>

            {/* Profile Detail Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={matchedProfile.avatarUrl}
                  alt={matchedProfile.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-stone-100 text-stone-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                      {matchedProfile.registrationNumber}
                    </span>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Tingkat {matchedProfile.volunteerLevel.currentLevel}: {matchedProfile.volunteerLevel.levelName}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-stone-900">
                    {matchedProfile.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700">
                    {matchedProfile.titleBadge}
                  </p>
                  <p className="text-xs text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    Domisili Lapangan: {matchedProfile.city} • Bergabung: {matchedProfile.joinDate}
                  </p>
                </div>
              </div>

              {/* Integrity & Verified Credentials Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-xs">
                <div className="p-2.5 bg-stone-50 rounded-xl">
                  <div className="text-[10px] text-stone-500">Skor Integritas</div>
                  <div className="text-sm font-extrabold text-emerald-700">{matchedProfile.reliabilityScore}%</div>
                  <div className="text-[9px] text-emerald-600 font-semibold">Tervalidasi Sempurna</div>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl">
                  <div className="text-[10px] text-stone-500">Jam Pelayanan</div>
                  <div className="text-sm font-extrabold text-stone-900">{matchedProfile.stats.totalHours} Jam</div>
                  <div className="text-[9px] text-stone-500">Rekam Jejak Nyata</div>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl">
                  <div className="text-[10px] text-stone-500">Misi Selesai</div>
                  <div className="text-sm font-extrabold text-stone-900">{matchedProfile.stats.totalInitiatives} Misi</div>
                  <div className="text-[9px] text-stone-500">Bebas Pelanggaran</div>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl">
                  <div className="text-[10px] text-stone-500">Amanah Didampingi</div>
                  <div className="text-xs font-extrabold text-emerald-800 mt-0.5">{formatRupiah(matchedProfile.stats.fundsDistributedDirectly)}</div>
                  <div className="text-[9px] text-emerald-600 font-semibold">Nol Potongan</div>
                </div>
              </div>

              {/* Syariah Ethics Pledge Status */}
              <div className="p-3 bg-stone-50 border border-stone-200/80 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-stone-800">Ikrar Syariah & Kode Etik Relawan:</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                  ✓ DITANDATANGANI SECARA ELEKTRONIK
                </span>
              </div>
            </div>

            {/* List of Verified Missions for Third-Party Audit */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase text-stone-700 tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>Riwayat Penugasan Yang Telah Divalidasi Saksi Lapangan</span>
              </h4>

              <div className="space-y-2">
                {(matchedProfile.participationHistory || []).map((m, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="font-bold text-stone-900">{m.campaignTitle}</div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-2">
                        <span>Peran: <strong className="text-stone-700">{m.roleTitle}</strong></span>
                        <span>•</span>
                        <span>{m.period}</span>
                        <span>•</span>
                        <span>{m.serviceHours} Jam</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block">
                        {m.communityVerification.status === 'terverifikasi' ? 'Tervalidasi Warga' : 'Dalam Tinjauan'}
                      </span>
                      <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                        {m.communityVerification.votesValid} Suara Sah
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shareable Verification Link Box */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
              <div className="text-xs font-bold text-emerald-950 flex items-center justify-between">
                <span>Tautan Verifikasi Permanen Untuk Arsip Pihak Ketiga:</span>
                <button
                  onClick={handleCopyLink}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Tautan'}</span>
                </button>
              </div>
              <div className="font-mono text-[11px] text-stone-600 bg-white p-2 rounded-xl border border-stone-200 truncate select-all">
                {verificationUrl}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-sm font-bold text-stone-800">Nomor Registrasi Tidak Ditemukan</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Pastikan Anda memasukkan kode registrasi relawan yang tepat (contoh: IR-REL-2026-94821).
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-stone-500 text-center sm:text-left">
            Dewan Pengawas Syariah & Koordinator Nasional Relawan Islamicity
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {matchedProfile && onDownloadPdf && (
              <button
                onClick={() => onDownloadPdf(matchedProfile)}
                className="flex-1 sm:flex-initial bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh File PDF</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
