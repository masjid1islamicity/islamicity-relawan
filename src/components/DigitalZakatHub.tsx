import React from 'react';
import { 
  ShieldCheck, 
  Calculator, 
  Sparkles, 
  Lock, 
  Coins, 
  QrCode, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  FileCheck,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { formatRupiah, NISAB_ZAKAT_MAAL, GOLD_PRICE_PER_GRAM, ZAKAT_FITRAH_PER_SOUL } from '../utils/formatters';

interface DigitalZakatHubProps {
  onOpenCalculator: () => void;
  onOpenDirectPayment: (type: 'zakat_maal' | 'zakat_fitrah' | 'infaq_sedekah') => void;
}

export const DigitalZakatHub: React.FC<DigitalZakatHubProps> = ({
  onOpenCalculator,
  onOpenDirectPayment,
}) => {
  const asnafList = [
    { title: 'Fakir & Miskin', desc: 'Memenuhi kebutuhan pokok makan & pengobatan dhuafa', percent: '45%' },
    { title: 'Fisabilillah', desc: 'Dakwah, beasiswa santri tahfidz pelosok & sarana ibadah', percent: '20%' },
    { title: 'Gharimin & Riqab', desc: 'Penyelamatan mustahik terlilit hutang mendesak & kemanusiaan', percent: '15%' },
    { title: 'Ibnu Sabil & Muallaf', desc: 'Musafir terlantar & pembinaan akidah saudara muslim baru', percent: '10%' },
    { title: 'Amil Terpercaya', desc: 'Operasional relawan penyalur sesuai batas syariah BAZNAS', percent: '10%' },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-emerald-800/40 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-900/80 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-700/50">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gerbang Pembayaran Zakat Digital Terenkripsi 256-Bit</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tunaikan Kewajiban Rukun Islam ke-4 dengan Mudah & Sah
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Penyaluran zakat dilakukan secara otomatis dan akuntabel kepada 8 golongan Asnaf yang berhak, disertai penerbitan Bukti Setor Zakat (BSZ) resmi ber-QR Code untuk pengurang pajak penghasilan (PPh).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>Hitung Zakat Maal & Fitrah</span>
            </button>
            <button
              onClick={() => onOpenDirectPayment('zakat_maal')}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-emerald-500/30 transition-all"
            >
              <span>Bayar Zakat Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Gold Nisab Ticker Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <div className="text-stone-500 text-[10px] font-semibold uppercase">Harga Emas Standar Acuan</div>
            <div className="text-sm font-bold text-stone-900">{formatRupiah(GOLD_PRICE_PER_GRAM)} / gram</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <div className="text-stone-500 text-[10px] font-semibold uppercase">Nisab Zakat Maal (85 gr)</div>
            <div className="text-sm font-bold text-emerald-800">{formatRupiah(NISAB_ZAKAT_MAAL)}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-teal-700" />
          </div>
          <div>
            <div className="text-stone-500 text-[10px] font-semibold uppercase">Zakat Fitrah Standar Beras</div>
            <div className="text-sm font-bold text-teal-800">{formatRupiah(ZAKAT_FITRAH_PER_SOUL)} / Jiwa</div>
          </div>
        </div>
      </div>

      {/* 3 Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Zakat Maal */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-500/60 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">Zakat Maal (Harta)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Kewajiban 2.5% dari tabungan, simpanan emas, investasi, dan perniagaan yang telah mencapai haul (1 tahun) dan nisab emas.
            </p>
          </div>
          <button
            onClick={() => onOpenDirectPayment('zakat_maal')}
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs py-2.5 rounded-xl transition-all"
          >
            Bayar Zakat Maal Digital
          </button>
        </div>

        {/* Zakat Fitrah */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-500/60 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">Zakat Fitrah</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Penyucian jiwa untuk setiap anggota keluarga ({formatRupiah(ZAKAT_FITRAH_PER_SOUL)}/jiwa) yang disalurkan dalam bentuk beras super sebelum shalat Idul Fitri.
            </p>
          </div>
          <button
            onClick={() => onOpenDirectPayment('zakat_fitrah')}
            className="w-full bg-teal-700 hover:bg-teal-600 text-white font-semibold text-xs py-2.5 rounded-xl transition-all"
          >
            Tunaikan Zakat Fitrah
          </button>
        </div>

        {/* Infaq & Sedekah */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-500/60 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">Infaq & Sedekah Subuh</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Kebaikan sukarela tanpa batas nominal untuk melipatgandakan pahala harian, sedekah tolak bala, dan santunan yatim darurat.
            </p>
          </div>
          <button
            onClick={() => onOpenDirectPayment('infaq_sedekah')}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs py-2.5 rounded-xl transition-all"
          >
            Infaq & Sedekah Sekarang
          </button>
        </div>
      </div>

      {/* 8 Asnaf Distribution Scheme */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Penyaluran Transparan ke 8 Golongan Asnaf (QS. At-Taubah: 60)
            </h3>
            <p className="text-xs text-stone-500">
              Setiap rupiah zakat terdistribusi sesuai proporsi fiqih yang diaudit ketat oleh dewan syariah.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {asnafList.map((a, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-800">
                <span>{a.title}</span>
                <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px]">{a.percent}</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-wallet Integration Badge */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
            Integrasi Dompet Digital Populer & Bank Syariah Terpercaya
          </div>
          <div className="text-sm text-stone-300">
            Dukungan pembayaran instan tanpa ribet melalui QRIS, GoPay, OVO, ShopeePay, DANA, dan BSI Virtual Account.
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenDirectPayment('zakat_maal')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all"
          >
            Mulai Transaksi Zakat
          </button>
        </div>
      </div>
    </div>
  );
};
