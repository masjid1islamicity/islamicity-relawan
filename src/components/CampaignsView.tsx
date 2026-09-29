import React, { useState } from 'react';
import { 
  HeartHandshake, 
  MapPin, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Filter,
  Layers,
  Award,
  UserCheck,
  LayoutGrid,
  Map as MapIcon,
  Compass,
  Sunrise,
  GraduationCap
} from 'lucide-react';
import { Campaign, VolunteerRole, CampaignCategory } from '../types';
import { formatRupiah, formatNumber } from '../utils/formatters';
import { ImpactMap } from './ImpactMap';

interface CampaignsViewProps {
  campaigns: Campaign[];
  volunteerRoles: VolunteerRole[];
  searchQuery: string;
  onOpenDonateModal: (campaign: Campaign) => void;
  onOpenVolunteerModal: (role: VolunteerRole) => void;
  onOpenShareModal: (campaign: Campaign) => void;
  onOpenKidsTutorial?: () => void;
  onOpenVolunteerProfile?: () => void;
  onOpenSedekahSubuh?: () => void;
  onOpenCurriculum?: () => void;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({
  campaigns,
  volunteerRoles,
  searchQuery,
  onOpenDonateModal,
  onOpenVolunteerModal,
  onOpenShareModal,
  onOpenKidsTutorial,
  onOpenVolunteerProfile,
  onOpenSedekahSubuh,
  onOpenCurriculum,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'both' | 'map' | 'cards'>('both');

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Hero Showcase */}
      <div className="relative rounded-2xl bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 border border-emerald-800/40 p-6 sm:p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-600/50 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ekosistem Solidaritas & Kemanusiaan Islam</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Hubungkan Niat Ikhlas dengan Aksi Nyata Relawan Berdaya
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Platform pertama yang menggabungkan kemudahan pembayaran zakat digital terenkripsi, pengerahan relawan berlandaskan nilai syariah, serta audit pelacakan penyaluran bantuan real-time dan verifikasi komunitas masyarakat.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-stone-800/60 backdrop-blur-xs p-2.5 rounded-xl border border-stone-700/60">
              <div className="text-stone-400 text-[10px]">Tersalurkan</div>
              <div className="font-bold text-sm text-emerald-400">98.6%</div>
            </div>
            <div className="bg-stone-800/60 backdrop-blur-xs p-2.5 rounded-xl border border-stone-700/60">
              <div className="text-stone-400 text-[10px]">Relawan Lapangan</div>
              <div className="font-bold text-sm text-stone-100">1,240+ Jiwa</div>
            </div>
            <div className="bg-stone-800/60 backdrop-blur-xs p-2.5 rounded-xl border border-stone-700/60">
              <div className="text-stone-400 text-[10px]">Verifikasi GPS</div>
              <div className="font-bold text-sm text-emerald-400">100% Real-time</div>
            </div>
            <div className="bg-stone-800/60 backdrop-blur-xs p-2.5 rounded-xl border border-stone-700/60">
              <div className="text-stone-400 text-[10px]">Biaya Potongan</div>
              <div className="font-bold text-sm text-amber-300">0% (Bebas Admin)</div>
            </div>
          </div>

          {/* Quick Actions in Hero */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                setViewMode(prev => prev === 'cards' ? 'both' : prev);
                document.getElementById('peta-dampak-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-stone-950" />
              <span>Buka Peta Dampak Nusantara (GPS)</span>
            </button>
            <button
              onClick={() => {
                setViewMode('cards');
                document.getElementById('katalog-inisiatif-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-stone-800/90 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <span>Jelajahi Katalog Program</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sedekah Subuh Fajar Berkah Banner */}
      {onOpenSedekahSubuh && (
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 border-2 border-amber-400/40 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center text-2xl shadow-sm shrink-0 font-bold">
              🌅
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-black text-amber-300 uppercase tracking-wide">
                <Sunrise className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Modul Fajar: Gerakan Sedekah Subuh</span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Raih Doa Malaikat di Waktu Fajar Setiap Hari
              </h3>
              <p className="text-xs text-stone-300">
                Pengingat harian otomatis pada waktu fajar, 1-klik sedekah sarapan santri & dhuafa, lengkap dengan dasbor pelacakan keberkahan fajar.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenSedekahSubuh}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-md flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer"
          >
            <Sunrise className="w-4 h-4 text-stone-950" />
            <span>Buka Sedekah Subuh</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Kids Hands-On Tutorial Interactive Banner */}
      {onOpenKidsTutorial && (
        <div className="bg-gradient-to-r from-amber-50 via-emerald-50 to-teal-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center text-2xl shadow-sm shrink-0">
              🌟
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-black text-amber-900 uppercase">
                <span>Edukasi Anak Usia Dini & Keluarga</span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-stone-900">
                Ajak Si Kecil Belajar Berbagi & Jadi Relawan Cilik!
              </h3>
              <p className="text-xs text-stone-600">
                Simulasi hands-on interaktif: isi celengan berkah, pilih hadiah teman, jalankan mobil posko, dan cetak piagam pahlawan cilik.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenKidsTutorial}
            className="shrink-0 bg-amber-400 hover:bg-amber-300 active:scale-95 text-stone-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-md border-b-2 border-amber-600 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>Mulai Tutorial Cilik (Hands-On)</span>
          </button>
        </div>
      )}

      {/* INTERACTIVE IMPACT MAP (PETA DAMPAK) SECTION */}
      {viewMode !== 'cards' && (
        <div id="peta-dampak-section" className="scroll-mt-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Geospatial Impact Tracking</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Peta Dampak Persebaran Penyaluran Bantuan
              </h3>
              <p className="text-xs text-stone-500">
                Pantau lokasi posko darurat, dapur air, sumur bor, dan armada relawan di seluruh kepulauan Indonesia.
              </p>
            </div>

            {/* View Mode Toggle Controls */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs self-start sm:self-auto">
              <button
                onClick={() => setViewMode('both')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'both' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                <span>Peta & Katalog</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'map' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-emerald-700" />
                <span>Fokus Peta Saja</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'cards' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-emerald-700" />
                <span>Hanya Kartu</span>
              </button>
            </div>
          </div>

          <ImpactMap
            campaigns={campaigns}
            onOpenDonateModal={onOpenDonateModal}
          />
        </div>
      )}

      {/* When viewMode is 'map', offer a quick switch back */}
      {viewMode === 'map' && (
        <div className="text-center p-4 bg-stone-100 rounded-2xl border border-stone-200">
          <p className="text-xs text-stone-600 mb-2">Sedang dalam mode fokus peta dampak.</p>
          <button
            onClick={() => setViewMode('both')}
            className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tampilkan Kembali Katalog Kartu Program & Formasi Relawan</span>
          </button>
        </div>
      )}

      {/* PROGRAM CARDS & VOLUNTEER SECTION */}
      {viewMode !== 'map' && (
        <div id="katalog-inisiatif-section" className="space-y-6 scroll-mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span>Katalog Inisiatif Sosial Terverifikasi</span>
              </div>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">
                Program Penyaluran Aktif & Peluang Berbagi
              </h2>
            </div>

            {viewMode === 'cards' && (
              <button
                onClick={() => {
                  setViewMode('both');
                  document.getElementById('peta-dampak-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Buka Kembali Peta Dampak</span>
              </button>
            )}
          </div>

      {/* Category Pills Bar */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 no-scrollbar text-xs font-medium">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Semua Program ({campaigns.length})
          </button>
          <button
            onClick={() => setSelectedCategory('bencana')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'bencana'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Tanggap Bencana
          </button>
          <button
            onClick={() => setSelectedCategory('pendidikan')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'pendidikan'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Pendidikan & Tahfidz
          </button>
          <button
            onClick={() => setSelectedCategory('wakaf')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'wakaf'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Wakaf Air Bersih
          </button>
          <button
            onClick={() => setSelectedCategory('kesehatan')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'kesehatan'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Kesehatan Mustahik
          </button>
          <button
            onClick={() => setSelectedCategory('zakat')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'zakat'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            Zakat Produktif UMKM
          </button>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((camp) => {
          const progressPercent = Math.min(100, Math.round((camp.currentAmount / camp.targetAmount) * 100));

          return (
            <div
              key={camp.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-video overflow-hidden bg-stone-100">
                  <img
                    src={camp.coverImage}
                    alt={camp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-stone-900/80 backdrop-blur-xs text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                      {camp.categoryLabel}
                    </span>
                    {camp.urgencyLevel === 'tinggi' && (
                      <span className="bg-rose-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <AlertTriangle className="w-3 h-3" />
                        Darurat
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2 left-2 bg-stone-950/75 backdrop-blur-xs text-stone-200 text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{camp.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Nilai: {camp.islamicValues}</span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-2">
                    {camp.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {camp.description}
                  </p>

                  {/* Funding Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-800">
                        {formatRupiah(camp.currentAmount)}
                      </span>
                      <span className="text-stone-500 text-[11px]">
                        {progressPercent}% dari {formatRupiah(camp.targetAmount)}
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats Counter */}
                  <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500 border-t border-stone-100">
                    <div>
                      <strong>{formatNumber(camp.donorCount)}</strong> Donatur
                    </div>
                    <div>
                      <strong>{camp.volunteerCount}</strong> / {camp.targetVolunteers} Relawan
                    </div>
                    <div>
                      <strong>{formatNumber(camp.beneficiariesReached)}</strong> Mustahik
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => onOpenDonateModal(camp)}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Donasi / Zakat</span>
                </button>

                <button
                  onClick={() => onOpenShareModal(camp)}
                  className="p-2.5 rounded-xl bg-white hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors"
                  title="Bagikan ke Media Sosial"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Volunteer Deployment Section */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wide">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Amanah Pelayanan Lapangan</span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 mt-1">
              Peluang Pengabdian Relawan Berbasis Nilai Islam
            </h2>
            <p className="text-xs text-stone-500">
              Bergabunglah bersama ribuan relawan di garis terdepan penanganan krisis sosial & kemanusiaan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {onOpenCurriculum && (
              <button
                onClick={onOpenCurriculum}
                className="text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                <span>Kurikulum Relawan (+XP)</span>
              </button>
            )}
            {onOpenVolunteerProfile && (
              <button
                onClick={onOpenVolunteerProfile}
                className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Buku Profil & Portofolio Relawan</span>
              </button>
            )}
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200">
              {volunteerRoles.length} Formasi Terbuka
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {volunteerRoles.map((role) => (
            <div
              key={role.id}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col justify-between space-y-3 hover:border-teal-500/60 transition-all"
            >
              <div className="space-y-2">
                <span className="bg-teal-100 text-teal-800 font-bold text-[10px] px-2 py-0.5 rounded">
                  {role.slotsNeeded - role.slotsFilled} Kuota Tersisa
                </span>
                <h4 className="text-xs font-bold text-stone-900">
                  {role.roleTitle}
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {role.dutySummary}
                </p>
                <div className="text-[10px] text-stone-500 space-y-1 pt-1">
                  <div>📍 <strong>Lokasi:</strong> {role.location}</div>
                  <div>📅 <strong>Jadwal:</strong> {role.dateRange}</div>
                </div>
              </div>

              <button
                onClick={() => onOpenVolunteerModal(role)}
                className="w-full bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5"
              >
                <span>Daftar Formasi Relawan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
        </div>
      )}
    </div>
  );
};
