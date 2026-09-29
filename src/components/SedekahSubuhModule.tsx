import React, { useState, useEffect } from 'react';
import { 
  Sunrise, 
  Bell, 
  BellRing, 
  Clock, 
  Sparkles, 
  Flame, 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Award, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Send, 
  ArrowRight, 
  Download, 
  Share2, 
  ChevronRight, 
  HelpCircle, 
  Check, 
  Coins, 
  Zap, 
  MessageSquareQuote,
  TrendingUp,
  MapPin,
  ExternalLink,
  RefreshCw,
  CreditCard,
  Wallet,
  Lock,
  Scale,
  Sliders,
  PauseCircle,
  PlayCircle,
  AlertCircle
} from 'lucide-react';
import { 
  SedekahSubuhRecord, 
  SedekahSubuhConfig, 
  SedekahSubuhStats, 
  SedekahSubuhProgramTarget, 
  NotificationItem,
  Campaign,
  AutodebetGatewayConfig,
  AutodebetExecutionLog
} from '../types';
import { 
  INITIAL_SUBUH_PROGRAMS, 
  FAJAR_SCHEDULE_CITIES, 
  INITIAL_SUBUH_CONFIG, 
  INITIAL_SUBUH_RECORDS, 
  INITIAL_SUBUH_STATS, 
  SUBUH_HAJAT_TEMPLATES, 
  FAJAR_HADITH,
  AUTODEBET_GATEWAY_OPTIONS,
  AutodebetGatewayOption
} from '../data/sedekahSubuhData';
import { formatRupiah, formatNumber } from '../utils/formatters';
import { AutodebetSubuhSection } from './AutodebetSubuhSection';
import { AutodebetGatewayModal } from './AutodebetGatewayModal';

interface SedekahSubuhModuleProps {
  onNotificationTrigger?: (notif: NotificationItem) => void;
  onOpenDonateModal?: (campaign?: Campaign, amount?: number) => void;
  className?: string;
}

