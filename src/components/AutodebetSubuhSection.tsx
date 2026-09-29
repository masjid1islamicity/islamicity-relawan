import React, { useState } from 'react';
import {
  Sunrise,
  RefreshCw,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Zap,
  Sliders,
  AlertCircle,
  PauseCircle,
  PlayCircle,
  Check,
  CreditCard,
  Building,
  Smartphone,
  ChevronRight,
  HelpCircle,
  Scale,
  Lock,
  Flame,
  ArrowRight,
  FileText,
  MapPin,
  HeartHandshake
} from 'lucide-react';
import {
  SedekahSubuhConfig,
  SedekahSubuhProgramTarget,
  SedekahSubuhRecord,
  SedekahSubuhStats,
  AutodebetGatewayConfig,
  AutodebetExecutionLog
} from '../types';
import {
  AUTODEBET_GATEWAY_OPTIONS,
  AutodebetGatewayOption,
  FAJAR_SCHEDULE_CITIES,
  SUBUH_HAJAT_TEMPLATES
} from '../data/sedekahSubuhData';
import { formatRupiah, formatNumber } from '../utils/formatters';

interface AutodebetSubuhSectionProps {
  config: SedekahSubuhConfig;
  setConfig: React.Dispatch<React.SetStateAction<SedekahSubuhConfig>>;
  programs: SedekahSubuhProgramTarget[];
  stats: SedekahSubuhStats;
  activeFajarCity: { city: string; zone: 'WIB' | 'WITA' | 'WIT'; fajarTime: string; syuruqTime: string };
  onExecuteAutoDebitNow: () => void;
  isExecuting: boolean;
  onOpenGatewayModal: (gateway?: AutodebetGatewayOption) => void;
  onViewReceipt: (record: SedekahSubuhRecord) => void;
  records: SedekahSubuhRecord[];
}

