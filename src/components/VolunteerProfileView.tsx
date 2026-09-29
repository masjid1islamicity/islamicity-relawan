import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Users,
  Heart,
  MapPin,
  Calendar,
  Flame,
  HeartPulse,
  BookOpen,
  Sun,
  Sprout,
  Sparkles,
  Download,
  Printer,
  Share2,
  FileText,
  ThumbsUp,
  AlertCircle,
  Filter,
  Search,
  ChevronRight,
  Plus,
  Hash,
  QrCode,
  Lock,
  BadgeCheck,
  Radio,
  ExternalLink,
  UserCheck,
  Activity,
  ArrowUpRight,
  Phone,
  Mail,
  X
} from 'lucide-react';
import { 
  VolunteerProfile, 
  VolunteerBadge, 
  VolunteerParticipationHistory, 
  ImpactMilestone, 
  Campaign,
  VolunteerRegistration 
} from '../types';
import { formatRupiah } from '../utils/formatters';
import { VolunteerReportModal } from './VolunteerReportModal';
import { ExternalVolunteerVerificationModal } from './ExternalVolunteerVerificationModal';
import { exportVolunteerReportToPdf, generateVolunteerQrDataUrl } from '../utils/volunteerReportPdf';

interface VolunteerProfileViewProps {
  profiles: VolunteerProfile[];
  currentProfileId?: string;
  milestones: ImpactMilestone[];
  campaigns: Campaign[];
  registrations: VolunteerRegistration[];
  onVoteMilestone: (milestoneId: string, isUpvote: boolean) => void;
  onSubmitNewProof: (milestone: ImpactMilestone) => void;
  onNavigateToTracking?: () => void;
  onNavigateToCampaigns?: () => void;
  onNavigateToCurriculum?: () => void;
}

