import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Bell, 
  BarChart3, 
  Calculator, 
  Radio, 
  FileText, 
  Sparkles,
  Search,
  UserCheck,
  MapPin,
  Sunrise,
  GraduationCap
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenZakatCalculator: () => void;
  onOpenQuickDonate: () => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenZakatCalculator,
  onOpenQuickDonate,
  notifications,
  onOpenNotifications,
  searchQuery,
  setSearchQuery,
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      {/* Top Banner with Islamic Values & Transparency Badge */}
      <div className="bg-emerald-950/80 border-b border-emerald-900/60 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span className="hidden sm:inline text-stone-400">|</span>
            <span className="hidden sm:inline text-stone-300">
              Platform Transparan Berbasis Nilai Islam: Amanah, Fathonah, Tabligh, Shiddiq
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <button
              onClick={() => setActiveTab('tutorial')}
              className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-bold transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Tutorial Cilik (Hands-On) 🌟</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Terenkripsi 256-Bit & Audit Real-time</span>
            </div>
            <button
              onClick={onOpenZakatCalculator}
              className="hover:text-amber-300 flex items-center gap-1 text-amber-200 transition-colors"
            >
              <Calculator className="w-3 h-3 text-amber-400" />
              <span className="font-semibold">Kalkulator Zakat Maal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Logo & Identity */}
          <div 
            onClick={() => setActiveTab('campaigns')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center shadow-inner border border-emerald-500/30 text-white group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  Islamicity <span className="text-emerald-400 font-semibold">Relawan</span>
                </span>
                <span className="bg-emerald-900/80 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-700/50">
                  Resmi & Terverifikasi
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Inisiatif Sosial & Zakat Digital Transparan
              </p>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 absolute left-3 text-stone-400" />
            <input
              type="text"
              placeholder="Cari inisiatif sosial, relawan, daerah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-800/80 text-stone-200 text-sm pl-9 pr-3 py-2 rounded-lg border border-stone-700 focus:outline-none focus:border-emerald-500 transition-colors placeholder-stone-500"
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'campaigns'
                  ? 'bg-emerald-800/60 text-emerald-200 border border-emerald-600/40 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              Inisiatif & Relawan
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'tracking'
                  ? 'bg-emerald-800/60 text-emerald-200 border border-emerald-600/40 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Pelacakan Real-time
            </button>

            <button
              onClick={() => setActiveTab('zakat')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'zakat'
                  ? 'bg-emerald-800/60 text-emerald-200 border border-emerald-600/40 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              Bayar Zakat & Donasi
            </button>

            <button
              onClick={() => setActiveTab('sedekah-subuh')}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'sedekah-subuh'
                  ? 'bg-gradient-to-r from-amber-500/30 to-emerald-600/40 text-amber-200 border border-amber-400/50 shadow-sm'
                  : 'text-amber-300 hover:text-white hover:bg-amber-500/10'
              }`}
            >
              <Sunrise className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Sedekah Subuh</span>
              <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-1.5 py-0.2 rounded-full">
                Fajar
              </span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'analytics'
                  ? 'bg-emerald-800/60 text-emerald-200 border border-emerald-600/40 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              Dasbor Analitik
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'reports'
                  ? 'bg-emerald-800/60 text-emerald-200 border border-emerald-600/40 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              Laporan Akuntabilitas
            </button>

            <button
              onClick={() => setActiveTab('volunteer-profile')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'volunteer-profile'
                  ? 'bg-emerald-800/60 text-emerald-200 border border-emerald-600/40 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              Profil Relawan
            </button>

            <button
              onClick={() => setActiveTab('kurikulum')}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'kurikulum'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-md ring-1 ring-amber-300'
                  : 'text-amber-200 hover:text-amber-100 hover:bg-amber-400/10'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span>Kurikulum Relawan</span>
              <span className="text-[10px] font-black bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded-md ml-0.5 border border-amber-400/30">
                +XP
              </span>
            </button>

            <button
              onClick={() => setActiveTab('tutorial')}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'tutorial'
                  ? 'bg-amber-400 text-stone-950 shadow-sm scale-102'
                  : 'text-amber-300 hover:text-amber-200 hover:bg-amber-400/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Belajar Cilik (Hands-on) 🌟</span>
            </button>
          </nav>

          {/* Quick Actions (Notifications & Donate Button) */}
          <div className="flex items-center gap-2.5">
            {/* Quick Link to Impact Map */}
            <button
              onClick={() => {
                setActiveTab('campaigns');
                setTimeout(() => {
                  document.getElementById('peta-dampak-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 120);
              }}
              title="Buka Peta Dampak Penyaluran Nusantara"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-600/50 hover:bg-emerald-900 transition-colors shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Peta Dampak</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              aria-label="Pusat Notifikasi Otomatis"
              className="relative p-2.5 rounded-lg bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors border border-stone-700"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-900 shadow-sm animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Quick Donate CTA */}
            <button
              onClick={onOpenQuickDonate}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-md transition-all active:scale-95 border border-emerald-400/30"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tunaikan Zakat</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-stone-800 gap-2 no-scrollbar text-xs font-medium">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'campaigns' ? 'bg-emerald-700 text-white' : 'text-stone-300'
            }`}
          >
            Inisiatif
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'tracking' ? 'bg-emerald-700 text-white' : 'text-stone-300'
            }`}
          >
            <Radio className="w-3 h-3 text-emerald-300" />
            Pelacakan Real-time
          </button>
          <button
            onClick={() => setActiveTab('zakat')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'zakat' ? 'bg-emerald-700 text-white' : 'text-stone-300'
            }`}
          >
            Zakat & Donasi
          </button>
          <button
            onClick={() => setActiveTab('sedekah-subuh')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 font-bold ${
              activeTab === 'sedekah-subuh' ? 'bg-amber-400 text-stone-950' : 'text-amber-300 bg-amber-400/10'
            }`}
          >
            <Sunrise className="w-3 h-3 text-amber-400" />
            Sedekah Subuh 🌅
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'analytics' ? 'bg-emerald-700 text-white' : 'text-stone-300'
            }`}
          >
            <BarChart3 className="w-3 h-3" />
            Analitik
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'reports' ? 'bg-emerald-700 text-white' : 'text-stone-300'
            }`}
          >
            <FileText className="w-3 h-3" />
            Laporan
          </button>
          <button
            onClick={() => setActiveTab('volunteer-profile')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'volunteer-profile' ? 'bg-emerald-700 text-white' : 'text-stone-300'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            Profil Relawan
          </button>
          <button
            onClick={() => setActiveTab('kurikulum')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 font-bold ${
              activeTab === 'kurikulum' ? 'bg-amber-400 text-stone-950' : 'text-amber-300 bg-amber-400/10'
            }`}
          >
            <GraduationCap className="w-3 h-3 text-amber-400" />
            Kurikulum (+XP) 🎓
          </button>
          <button
            onClick={() => setActiveTab('tutorial')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 font-bold ${
              activeTab === 'tutorial' ? 'bg-amber-400 text-stone-950' : 'text-amber-300 bg-amber-400/10'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            Belajar Cilik 🌟
          </button>
        </div>
      </div>
    </header>
  );
};
