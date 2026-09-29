import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  QrCode, 
  CheckCircle2, 
  Send, 
  FileCheck,
  Copy,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Campaign, DonationType, PaymentMethod, DonationTransaction } from '../types';
import { formatRupiah, generateReceiptNumber, generateTxHash } from '../utils/formatters';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign?: Campaign | null;
  allCampaigns: Campaign[];
  initialAmount?: number;
  initialType?: DonationType;
  initialNote?: string;
  onSuccessTransaction: (transaction: DonationTransaction) => void;
}

const PRESET_AMOUNTS = [50000, 100000, 250000, 500000, 1000000, 2500000];

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  campaign,
  allCampaigns,
  initialAmount,
  initialType = 'zakat_maal',
  initialNote = '',
  onSuccessTransaction,
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    campaign?.id || (allCampaigns[0]?.id || '')
  );
  const [donationType, setDonationType] = useState<DonationType>(initialType);
  const [amount, setAmount] = useState<number>(initialAmount || 250000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  
  // Donor identity
  const [donorName, setDonorName] = useState<string>('Hamba Allah');
  const [donorEmail, setDonorEmail] = useState<string>('masjid1.islamicity@gmail.com');
  const [donorPhone, setDonorPhone] = useState<string>('081289123456');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [doaNotes, setDoaNotes] = useState<string>(initialNote);
  const [requestTaxReceipt, setRequestTaxReceipt] = useState<boolean>(true);

  // Flow steps: 'form' | 'processing' | 'success'
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [completedTrx, setCompletedTrx] = useState<DonationTransaction | null>(null);
  const [copiedVA, setCopiedVA] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeCampaign = allCampaigns.find(c => c.id === selectedCampaignId) || campaign || allCampaigns[0];

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    if (val) {
      setAmount(parseInt(val, 10));
    }
  };

  const executePayment = () => {
    setStep('processing');

    setTimeout(() => {
      const now = new Date();
      const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      
      const newTrx: DonationTransaction = {
        id: `trx-${Date.now()}`,
        receiptNumber: generateReceiptNumber(),
        campaignId: activeCampaign?.id || 'camp-general',
        campaignTitle: activeCampaign?.title || 'Dana Zakat & Sosial Islamicity',
        donorName: isAnonymous ? 'Hamba Allah' : (donorName || 'Hamba Allah'),
        donorEmail: donorEmail || 'masjid1.islamicity@gmail.com',
        donorPhone: donorPhone || '081289123456',
        isAnonymous,
        donationType,
        amount,
        adminFee: 0, // 100% tersalurkan tanpa potongan admin sesuai syariah
        totalPaid: amount,
        paymentMethod,
        paymentStatus: 'tersalurkan',
        doaOrNotes: doaNotes,
        timestamp: timeStr,
        taxDeductible: requestTaxReceipt,
        txHash: generateTxHash(),
        notificationLog: {
          smsSent: true,
          smsTime: timeStr,
          pushSent: true,
          pushTime: timeStr,
          emailSent: true,
          emailTime: timeStr
        }
      };

      setCompletedTrx(newTrx);
      onSuccessTransaction(newTrx);
      setStep('success');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti effect executed', err);
      }
    }, 1200);
  };

  const copyVAToClipboard = (vaNum: string) => {
    navigator.clipboard.writeText(vaNum);
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-200 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' && (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5 border-b border-stone-100 pb-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-900">
                  Tunaikan Zakat & Donasi Digital
                </h2>
                <p className="text-xs text-stone-500">
                  Terenkripsi 256-Bit • 100% Bebas Biaya Admin • Notifikasi Otomatis
                </p>
              </div>
            </div>

            {/* Campaign Selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Pilih Inisiatif Sosial / Penyaluran Amanah
              </label>
              <select
                value={selectedCampaignId}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600 font-medium"
              >
                {allCampaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.categoryLabel}] {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Category / Type Selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Kategori Akad Ibadah
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setDonationType('zakat_maal')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    donationType === 'zakat_maal'
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Zakat Maal
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('zakat_fitrah')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    donationType === 'zakat_fitrah'
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Zakat Fitrah
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('infaq_sedekah')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    donationType === 'infaq_sedekah'
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Infaq / Sedekah
                </button>
              </div>
            </div>

            {/* Amount Presets & Custom */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Nominal Ibadah ({formatRupiah(amount)})
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2.5">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`py-2 px-1 text-xs rounded-lg font-semibold border transition-all ${
                      amount === preset && !customAmount
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {formatRupiah(preset)}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-bold text-stone-500">Rp</span>
                <input
                  type="text"
                  placeholder="Nominal custom lainnya (cth: 750000)"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Payment Method Selector (Third-party integrations) */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  Metode Pembayaran Pihak Ketiga & Dompet Digital
                </label>
                <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Verifikasi Otomatis
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {/* QRIS */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'qris'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <div className="text-left leading-tight">
                    <div className="font-bold">QRIS Instant</div>
                    <div className="text-[10px] text-stone-500">Semua E-Wallet</div>
                  </div>
                </button>

                {/* GoPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('gopay')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'gopay'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <div className="text-left leading-tight">
                    <div className="font-bold">GoPay</div>
                    <div className="text-[10px] text-stone-500">Dompet Digital</div>
                  </div>
                </button>

                {/* ShopeePay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('shopeepay')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'shopeepay'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-orange-600" />
                  <div className="text-left leading-tight">
                    <div className="font-bold">ShopeePay</div>
                    <div className="text-[10px] text-stone-500">Dompet Digital</div>
                  </div>
                </button>

                {/* DANA */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('dana')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'dana'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-sky-600" />
                  <div className="text-left leading-tight">
                    <div className="font-bold">DANA</div>
                    <div className="text-[10px] text-stone-500">Dompet Digital</div>
                  </div>
                </button>

                {/* OVO */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('ovo')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'ovo'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-purple-600" />
                  <div className="text-left leading-tight">
                    <div className="font-bold">OVO</div>
                    <div className="text-[10px] text-stone-500">Dompet Digital</div>
                  </div>
                </button>

                {/* BSI Syariah VA */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bsi_va')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    paymentMethod === 'bsi_va'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <div className="text-left leading-tight">
                    <div className="font-bold">BSI Virtual Acc.</div>
                    <div className="text-[10px] text-stone-500">Bank Syariah</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Donor Identity Form */}
            <div className="space-y-3 mb-5 border-t border-stone-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800">
                  Data Pembayar & Pengiriman Notifikasi Real-Time
                </span>
                <label className="flex items-center gap-1.5 text-xs text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="accent-emerald-700 rounded"
                  />
                  <span>Sembunyikan Nama (Hamba Allah)</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-stone-600 mb-0.5 font-medium">Nama Muzaki / Donatur</label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    value={isAnonymous ? 'Hamba Allah' : donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 disabled:bg-stone-100 text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-0.5 font-medium">No. Ponsel / WhatsApp (Notifikasi SMS & WA)</label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 mb-0.5 text-xs font-medium">Email untuk Laporan Akuntabilitas Berkala</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-0.5 text-xs font-medium">Doa Khusus / Hajat Ibadah (Opsional)</label>
                <input
                  type="text"
                  placeholder="cth: Mohon doa agar keluarga senantiasa dalam lindungan Allah SWT"
                  value={doaNotes}
                  onChange={(e) => setDoaNotes(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-stone-600">
                <input
                  type="checkbox"
                  id="taxReceipt"
                  checked={requestTaxReceipt}
                  onChange={(e) => setRequestTaxReceipt(e.target.checked)}
                  className="accent-emerald-700 rounded"
                />
                <label htmlFor="taxReceipt" className="cursor-pointer">
                  Terbitkan Bukti Setor Zakat (BSZ) resmi untuk pengurang pajak penghasilan (PPh).
                </label>
              </div>
            </div>

            {/* Doa Niat Zakat */}
            <div className="bg-emerald-900/10 border border-emerald-200 rounded-xl p-3.5 mb-5 text-stone-800">
              <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Doa Niat Penyerahan Zakat:
              </div>
              <p className="font-serif text-sm text-right text-emerald-950 leading-loose">
                آجَرَكَ اللَّهُ فِيمَا أَعْطَيْتَ، وَبَارَكَ لَكَ فِيمَا أَبْقَيْتَ، وَجَعَلَهُ لَكَ طَهُورًا
              </p>
              <p className="text-[11px] text-stone-600 italic mt-1">
                "Semoga Allah memberi ganjaran pahala atas apa yang engkau berikan, memberkahi apa yang tersisa padamu, dan menjadikannya pembersih bagimu."
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-200">
              <div className="text-xs text-stone-500">
                Total: <span className="text-emerald-700 font-bold text-sm">{formatRupiah(amount)}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={executePayment}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md transition-all active:scale-95"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Bayar Sekarang ({paymentMethod.toUpperCase()})</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-12 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-emerald-700 animate-spin" />
              <Lock className="w-6 h-6 text-emerald-700 absolute inset-0 m-auto" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Memproses Pembayaran Digital Terenkripsi...
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Menghubungkan ke Gateway Syariah & Menerbitkan Bukti Setor Zakat Real-time
              </p>
            </div>
          </div>
        )}

        {step === 'success' && completedTrx && (
          <div className="space-y-4">
            <div className="text-center pt-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Alhamdulillah, Donasi & Zakat Berhasil!
              </h3>
              <p className="text-xs text-stone-500">
                Penyaluran langsung dialokasikan ke inisiatif sosial dan tercatat di buku kas transparan.
              </p>
            </div>

            {/* Official Digital Receipt Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Nomor Bukti Setor (BSZ):</span>
                <span className="font-mono font-bold text-emerald-800">{completedTrx.receiptNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Inisiatif Sosial:</span>
                <span className="font-semibold text-right text-stone-800 max-w-[240px] truncate">{completedTrx.campaignTitle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Muzaki / Donatur:</span>
                <span className="font-medium text-stone-800">{completedTrx.donorName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Metode & Waktu:</span>
                <span className="text-stone-700">{completedTrx.paymentMethod.toUpperCase()} • {completedTrx.timestamp}</span>
              </div>
              <div className="flex items-center justify-between border-t border-stone-200 pt-2 text-sm font-bold">
                <span className="text-stone-700">Total Tersalurkan (0% Potongan):</span>
                <span className="text-emerald-700">{formatRupiah(completedTrx.amount)}</span>
              </div>
              <div className="bg-stone-100 rounded-lg p-2 font-mono text-[10px] text-stone-500 truncate flex items-center justify-between">
                <span>Hash Audit: {completedTrx.txHash}</span>
                <span className="text-emerald-600 font-sans font-semibold">Terenkripsi</span>
              </div>
            </div>

            {/* Simulated Real-Time Automated Notifications Badges */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs space-y-2">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-emerald-700" />
                Notifikasi Otomatis Terkirim Seketika:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="bg-white p-2 rounded-lg border border-emerald-100 flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold">SMS / WhatsApp:</span>
                    <div className="text-[10px] text-stone-500">Terkirim ke {completedTrx.donorPhone}</div>
                  </div>
                </div>

                <div className="bg-white p-2 rounded-lg border border-emerald-100 flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold">Notifikasi Push:</span>
                    <div className="text-[10px] text-stone-500">Aktif di ponsel donatur</div>
                  </div>
                </div>

                <div className="bg-white p-2 rounded-lg border border-emerald-100 flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold">Email Laporan:</span>
                    <div className="text-[10px] text-stone-500">BSZ PDF ke {completedTrx.donorEmail}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep('form');
                  onClose();
                }}
                className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm transition-all"
              >
                Selesai & Lihat Pelacakan Real-time
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
