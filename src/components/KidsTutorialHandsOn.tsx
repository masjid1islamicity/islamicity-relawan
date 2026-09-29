import React, { useState, useEffect } from 'react';
import { 
  Smile, 
  Sparkles, 
  Heart, 
  Truck, 
  Gift, 
  Star, 
  Award, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Coins, 
  MapPin, 
  PartyPopper, 
  Printer, 
  ThumbsUp, 
  HeartHandshake,
  Compass,
  Check
} from 'lucide-react';
import { Campaign } from '../types';

interface KidsTutorialHandsOnProps {
  onBackToMain: () => void;
  onGoToCampaigns: () => void;
  onGoToZakat: () => void;
}

// Simple Web Audio synthesizer for kid-friendly playful chimes
function playKidChime(type: 'coin' | 'horn' | 'cheer' | 'star') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    if (type === 'coin') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
      osc.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.15); // E6
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'horn') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
      osc.frequency.setValueAtTime(440.0, ctx.currentTime + 0.1); // A4
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'star') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.25);
      });
    } else if (type === 'cheer') {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.09 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.09);
        osc.stop(ctx.currentTime + idx * 0.09 + 0.3);
      });
    }
  } catch (e) {
    // Audio context may be restricted before user gesture
    console.debug('Audio not supported or blocked:', e);
  }
}