export const VolunteerProfileView: React.FC<VolunteerProfileViewProps> = ({
  profiles,
  currentProfileId,
  milestones,
  campaigns,
  registrations,
  onVoteMilestone,
  onSubmitNewProof,
  onNavigateToTracking,
  onNavigateToCampaigns,
  onNavigateToCurriculum
}) => {
  // Selected volunteer profile state
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    currentProfileId || profiles[0]?.id || 'vol-1'
  );

  // Active sub-tab inside profile
  const [activeSection, setActiveSection] = useState<'overview' | 'history' | 'badges' | 'verification-center'>('overview');

  // History filtering & search
  const [historyFilter, setHistoryFilter] = useState<'all' | 'selesai' | 'bertugas'>('all');
  const [historySearch, setHistorySearch] = useState<string>('');

  // Selected Badge modal
  const [selectedBadge, setSelectedBadge] = useState<VolunteerBadge | null>(null);

  // Certificate / Piagam modal
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  // Individual Volunteer Report PDF Export modal
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // External Verification Portal modal (simulating third-party QR audit scan)
  const [isExternalVerificationOpen, setIsExternalVerificationOpen] = useState<boolean>(false);
  const [verificationTargetCode, setVerificationTargetCode] = useState<string>('');

  // Quick Proof Upload Modal
  const [isUploadProofOpen, setIsUploadProofOpen] = useState<boolean>(false);
  const [proofTitle, setProofTitle] = useState<string>('');
  const [proofLocation, setProofLocation] = useState<string>('');
  const [proofDesc, setProofDesc] = useState<string>('');
  const [proofSpent, setProofSpent] = useState<number>(5000000);
  const [proofBeneficiaries, setProofBeneficiaries] = useState<number>(100);
  const [proofCampaignId, setProofCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [proofGps, setProofGps] = useState<string>('-1.3412, 100.5823');

  // Community verification live voter state
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});
  const [verifierNotes, setVerifierNotes] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenExternalVerification = (code?: string) => {
    setVerificationTargetCode(code || baseProfile.registrationNumber);
    setIsExternalVerificationOpen(true);
  };

  const handleQuickDownloadPdf = async (profileToDownload?: VolunteerProfile) => {
    const target = profileToDownload || baseProfile;
    try {
      showToast(`⏳ Menyusun laporan PDF resmi untuk ${target.name}...`);
      await exportVolunteerReportToPdf(target);
      showToast(`✅ Laporan PDF resmi ${target.name} berhasil diunduh!`);
    } catch (err) {
      console.error('PDF export error:', err);
      showToast('❌ Gagal mengunduh file PDF.');
    }
  };

  // Find active profile
  const baseProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0];

  // Merge any dynamic registrations from current session into participation history if matching name
  const dynamicParticipations: VolunteerParticipationHistory[] = registrations
    .filter(r => r.volunteerName.toLowerCase().includes(baseProfile.name.toLowerCase().split(' ')[0]))
    .map(r => ({
      id: `dyn-${r.id}`,
      campaignId: campaigns.find(c => c.title === r.campaignTitle)?.id || 'camp-1',
      campaignTitle: r.campaignTitle,
      roleTitle: r.roleTitle,
      period: r.registeredAt,
      serviceHours: r.serviceHours || 8,
      location: r.city,
      status: r.status,
      beneficiariesHelped: 80,
      tasksCompleted: ['Pendaftaran formasi lapangan terkonfirmasi sistem', 'Penerimaan ikrar syariah relawan'],
      photoUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
      communityVerification: {
        status: 'dalam_tinjauan',
        votesValid: 3,
        verifiedByNames: ['Koordinator Relawan Wilayah', 'Sistem Islamicity'],
        blockchainHash: '0x11ff88...reg1'
      }
    }));

  const mergedHistory: VolunteerParticipationHistory[] = [
    ...dynamicParticipations,
    ...(baseProfile.participationHistory || [])
  ];

  // Filtered history list
  const filteredHistory = mergedHistory.filter(item => {
    const matchesFilter = historyFilter === 'all' || item.status === historyFilter;
    const matchesSearch = 
      item.campaignTitle.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.roleTitle.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.location.toLowerCase().includes(historySearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getBadgeIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'CheckCircle2': return <CheckCircle2 className={className} />;
      case 'Sun': return <Sun className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Sprout': return <Sprout className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      default: return <Award className={className} />;
    }
  };

  const getTierColor = (level: string) => {
    switch (level) {
      case 'platinum':
        return {
          bg: 'bg-gradient-to-br from-slate-100 via-teal-50 to-emerald-100',
          border: 'border-teal-300',
          text: 'text-teal-900',
          badge: 'bg-teal-700 text-white',
          pill: 'bg-teal-100 text-teal-800'
        };
      case 'gold':
        return {
          bg: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-stone-50',
          border: 'border-amber-300',
          text: 'text-amber-950',
          badge: 'bg-amber-500 text-stone-950',
          pill: 'bg-amber-100 text-amber-900'
        };
      case 'silver':
        return {
          bg: 'bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100',
          border: 'border-slate-300',
          text: 'text-slate-800',
          badge: 'bg-slate-400 text-stone-900',
          pill: 'bg-slate-100 text-slate-800'
        };
      default:
        return {
          bg: 'bg-stone-50',
          border: 'border-stone-200',
          text: 'text-stone-700',
          badge: 'bg-stone-400 text-white',
          pill: 'bg-stone-100 text-stone-700'
        };
    }
  };

  const handleVoteAction = (milestoneId: string, isUp: boolean) => {
    if (votedMap[milestoneId]) return;
    onVoteMilestone(milestoneId, isUp);
    setVotedMap(prev => ({ ...prev, [milestoneId]: true }));
    showToast(isUp ? '✅ Suara verifikasi sah berhasil direkam ke audit ledger!' : '⚠️ Masukan tinjauan lapangan telah dikirim ke koordinator.');
  };

  const handleCreateProof = (e: React.FormEvent) => {
    e.preventDefault();
    const camp = campaigns.find(c => c.id === proofCampaignId) || campaigns[0];
    const newM: ImpactMilestone = {
      id: `mile-${Date.now()}`,
      campaignId: camp.id,
      campaignTitle: camp.title,
      title: proofTitle || `Penyaluran Amanah Lapangan oleh ${baseProfile.name}`,
      description: proofDesc || `Amanah logistik diserahkan langsung oleh relawan ${baseProfile.name} dengan pengawasan tokoh warga setempat.`,
      timestamp: `${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      location: proofLocation || baseProfile.city,
      gpsCoords: proofGps,
      stage: 'penyaluran',
      spentAmount: proofSpent,
      beneficiariesCount: proofBeneficiaries,
      proofImages: ['https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80'],
      verifiedByCommunity: {
        votesValid: 1,
        votesReview: 0,
        status: 'terverifikasi',
        verifierNames: [`${baseProfile.name} (Relawan Bertugas)`, 'Sistem Audit Islamicity']
      },
      blockchainHash: `0x${Math.random().toString(16).substring(2, 10)}...audit`,
      receiptNumber: `RC-REL-${Date.now().toString().slice(-6)}`
    };

    onSubmitNewProof(newM);
    setIsUploadProofOpen(false);
    setProofTitle('');
    setProofLocation('');
    setProofDesc('');
    showToast('🎉 Laporan bukti penyaluran lapangan berhasil diterbitkan ke ledger publik!');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white border border-emerald-500 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs animate-in fade-in slide-in-from-top-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-stone-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Banner / Switch Profile Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Sistem Akreditasi Relawan & Verifikasi Komunitas</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <h1 className="text-base sm:text-lg font-black text-stone-900 leading-tight">
              Buku Portofolio & Profil Relawan Lapangan
            </h1>
          </div>
        </div>

        {/* Profile Selector & Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-stone-600 shrink-0">Ganti Relawan:</label>
            <select
              value={selectedProfileId}
              onChange={(e) => setSelectedProfileId(e.target.value)}
              className="text-xs font-bold text-stone-800 bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-600 cursor-pointer"
            >
              {profiles.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.titleBadge.split('&')[0].trim()})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Ekspor laporan profil relawan ke format PDF lengkap dengan QR code"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor PDF</span>
          </button>

          <button
            onClick={() => handleOpenExternalVerification(baseProfile.registrationNumber)}
            className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs px-3 py-2 rounded-lg border border-stone-300 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Uji portal verifikasi keaslian oleh pihak eksternal"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden md:inline">Verifikasi Eksternal</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950 text-white rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
          <ShieldCheck className="w-96 h-96 text-emerald-400" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Avatar & Main Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={baseProfile.avatarUrl}
                alt={baseProfile.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-3 border-emerald-400/80 shadow-md"
              />
              <div 
                title="Telah Lolos Verifikasi KTP & Ikrar Amanah Syariah"
                className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-full border-2 border-stone-900 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3 text-emerald-400" />
                  {baseProfile.registrationNumber}
                </span>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Tingkat {baseProfile.volunteerLevel.currentLevel}: {baseProfile.volunteerLevel.levelName}
                </span>
                <span className="bg-stone-800 text-stone-300 text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  {baseProfile.city}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {baseProfile.name}
              </h2>
              <p className="text-emerald-400 font-semibold text-xs sm:text-sm">
                {baseProfile.titleBadge}
              </p>
              <p className="text-stone-300 text-xs max-w-2xl leading-relaxed">
                {baseProfile.bio}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  Bergabung Sejak: {baseProfile.joinDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-400" />
                  Gol. Darah: {baseProfile.bloodType}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Skor Integritas: {baseProfile.reliabilityScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs: Export PDF with QR, Certificate & Upload Proof */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-2.5 w-full lg:w-auto shrink-0">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-stone-950" />
              <span>Ekspor Laporan PDF (QR Code)</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCertificateOpen(true)}
                className="flex-1 bg-stone-800/90 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Piagam</span>
              </button>
              <button
                onClick={() => setIsUploadProofOpen(true)}
                className="flex-1 bg-stone-800/90 hover:bg-stone-700 text-emerald-300 border border-emerald-500/40 font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bukti Lapangan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-5 border-t border-stone-800/80">
          <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
            <span className="text-stone-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Progres Tingkat Menuju Level {baseProfile.volunteerLevel.currentLevel + 1}:
            </span>
            <span className="text-amber-300 font-mono">
              {baseProfile.volunteerLevel.xp} / {baseProfile.volunteerLevel.nextLevelXp} XP (
              {Math.round((baseProfile.volunteerLevel.xp / baseProfile.volunteerLevel.nextLevelXp) * 100)}%)
            </span>
          </div>
          <div className="w-full bg-stone-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-amber-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (baseProfile.volunteerLevel.xp / baseProfile.volunteerLevel.nextLevelXp) * 100)}%` }}
            />
          </div>

          {onNavigateToCurriculum && (
            <div className="mt-4 bg-gradient-to-r from-emerald-950/90 via-stone-900 to-amber-950/80 border border-amber-400/40 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                  🎓
                </span>
                <div>
                  <div className="font-extrabold text-amber-300 text-xs sm:text-sm">
                    Ingin Tingkatkan Level & Raih Poin XP?
                  </div>
                  <div className="text-[11px] text-stone-300">
                    Pelajari modul manajemen inisiatif sosial, etika syariah dhuafa, dan ikuti kuis interaktif berhadiah XP & Syahadah!
                  </div>
                </div>
              </div>
              <button
                onClick={onNavigateToCurriculum}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-stone-950 font-black text-xs shrink-0 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <span>Buka Kurikulum Relawan</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 6 Key Contribution Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs hover:border-emerald-400 transition-all">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-[11px] text-stone-500 font-medium">Jam Pelayanan:</div>
          <div className="text-xl font-extrabold text-stone-900">{baseProfile.stats.totalHours} Jam</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Tercatat di Ledger</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs hover:border-emerald-400 transition-all">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-[11px] text-stone-500 font-medium">Misi Diikuti:</div>
          <div className="text-xl font-extrabold text-stone-900">{baseProfile.stats.totalInitiatives} Misi</div>
          <div className="text-[10px] text-blue-700 font-semibold mt-0.5">Semua Terselesaikan</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs hover:border-emerald-400 transition-all">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-[11px] text-stone-500 font-medium">Mustahik Terbantu:</div>
          <div className="text-xl font-extrabold text-stone-900">{baseProfile.stats.beneficiariesHelped.toLocaleString('id-ID')} Jiwa</div>
          <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Langsung di Lapangan</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs hover:border-emerald-400 transition-all">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-2">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-[11px] text-stone-500 font-medium">Bukti Terverifikasi:</div>
          <div className="text-xl font-extrabold text-stone-900">{baseProfile.stats.verifiedProofsCount} Dokumen</div>
          <div className="text-[10px] text-teal-700 font-semibold mt-0.5">Geotag & Nota Sah</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs hover:border-emerald-400 transition-all">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
            <ThumbsUp className="w-4 h-4" />
          </div>
          <div className="text-[11px] text-stone-500 font-medium">Suara Audit Komunitas:</div>
          <div className="text-xl font-extrabold text-stone-900">{baseProfile.stats.communityVotesGiven} Validasi</div>
          <div className="text-[10px] text-purple-700 font-semibold mt-0.5">Verifikator Publik</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs hover:border-emerald-400 transition-all">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center mb-2">
            <Heart className="w-4 h-4" />
          </div>
          <div className="text-[11px] text-stone-500 font-medium">Amanah Didampingi:</div>
          <div className="text-sm font-extrabold text-stone-900 mt-1">{formatRupiah(baseProfile.stats.fundsDistributedDirectly)}</div>
          <div className="text-[10px] text-rose-700 font-semibold mt-0.5">100% Bebas Potongan</div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-stone-200 overflow-x-auto no-scrollbar gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveSection('overview')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'overview'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Ikhtisar & Keahlian Relawan</span>
        </button>

        <button
          onClick={() => setActiveSection('history')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'history'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Riwayat Inisiatif ({mergedHistory.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('badges')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'badges'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Lencana Pencapaian ({baseProfile.badges.filter(b => b.isUnlocked).length}/{baseProfile.badges.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('verification-center')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'verification-center'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Pusat Verifikasi Lapangan Komunitas ({milestones.length})</span>
        </button>
      </div>

      {/* SECTION 1: OVERVIEW & SKILLS */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Skills & Specializations */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
              <h3 className="text-sm font-extrabold text-stone-900 mb-3 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <span>Keahlian & Sertifikasi Relawan Teruji</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {baseProfile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {skill}
                  </span>
                ))}
              </div>

              {/* Islamic Ethics Pledge Box */}
              <div className="mt-5 p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Ikrar Kehormatan & Amanah Syariah Relawan</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Tervalidasi Digital
                  </span>
                </div>
                <p className="text-xs text-stone-600 italic leading-relaxed">
                  “Demi Allah yang Maha Melihat, saya berikrar menjaga amanah donatur dan mustahik, melayani sesama dengan santun tanpa pamrih duniawi, menjaga kerahasiaan martabat penerima manfaat, dan tidak mengambil keuntungan pribadi sedikitpun dari titipan dana kebaikan ini.”
                </p>
                <div className="text-[11px] text-stone-500 font-mono pt-1">
                  Ditandatangani secara elektronik: {baseProfile.joinDate} • Hash: {baseProfile.registrationNumber}-SYR
                </div>
              </div>
            </div>

            {/* Distribution of Service by Pillar */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
              <h3 className="text-sm font-extrabold text-stone-900 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Distribusi Alokasi Pengabdian Menurut Pilar Kemanusiaan</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-stone-700">Tanggap Darurat Bencana & Dapur Ummat</span>
                    <span className="text-emerald-700 font-bold">50% (79 Jam)</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-stone-700">Layanan Medis & Posko Kesehatan Lansia</span>
                    <span className="text-emerald-700 font-bold">25% (39.5 Jam)</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-stone-700">Wakaf Sumber Daya Air & Sanitasi</span>
                    <span className="text-emerald-700 font-bold">15% (23.7 Jam)</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-stone-700">Pemberdayaan Santri & Zakat Produktif</span>
                    <span className="text-emerald-700 font-bold">10% (15.8 Jam)</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Verified Emergency & Contact Card */}
          <div className="space-y-5">
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Kartu Data Siaga Lapangan</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500 font-medium">Status Kesiapan:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Siaga Mobilisasi 24 Jam
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500 font-medium">Nomor Relawan:</span>
                  <span className="font-mono font-bold text-stone-800">{baseProfile.registrationNumber}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500 font-medium">Kontak HP/WA:</span>
                  <span className="font-bold text-stone-800 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    {baseProfile.phone}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500 font-medium">Email Terdaftar:</span>
                  <span className="font-bold text-stone-800 truncate max-w-[150px]">{baseProfile.email}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500 font-medium">Kontak Darurat:</span>
                  <span className="font-semibold text-stone-800 text-right">{baseProfile.emergencyContact}</span>
                </div>

                <div className="flex justify-between py-1.5">
                  <span className="text-stone-500 font-medium">Verifikasi Dokumen:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    KTP, Ijazah & STR Sah
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-200" />
                  <span>Ekspor Laporan PDF Individual</span>
                </button>
                <button
                  onClick={() => handleOpenExternalVerification(baseProfile.registrationNumber)}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs py-2 rounded-xl border border-stone-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-emerald-700" />
                  <span>Uji Verifikasi QR Pihak Eksternal</span>
                </button>
              </div>
            </div>

            {/* Quick Teaser for High Priority Badges */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Lencana Utama</span>
                </h4>
                <button
                  onClick={() => setActiveSection('badges')}
                  className="text-[11px] font-bold text-amber-800 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Semua ({baseProfile.badges.length}) <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {baseProfile.badges.filter(b => b.isUnlocked).slice(0, 4).map(badge => {
                  const colors = getTierColor(badge.level);
                  return (
                    <div
                      key={badge.id}
                      onClick={() => setSelectedBadge(badge)}
                      className={`${colors.bg} border ${colors.border} p-2.5 rounded-xl text-left cursor-pointer hover:scale-102 transition-transform`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-amber-700">
                        {getBadgeIcon(badge.icon, 'w-4 h-4')}
                        <span className="text-[10px] font-black uppercase">{badge.level}</span>
                      </div>
                      <div className="text-xs font-extrabold text-stone-900 leading-tight truncate">
                        {badge.name}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5 truncate">
                        {badge.earnedAt}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PARTICIPATION HISTORY (RIWAYAT PARTISIPASI INISIATIF SOSIAL) */}
      {activeSection === 'history' && (
        <div className="space-y-4">
          {/* History Controls Bar */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari riwayat misi, lokasi, atau peran..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-emerald-600 outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setHistoryFilter('all')}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  historyFilter === 'all'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Semua ({mergedHistory.length})
              </button>
              <button
                onClick={() => setHistoryFilter('selesai')}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  historyFilter === 'selesai'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Selesai Bertugas
              </button>
              <button
                onClick={() => setHistoryFilter('bertugas')}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  historyFilter === 'bertugas'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Sedang Bertugas
              </button>

              <button
                onClick={() => setIsReportModalOpen(true)}
                className="text-xs px-3 py-1.5 rounded-lg font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-1 transition-all cursor-pointer shrink-0 ml-auto"
                title="Ekspor laporan individual ke format PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ekspor PDF</span>
              </button>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center text-stone-500 text-xs">
                Tidak ada riwayat inisiatif sosial yang cocok dengan filter.
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs hover:border-emerald-400/80 transition-all"
                >
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
                    {/* Left: Mission Info */}
                    <div className="space-y-2.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                            item.status === 'selesai'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900 animate-pulse'
                          }`}
                        >
                          {item.status === 'selesai' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Selesai Bertugas
                            </>
                          ) : (
                            <>
                              <Radio className="w-3 h-3 text-amber-600 animate-pulse" /> Sedang Bertugas Lapangan
                            </>
                          )}
                        </span>

                        <span className="text-xs text-stone-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          {item.period}
                        </span>

                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.serviceHours} Jam Pengabdian
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-extrabold text-stone-900 leading-snug">
                          {item.roleTitle}
                        </h3>
                        <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                          Inisiatif: {item.campaignTitle}
                        </p>
                      </div>

                      {/* Location & Beneficiaries Badge */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 pt-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          {item.location} {item.gpsCoords && <span className="text-stone-400 font-mono">({item.gpsCoords})</span>}
                        </span>
                        <span className="flex items-center gap-1.5 font-bold text-stone-800">
                          <Users className="w-3.5 h-3.5 text-amber-600" />
                          {item.beneficiariesHelped} Jiwa Terbantu Langsung
                        </span>
                      </div>

                      {/* Tasks executed */}
                      <div className="bg-stone-50 border border-stone-200/70 p-3 rounded-xl space-y-1">
                        <div className="text-[11px] font-bold text-stone-700">Capaian Tugas Lapangan:</div>
                        <ul className="space-y-1 text-xs text-stone-600">
                          {item.tasksCompleted.map((t, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Citizen / Community Testimonial */}
                      {item.testimonialOrFeedback && (
                        <div className="text-xs text-stone-600 italic bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-xl">
                          “{item.testimonialOrFeedback}”
                        </div>
                      )}

                      {/* Community Verification Connection Badge */}
                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 font-extrabold text-emerald-950 text-xs">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>Status Verifikasi Komunitas:</span>
                            <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold">
                              {item.communityVerification.status === 'terverifikasi' ? 'Tervalidasi Sah' : 'Menunggu Suara'}
                            </span>
                            <span className="text-emerald-800 font-bold">
                              ({item.communityVerification.votesValid} Suara Warga)
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-600">
                            Saksi Tokoh: <strong className="text-stone-800">{item.communityVerification.verifiedByNames.join(', ')}</strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-stone-500">
                            {item.communityVerification.blockchainHash}
                          </span>
                          {onNavigateToTracking && (
                            <button
                              onClick={onNavigateToTracking}
                              className="text-[11px] font-bold text-emerald-800 hover:text-emerald-900 underline flex items-center gap-0.5 cursor-pointer"
                            >
                              Lihat di Ledger <ArrowUpRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Geotag Photo */}
                    <div className="lg:w-60 w-full shrink-0">
                      <div className="relative rounded-2xl overflow-hidden border border-stone-200 group aspect-video sm:aspect-[4/3] bg-stone-100 shadow-2xs">
                        <img
                          src={item.photoUrl}
                          alt="Dokumentasi Kegiatan"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-2 left-2 bg-stone-950/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>Geotag Lapangan Valid</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: ACHIEVEMENT BADGES (LENCANA PENCAPAIAN & GAMIFIKASI ISLAMI) */}
      {activeSection === 'badges' && (
        <div className="space-y-6">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
              <div>
                <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Lencana Kehormatan & Akreditasi Kerelawanan</span>
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Setiap lencana mencerminkan komitmen syariah, keberanian lapangan, dan verifikasi faktual dari komunitas penerima manfaat.
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl">
                {baseProfile.badges.filter(b => b.isUnlocked).length} dari {baseProfile.badges.length} Lencana Diraih
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {baseProfile.badges.map((badge) => {
              const colors = getTierColor(badge.level);
              return (
                <div
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`relative rounded-2xl border p-5 transition-all cursor-pointer ${
                    badge.isUnlocked
                      ? `${colors.bg} ${colors.border} shadow-2xs hover:shadow-md hover:scale-101`
                      : 'bg-stone-100/70 border-stone-300 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-xs ${
                        badge.isUnlocked ? colors.badge : 'bg-stone-300 text-stone-600'
                      }`}
                    >
                      {getBadgeIcon(badge.icon, 'w-6 h-6')}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${colors.pill}`}>
                        {badge.level}
                      </span>
                      {badge.isUnlocked ? (
                        <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Diraih
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-stone-500 flex items-center gap-0.5">
                          <Lock className="w-3 h-3" /> Terkunci
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-stone-900 leading-tight">
                      {badge.name}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200/60 text-[11px] flex items-center justify-between font-medium">
                    <span className="text-stone-500">
                      {badge.isUnlocked ? `Tanggal: ${badge.earnedAt}` : `Syarat: ${badge.criteria}`}
                    </span>
                    <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                      Rincian <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 4: COMMUNITY VERIFICATION CENTER (TERHUBUNG KE SISTEM VERIFIKASI KOMUNITAS) */}
      {activeSection === 'verification-center' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>MEKANISME VERIFIKASI DUA ARAH (PEER & COMMUNITY AUDIT)</span>
              </div>
              <h3 className="text-base sm:text-lg font-black">
                Validasi Lapangan Komunitas oleh Relawan Terakreditasi
              </h3>
              <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                Sebagai relawan ber-ikrar, Anda memiliki hak suara sah untuk memvalidasi milestone penyaluran yang dilaporkan rekan relawan lain di lapangan, memberikan kesaksian warga, dan memperkuat transparansi data.
              </p>
            </div>
            <button
              onClick={() => setIsUploadProofOpen(true)}
              className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Unggah Laporan Penyaluran</span>
            </button>
          </div>

          {/* List of Milestones waiting / open for community verification */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase text-stone-700 tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Daftar Milestone Penyaluran Yang Terhubung ke Sistem Audit</span>
            </h4>

            {milestones.map((m) => {
              const isVoted = votedMap[m.id];
              return (
                <div
                  key={m.id}
                  className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs hover:border-emerald-400 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                          {m.stage}
                        </span>
                        <span className="text-stone-500 text-xs flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {m.timestamp}
                        </span>
                        <span className="font-mono text-[11px] text-stone-500">
                          Resi: {m.receiptNumber}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-extrabold text-stone-900">
                        {m.title}
                      </h4>
                      <p className="text-xs text-emerald-800 font-semibold">
                        Inisiatif: {m.campaignTitle}
                      </p>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {m.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                        <span className="text-emerald-700 font-bold">
                          Dana Terserap: {formatRupiah(m.spentAmount)}
                        </span>
                        <span className="text-stone-700 font-semibold">
                          Penerima: {m.beneficiariesCount} Jiwa / KK
                        </span>
                        <span className="text-stone-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          {m.location}
                        </span>
                      </div>
                    </div>

                    {/* Geotag thumbnail if available */}
                    {m.proofImages && m.proofImages.length > 0 && (
                      <div className="w-full sm:w-44 h-28 rounded-xl overflow-hidden border border-stone-200 shrink-0">
                        <img
                          src={m.proofImages[0]}
                          alt="Bukti Foto"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Verification Action Strip */}
                  <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-stone-800">
                          Status Verifikasi: <span className="text-emerald-700">{m.verifiedByCommunity.votesValid} Suara Sah</span>
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Divalidasi oleh: {m.verifiedByCommunity.verifierNames.join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleVoteAction(m.id, true)}
                        disabled={isVoted}
                        className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isVoted
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{isVoted ? 'Suara Anda Tervalidasi ✓' : 'Beri Kesaksian Sah'}</span>
                      </button>

                      <button
                        onClick={() => handleVoteAction(m.id, false)}
                        disabled={isVoted}
                        className="p-2 text-stone-500 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
                        title="Minta Klarifikasi Tokoh"
                      >
                        <AlertCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* BADGE DETAILS MODAL */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-stone-200 shadow-2xl relative animate-in fade-in zoom-in duration-200 space-y-4">
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 pt-2">
              <div
                className={`w-16 h-16 mx-auto rounded-3xl flex items-center justify-center text-3xl shadow-sm ${
                  getTierColor(selectedBadge.level).badge
                }`}
              >
                {getBadgeIcon(selectedBadge.icon, 'w-8 h-8')}
              </div>
              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${getTierColor(selectedBadge.level).pill}`}>
                Tingkat {selectedBadge.level}
              </span>
              <h3 className="text-lg font-black text-stone-900">
                {selectedBadge.name}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {selectedBadge.description}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Syarat Pencapaian:</span>
                <span className="font-bold text-stone-800">{selectedBadge.criteria}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Status Akreditasi:</span>
                <span className="font-bold text-emerald-700">
                  {selectedBadge.isUnlocked ? 'Tercapai & Terverifikasi' : 'Dalam Proses'}
                </span>
              </div>
              {selectedBadge.earnedAt && (
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Tanggal Diperoleh:</span>
                  <span className="font-bold text-stone-800">{selectedBadge.earnedAt}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Hash Verifikasi:</span>
                <span className="font-mono text-[10px] text-stone-600">{selectedBadge.verificationHash}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Tutup Rincian Lencana
            </button>
          </div>
        </div>
      )}

      {/* OFFICIAL VOLUNTEER CERTIFICATE / PIAGAM MODAL */}
      {isCertificateOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-4 border-amber-300 shadow-2xl relative space-y-6 my-8">
            <button
              onClick={() => setIsCertificateOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1.5 rounded-full bg-stone-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Certificate Frame */}
            <div id="volunteer-certificate" className="border-2 border-stone-800 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 relative">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>PIAGAM PENGHARGAAN RELAWAN AMANAH SYARIAH</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-900 tracking-tight">
                  ISLAMICITY RELAWAN INDONESIA
                </h2>
                <p className="text-xs text-stone-500 italic">
                  Nomor Registrasi: {baseProfile.registrationNumber} • Akreditasi BAZNAS 2026
                </p>
              </div>

              <div className="my-6 text-center space-y-2">
                <p className="text-xs text-stone-600 font-serif">Dengan tulus menganugerahkan piagam kehormatan kepada:</p>
                <div className="text-2xl sm:text-3xl font-serif font-black text-stone-900 border-b-2 border-amber-400 pb-2 inline-block px-6">
                  {baseProfile.name}
                </div>
                <p className="text-xs font-bold text-emerald-800 mt-1">
                  {baseProfile.titleBadge}
                </p>
              </div>

              <p className="text-xs text-stone-700 text-center max-w-lg mx-auto leading-relaxed">
                Atas keikhlasan dedikasi, integritas tinggi, dan pengabdian <strong>{baseProfile.stats.totalHours} Jam Lapangan</strong> dalam menyalurkan amanah titipan umat kepada <strong>{baseProfile.stats.beneficiariesHelped.toLocaleString('id-ID')} Jiwa mustahik</strong> dengan rekam jejak terverifikasi komunitas.
              </p>

              {/* Badges strip on certificate */}
              <div className="flex items-center justify-center gap-3 my-5 py-2 border-y border-stone-200">
                {baseProfile.badges.filter(b => b.isUnlocked).slice(0, 4).map(b => (
                  <div key={b.id} className="text-center">
                    <span className="text-xs font-bold text-stone-800 block truncate max-w-[100px]">
                      🏅 {b.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Signatures & QR Code */}
              <div className="grid grid-cols-3 gap-4 text-center items-end text-xs pt-4">
                <div>
                  <div className="h-10 border-b border-stone-400 flex items-center justify-center font-serif italic text-stone-600">
                    Dr. H. M. Nadzir
                  </div>
                  <div className="text-[11px] font-bold text-stone-800 mt-1">Dewan Pengawas Syariah</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-stone-900 text-white rounded-lg flex items-center justify-center p-1 shadow-sm">
                    <QrCode className="w-12 h-12 text-white" />
                  </div>
                  <span className="text-[9px] font-mono text-stone-500 mt-1">Audit Scan Ledger</span>
                </div>

                <div>
                  <div className="h-10 border-b border-stone-400 flex items-center justify-center font-serif italic text-stone-600">
                    Ir. Arif Hidayat
                  </div>
                  <div className="text-[11px] font-bold text-stone-800 mt-1">Koordinator Nasional</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan PDF Piagam</span>
              </button>
              <button
                onClick={() => setIsCertificateOpen(false)}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK UPLOAD FIELD PROOF MODAL (TERHUBUNG KE SISTEM VERIFIKASI) */}
      {isUploadProofOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-stone-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>Unggah Bukti Penyaluran Lapangan</span>
              </h3>
              <button onClick={() => setIsUploadProofOpen(false)} className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Laporan ini langsung dicatat atas nama relawan <strong>{baseProfile.name}</strong> ke sistem pelacakan audit real-time publik.
            </p>

            <form onSubmit={handleCreateProof} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Inisiatif Terkait:</label>
                <select
                  value={proofCampaignId}
                  onChange={(e) => setProofCampaignId(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-medium outline-none focus:border-emerald-600"
                >
                  {campaigns.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Judul Penyaluran / Tindakan:</label>
                <input
                  type="text"
                  placeholder="Misal: Penyerahan 250 Paket Sembako & P3K Posko Darurat"
                  value={proofTitle}
                  onChange={(e) => setProofTitle(e.target.value)}
                  required
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-medium outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Lokasi Lapangan:</label>
                  <input
                    type="text"
                    placeholder="Nama Desa / Posko"
                    value={proofLocation}
                    onChange={(e) => setProofLocation(e.target.value)}
                    required
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-medium outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Koordinat GPS Geotag:</label>
                  <input
                    type="text"
                    value={proofGps}
                    onChange={(e) => setProofGps(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-mono text-stone-700 outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Dana Terserap (Rp):</label>
                  <input
                    type="number"
                    value={proofSpent}
                    onChange={(e) => setProofSpent(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-bold text-emerald-800 outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Penerima Manfaat (Jiwa):</label>
                  <input
                    type="number"
                    value={proofBeneficiaries}
                    onChange={(e) => setProofBeneficiaries(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-bold text-stone-800 outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Catatan Pelaksanaan Lapangan:</label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan proses penyaluran dan kondisi mustahik di lokasi..."
                  value={proofDesc}
                  onChange={(e) => setProofDesc(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-2 text-emerald-900 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Dokumen ini akan otomatis diverifikasi bersama koordinator posko dan warga setempat.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadProofOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-5 py-2 rounded-xl shadow-xs cursor-pointer"
                >
                  Terbitkan ke Ledger Publik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INDIVIDUAL VOLUNTEER REPORT PDF EXPORT MODAL WITH QR CODE */}
      <VolunteerReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        profile={baseProfile}
        onOpenExternalVerification={(regNumber) => {
          setIsReportModalOpen(false);
          handleOpenExternalVerification(regNumber);
        }}
      />

      {/* EXTERNAL VERIFICATION PORTAL MODAL */}
      <ExternalVolunteerVerificationModal
        isOpen={isExternalVerificationOpen}
        onClose={() => setIsExternalVerificationOpen(false)}
        profiles={profiles}
        initialRegistrationNumber={verificationTargetCode || baseProfile.registrationNumber}
        onDownloadPdf={handleQuickDownloadPdf}
      />
    </div>
  );
};