export const SedekahSubuhModule: React.FC<SedekahSubuhModuleProps> = ({
  onNotificationTrigger,
  onOpenDonateModal,
  className = ''
}) => {
  // Config & State
  const [config, setConfig] = useState<SedekahSubuhConfig>(INITIAL_SUBUH_CONFIG);
  const [stats, setStats] = useState<SedekahSubuhStats>(INITIAL_SUBUH_STATS);
  const [records, setRecords] = useState<SedekahSubuhRecord[]>(INITIAL_SUBUH_RECORDS);
  const [programs] = useState<SedekahSubuhProgramTarget[]>(INITIAL_SUBUH_PROGRAMS);

  // Donation Form States
  const [selectedProgramId, setSelectedProgramId] = useState<string>(INITIAL_SUBUH_PROGRAMS[0].id);
  const [selectedAmount, setSelectedAmount] = useState<number>(20000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [selectedHajat, setSelectedHajat] = useState<string>(SUBUH_HAJAT_TEMPLATES[0]);
  const [customDoa, setCustomDoa] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('qris');
  const [donorName, setDonorName] = useState<string>('Hamba Allah');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);

  // UI Interactive States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'berkah' | 'autodebet' | 'pengingat' | 'riwayat'>('berkah');
  const [receiptSuccessModal, setReceiptSuccessModal] = useState<SedekahSubuhRecord | null>(null);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [activeFajarCity, setActiveFajarCity] = useState(FAJAR_SCHEDULE_CITIES[0]);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isGatewayModalOpen, setIsGatewayModalOpen] = useState<boolean>(false);
  const [selectedGatewayForSetup, setSelectedGatewayForSetup] = useState<AutodebetGatewayOption | null>(null);
  const [isExecutingAutoDebit, setIsExecutingAutoDebit] = useState<boolean>(false);

  // Live Clock Effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update active city when config changes
  useEffect(() => {
    const matched = FAJAR_SCHEDULE_CITIES.find(c => c.city === config.city);
    if (matched) {
      setActiveFajarCity(matched);
    }
  }, [config.city]);

  // Gentle Dawn Chime using Web Audio API (Synthesizer)
  const playFajarChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      setIsAudioPlaying(true);

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 melodic dawn sequence
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.25);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.25);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + idx * 0.25 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.25 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.25);
        osc.stop(ctx.currentTime + idx * 0.25 + 1.3);
      });

      setTimeout(() => {
        setIsAudioPlaying(false);
      }, 2000);
    } catch {
      setIsAudioPlaying(false);
    }
  };

  // Trigger Immediate Simulation Notification
  const handleTestFajarReminder = () => {
    if (config.soundAlert) {
      playFajarChime();
    }

    const testNotif: NotificationItem = {
      id: `subuh-reminder-${Date.now()}`,
      type: 'penyaluran',
      title: '🌅 Waktu Fajar Tiba: Sedekah Subuh & Doa Malaikat',
      message: `[Pengingat Fajar ${activeFajarCity.city}] Waktu Subuh ${activeFajarCity.fajarTime} WIB. Dua malaikat sedang turun mendoakan hamba yang berinfak pagi ini.`,
      timeAgo: 'Baru saja',
      timestamp: `${activeFajarCity.fajarTime} WIB`,
      read: false,
      channel: config.channel,
      linkToTab: 'sedekah-subuh'
    };

    if (onNotificationTrigger) {
      onNotificationTrigger(testNotif);
    }
  };

  // Submit Quick Sedekah Subuh
  const handleProcessSubuhDonation = () => {
    const finalAmount = isCustom ? (parseInt(customAmount.replace(/\D/g, '')) || 10000) : selectedAmount;
    if (finalAmount < 1000) return;

    setIsSubmitting(true);
    if (config.soundAlert) {
      playFajarChime();
    }

    setTimeout(() => {
      const selectedProg = programs.find(p => p.id === selectedProgramId) || programs[0];
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = `${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
      const receiptNo = `SBS-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${Date.now().toString().slice(-4)}`;

      const newRecord: SedekahSubuhRecord = {
        id: `subuh-rec-${Date.now()}`,
        date: dateStr,
        time: timeStr,
        amount: finalAmount,
        programTitle: selectedProg.title,
        programCategory: selectedProg.category,
        doaNiat: customDoa || `Bismillah sedekah subuh untuk hajat ${selectedHajat}`,
        hajatType: selectedHajat,
        status: 'sukses',
        receiptNumber: receiptNo,
        beneficiaryImpact: selectedProg.beneficiaryDesc,
        blessingStreakDay: stats.currentStreakDays + 1,
        paymentMethod: selectedPayment === 'qris' ? 'QRIS Syariah (0% Fee)' : 'Dompet Digital Syariah'
      };

      // Update state
      setRecords(prev => [newRecord, ...prev]);
      setStats(prev => ({
        ...prev,
        currentStreakDays: prev.currentStreakDays + 1,
        longestStreakDays: Math.max(prev.longestStreakDays, prev.currentStreakDays + 1),
        totalSubuhDonated: prev.totalSubuhDonated + finalAmount,
        totalDaysParticipated: prev.totalDaysParticipated + 1,
        totalMustahikImpacted: prev.totalMustahikImpacted + Math.max(1, Math.floor(finalAmount / 10000))
      }));

      setIsSubmitting(false);
      setReceiptSuccessModal(newRecord);

      // Notification
      const subuhNotif: NotificationItem = {
        id: `subuh-success-${Date.now()}`,
        type: 'donasi',
        title: '✨ Sedekah Subuh Berhasil Ditunaikan!',
        message: `Alhamdulillah, sedekah subuh Rp ${formatNumber(finalAmount)} untuk "${selectedProg.title}" telah diterima. Semoga malaikat fajar melipatgandakan gantinya.`,
        timeAgo: 'Baru saja',
        timestamp: timeStr,
        read: false,
        channel: 'push',
        linkToTab: 'sedekah-subuh'
      };

      if (onNotificationTrigger) {
        onNotificationTrigger(subuhNotif);
      }
    }, 600);
  };

  // Execute Autodebet Now (Live Simulation with Sound & Gateway Verification)
  const handleExecuteAutoDebitNow = () => {
    if (!config.routineAutoDebit) {
      setConfig(prev => ({ ...prev, routineAutoDebit: true, autoDebitStatus: 'active' }));
    }
    setIsExecutingAutoDebit(true);
    if (config.soundAlert) {
      playFajarChime();
    }

    setTimeout(() => {
      const selectedProg = programs.find(p => p.id === config.routineTargetProgramId) || programs[0];
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = `${activeFajarCity.fajarTime} ${activeFajarCity.zone}`;
      const gatewayName = config.autoDebitGateway?.gatewayName || 'BSI Direct Debit (Syariah)';
      const txnRef = `GATEWAY-${Date.now().toString().slice(-6)}`;
      const receiptNo = `SBS-ADB-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${Date.now().toString().slice(-4)}`;

      const newRecord: SedekahSubuhRecord = {
        id: `subuh-adb-${Date.now()}`,
        date: dateStr,
        time: timeStr,
        amount: config.routineAmount,
        programTitle: selectedProg.title,
        programCategory: selectedProg.category,
        doaNiat: config.personalDoa || `Bismillah sedekah subuh otomatis untuk hajat ${config.routineHajat || 'Kelancaran Rezeki & Berkah'}`,
        hajatType: config.routineHajat || 'Kelancaran Rezeki & Berkah',
        status: 'sukses',
        receiptNumber: receiptNo,
        beneficiaryImpact: selectedProg.beneficiaryDesc,
        blessingStreakDay: stats.currentStreakDays + 1,
        paymentMethod: gatewayName,
        isAutoDebit: true,
        gatewayRef: txnRef
      };

      const newLog: AutodebetExecutionLog = {
        id: `adb-log-${Date.now()}`,
        date: dateStr,
        time: timeStr,
        amount: config.routineAmount,
        programTitle: selectedProg.title,
        gatewayName: gatewayName,
        gatewayRefNumber: txnRef,
        receiptNumber: receiptNo,
        status: 'sukses',
        notes: `Pemotongan otomatis fajar via gateway ${gatewayName} berhasil didebet.`
      };

      setRecords(prev => [newRecord, ...prev]);
      setConfig(prev => ({
        ...prev,
        autoDebitExecutionLogs: [newLog, ...(prev.autoDebitExecutionLogs || [])]
      }));
      setStats(prev => ({
        ...prev,
        currentStreakDays: prev.currentStreakDays + 1,
        longestStreakDays: Math.max(prev.longestStreakDays, prev.currentStreakDays + 1),
        totalSubuhDonated: prev.totalSubuhDonated + config.routineAmount,
        totalDaysParticipated: prev.totalDaysParticipated + 1,
        totalMustahikImpacted: prev.totalMustahikImpacted + Math.max(1, Math.floor(config.routineAmount / 10000))
      }));

      setIsExecutingAutoDebit(false);
      setReceiptSuccessModal(newRecord);

      // Trigger notification
      const autoDebitNotif: NotificationItem = {
        id: `subuh-adb-success-${Date.now()}`,
        type: 'donasi',
        title: '🌅 Autodebet Sedekah Subuh Berhasil!',
        message: `Alhamdulillah, autodebet fajar Rp ${formatNumber(config.routineAmount)} via ${gatewayName} berhasil untuk "${selectedProg.title}". Doa malaikat fajar menyertai hari Anda.`,
        timeAgo: 'Baru saja',
        timestamp: timeStr,
        read: false,
        channel: 'push',
        linkToTab: 'sedekah-subuh',
        metadata: {
          receiptNumber: receiptNo,
          amount: config.routineAmount,
          campaignTitle: selectedProg.title
        }
      };

      if (onNotificationTrigger) {
        onNotificationTrigger(autoDebitNotif);
      }
    }, 750);
  };

  const handleOpenGatewayModal = (gateway?: AutodebetGatewayOption) => {
    setSelectedGatewayForSetup(gateway || null);
    setIsGatewayModalOpen(true);
  };

  const activeProgram = programs.find(p => p.id === selectedProgramId) || programs[0];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. HERO HEADER: Atmospheric Fajar Twilight */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-950 to-emerald-950 p-6 sm:p-8 text-white border border-indigo-800/40 shadow-2xl overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute -right-16 -top-16 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-bold text-amber-300">
                <Sunrise className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Gerakan Istiqomah Sedekah Subuh Nusantara</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Raih Doa Malaikat di Waktu Fajar Setiap Hari
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Di setiap terbitnya fajar, dua malaikat turun mendoakan kelimpahan bagi mereka yang berinfak. Bangun kebiasaan istiqomah dengan pengingat subuh otomatis dan pantau keberkahan sedekah fajar Anda.
              </p>
            </div>

            {/* Fajar Clock & Subuh Schedule Box */}
            <div className="bg-stone-900/80 border border-stone-700/80 p-4 rounded-2xl backdrop-blur-md shrink-0 flex flex-col gap-2.5 min-w-[260px]">
              <div className="flex items-center justify-between text-xs text-stone-400 pb-2 border-b border-stone-800">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Waktu Sekarang</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">{currentTimeStr || '04:30 WIB'}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Jadwal Subuh Hari Ini</div>
                  <div className="text-lg font-black text-amber-300">{activeFajarCity.fajarTime} {activeFajarCity.zone}</div>
                  <div className="text-[10px] text-stone-400">{activeFajarCity.city}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Terbit (Syuruq)</div>
                  <div className="text-sm font-bold text-stone-300">{activeFajarCity.syuruqTime} {activeFajarCity.zone}</div>
                  <div className="text-[9px] text-emerald-400 font-medium">Batas Waktu Fajar</div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px]">
                <span className="text-stone-400">Pengingat Subuh:</span>
                <span className={`font-bold flex items-center gap-1 ${config.enabled ? 'text-emerald-400' : 'text-stone-500'}`}>
                  {config.enabled ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Aktif ({config.reminderTimeStr})</span>
                    </>
                  ) : (
                    <span>Non-aktif</span>
                  )}
                </span>
              </div>

              <div className="pt-1.5 flex items-center justify-between text-[11px]">
                <span className="text-stone-400">Autodebet Fajar:</span>
                <button
                  onClick={() => setActiveTab('autodebet')}
                  className="font-bold flex items-center gap-1 text-amber-300 hover:underline cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-amber-400" />
                  <span>{config.routineAutoDebit && config.autoDebitStatus === 'active' ? `Aktif (${formatRupiah(config.routineAmount)}/Fajar)` : 'Atur Sekarang'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Authentic Hadith Banner */}
          <div className="bg-stone-900/60 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-2 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Kabar Gembira Rasulullah ﷺ tentang Sedekah Fajar</span>
            </div>
            <p className="text-stone-200 italic font-serif leading-relaxed">
              "{FAJAR_HADITH.translation}"
            </p>
            <div className="text-[11px] text-amber-400/90 font-semibold text-right">
              — {FAJAR_HADITH.narrator}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs: 1. Tunaikan & Dasbor, 2. Autodebet Fajar, 3. Pengingat Fajar, 4. Riwayat */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar text-xs font-bold">
        <button
          onClick={() => setActiveTab('berkah')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'berkah'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Tunaikan & Dasbor Keberkahan</span>
        </button>

        <button
          onClick={() => setActiveTab('autodebet')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'autodebet'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>Autodebet Sedekah Subuh</span>
          {config.routineAutoDebit && config.autoDebitStatus === 'active' && (
            <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-1.5 py-0.5 rounded-md">
              Aktif
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('pengingat')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'pengingat'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <BellRing className="w-4 h-4 text-emerald-400" />
          <span>Pengingat Fajar Harian ({config.enabled ? 'Aktif' : 'Mati'})</span>
        </button>

        <button
          onClick={() => setActiveTab('riwayat')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'riwayat'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Calendar className="w-4 h-4 text-blue-400" />
          <span>Jurnal & Riwayat Sedekah Subuh ({records.length})</span>
        </button>
      </div>

      {/* TAB 1: FORM DONASI CEPAT & DASBOR PELACAK KEBERKAHAN */}
      {activeTab === 'berkah' && (
        <div className="space-y-6">
          {/* Autodebet Highlight Callout Banner */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-white text-xs sm:text-sm">
                    Fitur Baru: Autodebet Sedekah Subuh Rutin
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    config.routineAutoDebit && config.autoDebitStatus === 'active'
                      ? 'bg-emerald-400 text-emerald-950'
                      : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  }`}>
                    {config.routineAutoDebit && config.autoDebitStatus === 'active'
                      ? `Aktif: ${config.autoDebitGateway?.gatewayName.split('(')[0] || 'BSI'} ${formatRupiah(config.routineAmount)}/Fajar`
                      : 'Jadwalkan Otomatis'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-300">
                  {config.routineAutoDebit && config.autoDebitStatus === 'active'
                    ? 'Sedekah otomatis terdebet setiap adzan fajar berkumandang, istiqomah terjaga 100% tanpa risiko terlewat.'
                    : 'Takut kesiangan atau terlewat? Aktifkan autodebet otomatis via BSI Direct Debit atau GoPay setiap waktu fajar.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('autodebet')}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{config.routineAutoDebit && config.autoDebitStatus === 'active' ? 'Kelola Autodebet' : 'Aktifkan Autodebet'}</span>
              </button>
            </div>
          </div>
          {/* Quick Stats Banner (The Blessing Tracking KPI) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* 1. Streak Istiqomah */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-2xl shadow-2xs relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                  Istiqomah Subuh
                </span>
                <span className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  <Flame className="w-4 h-4 animate-bounce" />
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-stone-900">{stats.currentStreakDays}</span>
                <span className="text-xs font-bold text-amber-700">Hari Beruntun</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-stone-600">
                <span>Lencana: <strong>{stats.fajrLevelBadge.title}</strong></span>
              </div>
            </div>

            {/* 2. Akumulasi Donasi Subuh */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-2xl shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                  Total Sedekah Fajar
                </span>
                <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  <Coins className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-900">
                {formatRupiah(stats.totalSubuhDonated)}
              </div>
              <div className="mt-1 text-[11px] text-emerald-700 font-medium">
                100% Tersalurkan (0% Potongan)
              </div>
            </div>

            {/* 3. Dampak Mustahik Pagi */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-2xl shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wide">
                  Mustahik Pagi Terbantu
                </span>
                <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  <HeartHandshake className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-stone-900">{stats.totalMustahikImpacted}</span>
                <span className="text-xs font-bold text-blue-700">Porsi / Jiwa</span>
              </div>
              <div className="mt-1 text-[11px] text-stone-600">
                Santri yatim, dhuafa, & lansia
              </div>
            </div>

            {/* 4. Rekor Istiqomah Terbaik */}
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-200 p-4 rounded-2xl shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wide">
                  Target Istiqomah
                </span>
                <span className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  <Award className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-stone-900">{stats.longestStreakDays}</span>
                <span className="text-xs font-bold text-purple-700">Hari Rekor</span>
              </div>
              <div className="mt-1 text-[11px] text-purple-800 font-medium">
                {stats.fajrLevelBadge.nextTargetDays - stats.currentStreakDays} hari menuju Level 4
              </div>
            </div>
          </div>

          {/* Split Stage: Left Form Sedekah Subuh, Right Heatmap Kalender Keberkahan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT: Quick Sedekah Subuh 1-Click Form (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-5">
              <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                    <Sunrise className="w-5 h-5 text-amber-500" />
                    <span>Tunaikan Sedekah Subuh Hari Ini</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Tebarkan kebaikan sebelum matahari terbit, aminkan doa malaikat fajar.
                  </p>
                </div>
                <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
                  Hari Ke-{stats.currentStreakDays + 1}
                </span>
              </div>

              {/* Program Target Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  1. Pilih Sasaran Penyaluran Berkah Subuh:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {programs.map((p) => {
                    const isSelected = selectedProgramId === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProgramId(p.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer text-xs space-y-1 ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/30'
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-stone-900">
                          <span className="text-base">{p.icon}</span>
                          <span className="line-clamp-1">{p.title}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1">
                          {p.tagline}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="text-[11px] text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Dampak Penyaluran:</strong> {activeProgram.beneficiaryDesc}</span>
                </div>
              </div>

              {/* Nominal Preset Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  2. Pilih Nominal Sedekah Fajar:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[2000, 5000, 10000, 20000, 50000].map((amt) => {
                    const isSelected = !isCustom && selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setIsCustom(false);
                        }}
                        className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/40'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                      >
                        {amt === 2000 ? 'Rp 2 Ribu' : formatRupiah(amt)}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Field */}
                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCustom(!isCustom)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        isCustom
                          ? 'bg-stone-800 text-white border-stone-800'
                          : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      Nominal Lainnya
                    </button>
                    {isCustom && (
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-2 text-xs font-bold text-stone-400">Rp</span>
                        <input
                          type="number"
                          placeholder="Contoh: 100.000"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full text-xs font-bold pl-9 pr-3 py-1.5 rounded-lg border border-stone-300 focus:border-emerald-600 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hajat & Doa Subuh Template */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  3. Niat, Doa & Hajat Khusus Pagi Ini:
                </label>
                <select
                  value={selectedHajat}
                  onChange={(e) => setSelectedHajat(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:border-emerald-600 focus:outline-none cursor-pointer"
                >
                  {SUBUH_HAJAT_TEMPLATES.map((hajat, i) => (
                    <option key={i} value={hajat}>{hajat}</option>
                  ))}
                </select>

                <textarea
                  rows={2}
                  value={customDoa}
                  onChange={(e) => setCustomDoa(e.target.value)}
                  placeholder="Tuliskan doa tambahan / hajat pribadi Anda di waktu mustajab ini (opsional)..."
                  className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {/* Payment Method Quick Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  4. Metode Penyaluran Instan:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('qris')}
                    className={`p-2 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedPayment === 'qris'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>📱 QRIS Instan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('gopay')}
                    className={`p-2 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedPayment === 'gopay'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>🟢 GoPay / OVO</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('bsi')}
                    className={`p-2 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedPayment === 'bsi'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>🏦 BSI Virtual</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('mandiri')}
                    className={`p-2 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedPayment === 'mandiri'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>🏢 Mandiri Syariah</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleProcessSubuhDonation}
                className="w-full py-3 px-4 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 active:scale-98 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Menerbitkan Resi Fajar & Mengaminkan Doa...</span>
                  </>
                ) : (
                  <>
                    <Sunrise className="w-4 h-4 text-amber-300" />
                    <span>Tunaikan Sedekah Subuh ({isCustom ? `Rp ${customAmount || '0'}` : formatRupiah(selectedAmount)})</span>
                  </>
                )}
              </button>
            </div>

            {/* RIGHT: Heatmap Kalender Istiqomah & Doa Malaikat Box (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Kalender Istiqomah Bulanan (Heatmap Keberkahan) */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>Matriks Keberkahan Bulan Ini</span>
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Pelacak konsistensi 30 hari sedekah fajar Anda
                    </p>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    September 2026
                  </span>
                </div>

                {/* 30 Day Heatmap Grid */}
                <div className="space-y-2">
                  <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold text-stone-400">
                    <span>Sen</span>
                    <span>Sel</span>
                    <span>Rab</span>
                    <span>Kam</span>
                    <span>Jum</span>
                    <span>Sab</span>
                    <span>Min</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 30 }, (_, i) => {
                      const dayNum = i + 1;
                      const isCompleted = dayNum <= stats.currentStreakDays;
                      const isToday = dayNum === stats.currentStreakDays;

                      return (
                        <div
                          key={dayNum}
                          title={`Hari ke-${dayNum}: ${isCompleted ? 'Alhamdulillah Sedekah Subuh Terlaksana' : 'Menanti Sedekah Subuh'}`}
                          className={`aspect-square rounded-lg flex flex-col items-center justify-center text-[11px] font-bold transition-all cursor-default relative group ${
                            isToday
                              ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-500 shadow-xs'
                              : isCompleted
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-stone-100 text-stone-400 border border-stone-200'
                          }`}
                        >
                          <span>{dayNum}</span>
                          {isCompleted && (
                            <span className="text-[8px] leading-none mt-0.5">✓</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
                    <span>Istiqomah ({stats.currentStreakDays} Hari)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
                    <span>Hari Ini</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-stone-200" />
                    <span>Mendatang</span>
                  </div>
                </div>
              </div>

              {/* Lencana Pencapaian Fajar (Achievement Badges) */}
              <div className="bg-gradient-to-br from-stone-900 to-slate-900 text-white rounded-2xl p-5 border border-stone-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <h4 className="font-bold text-xs text-amber-300 uppercase tracking-wide">
                      Tingkatan Mujahid Fajar
                    </h4>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30 font-semibold">
                    Level 3 Aktif
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shrink-0">
                    🌅
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-sm">
                      {stats.fajrLevelBadge.title}
                    </div>
                    <div className="text-[11px] text-stone-300 mt-0.5">
                      Telah menunaikan sedekah subuh 14 hari berturut-turut tanpa putus.
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>Progress Menuju Level 4 (Penjaga Shubuh 20 Hari)</span>
                    <span className="font-bold text-amber-400">14 / 20 Hari</span>
                  </div>
                  <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: '70%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUTODEBET SEDEKAH SUBUH RUTIN */}
      {activeTab === 'autodebet' && (
        <AutodebetSubuhSection
          config={config}
          setConfig={setConfig}
          programs={programs}
          stats={stats}
          activeFajarCity={activeFajarCity}
          onExecuteAutoDebitNow={handleExecuteAutoDebitNow}
          isExecuting={isExecutingAutoDebit}
          onOpenGatewayModal={handleOpenGatewayModal}
          onViewReceipt={(rec) => setReceiptSuccessModal(rec)}
          records={records}
        />
      )}

      {/* TAB 3: PENGATURAN NOTIFIKASI PENGINGAT FAJAR */}
      {activeTab === 'pengingat' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                <BellRing className="w-4 h-4 text-emerald-600" />
                <span>Pengaturan Sistem Pengingat Waktu Subuh</span>
              </div>
              <h3 className="text-xl font-extrabold text-stone-900 mt-0.5">
                Otomatisasi Panggilan Fajar & Doa Harian
              </h3>
              <p className="text-xs text-stone-500">
                Jangan lewatkan momen mustajab saat fajar menyingsing. Kami akan mengirimkan pengingat tepat saat adzan berkumandang.
              </p>
            </div>

            {/* Master Toggle */}
            <div className="flex items-center gap-3 self-start sm:self-auto bg-stone-100 p-2 rounded-xl border border-stone-200">
              <span className="text-xs font-bold text-stone-800">Status Pengingat:</span>
              <button
                type="button"
                onClick={() => setConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  config.enabled ? 'bg-emerald-600' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    config.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* 1. Wilayah & Jadwal Sholat */}
            <div className="space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Pilih Wilayah & Acuan Waktu Fajar</span>
              </div>

              <div className="space-y-2">
                <label className="text-stone-700 font-semibold block">Kota / Zona Waktu:</label>
                <select
                  value={config.city}
                  onChange={(e) => {
                    const matched = FAJAR_SCHEDULE_CITIES.find(c => c.city === e.target.value);
                    if (matched) {
                      setConfig(prev => ({
                        ...prev,
                        city: matched.city,
                        timeZone: matched.zone,
                        reminderTimeStr: matched.fajarTime
                      }));
                    }
                  }}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2.5 font-bold text-stone-800 focus:border-emerald-600 focus:outline-none cursor-pointer"
                >
                  {FAJAR_SCHEDULE_CITIES.map((c, i) => (
                    <option key={i} value={c.city}>{c.city} (Subuh {c.fajarTime} {c.zone})</option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Waktu Adzan Subuh:</span>
                  <span className="font-bold text-stone-900">{activeFajarCity.fajarTime} {activeFajarCity.zone}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Matahari Terbit (Syuruq):</span>
                  <span className="font-bold text-stone-900">{activeFajarCity.syuruqTime} {activeFajarCity.zone}</span>
                </div>
                <div className="flex justify-between text-stone-600 pt-1 border-t border-stone-100">
                  <span>Durasi Emas Fajar:</span>
                  <span className="font-bold text-emerald-700">~73 Menit Penuh Berkah</span>
                </div>
              </div>
            </div>

            {/* 2. Timing Notifikasi */}
            <div className="space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>Waktu Dering Notifikasi</span>
              </div>

              <div className="space-y-2">
                {[
                  { id: '15_min_before', label: '15 Menit Sebelum Subuh', desc: 'Persiapan sholat malam / sahur puasa sunnah' },
                  { id: 'adzan', label: 'Tepat Waktu Adzan Subuh', desc: 'Saat dua malaikat fajar turun ke bumi mendoakan' },
                  { id: 'after_subuh', label: 'Selesai Sholat Subuh (Dzikir Pagi)', desc: 'Menutup ibadah fajar dengan sedekah lapang' }
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      config.reminderTiming === item.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reminderTiming"
                      checked={config.reminderTiming === item.id}
                      onChange={() => setConfig(prev => ({ ...prev, reminderTiming: item.id as any }))}
                      className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="font-bold text-xs">{item.label}</div>
                      <div className="text-[10px] text-stone-500">{item.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Saluran Pengingat */}
            <div className="space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-700" />
                <span>Saluran Notifikasi Pilihan</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'push', label: 'Push Browser', icon: '🔔' },
                  { id: 'whatsapp', label: 'WhatsApp Bot', icon: '💬' },
                  { id: 'sms', label: 'SMS Gateway', icon: '📱' },
                  { id: 'email', label: 'Email Digest', icon: '✉️' }
                ].map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, channel: ch.id as any }))}
                    className={`p-2.5 rounded-lg border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      config.channel === ch.id
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span>{ch.icon}</span>
                    <span>{ch.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Nada Dering Fajar & Simulasi Live */}
            <div className="space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span>Audio Panggilan Fajar (Adzan / Chime Syahdu)</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-stone-700 font-semibold">Bunyikan Nada Fajar Halus:</span>
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, soundAlert: !prev.soundAlert }))}
                    className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                      config.soundAlert
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold'
                        : 'bg-stone-200 text-stone-500 border-stone-300'
                    }`}
                  >
                    {config.soundAlert ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    <span>{config.soundAlert ? 'Aktif' : 'Hening'}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons: Test Audio & Test Full Notification */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={playFajarChime}
                  className="w-full py-2 px-3 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isAudioPlaying ? 'text-amber-500 animate-pulse' : 'text-stone-500'}`} />
                  <span>{isAudioPlaying ? 'Memainkan Nada Fajar 528Hz...' : 'Uji Coba Suara Chime Fajar'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestFajarReminder}
                  className="w-full py-2.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <BellRing className="w-4 h-4 text-amber-300 animate-bounce" />
                  <span>Simulasikan Notifikasi Fajar Subuh Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: JURNAL & RIWAYAT SEDEKAH SUBUH LENGKAP */}
      {activeTab === 'riwayat' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>Buku Catatan Amal Sedekah Subuh ({records.length} Transaksi)</span>
              </h3>
              <p className="text-xs text-stone-500">
                Seluruh catatan sedekah fajar terekam rapi dengan nomor resi digital dan doa yang pernah terpanjat.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              Total Amal Fajar: {formatRupiah(stats.totalSubuhDonated)}
            </div>
          </div>

          {/* List of Records */}
          <div className="space-y-3">
            {records.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-xl border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all text-xs space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0">
                      🌅
                    </span>
                    <div>
                      <h4 className="font-extrabold text-stone-900 text-sm">
                        {rec.programTitle}
                      </h4>
                      <div className="text-[11px] text-stone-500">
                        {rec.date} • {rec.time} • Resi: <span className="font-mono text-stone-700">{rec.receiptNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="text-right">
                      <div className="font-black text-emerald-800 text-base">
                        {formatRupiah(rec.amount)}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Hari Istiqomah Ke-{rec.blessingStreakDay}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Doa Niat Bar */}
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200/80 text-[11px] text-stone-700 italic space-y-0.5">
                  <div className="not-italic font-bold text-stone-800 text-[10px] uppercase text-emerald-800">
                    Hajat: {rec.hajatType}
                  </div>
                  <div>"{rec.doaNiat}"</div>
                </div>

                {/* Footer of record */}
                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                  <span>Dampak: <strong>{rec.beneficiaryImpact}</strong></span>
                  <button
                    onClick={() => setReceiptSuccessModal(rec)}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lihat Resi Fajar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Digital Receipt & Angels' Blessing Voucher */}
      {receiptSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-5 text-stone-900 relative">
            {/* Header */}
            <div className="text-center space-y-1.5 border-b border-stone-100 pb-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-500 text-white flex items-center justify-center shadow-lg text-2xl">
                🌅
              </div>
              <h3 className="text-xl font-black text-stone-900">
                Resi Digital Sedekah Subuh
              </h3>
              <p className="text-xs text-stone-500">
                Tercatat pada Buku Amal Fajar Islamicity Amanah
              </p>
            </div>

            {/* Details Box */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs space-y-2 font-mono">
              {receiptSuccessModal.isAutoDebit && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-2.5 text-[11px] font-sans flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                    <span>Autodebet Fajar Rutin</span>
                  </span>
                  <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Terdebet Otomatis
                  </span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Nomor Resi:</span>
                <span className="font-bold text-stone-900">{receiptSuccessModal.receiptNumber}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Waktu Transaksi:</span>
                <span className="font-bold text-stone-900">{receiptSuccessModal.date}, {receiptSuccessModal.time}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Kanal Gateway:</span>
                <span className="font-bold text-stone-900">{receiptSuccessModal.paymentMethod}</span>
              </div>
              {receiptSuccessModal.gatewayRef && (
                <div className="flex justify-between text-stone-600">
                  <span>Ref Gateway:</span>
                  <span className="font-bold text-stone-900">{receiptSuccessModal.gatewayRef}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Program:</span>
                <span className="font-bold text-stone-900 line-clamp-1">{receiptSuccessModal.programTitle}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Hajat & Doa:</span>
                <span className="font-bold text-stone-900">{receiptSuccessModal.hajatType}</span>
              </div>
              <div className="flex justify-between text-stone-600 pt-2 border-t border-stone-200 text-sm font-sans">
                <span className="font-bold">Nominal Sedekah:</span>
                <span className="font-black text-emerald-700">{formatRupiah(receiptSuccessModal.amount)}</span>
              </div>
            </div>

            {/* Doa Malaikat Quote */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 space-y-1 text-center">
              <div className="font-bold text-emerald-800">
                "اللَّهُمَّ أَعْطِ مُنْفِقًا خَلَفًا"
              </div>
              <p className="text-[11px] text-emerald-700">
                "Ya Allah, berikanlah ganti keberkahan yang berlipat ganda bagi hamba-Mu yang berinfak pagi ini." (HR. Bukhari & Muslim)
              </p>
            </div>

            {/* Close & Share Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setReceiptSuccessModal(null)}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Tutup Resi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Gateway Linking & Authorization */}
      <AutodebetGatewayModal
        isOpen={isGatewayModalOpen}
        onClose={() => setIsGatewayModalOpen(false)}
        currentGateway={config.autoDebitGateway}
        initialSelectedOption={selectedGatewayForSetup}
        onSaveGateway={(newGateway) => {
          setConfig(prev => ({
            ...prev,
            routineAutoDebit: true,
            autoDebitStatus: 'active',
            autoDebitGateway: newGateway
          }));
        }}
      />
    </div>
  );
};
