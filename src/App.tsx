import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CampaignsView } from './components/CampaignsView';
import { RealtimeTrackingLedger } from './components/RealtimeTrackingLedger';
import { DigitalZakatHub } from './components/DigitalZakatHub';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AuditedReportsView } from './components/AuditedReportsView';
import { ZakatCalculatorModal } from './components/ZakatCalculatorModal';
import { DonationModal } from './components/DonationModal';
import { VolunteerModal } from './components/VolunteerModal';
import { SocialShareModal } from './components/SocialShareModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { KidsTutorialHandsOn } from './components/KidsTutorialHandsOn';
import { VolunteerProfileView } from './components/VolunteerProfileView';
import { SedekahSubuhModule } from './components/SedekahSubuhModule';
import { VolunteerCurriculumModule } from './components/VolunteerCurriculumModule';

import { 
  Campaign, 
  ImpactMilestone, 
  VolunteerRole, 
  DonationTransaction, 
  NotificationItem, 
  VolunteerRegistration,
  DonationType,
  VolunteerProfile,
  VolunteerBadge
} from './types';

import { 
  INITIAL_CAMPAIGNS, 
  INITIAL_MILESTONES, 
  INITIAL_ROLES, 
  INITIAL_TRANSACTIONS, 
  INITIAL_NOTIFICATIONS,
  INITIAL_VOLUNTEER_PROFILES
} from './data/initialData';

