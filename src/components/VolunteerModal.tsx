import React, { useState } from 'react';
import { X, HeartHandshake, CheckCircle2, Shield, Sparkles, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VolunteerRole, VolunteerRegistration } from '../types';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: VolunteerRole | null;
  onRegisterVolunteer: (reg: VolunteerRegistration) => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({
  isOpen,
  onClose,
  role,
  onRegisterVolunteer,
}) => {
  const [name, setName] = useState<string>('Rahmat Hidayat');
  const [email, setEmail] = useState<string>('rahmat.hidayat@relawan.org');
  const [phone, setPhone] = useState<string>('081298765432');
  const [city, setCity] = useState<string>('Padang / Bukittinggi');
  const [skills, setSkills] = useState<string>('Pertolongan Pertama (P3K), Mengemudi Motor Trail & Perahu');
  const [pledgeAccepted, setPledgeAccepted] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen || !role) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeAccepted) return;

    const registration: VolunteerRegistration = {
      id: `vol-${Date.now()}`,
      volunteerName: name,
      email,
      phone,
      city,
      skills,
      roleTitle: role.roleTitle,
      campaignTitle: role.roleTitle,
      pledgeAccepted: true,
      registeredAt: new Date().toLocaleDateString('id-ID', { dateStyle: 'long' }),
      status: 'bertugas',
      serviceHours: 0
    };

    onRegisterVolunteer(registration);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-3 mb-5 border-b border-stone-100 pb-3">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-teal-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-900">
                  Pendaftaran Relawan Berbasis Amanah
                </h2>
                <p className="text-xs text-stone-500">
                  Ukhuwah, Ikhlas, dan Komitmen Pelayanan Ummat
                </p>
              </div>
            </div>

            {/* Role Info Box */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 mb-4 text-xs space-y-2">
              <div className="font-bold text-sm text-stone-800">{role.roleTitle}</div>
              <p className="text-stone-600">{role.dutySummary}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-stone-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{role.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{role.dateRange}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{role.timeCommitment}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">No. WhatsApp / HP</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Email Aktif</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Kota / Domisili Saat Ini</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Keterampilan / Pengalaman Lapangan</label>
                <textarea
                  rows={2}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-teal-600"
                />
              </div>

              {/* Islamic Ethics Pledge */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
                <div className="flex items-center gap-2 font-bold text-emerald-950 mb-1">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  <span>Ikrar Nilai Moral Relawan Islamicity</span>
                </div>
                <p className="text-emerald-900 leading-relaxed mb-2.5 text-[11px]">
                  "Saya berikrar menjalankan tugas kemanusiaan dengan niat ikhlas lillahi Ta’ala, menjaga amanah titipan donatur, menghormati martabat mustahik, serta tidak meminta imbalan finansial pribadi."
                </p>
                <label className="flex items-center gap-2 text-emerald-950 font-semibold cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={pledgeAccepted}
                    onChange={(e) => setPledgeAccepted(e.target.checked)}
                    className="w-4 h-4 accent-emerald-700 rounded"
                  />
                  <span>Saya memahami dan menyetujui ikrar amanah di atas</span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!pledgeAccepted}
                  className="bg-teal-700 hover:bg-teal-600 disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all"
                >
                  Daftar Sebagai Relawan
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Barakallah, Pendaftaran Relawan Diterima!
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                Koordinator lapangan Posko Islamicity telah memvalidasi profil Anda. Instruksi teknis dan tautan grup koordinasi lapangan telah dikirimkan ke WhatsApp Anda ({phone}).
              </p>
            </div>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs inline-block text-stone-700 font-mono">
              ID Relawan: <span className="font-bold text-teal-700">VOL-ISL-{Date.now().toString().slice(-4)}</span>
            </div>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm transition-all"
              >
                Tutup & Masuk Dasbor Koordinasi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