export const AutodebetSubuhSection: React.FC<AutodebetSubuhSectionProps> = ({
  config,
  setConfig,
  programs,
  stats,
  activeFajarCity,
  onExecuteAutoDebitNow,
  isExecuting,
  onOpenGatewayModal,
  onViewReceipt,
  records
}) => {
  const [isCustomNominal, setIsCustomNominal] = useState<boolean>(false);
  const [customNominalInput, setCustomNominalInput] = useState<string>('');
  const [showSyariahDetails, setShowSyariahDetails] = useState<boolean>(false);

  const activeGateway = config.autoDebitGateway;
  const isAutoDebitActive = config.routineAutoDebit && config.autoDebitStatus === 'active';
  const isAutoDebitPaused = config.routineAutoDebit && config.autoDebitStatus === 'paused';

  const selectedProgram = programs.find(p => p.id === config.routineTargetProgramId) || programs[0];

  // Monthly projection calculation
  const monthlyTotal = config.routineAmount * 30;
  const monthlyImpactBeneficiaries = Math.max(1, Math.floor(monthlyTotal / 10000));

  // Toggle master status
  const handleToggleAutoDebit = () => {
    if (!config.routineAutoDebit) {
      setConfig(prev => ({
        ...prev,
        routineAutoDebit: true,
        autoDebitStatus: 'active'
      }));
    } else {
      setConfig(prev => ({
        ...prev,
        routineAutoDebit: false,
        autoDebitStatus: 'inactive'
      }));
    }
  };

  // Toggle pause/resume
  const handleTogglePause = () => {
    setConfig(prev => ({
      ...prev,
      autoDebitStatus: prev.autoDebitStatus === 'paused' ? 'active' : 'paused'
    }));
  };

  // Change nominal
  const handleSelectNominal = (amt: number) => {
    setIsCustomNominal(false);
    setConfig(prev => ({ ...prev, routineAmount: amt }));
  };

  const handleApplyCustomNominal = (val: string) => {
    const num = parseInt(val.replace(/\D/g, ''), 10) || 1000;
    setCustomNominalInput(val);
    setConfig(prev => ({ ...prev, routineAmount: num }));
  };

  // Autodebet records from main history
  const autoDebitRecords = records.filter(r => r.isAutoDebit || r.paymentMethod.toLowerCase().includes('debit') || r.paymentMethod.toLowerCase().includes('rutin'));

  return (
    <div className="space-y-6">
      {/* 1. MASTER STATUS & HERO CARD */}
      <div className={`rounded-3xl p-6 sm:p-7 border transition-all shadow-sm ${
        isAutoDebitActive
          ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-emerald-500/40 text-white'
          : isAutoDebitPaused
          ? 'bg-gradient-to-br from-amber-950 via-slate-900 to-stone-900 border-amber-500/40 text-white'
          : 'bg-gradient-to-br from-stone-900 via-stone-900 to-slate-950 border-stone-800 text-white'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                isAutoDebitActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                  : isAutoDebitPaused
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                  : 'bg-stone-800 text-stone-400 border border-stone-700'
              }`}>
                <RefreshCw className={`w-3.5 h-3.5 ${isAutoDebitActive ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                <span>
                  {isAutoDebitActive && 'Autodebet Fajar Aktif'}
                  {isAutoDebitPaused && 'Autodebet Sedang Dijeda (Paused)'}
                  {!config.routineAutoDebit && 'Autodebet Belum Aktif'}
                </span>
              </span>

              <span className="inline-flex items-center gap-1 bg-white/10 text-stone-200 px-2.5 py-1 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Akad Wakalah bil Infaq • Bebas Riba</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Autodebet Sedekah Subuh Harian
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Jadwalkan sedekah rutin yang terdebet secara otomatis saat adzan fajar berkumandang. Jangan lewatkan doa mustajab dua malaikat meski Anda sedang terlelap atau dalam perjalanan.
            </p>

            {/* Next Execution Badge */}
            <div className="flex items-center gap-2 text-xs bg-stone-900/80 border border-stone-700/80 p-3 rounded-xl backdrop-blur-xs">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-stone-400">Jadwal Eksekusi Fajar Berikutnya: </span>
                <span className="font-bold text-amber-300">
                  Besok Pagi, {activeFajarCity.fajarTime} {activeFajarCity.zone} (Tepat Adzan Subuh {activeFajarCity.city.split(' ')[0]})
                </span>
              </div>
            </div>
          </div>

          {/* Master Actions Block */}
          <div className="bg-stone-900/90 border border-stone-700 p-5 rounded-2xl flex flex-col gap-3 min-w-[280px]">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="text-xs font-bold text-stone-300">Saklar Autodebet Fajar:</span>
              <button
                type="button"
                onClick={handleToggleAutoDebit}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  config.routineAutoDebit ? 'bg-emerald-600' : 'bg-stone-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    config.routineAutoDebit ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Quick stats mini */}
            <div className="space-y-1.5 text-xs text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-400">Nominal Fajar:</span>
                <span className="font-bold text-emerald-400">{formatRupiah(config.routineAmount)} / hari</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Gateway:</span>
                <span className="font-bold text-white line-clamp-1">{activeGateway?.gatewayName.split('(')[0] || 'BSI Direct Debit'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Nomor Mandat:</span>
                <span className="font-mono text-[11px] text-amber-300">{activeGateway?.mandateNumber || 'MND-BSI-2026-88192'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              {config.routineAutoDebit && (
                <button
                  type="button"
                  onClick={handleTogglePause}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isAutoDebitPaused
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700'
                  }`}
                >
                  {isAutoDebitPaused ? (
                    <>
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Lanjutkan Autodebet</span>
                    </>
                  ) : (
                    <>
                      <PauseCircle className="w-3.5 h-3.5" />
                      <span>Jeda Sementara (Pause)</span>
                    </>
                  )}
                </button>
              )}

              {/* Instant Test Execution Button */}
              <button
                type="button"
                disabled={isExecuting}
                onClick={onExecuteAutoDebitNow}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                {isExecuting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin text-stone-950" />
                    <span>Mengeksekusi Gateway Autodebet...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current text-stone-950" />
                    <span>⚡ Uji Eksekusi Autodebet Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PENGATURAN PARAMETER AUTODEBET FAJAR (2-COL SPLIT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Waktu, Sasaran Program & Nominal (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Waktu Eksekusi Fajar & Sinkronisasi Wilayah */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>1. Waktu Eksekusi & Acuan Jadwal Sholat Subuh</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Sistem otomatis mendebet dana tepat pada waktu mustajab fajar sesuai koordinat kota Anda.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {activeFajarCity.fajarTime} {activeFajarCity.zone}
              </span>
            </div>

            {/* Kota Selector */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-stone-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Wilayah Kota Tempat Tinggal Anda:</span>
              </label>
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
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 font-bold text-stone-800 focus:border-emerald-600 focus:outline-none cursor-pointer"
              >
                {FAJAR_SCHEDULE_CITIES.map((c, i) => (
                  <option key={i} value={c.city}>{c.city} (Subuh {c.fajarTime} {c.zone})</option>
                ))}
              </select>
            </div>

            {/* Timing Option Radio */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-stone-700 block">Pilihan Waktu Eksekusi:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    id: 'adzan_subuh',
                    label: 'Tepat Adzan Subuh',
                    sub: `Pukul ${activeFajarCity.fajarTime} ${activeFajarCity.zone}`,
                    desc: 'Saat malaikat fajar turun'
                  },
                  {
                    id: 'qabliyah_15m',
                    label: '15 Menit Sebelum',
                    sub: 'Qabliyah / Sahur',
                    desc: 'Menjelang fajar shodiq'
                  },
                  {
                    id: 'dzikir_pagi',
                    label: '20 Menit Ba\'da',
                    sub: 'Waktu Dzikir Pagi',
                    desc: 'Setelah sholat subuh'
                  }
                ].map((item) => {
                  const isSelected = (config.autoDebitTiming || 'adzan_subuh') === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setConfig(prev => ({ ...prev, autoDebitTiming: item.id as any }))}
                      className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1 ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-500 text-emerald-900 font-bold'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[11px] text-emerald-700 font-semibold">{item.sub}</div>
                      <div className="text-[10px] text-stone-400">{item.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card: Program Sasaran Penyaluran */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span>2. Program Sasaran Penyaluran Fajar Rutin</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Pilih program amanah yang akan menerima sedekah subuh otomatis Anda setiap fajar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {programs.map((p) => {
                const isSelected = config.routineTargetProgramId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setConfig(prev => ({ ...prev, routineTargetProgramId: p.id }))}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs space-y-1.5 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-2xs'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-stone-900">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{p.icon}</span>
                        <span className="line-clamp-1">{p.title}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-2">
                      {p.tagline}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Amanah Terpilih:</strong> {selectedProgram.title} — {selectedProgram.beneficiaryDesc}
              </div>
            </div>
          </div>

          {/* Card: Nominal Harian & Kalkulator Berkah Bulanan */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span>3. Nominal Sedekah Fajar & Kalkulator Istiqomah</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Sedekah sedikit namun istiqomah adalah amalan yang paling dicintai Allah ﷻ.
              </p>
            </div>

            {/* Nominal Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">Pilih Nominal Harian:</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[2000, 5000, 10000, 20000, 50000].map((amt) => {
                  const isSelected = !isCustomNominal && config.routineAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleSelectNominal(amt)}
                      className={`py-2 px-1 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-500/20'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {amt === 2000 ? 'Rp 2 Ribu' : formatRupiah(amt)}
                    </button>
                  );
                })}
              </div>

              {/* Custom Nominal Toggle */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustomNominal(!isCustomNominal)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    isCustomNominal
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  Nominal Kustom
                </button>
                {isCustomNominal && (
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2 text-xs font-bold text-stone-400">Rp</span>
                    <input
                      type="number"
                      value={customNominalInput}
                      onChange={(e) => handleApplyCustomNominal(e.target.value)}
                      placeholder="Contoh: 15000"
                      className="w-full text-xs font-bold pl-9 pr-3 py-1.5 rounded-lg border border-stone-300 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Monthly Projection Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 to-emerald-50/70 border border-amber-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span className="flex items-center gap-1.5 text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Proyeksi Dampak Keberkahan 30 Hari:</span>
                </span>
                <span className="text-emerald-800 text-sm font-black">
                  {formatRupiah(monthlyTotal)} / bulan
                </span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Dengan mengistiqomahkan <strong>{formatRupiah(config.routineAmount)}</strong> setiap subuh, Anda memberikan dampak nyata berupa makanan & perlindungan bagi setidaknya <strong>{monthlyImpactBeneficiaries} penerima manfaat</strong> setiap bulannya tanpa terputus.
              </p>
            </div>

            {/* Hajat & Doa Rutin */}
            <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
              <label className="font-bold text-stone-700 block">
                Niat & Hajat Khusus Rutin (Tercatat di Setiap Resi Fajar):
              </label>
              <select
                value={config.routineHajat || SUBUH_HAJAT_TEMPLATES[0]}
                onChange={(e) => setConfig(prev => ({ ...prev, routineHajat: e.target.value }))}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:border-emerald-600 focus:outline-none cursor-pointer"
              >
                {SUBUH_HAJAT_TEMPLATES.map((h, i) => (
                  <option key={i} value={h}>{h}</option>
                ))}
              </select>

              <textarea
                rows={2}
                value={config.personalDoa}
                onChange={(e) => setConfig(prev => ({ ...prev, personalDoa: e.target.value }))}
                placeholder="Tuliskan doa harian Anda yang ingin diaminkan malaikat subuh..."
                className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Payment Gateway Integration & Syariah Rules (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Status Gateway Terhubung */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Gateway Pembayaran Terhubung</span>
                </h3>
                <p className="text-[11px] text-stone-500">
                  Kanal debet otomatis resmi berlisensi Bank Indonesia & OJK
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenGatewayModal()}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
              >
                Ganti Gateway
              </button>
            </div>

            {/* Connected Gateway Info Box */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl shadow-2xs">
                    🏦
                  </span>
                  <div>
                    <div className="font-extrabold text-stone-900 text-xs">
                      {activeGateway?.gatewayName || 'BSI Direct Debit (Syariah)'}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      {activeGateway?.accountIdentifier || 'BSI Tabungan - 7149••••3291'}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Aktif</span>
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-stone-400 block">Nomor Mandat:</span>
                  <span className="font-mono font-bold text-stone-800">{activeGateway?.mandateNumber || 'MND-BSI-2026-88192'}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Batas Proteksi Harian:</span>
                  <span className="font-bold text-emerald-700">{formatRupiah(activeGateway?.dailyLimit || 50000)}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Biaya Layanan Admin:</span>
                  <span className="font-bold text-emerald-700">Rp 0 (100% Gratis)</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Terdaftar Sejak:</span>
                  <span className="font-semibold text-stone-700">{activeGateway?.registeredDate || '01 September 2026'}</span>
                </div>
              </div>
            </div>

            {/* Quick Switch Gateway Button */}
            <button
              type="button"
              onClick={() => onOpenGatewayModal()}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-stone-600" />
              <span>Kelola & Ubah Kanal Gateway Autodebet</span>
            </button>
          </div>

          {/* Grid 6 Pilihan Gateway yang Didukung */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wide flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kanal Gateway Resmi Terintegrasi</span>
              </h4>
              <span className="text-[10px] text-stone-400">6 Kanal Tersedia</span>
            </div>

            <div className="space-y-2">
              {AUTODEBET_GATEWAY_OPTIONS.map((g) => {
                const isCurrent = activeGateway?.gatewayId === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => onOpenGatewayModal(g)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-50/70 border-emerald-500 ring-1 ring-emerald-400'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{g.icon}</span>
                      <div>
                        <div className="font-bold text-stone-900 flex items-center gap-1.5">
                          <span>{g.name.split('(')[0]}</span>
                          {isCurrent && (
                            <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">
                              Terpilih
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-stone-500">{g.provider}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-emerald-700 block">{g.fee}</span>
                      <span className="text-[9px] text-stone-400">{g.badge}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Pilar Kepatuhan Syariah & Keamanan */}
          <div className="bg-gradient-to-br from-stone-900 to-slate-900 text-white rounded-2xl p-5 border border-stone-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-xs text-emerald-300 uppercase tracking-wide">
                  Prinsip Syariah & Transparansi
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowSyariahDetails(!showSyariahDetails)}
                className="text-[10px] text-stone-400 hover:text-white underline cursor-pointer"
              >
                {showSyariahDetails ? 'Sembunyikan' : 'Pelajari Fatwa'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/80 space-y-0.5">
                <div className="font-bold text-emerald-400 flex items-center gap-1">
                  <span>✓ Akad Wakalah</span>
                </div>
                <div className="text-stone-300 text-[10px]">
                  Kuasa penyaluran infak fajar yang sah secara fikih.
                </div>
              </div>

              <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/80 space-y-0.5">
                <div className="font-bold text-emerald-400 flex items-center gap-1">
                  <span>✓ 0% Biaya Admin</span>
                </div>
                <div className="text-stone-300 text-[10px]">
                  100% donasi sampai ke mustahik tanpa potongan perantara.
                </div>
              </div>

              <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/80 space-y-0.5">
                <div className="font-bold text-emerald-400 flex items-center gap-1">
                  <span>✓ Bebas Denda</span>
                </div>
                <div className="text-stone-300 text-[10px]">
                  Jika saldo kosong saat subuh, transaksi dilewati tanpa denda.
                </div>
              </div>

              <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/80 space-y-0.5">
                <div className="font-bold text-emerald-400 flex items-center gap-1">
                  <span>✓ Hak Khiyar Bebas</span>
                </div>
                <div className="text-stone-300 text-[10px]">
                  Bebas jeda atau batalkan kapan saja dengan 1 klik.
                </div>
              </div>
            </div>

            {showSyariahDetails && (
              <div className="p-3 bg-stone-800 rounded-xl text-[10px] text-stone-300 space-y-1 border border-stone-700">
                <div className="font-bold text-amber-300">Fatwa DSN-MUI Terkait:</div>
                <p>
                  1. Fatwa DSN-MUI No. 112/DSN-MUI/IX/2017 tentang Akad Wakalah bil Ujrah pada Layanan Perbankan.
                </p>
                <p>
                  2. Fatwa DSN-MUI No. 116/DSN-MUI/IX/2017 tentang Uang Elektronik Syariah (E-Money).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. BUKU CATATAN EKSEKUSI AUTODEBET FAJAR */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Riwayat Log Eksekusi Autodebet Fajar Rutin</span>
            </h3>
            <p className="text-xs text-stone-500">
              Setiap pemotongan otomatis fajar terekam dengan nomor referensi gateway perbankan dan resi sah.
            </p>
          </div>
          <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
            {autoDebitRecords.length} Eksekusi Fajar Tercatat
          </div>
        </div>

        {autoDebitRecords.length === 0 ? (
          <div className="text-center py-8 text-stone-500 text-xs space-y-2">
            <RefreshCw className="w-8 h-8 mx-auto text-stone-300" />
            <p>Belum ada eksekusi autodebet yang tercatat.</p>
            <button
              type="button"
              onClick={onExecuteAutoDebitNow}
              className="text-emerald-700 font-bold hover:underline"
            >
              Coba Uji Eksekusi Pertama Sekarang
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {autoDebitRecords.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
                    🌅
                  </div>
                  <div>
                    <div className="font-extrabold text-stone-900 flex items-center gap-2 flex-wrap">
                      <span>{rec.programTitle}</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                        Autodebet
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {rec.date} • {rec.time} • Kanal: <strong>{rec.paymentMethod}</strong> • Resi: <span className="font-mono text-stone-700">{rec.receiptNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <div className="font-black text-emerald-800 text-sm">
                      {formatRupiah(rec.amount)}
                    </div>
                    <span className="text-[10px] text-stone-500">
                      Streak Hari Ke-{rec.blessingStreakDay}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewReceipt(rec)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>Resi</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
