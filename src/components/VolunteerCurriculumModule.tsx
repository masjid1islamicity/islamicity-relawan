import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  X,
  Flame,
  RotateCcw,
  FileText,
  Trophy,
  HeartHandshake,
  Heart,
  Search,
  Filter,
  Download,
  Printer,
  Share2,
  ExternalLink,
  AlertCircle,
  ThumbsUp,
  Play,
  Lock,
  Calendar,
  BadgeCheck,
  UserCheck,
  Hash,
  QrCode,
  Volume2,
  Scale,
  AlertTriangle,
  Zap,
  HelpCircle
} from 'lucide-react';
import { 
  VolunteerCourseModule, 
  VolunteerCourseProgress, 
  VolunteerProfile, 
  VolunteerBadge, 
  NotificationItem 
} from '../types';
import { VOLUNTEER_CURRICULUM_MODULES } from '../data/curriculumData';
import { formatNumber } from '../utils/formatters';

interface VolunteerCurriculumModuleProps {
  profiles: VolunteerProfile[];
  currentProfileId?: string;
  onUpdateVolunteerXP: (profileId: string, xpEarned: number, unlockedBadge?: VolunteerBadge, courseTitle?: string) => void;
  onNotificationTrigger?: (notification: NotificationItem) => void;
  onNavigateToProfile?: () => void;
}

