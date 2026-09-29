import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { 
  formatRupiah, 
  NISAB_ZAKAT_MAAL, 
  calculateZakatMaal, 
  ZAKAT_FITRAH_PER_SOUL, 
  GOLD_PRICE_PER_GRAM 
} from '../utils/formatters';

interface ZakatCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedWithZakat: (amount: number, type: 'zakat_maal' | 'zakat_fitrah', note: string) => void;
}

export const ZakatCalculatorModal: React.FC<ZakatCalculatorModalProps> = ({
  isOpen,
  onClose,
  onProceedWithZakat,
}) => {
  const [calcType, setCalcType] = useState<'maal' | 'fitrah'>('maal');

  // Maal state
  const [savings, setSavings] = useState<number>(120000000);
  const [goldSilver, setGoldSilver] = useState<number>(30000000);
  const [investments, setInvestments] = useState<number>(15000000);
  const [businessAssets, setBusinessAssets] = useState<number>(0);
  const [shortTermDebts, setShortTermDebts] = useState<number>(10000000);

  // Fitrah state
  const [familyMembers, setFamilyMembers] = useState<number>(4);

  if (!isOpen) return null;

  const totalAssets = savings + goldSilver + investments + businessAssets;
  const maalResult = calculateZakatMaal(totalAssets, shortTermDebts);
  const fitrahTotal = familyMembers * ZAKAT_FITRAH_PER_SOUL;

  const handlePayZakat = () => {
    if (calcType === 'maal') {
      const amountToPay = maalResult.isEligible ? maalResult.zakatDue : 100000;
      onProceedWithZakat(
        amountToPay, 
        'zakat_maal', 
        `Perhitungan Zakat Maal Otomatis (Total Harta Bersih: ${formatRupiah(maalResult.netWealth)})`
      );
    } else {
      onProceedWithZakat(
        fitrahTotal, 
        'zakat_fitrah', 
        `Zakat Fitrah untuk ${familyMembers} Jiwa (Keluarga/Tanggungan)`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-stone-100 pb-4">
          <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Kalkulator Zakat Digital Syariah
            </h2>
            <p className="text-xs text-stone-500">
              Standar BAZNAS & Fatwa MUI • Nisab Emas 85 gram ({formatRupiah(GOLD_PRICE_PER_GRAM)}/gr)
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl mb-6 text-sm font-medium">
          <button
            onClick={() => setCalcType('maal')}
            className={`py-2 px-4 rounded-lg transition-all ${
              calcType === 'maal'
                ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Zakat Maal (Harta Kekayaan)
          </button>
          <button
            onClick={() => setCalcType('fitrah')}
            className={`py-2 px-4 rounded-lg transition-all ${
              calcType === 'fitrah'
                ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Zakat Fitrah (Penyucian Jiwa)
          </button>
        </div>

        {calcType === 'maal' ? (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 text-xs text-emerald-800 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Nisab Zakat Maal:</strong> {formatRupiah(NISAB_ZAKAT_MAAL)} (setara 85 gr emas murni). Jika harta telah tersimpan 1 tahun hijriyah (haul) dan mencapai nisab, wajib dikeluarkan 2,5%.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  1. Tabungan, Deposito, Kas Cair (Rp)
                </label>
                <input
                  type="number"
                  value={savings || ''}
                  onChange={(e) => setSavings(Number(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  2. Emas, Perak, & Logam Mulia (Rp)
                </label>
                <input
                  type="number"
                  value={goldSilver || ''}
                  onChange={(e) => setGoldSilver(Number(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  3. Saham, Reksadana, Investasi (Rp)
                </label>
                <input
                  type="number"
                  value={investments || ''}
                  onChange={(e) => setInvestments(Number(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  4. Aset Perdagangan / Usaha Bersih (Rp)
                </label>
                <input
                  type="number"
                  value={businessAssets || ''}
                  onChange={(e) => setBusinessAssets(Number(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-stone-700 font-semibold mb-1">
                  Hutang Jangka Pendek Jatuh Tempo (Pengurang) (Rp)
                </label>
                <input
                  type="number"
                  value={shortTermDebts || ''}
                  onChange={(e) => setShortTermDebts(Number(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Computation Outcome Card */}
            <div className={`p-4 rounded-xl border ${
              maalResult.isEligible 
                ? 'bg-emerald-900 text-white border-emerald-700' 
                : 'bg-stone-100 text-stone-800 border-stone-200'
            }`}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span>Harta Bersih Kena Zakat:</span>
                <span className="font-semibold">{formatRupiah(maalResult.netWealth)}</span>
              </div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span>Batas Minimal Nisab:</span>
                <span>{formatRupiah(NISAB_ZAKAT_MAAL)}</span>
              </div>
              <div className="border-t border-emerald-700/50 pt-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-emerald-200">
                    {maalResult.isEligible ? 'Wajib Zakat (Muzaki)' : 'Belum Memenuhi Batas Nisab'}
                  </div>
                  <div className="text-xl font-extrabold text-amber-300">
                    {maalResult.isEligible ? formatRupiah(maalResult.zakatDue) : 'Rp 0 (Dianjurkan Infaq/Sedekah)'}
                  </div>
                </div>
                {maalResult.isEligible && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Kewajiban 2.5%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 text-xs text-emerald-800 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Zakat Fitrah:</strong> Wajib dikeluarkan setiap muslim menjelang Idul Fitri setara 2.5 kg atau 3.5 liter beras per jiwa ({formatRupiah(ZAKAT_FITRAH_PER_SOUL)}/jiwa).
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold text-sm mb-1.5">
                Jumlah Jiwa / Anggota Keluarga yang Ditanggung
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={familyMembers}
                  onChange={(e) => setFamilyMembers(Number(e.target.value))}
                  className="flex-1 accent-emerald-600"
                />
                <span className="w-12 text-center font-bold text-lg text-emerald-800 bg-emerald-100 py-1 rounded-lg">
                  {familyMembers}
                </span>
              </div>
            </div>

            <div className="bg-emerald-900 text-white rounded-xl p-4 border border-emerald-800">
              <div className="text-xs text-emerald-200 mb-1">Total Kewajiban Zakat Fitrah:</div>
              <div className="text-2xl font-extrabold text-amber-300">
                {formatRupiah(fitrahTotal)}
              </div>
              <div className="text-xs text-emerald-300 mt-2">
                Setara dengan {familyMembers * 2.5} kg beras super higienis untuk fakir miskin.
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Terenkripsi & Tercatat Sah</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handlePayZakat}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <span>Lanjut ke Pembayaran Digital</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