export const KidsTutorialHandsOn: React.FC<KidsTutorialHandsOnProps> = ({
  onBackToMain,
  onGoToCampaigns,
  onGoToZakat,
}) => {
  // Step 1: Celengan Kebaikan (Zakat & Sedekah)
  // Step 2: Pilih Misi Paket Bantuan
  // Step 3: Jalankan Mobil Relawan (Pelacakan)
  // Step 4: Bintang & Doa Senyuman (Verifikasi & Laporan)
  // Step 5: Piagam Kelulusan Pahlawan Cilik
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Sound narration toggle
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  // Step 1 State: Piggy Bank / Celengan
  const [coinCount, setCoinCount] = useState<number>(0);
  const [piggyCoins, setPiggyCoins] = useState<number>(0);

  // Step 2 State: Mission Choice
  const [selectedGift, setSelectedGift] = useState<'roti' | 'tas' | 'air' | null>('roti');

  // Step 3 State: Truck Progress
  const [truckProgress, setTruckProgress] = useState<number>(10);
  const [truckHonk, setTruckHonk] = useState<boolean>(false);

  // Step 4 State: Community Star Review
  const [starRating, setStarRating] = useState<number>(5);
  const [chosenSticker, setChosenSticker] = useState<string>('Senyum Bahagia');

  // Step 5 State: Child Name & Certificate
  const [childName, setChildName] = useState<string>('Sahabat Cilik');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Mini quiz game for kids
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  // Text-To-Speech reader helper
  const speakText = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95; // slightly slower and warm for children
      utterance.pitch = 1.2; // friendlier tone
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.debug('TTS not allowed', e);
    }
  };

  const handleStepChange = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep === 1) {
      speakText("Langkah satu: Ayo masukkan koin ke dalam Celengan Kebaikan!");
    } else if (newStep === 2) {
      playKidChime('coin');
      speakText("Langkah dua: Pilih hadiah makanan atau buku untuk teman kita!");
    } else if (newStep === 3) {
      playKidChime('horn');
      speakText("Langkah tiga: Ayo jalankan Mobil Relawan sampai ke posko!");
    } else if (newStep === 4) {
      playKidChime('star');
      speakText("Langkah empat: Beri bintang dan doa terbaik untuk teman kita!");
    } else if (newStep === 5) {
      playKidChime('cheer');
      setShowConfetti(true);
      speakText(`Hore! Selamat ${childName}, kamu resmi jadi Pahlawan Kebaikan Cilik!`);
    }
  };

  // Trigger speak on initial load
  useEffect(() => {
    speakText("Halo Sahabat Cilik! Selamat datang di Petualangan Relawan Cilik!");
  }, []);

  const handleAddCoin = (amount: number) => {
    playKidChime('coin');
    setCoinCount(prev => prev + 1);
    setPiggyCoins(prev => prev + amount);
  };

  const handleDriveTruck = () => {
    playKidChime('horn');
    setTruckHonk(true);
    setTimeout(() => setTruckHonk(false), 800);
    setTruckProgress(prev => Math.min(100, prev + 30));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Friendly Top Header */}
      <div className="bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 p-1 rounded-3xl shadow-lg">
        <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-700 shadow-sm shrink-0">
              <Smile className="w-10 h-10 text-amber-600 animate-bounce" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Kelas Belajar Cilik: Mudah, Ceria & Nyata</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Petualangan Pahlawan Kebaikan Cilik! 🌟
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                Yuk belajar berbagi zakat, menolong teman, dan mengantar bantuan dengan cara yang seru dan menyenangkan!
              </p>
            </div>
          </div>

          {/* Action Tools: Voice Toggle & Back Button */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={() => {
                const next = !speechEnabled;
                setSpeechEnabled(next);
                if (next) speakText("Suara Kakak Relawan aktif!");
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                speechEnabled 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                  : 'bg-stone-100 text-stone-500 border-stone-200'
              }`}
              title="Aktifkan Suara Kakak Relawan"
            >
              {speechEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
              <span>{speechEnabled ? 'Suara: Aktif 🔊' : 'Suara: Mati 🔇'}</span>
            </button>

            <button
              onClick={onBackToMain}
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
            >
              Kembali ke Menu Utama
            </button>
          </div>
        </div>
      </div>

      {/* Fun Stepper Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-3 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {[
            { step: 1, title: '1. Celengan Berkah', icon: Coins, color: 'text-amber-600 bg-amber-100' },
            { step: 2, title: '2. Hadiah Teman', icon: Gift, color: 'text-rose-600 bg-rose-100' },
            { step: 3, title: '3. Mobil Relawan', icon: Truck, color: 'text-blue-600 bg-blue-100' },
            { step: 4, title: '4. Bintang Bahagia', icon: Star, color: 'text-emerald-600 bg-emerald-100' },
            { step: 5, title: '5. Piagam Pahlawan', icon: Award, color: 'text-purple-600 bg-purple-100' },
          ].map((item) => {
            const isCurrent = currentStep === item.step;
            const isDone = currentStep > item.step;
            const Icon = item.icon;

            return (
              <button
                key={item.step}
                onClick={() => handleStepChange(item.step)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-emerald-700 text-white shadow-sm scale-105'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${isCurrent ? 'bg-white/20 text-white' : item.color}`}>
                  {isDone ? <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: CELENGAN KEBAIKAN (Hands-on Coin Dropping) */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Tahap 1: Celengan Kebaikan & Zakat
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Ayo Masukkan Koin Kebaikan ke Dalam Celengan! 🪙
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Zakat dan sedekah itu seperti menabung pahala di sisi Allah Ta'ala. Sedikit uang jajan yang kita tabung dengan ikhlas bisa bikin teman yang lapar jadi kenyang!
            </p>
          </div>

          {/* Hands-on Piggy Bank Interaction Box */}
          <div className="bg-gradient-to-b from-amber-50/60 to-emerald-50/60 rounded-3xl border-2 border-dashed border-amber-300 p-6 sm:p-8 text-center flex flex-col items-center justify-center relative overflow-hidden">
            {/* Animated Piggy Graphic */}
            <div className="relative mb-4 group cursor-pointer" onClick={() => handleAddCoin(5000)}>
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-amber-300 to-amber-100 border-4 border-amber-400 flex flex-col items-center justify-center shadow-lg transition-transform active:scale-95 group-hover:scale-105">
                <span className="text-4xl">🐷</span>
                <span className="text-xs font-black text-amber-900 mt-1">CELENGAN BERKAH</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-white/80 px-2 py-0.5 rounded-full mt-0.5">
                  {coinCount} Koin Masuk!
                </span>
              </div>
              <div className="absolute -top-3 right-0 bg-emerald-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md animate-pulse">
                Klik Koin di Bawah! 👇
              </div>
            </div>

            {/* Total Balance in Piggy */}
            <div className="bg-white/90 backdrop-blur-xs border border-amber-200 px-6 py-3 rounded-2xl shadow-xs mb-6">
              <div className="text-[11px] font-semibold text-stone-500">Jumlah Tabungan Kebaikanmu:</div>
              <div className="text-2xl font-black text-emerald-700">
                Rp {piggyCoins.toLocaleString('id-ID')}
              </div>
              <div className="text-[11px] text-amber-800 font-medium mt-0.5">
                {piggyCoins >= 20000 
                  ? '✨ Alhamdulillah! Celenganmu sudah cukup untuk membeli sepaket makanan bergizi!' 
                  : 'Ayo klik koin di bawah untuk menambah tabunganmu!'}
              </div>
            </div>

            {/* Interactive Coin Buttons (Hands-on Clickables) */}
            <div className="w-full max-w-md grid grid-cols-3 gap-3">
              <button
                onClick={() => handleAddCoin(5000)}
                className="bg-amber-400 hover:bg-amber-300 active:scale-90 text-stone-900 font-extrabold p-3 rounded-2xl shadow-md border-b-4 border-amber-600 transition-all flex flex-col items-center gap-1"
              >
                <span className="text-2xl">🪙</span>
                <span className="text-xs">Koin Senyum</span>
                <span className="text-[11px] text-amber-950 font-black">+Rp 5.000</span>
              </button>

              <button
                onClick={() => handleAddCoin(10000)}
                className="bg-emerald-400 hover:bg-emerald-300 active:scale-90 text-stone-900 font-extrabold p-3 rounded-2xl shadow-md border-b-4 border-emerald-600 transition-all flex flex-col items-center gap-1"
              >
                <span className="text-2xl">💰</span>
                <span className="text-xs">Koin Sayang</span>
                <span className="text-[11px] text-emerald-950 font-black">+Rp 10.000</span>
              </button>

              <button
                onClick={() => handleAddCoin(20000)}
                className="bg-teal-400 hover:bg-teal-300 active:scale-90 text-stone-900 font-extrabold p-3 rounded-2xl shadow-md border-b-4 border-teal-600 transition-all flex flex-col items-center gap-1"
              >
                <span className="text-2xl">🌟</span>
                <span className="text-xs">Koin Berkah</span>
                <span className="text-[11px] text-teal-950 font-black">+Rp 20.000</span>
              </button>
            </div>
          </div>

          {/* Bottom Nav to Next Step */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setCoinCount(0);
                setPiggyCoins(0);
              }}
              className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-700 font-semibold px-3 py-2 rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mulai Ulang Celengan</span>
            </button>

            <button
              onClick={() => handleStepChange(2)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95"
            >
              <span>Lanjut: Pilih Hadiah Teman!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PILIH MISI PAKET BANTUAN (Hands-on Choosing) */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Tahap 2: Misi Paket Hadiah Kebaikan
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Mau Kirim Hadiah Apa untuk Teman Kita Hari Ini? 🎁
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Pilih salah satu paket hadiah di bawah ini. Hadiah ini akan disiapkan oleh tim relawan untuk dibagikan langsung ke tangan teman-teman yang membutuhkan!
            </p>
          </div>

          {/* 3 Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Roti & Susu */}
            <div
              onClick={() => {
                setSelectedGift('roti');
                playKidChime('coin');
                speakText("Kamu memilih Roti Lezat dan Susu Hangat!");
              }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between space-y-3 ${
                selectedGift === 'roti'
                  ? 'border-emerald-500 bg-emerald-50/70 shadow-md scale-102'
                  : 'border-stone-200 bg-stone-50/50 hover:border-amber-300'
              }`}
            >
              {selectedGift === 'roti' && (
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Dipilih</span>
                </div>
              )}
              <div className="space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-3xl">
                  🍞
                </div>
                <h3 className="font-extrabold text-stone-900 text-base">
                  Roti Lezat & Susu Hangat
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Untuk adik-adik di posko bencana yang lapar, supaya perut mereka kenyang dan bisa tersenyum ceria lagi!
                </p>
              </div>
              <div className="pt-2 border-t border-stone-200 text-[11px] font-bold text-emerald-800">
                ⭐ Manfaat: Memberi Kekuatan & Energi
              </div>
            </div>

            {/* Card 2: Tas & Buku */}
            <div
              onClick={() => {
                setSelectedGift('tas');
                playKidChime('coin');
                speakText("Kamu memilih Tas Sekolah Baru dan Buku Gambar!");
              }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between space-y-3 ${
                selectedGift === 'tas'
                  ? 'border-emerald-500 bg-emerald-50/70 shadow-md scale-102'
                  : 'border-stone-200 bg-stone-50/50 hover:border-amber-300'
              }`}
            >
              {selectedGift === 'tas' && (
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Dipilih</span>
                </div>
              )}
              <div className="space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-3xl">
                  🎒
                </div>
                <h3 className="font-extrabold text-stone-900 text-base">
                  Tas Sekolah & Buku Gambar
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Untuk sahabat yatim agar semangat belajar membaca Al-Qur'an dan menggambar cita-cita setinggi langit!
                </p>
              </div>
              <div className="pt-2 border-t border-stone-200 text-[11px] font-bold text-blue-800">
                📚 Manfaat: Bikin Semangat Belajar Pintar
              </div>
            </div>

            {/* Card 3: Air Bersih Segar */}
            <div
              onClick={() => {
                setSelectedGift('air');
                playKidChime('coin');
                speakText("Kamu memilih Air Bersih Segar dan Sehat!");
              }}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between space-y-3 ${
                selectedGift === 'air'
                  ? 'border-emerald-500 bg-emerald-50/70 shadow-md scale-102'
                  : 'border-stone-200 bg-stone-50/50 hover:border-amber-300'
              }`}
            >
              {selectedGift === 'air' && (
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Dipilih</span>
                </div>
              )}
              <div className="space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-3xl">
                  💧
                </div>
                <h3 className="font-extrabold text-stone-900 text-base">
                  Air Bersih Segar & Sehat
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sumur bor air segar di desa pelosok agar teman kita tidak perlu berjalan jauh untuk minum dan berwudhu.
                </p>
              </div>
              <div className="pt-2 border-t border-stone-200 text-[11px] font-bold text-teal-800">
                ✨ Manfaat: Pahala Mengalir Abadi
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => handleStepChange(1)}
              className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold px-4 py-2.5 rounded-xl border border-stone-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <button
              onClick={() => handleStepChange(3)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95"
            >
              <span>Lanjut: Jalankan Mobil Relawan! 🚚</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: JALANKAN MOBIL RELAWAN (Hands-on Truck Simulation) */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Tahap 3: Pelacakan Perjalanan Mobil Relawan
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Ngeeeeng! Ayo Bantu Sopir Relawan Mengantar Paket! 🚚💨
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Di platform Islamicity Relawan, setiap bantuan bisa dilacak secara langsung lho! Tekan tombol klakson gas di bawah untuk memajukan mobil relawan sampai ke rumah teman kita!
            </p>
          </div>

          {/* Hands-on Map & Road Simulation */}
          <div className="bg-gradient-to-r from-emerald-100 via-stone-100 to-amber-100 rounded-3xl border-2 border-stone-300 p-6 sm:p-8 relative overflow-hidden">
            {/* Markers: Start, Mid, Destination */}
            <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-2">
              <div className="flex items-center gap-1 text-emerald-800">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Markas Relawan</span>
              </div>
              <div className="flex items-center gap-1 text-blue-800">
                <span>Posko Logistik</span>
              </div>
              <div className="flex items-center gap-1 text-amber-800">
                <span>Rumah Teman Mustahik 🏠</span>
              </div>
            </div>

            {/* The Road */}
            <div className="w-full bg-stone-300 h-10 rounded-2xl relative flex items-center px-2 shadow-inner border border-stone-400">
              {/* Road dashes */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-white/80 pointer-events-none" />

              {/* The Truck moving with progress */}
              <div 
                className={`absolute transition-all duration-500 ease-out flex flex-col items-center ${truckHonk ? 'scale-125' : 'scale-100'}`}
                style={{ left: `calc(${truckProgress}% - 24px)` }}
              >
                <div className="text-3xl filter drop-shadow-md select-none">
                  🚚
                </div>
                <div className="bg-stone-900 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                  {truckProgress >= 100 ? 'Sampai!' : `${truckProgress}%`}
                </div>
              </div>
            </div>

            {/* Status message */}
            <div className="mt-6 text-center">
              {truckProgress < 100 ? (
                <div className="text-xs font-bold text-stone-700">
                  Mobil sedang melaju di jalan raya... Tekan tombol gas di bawah!
                </div>
              ) : (
                <div className="bg-emerald-600 text-white font-extrabold text-xs sm:text-sm p-3 rounded-2xl shadow-md animate-bounce">
                  🎉 Alhamdulillah! Mobil relawan sudah tiba di rumah sahabat kita dengan selamat!
                </div>
              )}
            </div>

            {/* Big Hands-on Button */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleDriveTruck}
                disabled={truckProgress >= 100}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm shadow-lg transition-all active:scale-95 ${
                  truckProgress >= 100 
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-b-4 border-amber-600'
                }`}
              >
                <span className="text-xl">📢</span>
                <span>Broom... Broom! Majukan Mobil! (+30%)</span>
              </button>

              {truckProgress >= 100 && (
                <button
                  onClick={() => setTruckProgress(10)}
                  className="text-xs font-bold text-stone-600 hover:text-stone-900 bg-white/80 px-3 py-2 rounded-xl border border-stone-300"
                >
                  Ulangi Perjalanan 🔄
                </button>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => handleStepChange(2)}
              className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold px-4 py-2.5 rounded-xl border border-stone-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <button
              onClick={() => handleStepChange(4)}
              disabled={truckProgress < 100}
              className={`flex items-center gap-2 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all ${
                truckProgress >= 100
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <span>Lanjut: Beri Bintang & Doa! ⭐</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: BINTANG & DOA SENYUMAN (Community Verification for Kids) */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Tahap 4: Verifikasi Kebaikan & Doa Ceria
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Lihat, Sahabat Kita Tersenyum Bahagia! 😊
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Di Islamicity Relawan, semua orang boleh memeriksa dan memberi bintang jempol kalau bantuan sudah diterima dengan jujur dan amanah.
            </p>
          </div>

          {/* Hands-on Sticking Star & Message */}
          <div className="bg-gradient-to-b from-emerald-50 to-stone-50 rounded-3xl border border-emerald-200 p-6 sm:p-8 max-w-xl mx-auto space-y-6">
            {/* Photo Card simulation */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-amber-100 flex items-center justify-center text-4xl shrink-0">
                👧👦
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                  Paket Diterima Hari Ini
                </div>
                <div className="font-extrabold text-stone-900 text-sm">
                  Adik Fatimah & Teman-Teman
                </div>
                <div className="text-xs text-stone-500">
                  "Terima kasih kakak baik! Rotinya manis sekali dan buku gambarnya sangat bagus!"
                </div>
              </div>
            </div>

            {/* Clickable Star Rating (Hands-on) */}
            <div className="text-center space-y-2">
              <div className="text-xs font-bold text-stone-700">
                Berapa bintang jempol untuk tim relawan kita?
              </div>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setStarRating(star);
                      playKidChime('star');
                    }}
                    className="p-1 text-3xl transition-transform hover:scale-125 active:scale-95"
                  >
                    {star <= starRating ? '⭐' : '🤍'}
                  </button>
                ))}
              </div>
              <div className="text-xs font-black text-amber-700">
                {starRating} Bintang Kebaikan Sempurna!
              </div>
            </div>

            {/* Clickable Sticker Message */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-700 text-center">
                Pilih Stiker Doa untuk Teman Kita:
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { text: 'Senyum Bahagia', icon: '😊' },
                  { text: 'Semoga Berkah', icon: '🤲' },
                  { text: 'Sayang Selalu', icon: '💖' },
                ].map((stk) => (
                  <button
                    key={stk.text}
                    onClick={() => {
                      setChosenSticker(stk.text);
                      playKidChime('star');
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      chosenSticker === stk.text
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-105'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-xl">{stk.icon}</span>
                    <span>{stk.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => handleStepChange(3)}
              className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold px-4 py-2.5 rounded-xl border border-stone-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <button
              onClick={() => handleStepChange(5)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95"
            >
              <span>Lanjut: Dapatkan Piagam Pahlawan! 🏆</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: PIAGAM PAHLAWAN RELAWAN CILIK (Certification & Graduation) */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
              <PartyPopper className="w-4 h-4 text-amber-600" />
              <span>Selamat! Misi Kebaikan Berhasil</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Piagam Pahlawan Kebaikan Cilik 🏆
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Ketik nama panggilanmu di bawah untuk dicetak di piagam kehormatan relawan amanah!
            </p>
          </div>

          {/* Child Name Input */}
          <div className="max-w-xs mx-auto flex items-center gap-2 bg-stone-50 border-2 border-amber-300 p-2 rounded-2xl shadow-inner">
            <span className="text-xl pl-2">✍️</span>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Ketik namamu di sini..."
              className="bg-transparent text-sm font-extrabold text-stone-900 focus:outline-none w-full"
            />
          </div>

          {/* The Certificate Canvas Design */}
          <div className="max-w-xl mx-auto bg-gradient-to-br from-amber-50 via-white to-emerald-50 border-4 border-amber-400 p-6 sm:p-8 rounded-3xl shadow-xl relative text-center space-y-4">
            <div className="absolute top-4 left-4 text-2xl">🌟</div>
            <div className="absolute top-4 right-4 text-2xl">🌟</div>
            <div className="absolute bottom-4 left-4 text-2xl">🌟</div>
            <div className="absolute bottom-4 right-4 text-2xl">🌟</div>

            <div className="text-xs font-black tracking-widest text-emerald-900 uppercase">
              ISLAMICITY RELAWAN JUNIOR
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-stone-900 font-serif">
              PIAGAM PENGHARGAAN
            </h3>

            <p className="text-xs text-stone-500">
              Diberikan dengan penuh rasa bangga dan cinta kepada:
            </p>

            <div className="text-2xl sm:text-3xl font-black text-emerald-800 border-b-2 border-dashed border-amber-400 pb-2 inline-block px-8">
              {childName || 'Sahabat Cilik'}
            </div>

            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              Atas ketulusan hati belajar menabung zakat, memilih hadiah teman, mengantar bantuan relawan, dan menebarkan senyum kebaikan lillahi Ta'ala.
            </p>

            {/* Stamp & Badge */}
            <div className="pt-2 flex items-center justify-around">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-amber-400 text-stone-950 font-black text-xs flex flex-col items-center justify-center border-2 border-amber-600 shadow-md mx-auto">
                  <Award className="w-6 h-6 text-stone-950" />
                  <span className="text-[8px] font-black">RESMI</span>
                </div>
                <span className="text-[10px] font-bold text-stone-600 mt-1 block">Lencana Bintang</span>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-700 text-white font-black text-xs flex flex-col items-center justify-center border-2 border-emerald-900 shadow-md mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-amber-300" />
                  <span className="text-[8px] font-black">AMANAH</span>
                </div>
                <span className="text-[10px] font-bold text-stone-600 mt-1 block">Relawan Jujur</span>
              </div>
            </div>
          </div>

          {/* Action to Print or Celebrate */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md transition-all active:scale-95"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Cetak Piagam Pahlawan Cilik 🖨️</span>
            </button>

            <button
              onClick={() => {
                handleStepChange(1);
                setCoinCount(0);
                setPiggyCoins(0);
                setTruckProgress(10);
              }}
              className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs px-5 py-3 rounded-2xl transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Mainkan Lagi Dari Awal 🔄</span>
            </button>
          </div>

          {/* Call To Action for Parents / Family */}
          <div className="bg-emerald-950 text-white p-6 rounded-3xl mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs font-bold text-emerald-400 uppercase">
                Ajak Ayah & Bunda Berbagi Sungguhan!
              </div>
              <p className="text-xs text-stone-300">
                Kamu sudah tahu caranya! Sekarang yuk ajak Ayah dan Bunda menyalurkan zakat atau berdonasi di program resmi Islamicity Relawan.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onGoToCampaigns}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all"
              >
                Lihat Program Kebaikan
              </button>
              <button
                onClick={onGoToZakat}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all"
              >
                Tunaikan Zakat Keluarga
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bonus Interactive Mini-Quiz: Kuis Pahlawan Cilik */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-black text-amber-800 uppercase">
          <ThumbsUp className="w-4 h-4 text-amber-600" />
          <span>Tebak Kebaikan Cilik (Kuis Singkat)</span>
        </div>
        <h3 className="text-sm font-extrabold text-stone-900">
          Pertanyaan: Jika ada teman yang terjatuh atau tidak punya bekal makanan, apa yang harus kita lakukan?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => {
              setQuizAnswer(1);
              playKidChime('star');
              speakText("Hebat sekali! Menolong dan berbagi bekal adalah perbuatan yang sangat dicintai Allah Ta'ala!");
            }}
            className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all flex items-center gap-3 ${
              quizAnswer === 1
                ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-xs'
                : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800'
            }`}
          >
            <span className="text-2xl">💖</span>
            <div>
              <div className="font-extrabold">A. Membantu berdiri & berbagi bekal dengan senyum</div>
              <div className="text-[10px] text-emerald-800 font-semibold">Jawaban Pahlawan Kebaikan!</div>
            </div>
          </button>

          <button
            onClick={() => {
              setQuizAnswer(2);
              speakText("Wah, pura-pura tidak tahu itu kurang baik ya. Yuk jadi anak baik yang suka menolong!");
            }}
            className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all flex items-center gap-3 ${
              quizAnswer === 2
                ? 'bg-rose-100 border-rose-400 text-rose-950 shadow-xs'
                : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800'
            }`}
          >
            <span className="text-2xl">🙈</span>
            <div>
              <div className="font-extrabold">B. Pura-pura tidak lihat dan pergi bermain</div>
              <div className="text-[10px] text-stone-500">Bukan sikap pahlawan relawan</div>
            </div>
          </button>
        </div>

        {quizAnswer === 1 && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Pintar sekali! Rasulullah bersabda: "Senyummu di hadapan saudaramu adalah sedekah bagimu." (HR. Tirmidzi)</span>
          </div>
        )}
      </div>
    </div>
  );
};