export const VolunteerCurriculumModule: React.FC<VolunteerCurriculumModuleProps> = ({
  profiles,
  currentProfileId,
  onUpdateVolunteerXP,
  onNotificationTrigger,
  onNavigateToProfile
}) => {
  // Selected volunteer profile
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    currentProfileId || profiles[0]?.id || 'vol-1'
  );

  // Active module being viewed/studied (null = module catalog view)
  const [activeModule, setActiveModule] = useState<VolunteerCourseModule | null>(null);

  // Current lesson index inside active module (or 'quiz' if taking quiz)
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number; percentage: number; passed: boolean } | null>(null);

  // Curriculum progress stored in state + localStorage
  const [moduleProgress, setModuleProgress] = useState<Record<string, VolunteerCourseProgress>>(() => {
    try {
      const saved = localStorage.getItem('islamicity_curriculum_progress');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default initial mock progress for demo richness
    return {
      'mod-etika-01': {
        moduleId: 'mod-etika-01',
        completed: true,
        score: 100,
        completedAt: '16 September 2026',
        xpEarned: 250,
        certificateCode: 'CERT-REL-2026-ETH01'
      }
    };
  });

  // Level-up celebration modal
  const [levelUpData, setLevelUpData] = useState<{
    newLevel: number;
    newLevelName: string;
    earnedXp: number;
    badgeName?: string;
  } | null>(null);

  // Certificate modal
  const [viewingCertificateModule, setViewingCertificateModule] = useState<VolunteerCourseModule | null>(null);

  // Filter & Search
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(prev => (prev === msg ? null : prev));
    }, 5000);
  };

  // Find active profile
  const activeProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0];

  // Save progress to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('islamicity_curriculum_progress', JSON.stringify(moduleProgress));
    } catch (e) {
      console.warn('Could not save curriculum progress to localStorage', e);
    }
  }, [moduleProgress]);

  // Audio chime simulation on quiz complete
  const playIslamicChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (harmonious chord)
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.2);
      });
    } catch {
      // ignore
    }
  };

  // Start a module
  const handleOpenModule = (module: VolunteerCourseModule) => {
    setActiveModule(module);
    setCurrentLessonIndex(0);
    setIsQuizMode(false);
    setQuizFinished(false);
    setQuizScore(null);
    setSelectedAnswers({});
    setSubmittedQuestions({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start quiz inside active module
  const handleStartQuiz = () => {
    setIsQuizMode(true);
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    setQuizScore(null);
    setSelectedAnswers({});
    setSubmittedQuestions({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct start exam quiz for competency test
  const handleDirectStartExam = (module: VolunteerCourseModule) => {
    setActiveModule(module);
    setCurrentLessonIndex(0);
    setIsQuizMode(true);
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    setQuizScore(null);
    setSelectedAnswers({});
    setSubmittedQuestions({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select quiz option
  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (submittedQuestions[questionId]) return; // already submitted
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Submit single question answer to see immediate syariah explanation
  const handleSubmitSingleQuestion = (questionId: string) => {
    if (selectedAnswers[questionId] === undefined) {
      showToast('⚠️ Silakan pilih salah satu jawaban terlebih dahulu.');
      return;
    }
    setSubmittedQuestions(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  // Finalize quiz and award XP
  const handleFinishQuiz = () => {
    if (!activeModule) return;

    let correctCount = 0;
    activeModule.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });

    const totalQuestions = activeModule.quiz.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passingThreshold = activeModule.passingScorePercentage || 65;
    const passed = percentage >= passingThreshold;

    setQuizScore({
      correct: correctCount,
      total: totalQuestions,
      percentage,
      passed
    });
    setQuizFinished(true);

    if (passed) {
      playIslamicChime();
      const xpToAward = activeModule.xpReward;
      const isFirstTime = !moduleProgress[activeModule.id]?.completed;

      // Update module progress
      const certCode = `CERT-${activeModule.code}-${Date.now().toString().slice(-6)}`;
      setModuleProgress(prev => ({
        ...prev,
        [activeModule.id]: {
          moduleId: activeModule.id,
          completed: true,
          score: percentage,
          completedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          xpEarned: xpToAward,
          certificateCode: certCode
        }
      }));

      // If unlocked badge
      let newBadge: VolunteerBadge | undefined = undefined;
      if (activeModule.badgeReward) {
        newBadge = {
          id: `badge-${activeModule.id}-${Date.now()}`,
          name: activeModule.badgeReward.name,
          category: 'kehormatan',
          level: activeModule.badgeReward.level,
          icon: activeModule.badgeReward.icon,
          description: activeModule.badgeReward.description,
          earnedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          isUnlocked: true,
          criteria: `Lulus 100% Uji Kompetensi ${activeModule.title}`,
          verificationHash: `0x${Math.random().toString(16).substring(2, 10)}...syr`
        };
      }

      // Check level up calculation
      const currentXp = activeProfile.volunteerLevel.xp;
      const nextLevelXp = activeProfile.volunteerLevel.nextLevelXp;
      const currentLevel = activeProfile.volunteerLevel.currentLevel;
      const resultingXp = currentXp + (isFirstTime ? xpToAward : 50);

      if (resultingXp >= nextLevelXp) {
        const nextLevelNumber = currentLevel + 1;
        const levelNames = [
          'Relawan Pemula (Mutathawwi\' Mubtadi\')',
          'Relawan Terampil (Khadimul Ummat)',
          'Relawan Teladan Syariah (Mujahid Ijtima\'i)',
          'Murabbi Relawan Lapangan',
          'Ustadz Pembina & Inisiator Peradaban Islam'
        ];
        const newLevelName = levelNames[Math.min(nextLevelNumber - 1, levelNames.length - 1)];

        setLevelUpData({
          newLevel: nextLevelNumber,
          newLevelName,
          earnedXp: xpToAward,
          badgeName: newBadge?.name
        });
      }

      // Call parent handler to update profile in App state
      onUpdateVolunteerXP(selectedProfileId, isFirstTime ? xpToAward : 50, newBadge, activeModule.title);

      // Trigger notification item
      if (onNotificationTrigger) {
        onNotificationTrigger({
          id: `curriculum-pass-${Date.now()}`,
          type: 'verifikasi',
          title: `🎓 Lulus Modul: ${activeModule.title}`,
          message: `Selamat! ${activeProfile.name} telah menyelesaikan uji kompetensi ${activeModule.code} dengan skor ${percentage}%. Mendapatkan +${xpToAward} XP dan Sertifikat Syariah.`,
          timeAgo: 'Baru saja',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          read: false,
          channel: 'push',
          linkToTab: 'volunteer-profile'
        });
      }

      showToast(`🎉 Alhamdulillah! Anda lulus modul dengan skor ${percentage}% (+${xpToAward} XP)!`);
    } else {
      showToast(`⚠️ Skor Anda ${percentage}%. Nilai kelulusan minimal 65%. Silakan tinjau kembali materi dan ulangi kuis.`);
    }
  };

  // Reset quiz to retry
  const handleRetryQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuestions({});
    setQuizFinished(false);
    setQuizScore(null);
    setCurrentQuestionIndex(0);
  };

  // Filtered module list
  const filteredModules = VOLUNTEER_CURRICULUM_MODULES.filter(m => {
    const matchesCat = categoryFilter === 'all' || m.category === categoryFilter;
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Calculate overall stats
  const totalModulesCount = VOLUNTEER_CURRICULUM_MODULES.length;
  const progressList = Object.values(moduleProgress) as VolunteerCourseProgress[];
  const completedCount = progressList.filter(p => p.completed).length;
  const totalCurriculumXpEarned: number = progressList.reduce((acc: number, p: VolunteerCourseProgress) => acc + (p.xpEarned || 0), 0);
  const completionPercentage = Math.round((completedCount / totalModulesCount) * 100);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-4 z-50 bg-stone-950 text-white border border-emerald-500 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="text-stone-400 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Banner: Kurikulum Relawan & XP Profile Hub */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0 border-2 border-amber-300">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 uppercase tracking-widest bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full mb-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Akademi Syariah & Manajemen Sosial Relawan</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Kurikulum Relawan & Sertifikasi Syariah
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mt-1 leading-relaxed">
                Pelajari seri modul manajemen posko, etika pendampingan mustahik, fiqh ZISWAF, dan akuntabilitas terbuka. Kerjakan kuis interaktif, raih poin XP, dan naikkan level akreditasi di portofolio relawan Anda.
              </p>
            </div>
          </div>

          {/* Profile Switcher & Level Progress Box */}
          <div className="w-full lg:w-auto bg-stone-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-inner shrink-0 min-w-[290px]">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[11px] font-bold text-stone-400">Relawan Belajar:</span>
              <select
                value={selectedProfileId}
                onChange={(e) => setSelectedProfileId(e.target.value)}
                className="text-xs font-black text-amber-300 bg-stone-800 border border-stone-700 rounded-lg px-2.5 py-1 outline-none focus:border-amber-400 cursor-pointer"
              >
                {profiles.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level & XP Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-black text-white">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-[10px] font-black">
                    {activeProfile.volunteerLevel.currentLevel}
                  </span>
                  <span className="text-amber-200">{activeProfile.volunteerLevel.levelName}</span>
                </div>
                <span className="font-extrabold text-emerald-400">
                  {formatNumber(activeProfile.volunteerLevel.xp)} XP
                </span>
              </div>

              {/* Progress to next level */}
              <div className="w-full bg-stone-800 rounded-full h-2.5 overflow-hidden border border-stone-700">
                <div 
                  className="bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round((activeProfile.volunteerLevel.xp / activeProfile.volunteerLevel.nextLevelXp) * 100))}%`
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-stone-400">
                <span>Target Level Berikutnya:</span>
                <span className="font-bold text-stone-300">
                  {formatNumber(activeProfile.volunteerLevel.nextLevelXp - activeProfile.volunteerLevel.xp)} XP lagi
                </span>
              </div>
            </div>

            {onNavigateToProfile && (
              <button
                onClick={onNavigateToProfile}
                className="w-full mt-3 px-3 py-1.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-emerald-500/40"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Buka Portofolio Profil Relawan</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Highlights / Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-emerald-900/60">
          <div className="bg-stone-900/60 rounded-xl p-3 border border-emerald-500/20">
            <div className="text-[11px] font-semibold text-stone-400 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Modul Tersedia</span>
            </div>
            <div className="text-lg font-black text-white mt-0.5">{totalModulesCount} Modul Syariah</div>
          </div>
          <div className="bg-stone-900/60 rounded-xl p-3 border border-emerald-500/20">
            <div className="text-[11px] font-semibold text-stone-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Tuntas Dipelajari</span>
            </div>
            <div className="text-lg font-black text-amber-300 mt-0.5">
              {completedCount} / {totalModulesCount} ({completionPercentage}%)
            </div>
          </div>
          <div className="bg-stone-900/60 rounded-xl p-3 border border-emerald-500/20">
            <div className="text-[11px] font-semibold text-stone-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Total XP Akademi</span>
            </div>
            <div className="text-lg font-black text-emerald-300 mt-0.5">
              +{formatNumber(totalCurriculumXpEarned)} XP
            </div>
          </div>
          <div className="bg-stone-900/60 rounded-xl p-3 border border-emerald-500/20">
            <div className="text-[11px] font-semibold text-stone-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sertifikat Terbit</span>
            </div>
            <div className="text-lg font-black text-white mt-0.5">{completedCount} Syahadah</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: ACTIVE MODULE DETAIL & STUDY VIEWER */}
      {/* ========================================================= */}
      {activeModule ? (
        <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
          {/* Back to Catalog button */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-stone-200">
            <button
              onClick={() => setActiveModule(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-emerald-700 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali ke Katalog Modul</span>
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${activeModule.colorScheme.badgeBg}`}>
                {activeModule.categoryLabel}
              </span>
              <span className="text-[11px] font-extrabold bg-stone-100 text-stone-800 px-2.5 py-1 rounded-full">
                {activeModule.code}
              </span>
              <span className="text-[11px] font-black bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>+{activeModule.xpReward} XP</span>
              </span>
            </div>
          </div>

          {/* Module Title Header */}
          <div className="bg-gradient-to-br from-stone-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-stone-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-1">
                  Modul Level {activeModule.level} • {activeModule.durationMinutes} Menit Pembelajaran
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {activeModule.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-3xl leading-relaxed">
                  {activeModule.subtitle}
                </p>
              </div>

              {moduleProgress[activeModule.id]?.completed && (
                <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-3.5 flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-stone-950 font-black flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-300">Modul Ini Telah Lulus!</div>
                    <div className="text-[11px] text-stone-300">Skor Kuis: {moduleProgress[activeModule.id].score}%</div>
                    <button
                      onClick={() => setViewingCertificateModule(activeModule)}
                      className="text-[11px] font-extrabold text-amber-300 hover:text-amber-200 underline mt-0.5 cursor-pointer block"
                    >
                      Lihat Syahadah Kelulusan 📜
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper tabs: Lessons and Quiz */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-stone-800 overflow-x-auto pb-1">
              {activeModule.lessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setIsQuizMode(false);
                    setCurrentLessonIndex(idx);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                    !isQuizMode && currentLessonIndex === idx
                      ? 'bg-amber-400 text-stone-950 shadow-md scale-102'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  <span>Pelajaran {idx + 1}</span>
                  <Clock className="w-3 h-3 opacity-70" />
                </button>
              ))}

              <button
                onClick={handleStartQuiz}
                className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                  isQuizMode
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-emerald-700/80 text-white hover:bg-emerald-600'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                <span>Kuis Uji Kompetensi (+{activeModule.xpReward} XP)</span>
              </button>
            </div>
          </div>

          {/* SUB-VIEW A: READING LESSON */}
          {!isQuizMode && (
            <div className="space-y-6">
              {/* Lesson Card */}
              {(() => {
                const lesson = activeModule.lessons[currentLessonIndex];
                if (!lesson) return null;

                return (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Lesson Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
                      <div>
                        <div className="text-xs font-bold text-emerald-800">
                          Pelajaran {currentLessonIndex + 1} dari {activeModule.lessons.length}
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-stone-900">
                          {lesson.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Estimasi Baca: {lesson.durationMinutes} Menit</span>
                      </div>
                    </div>

                    {/* Quran / Hadith Dalil Highlight Box */}
                    {lesson.quranHadithRef && (
                      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-2xl p-5 border border-emerald-500/30 shadow-md space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                            <span>Landasan Dalil Al-Qur’an & As-Sunnah</span>
                          </span>
                          <span className="text-xs font-bold text-stone-300 bg-stone-800 px-2.5 py-0.5 rounded-full">
                            {lesson.quranHadithRef.source}
                          </span>
                        </div>

                        {lesson.quranHadithRef.arabic && (
                          <div className="text-right text-lg sm:text-xl font-serif text-amber-200 font-bold leading-loose tracking-wide py-1">
                            {lesson.quranHadithRef.arabic}
                          </div>
                        )}

                        <div className="text-xs sm:text-sm text-stone-200 italic leading-relaxed border-l-2 border-amber-400 pl-3">
                          "{lesson.quranHadithRef.translation}"
                        </div>
                      </div>
                    )}

                    {/* Lesson Body Paragraphs */}
                    <div className="prose max-w-none text-stone-800 space-y-3.5 text-sm sm:text-base leading-relaxed">
                      {lesson.content.map((p, pIdx) => (
                        <p key={pIdx} className="text-stone-700 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Key Takeaways */}
                    {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-2.5">
                        <div className="text-xs font-black text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Poin Kunci Yang Wajib Diingat Relawan:</span>
                        </div>
                        <ul className="space-y-1.5">
                          {lesson.keyTakeaways.map((point, ptIdx) => (
                            <li key={ptIdx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Case Study / Real Scenario Box */}
                    {lesson.caseStudy && (
                      <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 sm:p-5 space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-amber-700" />
                            <span>Studi Kasus Lapangan: Dilema Etika Nyata</span>
                          </span>
                          <span className="text-[11px] font-black text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
                            {lesson.caseStudy.ethicalPrinciple}
                          </span>
                        </div>

                        <div className="bg-white rounded-xl p-3.5 border border-amber-200 text-xs sm:text-sm text-stone-800">
                          <div className="font-extrabold text-stone-900 mb-1">📍 Skenario Lapangan:</div>
                          <p className="text-stone-700 leading-relaxed">{lesson.caseStudy.scenario}</p>
                        </div>

                        <div className="bg-emerald-900 text-white rounded-xl p-3.5 text-xs sm:text-sm">
                          <div className="font-black text-amber-300 mb-1 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Solusi Berprinsip Syariah:</span>
                          </div>
                          <p className="text-stone-200 leading-relaxed">{lesson.caseStudy.solution}</p>
                        </div>
                      </div>
                    )}

                    {/* Lesson Navigation Bottom Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-stone-200 gap-3">
                      <button
                        disabled={currentLessonIndex === 0}
                        onClick={() => setCurrentLessonIndex(prev => Math.max(0, prev - 1))}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          currentLessonIndex === 0
                            ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                        }`}
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Pelajaran Sebelumnya</span>
                      </button>

                      {currentLessonIndex < activeModule.lessons.length - 1 ? (
                        <button
                          onClick={() => setCurrentLessonIndex(prev => prev + 1)}
                          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                        >
                          <span>Pelajaran Selanjutnya</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={handleStartQuiz}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs font-black flex items-center gap-2 shadow-md transition-all cursor-pointer"
                        >
                          <Trophy className="w-4 h-4 text-stone-950" />
                          <span>Lanjut ke Kuis Interaktif (+{activeModule.xpReward} XP)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SUB-VIEW B: INTERACTIVE QUIZ & XP GAIN */}
          {isQuizMode && (
            <div className="space-y-6">
              {/* Quiz Summary Result if Finished */}
              {quizFinished && quizScore ? (
                <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 text-center space-y-5 border-2 border-emerald-500/50 shadow-xl animate-in zoom-in-95 duration-300">
                  <div className="w-18 h-18 mx-auto rounded-3xl bg-amber-400 text-stone-950 flex items-center justify-center text-3xl font-black shadow-lg">
                    {quizScore.passed ? '🏆' : '📚'}
                  </div>

                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
                      Hasil Uji Kompetensi Syariah
                    </span>
                    <h3 className="text-2xl font-black text-white mt-2">
                      {quizScore.passed
                        ? (activeModule.isCompetencyExam ? 'Mabruk! Anda Lulus Uji Kompetensi Syariah Tingkat Lanjut!' : 'Alhamdulillah, Anda Lulus Uji Kompetensi!')
                        : 'Belum Mencapai Batas Kelulusan'}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto mt-1">
                      {quizScore.passed
                        ? `Selamat! Anda berhasil menyelesaikan ${quizScore.correct} dari ${quizScore.total} pertanyaan dengan benar (${quizScore.percentage}%). ${activeModule.isCompetencyExam ? 'Lencana Kehormatan Tingkat Lanjut dan Poin +500 XP resmi dianugerahkan ke portofolio relawan Anda!' : 'Poin XP dan Syahadah resmi telah ditambahkan ke portofolio relawan Anda.'}`
                        : `Anda menjawab ${quizScore.correct} dari ${quizScore.total} pertanyaan dengan benar (${quizScore.percentage}%). Batas minimal kelulusan ${activeModule.isCompetencyExam ? 'Uji Kompetensi Syariah' : 'modul ini'} adalah ${activeModule.passingScorePercentage || 65}%. Silakan telaah kembali dalil syariah dan ulangi kuis.`}
                    </p>
                  </div>

                  {/* If Passed & Has Badge Reward: Show Unlocked Badge Celebration */}
                  {quizScore.passed && activeModule.badgeReward && (
                    <div className="bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-emerald-500/20 border-2 border-amber-400/60 rounded-3xl p-5 max-w-xl mx-auto text-center space-y-2.5">
                      <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 bg-stone-950/70 border border-amber-400/40 px-3.5 py-1 rounded-full uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{activeModule.isCompetencyExam ? '🎖️ Lencana Tingkat Lanjut Terbuka' : 'Lencana Akreditasi Terbuka'}</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shadow-md">
                          <ShieldCheck className="w-7 h-7" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-base font-black text-amber-300 leading-snug">
                            {activeModule.badgeReward.name}
                          </h4>
                          <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded">
                            Tingkat {activeModule.badgeReward.level.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed max-w-md mx-auto">
                        {activeModule.badgeReward.description}
                      </p>
                    </div>
                  )}

                  {/* Score & Rewards Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-left">
                    <div className="bg-stone-800 rounded-2xl p-4 border border-stone-700">
                      <div className="text-[11px] font-bold text-stone-400">Skor Akhir:</div>
                      <div className="text-2xl font-black text-amber-400 mt-0.5">{quizScore.percentage}%</div>
                      <div className="text-[10px] text-stone-400 mt-1">Benar: {quizScore.correct}/{quizScore.total}</div>
                    </div>

                    <div className="bg-stone-800 rounded-2xl p-4 border border-stone-700">
                      <div className="text-[11px] font-bold text-stone-400">Poin XP Diperoleh:</div>
                      <div className="text-2xl font-black text-emerald-400 mt-0.5">
                        {quizScore.passed ? `+${activeModule.xpReward}` : '+0'} XP
                      </div>
                      <div className="text-[10px] text-stone-400 mt-1">Level {activeProfile.name}</div>
                    </div>

                    <div className="bg-stone-800 rounded-2xl p-4 border border-stone-700">
                      <div className="text-[11px] font-bold text-stone-400">Status Syahadah:</div>
                      <div className="text-sm font-black text-white mt-1">
                        {quizScore.passed ? 'Terbit & Terverifikasi' : 'Tertunda'}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-1">Kode: {activeModule.code}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {quizScore.passed && (
                      <button
                        onClick={() => setViewingCertificateModule(activeModule)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-stone-950" />
                        <span>Buka & Unduh Syahadah Kelulusan</span>
                      </button>
                    )}

                    <button
                      onClick={handleRetryQuiz}
                      className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-stone-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-stone-300" />
                      <span>Ulangi Kuis</span>
                    </button>

                    <button
                      onClick={() => setActiveModule(null)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Selesai & Ke Modul Lain</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Quiz Taking Process */
                <div className="space-y-6">
                  {/* Question Progress Header */}
                  <div className="flex items-center justify-between text-xs text-stone-600 pb-2 border-b border-stone-200">
                    <div className="flex items-center gap-2 flex-wrap">
                      {activeModule.isCompetencyExam ? (
                        <span className="bg-purple-100 text-purple-900 border border-purple-200 font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Scale className="w-3 h-3 text-purple-700" />
                          <span>Uji Kasus Syariah</span>
                        </span>
                      ) : null}
                      <span className="font-extrabold text-stone-900">
                        Pertanyaan {currentQuestionIndex + 1} dari {activeModule.quiz.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-stone-500 hidden sm:inline">
                        Ambang Lulus: <strong className="text-emerald-700">{activeModule.passingScorePercentage || 65}%</strong>
                      </span>
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {activeModule.code}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.round(((currentQuestionIndex + 1) / activeModule.quiz.length) * 100)}%`
                      }}
                    />
                  </div>

                  {/* Current Question Body */}
                  {(() => {
                    const currentQ = activeModule.quiz[currentQuestionIndex];
                    if (!currentQ) return null;

                    const isSubmitted = submittedQuestions[currentQ.id];
                    const selectedIdx = selectedAnswers[currentQ.id];
                    const isCorrect = selectedIdx === currentQ.correctOptionIndex;

                    return (
                      <div className="space-y-5 animate-in fade-in duration-200">
                        {/* Scenario Context if exists */}
                        {currentQ.scenarioContext && (
                          <div className="bg-gradient-to-r from-amber-50/90 via-stone-50 to-purple-50/50 border border-amber-300/80 rounded-2xl p-4 text-xs text-stone-800 shadow-2xs space-y-2">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="inline-flex items-center gap-1.5 font-black text-[10px] uppercase tracking-wider bg-amber-200/90 text-amber-950 px-2.5 py-0.5 rounded-full border border-amber-300">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-800" />
                                <span>Skenario Kasus Lapangan #{currentQuestionIndex + 1}</span>
                              </span>
                              {activeModule.isCompetencyExam && (
                                <span className="text-[10px] font-bold text-purple-900 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <Scale className="w-3 h-3 text-purple-700" />
                                  <span>Dilema Pertimbangan Fikih & Etika</span>
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-[13px] text-stone-800 leading-relaxed font-medium pl-1">
                              {currentQ.scenarioContext}
                            </p>
                          </div>
                        )}

                        {/* Question Prompt */}
                        <div className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                          {currentQ.question}
                        </div>

                        {/* Multiple Choice Options */}
                        <div className="space-y-2.5">
                          {currentQ.options.map((opt, optIdx) => {
                            const isChosen = selectedIdx === optIdx;
                            let optionClass = 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800';

                            if (isSubmitted) {
                              if (optIdx === currentQ.correctOptionIndex) {
                                optionClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                              } else if (isChosen && !isCorrect) {
                                optionClass = 'bg-rose-100 border-rose-400 text-rose-950 line-through';
                              } else {
                                optionClass = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                              }
                            } else if (isChosen) {
                              optionClass = 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-500 font-bold';
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={isSubmitted}
                                onClick={() => handleSelectAnswer(currentQ.id, optIdx)}
                                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${optionClass}`}
                              >
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                                  isChosen ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-700'
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className="text-xs sm:text-sm leading-relaxed">{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Action: Check Answer */}
                        {!isSubmitted ? (
                          <div className="pt-2">
                            <button
                              onClick={() => handleSubmitSingleQuestion(currentQ.id)}
                              disabled={selectedIdx === undefined}
                              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                                selectedIdx === undefined
                                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                  : 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm'
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Kunci & Periksa Jawaban</span>
                            </button>
                          </div>
                        ) : (
                          /* Explanation box upon submit */
                          <div className={`p-4 rounded-2xl border space-y-2 animate-in fade-in duration-300 ${
                            isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
                          }`}>
                            <div className="flex items-center gap-2 font-black text-xs">
                              {isCorrect ? (
                                <span className="text-emerald-800 flex items-center gap-1">
                                  <Check className="w-4 h-4 text-emerald-600" />
                                  <span>Jawaban Anda Tepat!</span>
                                </span>
                              ) : (
                                <span className="text-rose-800 flex items-center gap-1">
                                  <X className="w-4 h-4 text-rose-600" />
                                  <span>Jawaban Belum Tepat</span>
                                </span>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                              {currentQ.explanation}
                            </p>

                            <div className="text-[11px] font-bold text-stone-600 bg-white/80 p-2.5 rounded-xl border border-stone-200">
                              📖 <strong>Dalil Syariah:</strong> {currentQ.dalilSyariah}
                            </div>
                          </div>
                        )}

                        {/* Stepper buttons (Next question / Finish quiz) */}
                        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                          <button
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer ${
                              currentQuestionIndex === 0
                                ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400'
                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                            }`}
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>Sebelumnya</span>
                          </button>

                          {currentQuestionIndex < activeModule.quiz.length - 1 ? (
                            <button
                              disabled={!isSubmitted}
                              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                isSubmitted
                                  ? 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-xs'
                                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                              }`}
                            >
                              <span>Pertanyaan Berikutnya</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              disabled={!isSubmitted}
                              onClick={handleFinishQuiz}
                              className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                                isSubmitted
                                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300'
                                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                              }`}
                            >
                              <Trophy className="w-4 h-4 text-stone-950" />
                              <span>Selesaikan Uji & Dapatkan XP</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ========================================================= */
        /* MODE 2: MODULE CATALOG LIST (ALL COURSES) */
        /* ========================================================= */
        <div className="space-y-6">
          {/* Filters & Search Toolbar */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'Semua Modul' },
                { id: 'uji_kompetensi', label: '⭐ Uji Kompetensi Syariah' },
                { id: 'etika_syariah', label: 'Etika & Syariah' },
                { id: 'manajemen_sosial', label: 'Manajemen Sosial' },
                { id: 'akuntabilitas_keuangan', label: 'Akuntabilitas & Audit' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    categoryFilter === tab.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Cari materi, fiqh, kode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 outline-none focus:border-emerald-600 text-stone-800"
              />
            </div>
          </div>

          {/* FEATURED: UJI KOMPETENSI SYARIAH - SKENARIO KASUS & LENCANA TINGKAT LANJUT */}
          {(() => {
            const examModule = VOLUNTEER_CURRICULUM_MODULES.find(m => m.isCompetencyExam);
            if (!examModule) return null;
            const examProgress = moduleProgress[examModule.id];
            const isExamPassed = examProgress?.completed;

            return (
              <div className="bg-gradient-to-br from-purple-950 via-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-purple-800/50 relative overflow-hidden">
                <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-12 -top-12 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/25 border border-purple-400/40 text-purple-200 text-xs font-black uppercase tracking-wider">
                        <Scale className="w-3.5 h-3.5 text-purple-300" />
                        <span>Asesmen Syariah Berbasis Kasus Lapangan</span>
                      </span>
                      <span className="text-xs font-bold text-amber-300 bg-amber-400/15 border border-amber-400/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Prasyarat Lencana Tingkat Lanjut</span>
                      </span>
                    </div>

                    <div className="text-xs font-bold text-stone-300 flex items-center gap-2">
                      <span className="bg-stone-800/90 px-2.5 py-1 rounded-lg border border-stone-700">
                        Batas Lulus: <strong className="text-amber-400">{examModule.passingScorePercentage || 75}%</strong>
                      </span>
                      <span className="bg-stone-800/90 px-2.5 py-1 rounded-lg border border-stone-700">
                        Hadiah: <strong className="text-emerald-400">+{examModule.xpReward} XP</strong>
                      </span>
                    </div>
                  </div>

                  <div className="max-w-3xl">
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {examModule.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                      Asesmen komprehensif menguji kesiapan pemecahan dilema syariah di medan krisis: tamlik zakat vs infak non-asnaf, etika privasi dhuafa (anti-poverty porn), penolakan gratifikasi vendor, hingga audit darurat ayat mudayanah melalui <strong>8 studi kasus nyata</strong>.
                    </p>
                  </div>

                  {/* Badges preview & status */}
                  <div className="bg-stone-900/90 border border-stone-700/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 shadow-md">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">
                          Lencana Kehormatan Tingkat Lanjut:
                        </span>
                        <span className="text-xs sm:text-sm font-black text-amber-300">
                          {examModule.badgeReward?.name}
                        </span>
                      </div>
                    </div>

                    {isExamPassed ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-500/50 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Lulus (Skor: {examProgress.score}%)</span>
                        </span>
                        <button
                          onClick={() => setViewingCertificateModule(examModule)}
                          className="text-xs font-bold text-amber-300 hover:text-amber-200 bg-stone-800 hover:bg-stone-700 px-3 py-1.5 rounded-xl border border-stone-600 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>Lihat Syahadah</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-stone-300">
                        Status: <strong className="text-amber-300">Siap Diuji (8 Skenario Kasus)</strong>
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={() => handleDirectStartExam(examModule)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-stone-950 text-stone-950" />
                      <span>{isExamPassed ? 'Uji Ulang Kasus Syariah (+XP)' : 'Mulai Uji Kompetensi Sekarang (Kuis Kasus)'}</span>
                    </button>

                    <button
                      onClick={() => handleOpenModule(examModule)}
                      className="px-4 py-2.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-200 hover:text-white font-bold text-xs flex items-center gap-2 border border-stone-700 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-purple-300" />
                      <span>Pelajari Materi Pembekalan Fikih</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredModules.map((module) => {
              const progress = moduleProgress[module.id];
              const isCompleted = progress?.completed;

              return (
                <div
                  key={module.id}
                  className={`border rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group space-y-4 ${
                    module.isCompetencyExam
                      ? 'bg-gradient-to-b from-purple-50/30 via-white to-white border-purple-300 ring-2 ring-purple-400/20 hover:border-purple-500'
                      : 'bg-white border-stone-200 hover:border-emerald-400'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header tags */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${module.colorScheme.badgeBg}`}>
                          {module.categoryLabel}
                        </span>
                        <span className="text-[10px] font-extrabold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                          {module.code}
                        </span>
                        {module.isCompetencyExam && (
                          <span className="text-[10px] font-black text-purple-900 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Scale className="w-3 h-3 text-purple-700" />
                            <span>Uji Kompetensi Skenario</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-amber-700 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>+{module.xpReward} XP</span>
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Lulus</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                        {module.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {module.subtitle}
                      </p>
                    </div>

                    {/* Overview snippet */}
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed border-l-2 border-stone-200 pl-2.5">
                      {module.overview}
                    </p>

                    {/* Meta info pills */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{module.durationMinutes} Menit</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                        <span>{module.lessons.length} Pelajaran</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span>{module.quiz.length} Soal Kuis</span>
                      </span>
                    </div>

                    {/* Badge reward preview */}
                    {module.badgeReward && (
                      <div className="bg-stone-50 border border-stone-200 rounded-xl p-2.5 flex items-center gap-2.5 text-xs">
                        <span className="w-7 h-7 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 font-bold">
                          <Award className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="text-[10px] text-stone-500 block">Lencana Akreditasi:</span>
                          <span className="font-extrabold text-stone-800">{module.badgeReward.name}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Bottom */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    {isCompleted ? (
                      <>
                        <button
                          onClick={() => setViewingCertificateModule(module)}
                          className="text-xs font-black text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-600" />
                          <span>Syahadah (Skor: {progress.score}%)</span>
                        </button>

                        <button
                          onClick={() => handleOpenModule(module)}
                          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <span>Kaji Ulang</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-[11px] font-bold text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{module.isCompetencyExam ? 'Uji Kasus' : 'Belum Selesai'}</span>
                        </span>

                        {module.isCompetencyExam ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDirectStartExam(module)}
                              className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Mulai Kuis Kasus</span>
                            </button>
                            <button
                              onClick={() => handleOpenModule(module)}
                              className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-all cursor-pointer"
                              title="Buka Materi Kasus"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleOpenModule(module)}
                            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Mulai Pembelajaran</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: LEVEL UP CELEBRATION MODAL */}
      {/* ========================================================= */}
      {levelUpData && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gradient-to-b from-stone-900 via-slate-900 to-emerald-950 text-white rounded-3xl max-w-md w-full p-6 sm:p-7 border-2 border-amber-400 shadow-2xl space-y-5 text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Sparkle background glow */}
            <div className="absolute -top-16 -left-16 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center text-4xl shadow-xl border-2 border-amber-300">
              ⭐
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full inline-block">
                Mabruk! Kenaikan Peringkat Relawan
              </div>
              <h3 className="text-2xl font-black text-white mt-2">
                Level {levelUpData.newLevel} Tercapai!
              </h3>
              <div className="text-sm font-extrabold text-amber-400 mt-1">
                "{levelUpData.newLevelName}"
              </div>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                Alhamdulillah! Dedikasi pembelajaran dan pemahaman syariah Anda telah menaikkan akreditasi resmi di profil relawan Islamicity.
              </p>
            </div>

            <div className="bg-stone-800/90 rounded-2xl p-4 border border-stone-700 text-xs space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Relawan:</span>
                <span className="font-extrabold text-white">{activeProfile.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Bonus XP Modul:</span>
                <span className="font-extrabold text-emerald-400">+{levelUpData.earnedXp} XP</span>
              </div>
              {levelUpData.badgeName && (
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Lencana Baru:</span>
                  <span className="font-extrabold text-amber-300">{levelUpData.badgeName}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setLevelUpData(null)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Lanjutkan Beramal & Belajar
              </button>
              {onNavigateToProfile && (
                <button
                  onClick={() => {
                    setLevelUpData(null);
                    onNavigateToProfile();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs border border-stone-600 transition-all cursor-pointer"
                >
                  Lihat Profil
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: DIGITAL SYAHADAH / CERTIFICATE VIEWER */}
      {/* ========================================================= */}
      {viewingCertificateModule && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-stone-300 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setViewingCertificateModule(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1.5 rounded-full hover:bg-stone-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Frame with Islamic Motif Style */}
            <div className="border-4 border-double border-emerald-800 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-amber-50/40 via-white to-stone-50 text-center space-y-4 relative">
              <div className="text-emerald-900 font-serif text-sm font-bold tracking-widest">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>

              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>Syahadah Al-Kafa’ah (Sertifikat Kelulusan Resmi)</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-900">
                SERTIFIKAT KOMPETENSI RELAWAN SYARIAH
              </h2>

              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Dewan Pengawas Syariah & Badan Sertifikasi Relawan Islamicity menyatakan bahwa:
              </p>

              {/* Recipient Name */}
              <div className="py-2">
                <div className="text-xl sm:text-2xl font-black text-emerald-900 underline decoration-amber-400 decoration-2 underline-offset-4">
                  {activeProfile.name}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Nomor Registrasi: {activeProfile.registrationNumber}
                </div>
              </div>

              <p className="text-xs text-stone-700 max-w-lg mx-auto leading-relaxed">
                Telah menyelesaikan seluruh rangkaian materi, studi kasus, dan lulus Uji Kompetensi Syariah dengan predikat <strong>Mumtaz (Sangat Baik)</strong> pada modul:
              </p>

              <div className="bg-emerald-950 text-white rounded-xl p-3.5 max-w-md mx-auto">
                <div className="text-xs font-black text-amber-300">{viewingCertificateModule.code}</div>
                <div className="text-sm font-extrabold text-white mt-0.5">{viewingCertificateModule.title}</div>
              </div>

              {/* Metadata & Verification Hash */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-left max-w-md mx-auto text-[11px] text-stone-600 border-t border-stone-200">
                <div>
                  <span className="block text-stone-400">Tanggal Terbit:</span>
                  <span className="font-bold text-stone-800">
                    {moduleProgress[viewingCertificateModule.id]?.completedAt || '18 September 2026'}
                  </span>
                </div>
                <div>
                  <span className="block text-stone-400">Kode Sertifikat:</span>
                  <span className="font-bold text-stone-800 font-mono">
                    {moduleProgress[viewingCertificateModule.id]?.certificateCode || `CERT-${viewingCertificateModule.code}-2026`}
                  </span>
                </div>
              </div>

              {/* Signatures simulation */}
              <div className="flex items-center justify-between pt-4 max-w-md mx-auto text-[10px] text-stone-500">
                <div className="text-center">
                  <div className="font-serif font-black text-xs text-stone-800 border-b border-stone-300 pb-1">
                    K.H. Syamsul Huda, Lc., MA
                  </div>
                  <div>Dewan Pengawas Syariah</div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-emerald-700 bg-emerald-50 flex items-center justify-center text-[10px] font-black text-emerald-900 shadow-inner">
                  RESMI
                </div>
                <div className="text-center">
                  <div className="font-serif font-black text-xs text-stone-800 border-b border-stone-300 pb-1">
                    Direktur Relawan Islamicity
                  </div>
                  <div>Koordinator Pelatihan</div>
                </div>
              </div>
            </div>

            {/* Print & Download Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Syahadah</span>
              </button>

              <button
                onClick={() => {
                  showToast('📄 Sertifikat resmi format PDF siap diarsipkan.');
                  setViewingCertificateModule(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Berkas</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