import { 
  HeartHandshake, 
  Radio, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Send,
  Smartphone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { formatRupiah } from './utils/formatters';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('campaigns');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Domain data states
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [milestones, setMilestones] = useState<ImpactMilestone[]>(INITIAL_MILESTONES);
  const [volunteerRoles, setVolunteerRoles] = useState<VolunteerRole[]>(INITIAL_ROLES);
  const [transactions, setTransactions] = useState<DonationTransaction[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [volunteerRegistrations, setVolunteerRegistrations] = useState<VolunteerRegistration[]>([]);
  const [volunteerProfiles, setVolunteerProfiles] = useState<VolunteerProfile[]>(INITIAL_VOLUNTEER_PROFILES);

  // Modals state
  const [isZakatCalculatorOpen, setIsZakatCalculatorOpen] = useState<boolean>(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState<boolean>(false);
  const [isSocialShareModalOpen, setIsSocialShareModalOpen] = useState<boolean>(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState<boolean>(false);

  // Active targets for modals
  const [activeCampaignForModal, setActiveCampaignForModal] = useState<Campaign | null>(null);
  const [activeRoleForModal, setActiveRoleForModal] = useState<VolunteerRole | null>(null);
  const [prefilledDonationAmount, setPrefilledDonationAmount] = useState<number>(250000);
  const [prefilledDonationType, setPrefilledDonationType] = useState<DonationType>('zakat_maal');
  const [prefilledDonationNote, setPrefilledDonationNote] = useState<string>('');

  // Floating live toast for notifications
  const [toastNotification, setToastNotification] = useState<NotificationItem | null>(null);

  const showLiveToast = (notif: NotificationItem) => {
    setToastNotification(notif);
    setTimeout(() => {
      setToastNotification(prev => (prev?.id === notif.id ? null : prev));
    }, 6000);
  };

  // Check URL parameters for external volunteer verification link
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('verify') === 'volunteer' || params.get('reg')) {
        setActiveTab('volunteer-profile');
      }
    }
  }, []);

  // Handlers
  const handleOpenDonateModal = (campaign?: Campaign, amount?: number, type?: DonationType, note?: string) => {
    setActiveCampaignForModal(campaign || campaigns[0]);
    if (amount) setPrefilledDonationAmount(amount);
    if (type) setPrefilledDonationType(type);
    if (note) setPrefilledDonationNote(note);
    setIsDonationModalOpen(true);
  };

  const handleOpenVolunteerModal = (role: VolunteerRole) => {
    setActiveRoleForModal(role);
    setIsVolunteerModalOpen(true);
  };

  const handleOpenShareModal = (campaign: Campaign) => {
    setActiveCampaignForModal(campaign);
    setIsSocialShareModalOpen(true);
  };

  const handleProceedWithZakatFromCalculator = (amount: number, type: 'zakat_maal' | 'zakat_fitrah', note: string) => {
    setIsZakatCalculatorOpen(false);
    handleOpenDonateModal(campaigns.find(c => c.category === 'zakat') || campaigns[0], amount, type, note);
  };

  const handleSuccessTransaction = (newTrx: DonationTransaction) => {
    // 1. Add to transactions ledger
    setTransactions(prev => [newTrx, ...prev]);

    // 2. Update campaign current amount and donor count
    setCampaigns(prev => prev.map(c => {
      if (c.id === newTrx.campaignId) {
        return {
          ...c,
          currentAmount: c.currentAmount + newTrx.amount,
          donorCount: c.donorCount + 1
        };
      }
      return c;
    }));

    // 3. Dispatch automated real-time notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'penyaluran',
      title: 'Penyaluran Real-Time Aktif & Notifikasi Terkirim',
      message: `Donasi ${formatRupiah(newTrx.amount)} [Resi ${newTrx.receiptNumber}] telah diterima sistem dan notifikasi SMS/WA dikirimkan ke ${newTrx.donorPhone}.`,
      timeAgo: 'Baru saja',
      timestamp: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      read: false,
      channel: 'push',
      linkToTab: 'tracking',
      metadata: {
        receiptNumber: newTrx.receiptNumber,
        amount: newTrx.amount,
        campaignTitle: newTrx.campaignTitle
      }
    };

    setNotifications(prev => [newNotif, ...prev]);
    showLiveToast(newNotif);
  };

  const handleRegisterVolunteer = (reg: VolunteerRegistration) => {
    setVolunteerRegistrations(prev => [reg, ...prev]);
    
    // Update volunteer slots
    setVolunteerRoles(prev => prev.map(r => {
      if (r.roleTitle === reg.roleTitle) {
        return {
          ...r,
          slotsFilled: Math.min(r.slotsNeeded, r.slotsFilled + 1)
        };
      }
      return r;
    }));

    const newProfile: VolunteerProfile = {
      id: `vol-${Date.now()}`,
      registrationNumber: `IR-REL-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      name: reg.volunteerName,
      titleBadge: `Relawan Lapangan (${reg.roleTitle.split(' ')[0]})`,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      email: reg.email,
      phone: reg.phone,
      city: reg.city,
      joinDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      bloodType: 'Tervalidasi Lapangan',
      emergencyContact: 'Tercatat di sistem operasional',
      skills: reg.skills.split(',').map(s => s.trim()).filter(Boolean),
      bio: `Relawan resmi Islamicity yang berkhidmat untuk formasi ${reg.roleTitle} di program ${reg.campaignTitle}. Siap menjaga amanah umat demi mencari ridha Allah Ta’ala.`,
      syariahPledgeSigned: reg.pledgeAccepted,
      kycVerified: true,
      reliabilityScore: 100,
      volunteerLevel: {
        currentLevel: 1,
        levelName: 'Relawan Muda Binaan',
        xp: 150,
        nextLevelXp: 500
      },
      stats: {
        totalHours: reg.serviceHours || 8,
        totalInitiatives: 1,
        beneficiariesHelped: 50,
        verifiedProofsCount: 1,
        communityVotesGiven: 0,
        fundsDistributedDirectly: 5000000
      },
      badges: [
        {
          id: `badge-${Date.now()}-1`,
          name: 'Duta Amanah Terverifikasi',
          category: 'amanah',
          level: 'silver',
          icon: 'ShieldCheck',
          description: 'Berhasil mendaftar dan menandatangani ikrar amanah syariah relawan Islamicity.',
          earnedAt: 'Hari ini',
          isUnlocked: true,
          criteria: 'Pendaftaran & Ikrar Syariah Lengkap',
          verificationHash: `0x${Math.random().toString(16).substring(2, 10)}...init`
        }
      ],
      participationHistory: [
        {
          id: `part-${Date.now()}`,
          campaignId: campaigns.find(c => c.title === reg.campaignTitle)?.id || 'camp-1',
          campaignTitle: reg.campaignTitle,
          roleTitle: reg.roleTitle,
          period: reg.registeredAt,
          serviceHours: reg.serviceHours || 8,
          location: reg.city,
          status: 'bertugas',
          beneficiariesHelped: 50,
          tasksCompleted: [
            `Penugasan formasi ${reg.roleTitle}`,
            'Penerimaan kode etik dan panduan operasional lapangan'
          ],
          photoUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
          communityVerification: {
            status: 'dalam_tinjauan',
            votesValid: 1,
            votesReview: 0,
            verifiedByNames: ['Koordinator Posko Islamicity'],
            blockchainHash: `0x${Math.random().toString(16).substring(2, 10)}...reg`
          }
        }
      ]
    };
    setVolunteerProfiles(prev => [newProfile, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'relawan',
      title: 'Selamat Bergabung Relawan Islamicity!',
      message: `Saudara/i ${reg.volunteerName} telah terdaftar untuk formasi ${reg.roleTitle}. Profil & portofolio relawan Anda telah aktif!`,
      timeAgo: 'Baru saja',
      timestamp: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      read: false,
      channel: 'push',
      linkToTab: 'volunteer-profile'
    };

    setNotifications(prev => [newNotif, ...prev]);
    showLiveToast(newNotif);
  };

  const handleVoteMilestone = (milestoneId: string, isUpvote: boolean) => {
    setMilestones(prev => prev.map(m => {
      if (m.id === milestoneId) {
        return {
          ...m,
          verifiedByCommunity: {
            ...m.verifiedByCommunity,
            votesValid: isUpvote ? m.verifiedByCommunity.votesValid + 1 : m.verifiedByCommunity.votesValid,
            votesReview: !isUpvote ? m.verifiedByCommunity.votesReview + 1 : m.verifiedByCommunity.votesReview
          }
        };
      }
      return m;
    }));

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'verifikasi',
      title: 'Suara Verifikasi Komunitas Masuk',
      message: 'Partisipasi Anda dalam audit lapangan telah dicatat ke audit ledger publik.',
      timeAgo: 'Baru saja',
      timestamp: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      read: false,
      channel: 'push',
      linkToTab: 'tracking'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleSubmitNewProof = (newMilestone: ImpactMilestone) => {
    setMilestones(prev => [newMilestone, ...prev]);

    // Update campaign beneficiaries
    setCampaigns(prev => prev.map(c => {
      if (c.id === newMilestone.campaignId) {
        return {
          ...c,
          beneficiariesReached: c.beneficiariesReached + newMilestone.beneficiariesCount
        };
      }
      return c;
    }));

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'penyaluran',
      title: 'Bukti Penyaluran Baru Telah Terunggah',
      message: `${newMilestone.title} (${newMilestone.beneficiariesCount} Jiwa terbantu). Silakan verifikasi bukti foto dan resi.`,
      timeAgo: 'Baru saja',
      timestamp: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      read: false,
      channel: 'push',
      linkToTab: 'tracking'
    };
    setNotifications(prev => [newNotif, ...prev]);
    showLiveToast(newNotif);
  };

  const handleUpdateVolunteerXP = (
    profileId: string, 
    xpEarned: number, 
    unlockedBadge?: VolunteerBadge, 
    courseTitle?: string
  ) => {
    setVolunteerProfiles(prev => prev.map(p => {
      if (p.id !== profileId) return p;

      const currentXp = p.volunteerLevel.xp + xpEarned;
      let currentLevel = p.volunteerLevel.currentLevel;
      let nextLevelXp = p.volunteerLevel.nextLevelXp;
      let levelName = p.volunteerLevel.levelName;

      // Check level up threshold
      if (currentXp >= nextLevelXp) {
        currentLevel += 1;
        nextLevelXp += 1500;
        const levelNames = [
          'Relawan Pemula (Mutathawwi\' Mubtadi\')',
          'Relawan Terampil (Khadimul Ummat)',
          'Relawan Teladan Syariah (Mujahid Ijtima\'i)',
          'Murabbi Relawan Lapangan',
          'Ustadz Pembina & Inisiator Peradaban'
        ];
        levelName = levelNames[Math.min(currentLevel - 1, levelNames.length - 1)];
      }

      // Check badge
      let updatedBadges = [...p.badges];
      if (unlockedBadge && !updatedBadges.some(b => b.name === unlockedBadge.name)) {
        updatedBadges = [unlockedBadge, ...updatedBadges];
      }

      return {
        ...p,
        volunteerLevel: {
          currentLevel,
          levelName,
          xp: currentXp,
          nextLevelXp
        },
        badges: updatedBadges,
        stats: {
          ...p.stats,
          verifiedProofsCount: p.stats.verifiedProofsCount + 1
        }
      };
    }));

    if (courseTitle) {
      const newNotif: NotificationItem = {
        id: `curriculum-xp-${Date.now()}`,
        type: 'verifikasi',
        title: `🎖️ Poin XP Diperoleh: ${courseTitle}`,
        message: `Poin +${xpEarned} XP telah ditambahkan ke profil relawan Anda setelah menyelesaikan evaluasi syariah.`,
        timeAgo: 'Baru saja',
        timestamp: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
        read: false,
        channel: 'push',
        linkToTab: 'volunteer-profile'
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const handleTriggerTestNotification = (channel: 'push' | 'sms' | 'email') => {
    const channelTitles = {
      push: 'Notifikasi Push Instan: Penyaluran Bantuan Tersampaikan',
      sms: 'SMS / WhatsApp Otomatis: Resi Zakat Anda Telah Terekam',
      email: 'Email Otomatis: Laporan Akuntabilitas Mingguan BAZNAS'
    };

    const newNotif: NotificationItem = {
      id: `notif-test-${Date.now()}`,
      type: 'penyaluran',
      title: channelTitles[channel],
      message: `[Simulasi Otomatis Saluran ${channel.toUpperCase()}] Bantuan logistik paket sembako di Posko Banjir Pesisir Selatan telah diserahkan langsung kepada mustahik.`,
      timeAgo: 'Baru saja',
      timestamp: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      read: false,
      channel,
      linkToTab: 'tracking'
    };

    setNotifications(prev => [newNotif, ...prev]);
    showLiveToast(newNotif);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-600 selection:text-white">
      {/* Floating Live Notification Toast */}
      {toastNotification && (
        <div className="fixed top-20 right-4 z-50 max-w-sm w-full bg-stone-900 text-white rounded-2xl p-4 shadow-2xl border border-emerald-500/40 animate-in slide-in-from-top duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              {toastNotification.channel === 'push' && <Radio className="w-3.5 h-3.5 animate-ping" />}
              {toastNotification.channel === 'sms' && <Smartphone className="w-3.5 h-3.5 text-blue-400" />}
              {toastNotification.channel === 'email' && <Mail className="w-3.5 h-3.5 text-purple-400" />}
              <span>{toastNotification.title}</span>
            </div>
            <button
              onClick={() => setToastNotification(null)}
              className="text-stone-400 hover:text-white p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-stone-300 text-xs mt-1.5 leading-relaxed">
            {toastNotification.message}
          </p>
          <div className="mt-2 pt-2 border-t border-stone-800 flex items-center justify-between text-[11px]">
            <span className="text-stone-400">{toastNotification.timeAgo}</span>
            <button
              onClick={() => {
                if (toastNotification.linkToTab) setActiveTab(toastNotification.linkToTab);
                setToastNotification(null);
              }}
              className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>Buka Pelacakan</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenZakatCalculator={() => setIsZakatCalculatorOpen(true)}
        onOpenQuickDonate={() => handleOpenDonateModal(campaigns[0])}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationCenterOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {activeTab === 'campaigns' && (
          <CampaignsView
            campaigns={campaigns}
            volunteerRoles={volunteerRoles}
            searchQuery={searchQuery}
            onOpenDonateModal={(camp) => handleOpenDonateModal(camp)}
            onOpenVolunteerModal={handleOpenVolunteerModal}
            onOpenShareModal={handleOpenShareModal}
            onOpenKidsTutorial={() => setActiveTab('tutorial')}
            onOpenVolunteerProfile={() => setActiveTab('volunteer-profile')}
            onOpenSedekahSubuh={() => setActiveTab('sedekah-subuh')}
            onOpenCurriculum={() => setActiveTab('kurikulum')}
          />
        )}

        {activeTab === 'volunteer-profile' && (
          <VolunteerProfileView
            profiles={volunteerProfiles}
            milestones={milestones}
            campaigns={campaigns}
            registrations={volunteerRegistrations}
            onVoteMilestone={handleVoteMilestone}
            onSubmitNewProof={handleSubmitNewProof}
            onNavigateToTracking={() => setActiveTab('tracking')}
            onNavigateToCampaigns={() => setActiveTab('campaigns')}
            onNavigateToCurriculum={() => setActiveTab('kurikulum')}
          />
        )}

        {activeTab === 'kurikulum' && (
          <VolunteerCurriculumModule
            profiles={volunteerProfiles}
            onUpdateVolunteerXP={handleUpdateVolunteerXP}
            onNotificationTrigger={(notif) => {
              setNotifications(prev => [notif, ...prev]);
              showLiveToast(notif);
            }}
            onNavigateToProfile={() => setActiveTab('volunteer-profile')}
          />
        )}

        {activeTab === 'tutorial' && (
          <KidsTutorialHandsOn
            onBackToMain={() => setActiveTab('campaigns')}
            onGoToCampaigns={() => setActiveTab('campaigns')}
            onGoToZakat={() => setActiveTab('zakat')}
          />
        )}

        {activeTab === 'tracking' && (
          <RealtimeTrackingLedger
            milestones={milestones}
            campaigns={campaigns}
            onVoteMilestone={handleVoteMilestone}
            onSubmitNewProof={handleSubmitNewProof}
          />
        )}

        {activeTab === 'zakat' && (
          <DigitalZakatHub
            onOpenCalculator={() => setIsZakatCalculatorOpen(true)}
            onOpenDirectPayment={(type) => handleOpenDonateModal(campaigns[0], 250000, type)}
          />
        )}

        {activeTab === 'sedekah-subuh' && (
          <SedekahSubuhModule
            onNotificationTrigger={(notif) => {
              setNotifications(prev => [notif, ...prev]);
              showLiveToast(notif);
            }}
            onOpenDonateModal={(camp, amt) => handleOpenDonateModal(camp, amt)}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard
            campaigns={campaigns}
            transactions={transactions}
            milestones={milestones}
            onDownloadReport={() => alert('Mengekspor data ringkasan analitik ke berkas Excel / PDF... Laporan selesai diekspor.')}
          />
        )}

        {activeTab === 'reports' && (
          <AuditedReportsView
            transactions={transactions}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-xs py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-white text-base">
                  Islamicity <span className="text-emerald-400">Relawan</span>
                </div>
                <div className="text-stone-400 text-[11px]">
                  Infrastruktur Cerdas Inisiatif Sosial & Zakat Digital Transparan
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-stone-400 text-xs">
              <div className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Kepatuhan Syariah BAZNAS</span>
              </div>
              <span>•</span>
              <div>Enkripsi 256-Bit SSL</div>
              <span>•</span>
              <div>Audit Independen PSAK 109</div>
              <span>•</span>
              <div>0% Biaya Potongan Donatur</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
            <div>
              © 2026 Islamicity Relawan. Seluruh hak cipta dilindungi undang-undang. Niat ikhlas karena Allah Ta’ala.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-amber-300 hover:text-amber-200 font-extrabold cursor-pointer flex items-center gap-1" onClick={() => setActiveTab('sedekah-subuh')}>
                🌅 Sedekah Subuh (Pengingat Fajar)
              </span>
              <span className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer flex items-center gap-1" onClick={() => setActiveTab('kurikulum')}>
                🎓 Kurikulum Relawan (+XP)
              </span>
              <span className="text-stone-300 hover:text-stone-200 font-medium cursor-pointer flex items-center gap-1" onClick={() => setActiveTab('tutorial')}>
                🌟 Tutorial Cilik
              </span>
              <span className="hover:text-stone-300 font-semibold cursor-pointer text-emerald-400" onClick={() => setActiveTab('volunteer-profile')}>
                Profil & Lencana Relawan
              </span>
              <span className="hover:text-stone-400 cursor-pointer" onClick={() => setIsNotificationCenterOpen(true)}>
                Pengaturan Notifikasi
              </span>
              <span className="hover:text-stone-400 cursor-pointer" onClick={() => setIsZakatCalculatorOpen(true)}>
                Kalkulator Syariah
              </span>
              <span className="hover:text-stone-400 cursor-pointer" onClick={() => setActiveTab('reports')}>
                Transparansi & Pajak
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Dialogs */}
      <ZakatCalculatorModal
        isOpen={isZakatCalculatorOpen}
        onClose={() => setIsZakatCalculatorOpen(false)}
        onProceedWithZakat={handleProceedWithZakatFromCalculator}
      />

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        campaign={activeCampaignForModal}
        allCampaigns={campaigns}
        initialAmount={prefilledDonationAmount}
        initialType={prefilledDonationType}
        initialNote={prefilledDonationNote}
        onSuccessTransaction={handleSuccessTransaction}
      />

      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
        role={activeRoleForModal}
        onRegisterVolunteer={handleRegisterVolunteer}
      />

      <SocialShareModal
        isOpen={isSocialShareModalOpen}
        onClose={() => setIsSocialShareModalOpen(false)}
        campaign={activeCampaignForModal}
      />

      <NotificationCenterModal
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onTriggerTestNotification={handleTriggerTestNotification}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
