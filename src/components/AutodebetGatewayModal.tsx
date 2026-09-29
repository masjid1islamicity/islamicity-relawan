import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Scale,
  CreditCard,
  Building,
  Smartphone,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';
import { AutodebetGatewayConfig } from '../types';
import { AUTODEBET_GATEWAY_OPTIONS, AutodebetGatewayOption } from '../data/sedekahSubuhData';
import { formatRupiah } from '../utils/formatters';

interface AutodebetGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGateway?: AutodebetGatewayConfig;
  onSaveGateway: (gateway: AutodebetGatewayConfig) => void;
  initialSelectedOption?: AutodebetGatewayOption | null;
}

export const AutodebetGatewayModal: React.FC<AutodebetGatewayModalProps> = ({
  isOpen,
  onClose,
  currentGateway,
  onSaveGateway,
  initialSelectedOption
}) => {
  const [selectedOption, setSelectedOption] = useState<AutodebetGatewayOption>(
    initialSelectedOption || 
    AUTODEBET_GATEWAY_OPTIONS.find(g => g.id === currentGateway?.gatewayId) || 
    AUTODEBET_GATEWAY_OPTIONS[0]
  );

  const [step, setStep] = useState<'select_and_input' | 'otp_verify' | 'success'>('select_and_input');
  const [accountInput, setAccountInput] = useState<string>(
    currentGateway?.accountIdentifier?.replace(/[^0-9]/g, '') || '71490123891'
  );
  const [dailyLimit, setDailyLimit] = useState<number>(currentGateway?.dailyLimit || 50000);
  const [akadAgreed, setAkadAgreed] = useState<boolean>(true);
  const [otpInput, setOtpInput] = useState<string>('772910');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  if (!isOpen) return null;

  const handleProceedToOtp = () => {
    if (!accountInput.trim()) {
      setValidationError('Silakan masukkan nomor rekening atau nomor HP yang valid.');
      return;
    }
    if (!akadAgreed) {
      setValidationError('Mohon setujui Akad Wakalah bil Infaq sebelum melanjutkan.');
      return;
    }
    setValidationError('');
    setStep('otp_verify');
  };

  const handleVerifyOtp = () => {
    if (otpInput.length < 4) {
      setValidationError('Masukkan kode OTP valid (6 digit).');
      return;
    }
    setIsVerifying(true);
    setValidationError('');

    setTimeout(() => {
      setIsVerifying(false);
      const now = new Date();
      const randomMandateNum = `MND-${selectedOption.id.toUpperCase().slice(0, 3)}-${now.getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      
      const maskedAcc = selectedOption.type === 'ewallet'
        ? `${selectedOption.name.split(' ')[0]} - ${accountInput.slice(0, 4)}••••${accountInput.slice(-4)}`
        : selectedOption.type === 'card'
        ? `Kartu Syariah - •••• •••• •••• ${accountInput.slice(-4) || '9812'}`
        : `${selectedOption.name.split(' ')[0]} Tabungan - ${accountInput.slice(0, 4)}••••${accountInput.slice(-4)}`;

      const newGatewayConfig: AutodebetGatewayConfig = {
        gatewayId: selectedOption.id,
        gatewayName: selectedOption.name,
        accountIdentifier: maskedAcc,
        mandateStatus: 'active',
        mandateNumber: randomMandateNum,
        dailyLimit: dailyLimit,
        registeredDate: now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        expiryDate: '31 Desember 2027',
        isSyariahCertified: true,
        akadWakalahAgreed: true
      };

      setStep('success');
      setTimeout(() => {
        onSaveGateway(newGatewayConfig);
        onClose();
        setStep('select_and_input');
      }, 1500);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-stone-200 space-y-6 text-stone-900 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 border-b border-stone-100 pb-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Integrasi Gateway Pembayaran Syariah Resmi</span>
          </div>
          <h3 className="text-xl font-black text-stone-900">
            {step === 'select_and_input' && 'Hubungkan Gateway Autodebet Sedekah Subuh'}
            {step === 'otp_verify' && 'Otorisasi Mandat Pembayaran Fajar'}
            {step === 'success' && 'Mandat Autodebet Berhasil Diaktifkan!'}
          </h3>
          <p className="text-xs text-stone-500">
            {step === 'select_and_input' && 'Pilih kanal perbankan syariah atau e-wallet pilihan Anda untuk pendebetan otomatis di setiap waktu fajar.'}
            {step === 'otp_verify' && 'Konfirmasi 1x otorisasi untuk mengaktifkan pemotongan rutin fajar tanpa input PIN berulang.'}
            {step === 'success' && 'Akad Wakalah bil Infaq telah terdaftar di sistem gateway pembayaran nasional.'}
          </p>
        </div>

        {/* STEP 1: SELECT GATEWAY & INPUT DETAIL */}
        {step === 'select_and_input' && (
          <div className="space-y-5">
            {validationError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Gateway Selection Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">
                1. Pilih Gateway Pembayaran Autodebet:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AUTODEBET_GATEWAY_OPTIONS.map((g) => {
                  const isSelected = selectedOption.id === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => {
                        setSelectedOption(g);
                        setValidationError('');
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer relative space-y-1.5 ${
                        isSelected
                          ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{g.icon}</span>
                          <span className="font-extrabold text-xs text-stone-900 line-clamp-1">{g.name}</span>
                        </div>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-2">
                        {g.description}
                      </p>
                      <div className="flex items-center justify-between text-[10px] pt-1 border-t border-stone-100">
                        <span className="text-emerald-700 font-bold">{g.fee}</span>
                        <span className="bg-stone-100 text-stone-600 font-semibold px-1.5 py-0.5 rounded">
                          {g.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Input Account Number / Phone / Card */}
            <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                <span>2. Masukkan Nomor Rekening / Akun E-Wallet:</span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Enkripsi 256-Bit</span>
                </span>
              </div>

              <div className="space-y-1">
                <input
                  type="text"
                  value={accountInput}
                  onChange={(e) => setAccountInput(e.target.value)}
                  placeholder={`Contoh: ${selectedOption.sampleAccount}`}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
                <span className="text-[10px] text-stone-500 block">
                  Contoh format acuan: {selectedOption.sampleAccount}
                </span>
              </div>

              {/* Daily Limit Protection */}
              <div className="pt-2 border-t border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-700">Batas Maksimal Perlindungan Harian (Daily Limit):</span>
                  <span className="font-extrabold text-emerald-800">{formatRupiah(dailyLimit)}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[20000, 50000, 100000, 200000].map((lim) => (
                    <button
                      key={lim}
                      type="button"
                      onClick={() => setDailyLimit(lim)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        dailyLimit === lim
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {formatRupiah(lim)}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-stone-500">
                  Proteksi otomatis: Sistem tidak akan pernah mendebet lebih dari batas ini dalam 1 hari kalender.
                </p>
              </div>
            </div>

            {/* Akad Wakalah bil Infaq Syariah Agreement */}
            <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <Scale className="w-4 h-4 text-emerald-700" />
                <span>Akad Syariah: Wakalah bil Infaq & Khiyar Fleksibel</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                "Dengan mengaktifkan autodebet ini, saya mewakilkan (Akad Wakalah) kepada Yayasan Islamicity Amanah untuk menyalurkan sedekah fajar sesuai jadwal & nominal yang telah ditentukan kepada mustahik yang berhak. Saya berhak sewaktu-waktu menjeda atau membatalkan mandat ini (*khiyar*) tanpa denda maupun biaya administrasi."
              </p>
              <div className="text-[10px] text-emerald-700 font-semibold italic">
                Dasar Fikih: {selectedOption.syariahBasis}
              </div>

              <label className="flex items-start gap-2.5 pt-1.5 border-t border-emerald-200/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={akadAgreed}
                  onChange={(e) => setAkadAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="text-[11px] font-bold text-stone-900">
                  Saya telah membaca, memahami, dan menyetujui Akad Wakalah bil Infaq ini dengan sukarela karena Allah SWT.
                </span>
              </label>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleProceedToOtp}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Lanjutkan ke Otorisasi 1x Mandat Fajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: OTP / 1-CLICK AUTHORIZATION */}
        {step === 'otp_verify' && (
          <div className="space-y-5 text-center py-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow-inner">
              📱
            </div>

            <div className="space-y-1">
              <h4 className="font-extrabold text-stone-900 text-base">
                Verifikasi Otorisasi {selectedOption.name}
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Kode otorisasi 6-digit telah dikirimkan via SMS/Notifikasi ke nomor terdaftar Anda untuk mengizinkan debet fajar otomatis.
              </p>
            </div>

            <div className="max-w-xs mx-auto space-y-2">
              <label className="text-xs font-bold text-stone-700 block text-left">
                Masukkan Kode OTP Simulasi:
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="w-full text-center tracking-[0.4em] font-mono text-xl font-black py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:outline-none bg-stone-50"
              />
              <span className="text-[10px] text-stone-400 block">
                Mode Demo: Kode OTP uji coba terisi otomatis (<strong>772910</strong>)
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 max-w-sm mx-auto text-left space-y-1">
              <div className="flex justify-between">
                <span>Kanal Pembayaran:</span>
                <span className="font-bold text-stone-800">{selectedOption.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Batas Harian:</span>
                <span className="font-bold text-emerald-700">{formatRupiah(dailyLimit)}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Admin Mandat:</span>
                <span className="font-bold text-emerald-700">Rp 0 (Gratis)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 max-w-sm mx-auto pt-2">
              <button
                type="button"
                onClick={() => setStep('select_and_input')}
                className="w-1/3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-all cursor-pointer"
              >
                Kembali
              </button>
              <button
                type="button"
                disabled={isVerifying}
                onClick={handleVerifyOtp}
                className="w-2/3 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                {isVerifying ? (
                  <span>Mendaftarkan Mandat ke Gateway...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Konfirmasi & Aktifkan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === 'success' && (
          <div className="space-y-4 text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black text-emerald-900">
                Mandat Autodebet Fajar Aktif!
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Alhamdulillah, kanal <strong>{selectedOption.name}</strong> kini resmi terhubung. Sedekah subuh Anda akan dieksekusi secara otomatis pada setiap waktu fajar.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl max-w-xs mx-auto">
              ✨ Doa malaikat fajar senantiasa mengalir setiap pagi
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
