export type CampaignCategory = 'bencana' | 'pendidikan' | 'kesehatan' | 'pangan' | 'wakaf' | 'zakat';

export type PaymentMethod = 
  | 'qris'
  | 'gopay'
  | 'ovo'
  | 'shopeepay'
  | 'dana'
  | 'bsi_va'
  | 'bca_syariah_va'
  | 'mandiri_syariah_va'
  | 'card';

export type DonationType = 
  | 'zakat_maal' 
  | 'zakat_fitrah' 
  | 'infaq_sedekah' 
  | 'wakaf' 
  | 'donasi_darurat';

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  category: CampaignCategory;
  categoryLabel: string;
  targetAmount: number;
  currentAmount: number;
  donorCount: number;
  volunteerCount: number;
  targetVolunteers: number;
  location: string;
  partnerOrg: string;
  startDate: string;
  endDate: string;
  status: 'aktif' | 'penyaluran' | 'selesai';
  description: string;
  islamicValues: string; // e.g. "Ta'awun (Tolong Menolong) & Amanah"
  urgencyLevel: 'tinggi' | 'sedang' | 'reguler';
  verifiedBadges: string[];
  coverImage: string;
  tags: string[];
  beneficiariesTarget: number;
  beneficiariesReached: number;
}

export interface ImpactMilestone {
  id: string;
  campaignId: string;
  campaignTitle: string;
  title: string;
  description: string;
  timestamp: string;
  location: string;
  gpsCoords: string;
  stage: 'persiapan' | 'pengadaan' | 'penyaluran' | 'selesai';
  spentAmount: number;
  beneficiariesCount: number;
  proofImages: string[];
  verifiedByCommunity: {
    votesValid: number;
    votesReview: number;
    status: 'terverifikasi' | 'dalam_tinjauan';
    verifierNames: string[];
  };
  blockchainHash: string;
  receiptNumber: string;
}

export interface VolunteerRole {
  id: string;
  campaignId: string;
  roleTitle: string;
  skillsNeeded: string[];
  slotsNeeded: number;
  slotsFilled: number;
  location: string;
  dateRange: string;
  timeCommitment: string;
  dutySummary: string;
  ethicsPledge: string;
}

export interface VolunteerBadge {
  id: string;
  name: string;
  category: 'amanah' | 'bencana' | 'medis' | 'pendidikan' | 'verifikasi' | 'kehormatan';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  icon: string;
  description: string;
  earnedAt?: string;
  isUnlocked: boolean;
  criteria: string;
  verificationHash?: string;
}

export interface VolunteerParticipationHistory {
  id: string;
  campaignId: string;
  campaignTitle: string;
  roleTitle: string;
  period: string;
  serviceHours: number;
  location: string;
  gpsCoords?: string;
  status: 'selesai' | 'bertugas' | 'terdaftar';
  beneficiariesHelped: number;
  tasksCompleted: string[];
  photoUrl: string;
  communityVerification: {
    status: 'terverifikasi' | 'dalam_tinjauan';
    votesValid: number;
    votesReview?: number;
    verifiedByNames: string[];
    linkedMilestoneId?: string;
    blockchainHash: string;
  };
  testimonialOrFeedback?: string;
}

export interface VolunteerProfile {
  id: string;
  registrationNumber: string;
  name: string;
  titleBadge: string;
  avatarUrl: string;
  email: string;
  phone: string;
  city: string;
  joinDate: string;
  bloodType: string;
  emergencyContact: string;
  skills: string[];
  bio: string;
  syariahPledgeSigned: boolean;
  kycVerified: boolean;
  reliabilityScore: number;
  volunteerLevel: {
    currentLevel: number;
    levelName: string;
    xp: number;
    nextLevelXp: number;
  };
  stats: {
    totalHours: number;
    totalInitiatives: number;
    beneficiariesHelped: number;
    verifiedProofsCount: number;
    communityVotesGiven: number;
    fundsDistributedDirectly: number;
  };
  badges: VolunteerBadge[];
  participationHistory: VolunteerParticipationHistory[];
}

export interface VolunteerRegistration {
  id: string;
  volunteerName: string;
  email: string;
  phone: string;
  city: string;
  skills: string;
  roleTitle: string;
  campaignTitle: string;
  pledgeAccepted: boolean;
  registeredAt: string;
  status: 'diterima' | 'bertugas' | 'selesai';
  serviceHours: number;
}

export interface DonationTransaction {
  id: string;
  receiptNumber: string;
  campaignId: string;
  campaignTitle: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  isAnonymous: boolean;
  donationType: DonationType;
  amount: number;
  adminFee: number;
  totalPaid: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'berhasil' | 'diproses' | 'tersalurkan';
  doaOrNotes?: string;
  timestamp: string;
  taxDeductible: boolean;
  txHash: string;
  notificationLog: {
    smsSent: boolean;
    smsTime?: string;
    pushSent: boolean;
    pushTime?: string;
    emailSent: boolean;
    emailTime?: string;
  };
}

export interface NotificationItem {
  id: string;
  type: 'donasi' | 'penyaluran' | 'relawan' | 'verifikasi' | 'laporan';
  title: string;
  message: string;
  timeAgo: string;
  timestamp: string;
  read: boolean;
  channel: 'push' | 'sms' | 'email';
  linkToTab?: string;
  metadata?: {
    receiptNumber?: string;
    amount?: number;
    campaignTitle?: string;
  };
}

export interface VerificationSubmission {
  id: string;
  milestoneId: string;
  submitterName: string;
  submitterRole: string;
  locationName: string;
  date: string;
  photoUrl: string;
  notes: string;
  itemsDistributed: string;
  recipientTotal: number;
  verifiedCount: number;
}

export interface ImpactLocationPoint {
  id: string;
  type: 'campaign' | 'distribution_point' | 'volunteer_post';
  title: string;
  category: CampaignCategory;
  categoryLabel: string;
  campaignId: string;
  campaignTitle: string;
  locationName: string;
  city: string;
  province: string;
  island: 'Sumatera' | 'Jawa' | 'Bali-Nusa' | 'Kalimantan' | 'Sulawesi' | 'Maluku-Papua';
  coordinates: [number, number]; // [latitude, longitude]
  status: 'aktif' | 'penyaluran' | 'terverifikasi' | 'siaga';
  statusLabel: string;
  beneficiariesReached: number;
  beneficiariesTarget: number;
  fundsSpent?: number;
  currentAmount?: number;
  targetAmount?: number;
  volunteersOnSite: number;
  latestUpdate: string;
  verifiedBy: string;
  gpsCoordsString: string;
  imageUrl: string;
  description: string;
  auditHash?: string;
  itemsDistributed?: string[];
  partnerOrg?: string;
}

export interface SedekahSubuhRecord {
  id: string;
  date: string; // e.g. "2026-09-18"
  time: string; // e.g. "04:38 WIB"
  amount: number;
  programTitle: string;
  programCategory: string;
  doaNiat: string;
  hajatType: string;
  status: 'sukses' | 'terjadwal';
  receiptNumber: string;
  beneficiaryImpact: string;
  blessingStreakDay: number;
  paymentMethod: string;
  isAutoDebit?: boolean;
  gatewayRef?: string;
}

export interface AutodebetGatewayConfig {
  gatewayId: 'bsi_direct' | 'gopay_token' | 'ovo_recurring' | 'shopeepay_debit' | 'card_syariah' | 'muamalat_debit';
  gatewayName: string;
  accountIdentifier: string; // e.g. "BSI Tabungan - 714****892" or "GoPay 0812-****-8891"
  mandateStatus: 'active' | 'paused' | 'pending';
  mandateNumber: string; // e.g. "MND-BSI-2026-88192"
  dailyLimit: number; // e.g. 50000
  registeredDate: string; // e.g. "10 September 2026"
  expiryDate?: string;
  isSyariahCertified: boolean;
  akadWakalahAgreed: boolean;
}

export interface AutodebetExecutionLog {
  id: string;
  date: string;
  time: string;
  amount: number;
  programTitle: string;
  gatewayName: string;
  gatewayRefNumber: string;
  receiptNumber: string;
  status: 'sukses' | 'gagal';
  notes?: string;
}

export interface SedekahSubuhConfig {
  enabled: boolean;
  reminderTiming: 'adzan' | '15_min_before' | 'after_subuh';
  reminderTimeStr: string; // e.g. "04:35"
  timeZone: 'WIB' | 'WITA' | 'WIT';
  city: string;
  soundAlert: boolean;
  channel: 'push' | 'whatsapp' | 'sms' | 'email';
  routineAutoDebit: boolean;
  routineAmount: number;
  routineTargetProgramId: string;
  routineHajat?: string;
  personalDoa: string;
  autoDebitTiming?: 'adzan_subuh' | 'qabliyah_15m' | 'dzikir_pagi';
  autoDebitStatus?: 'active' | 'paused' | 'inactive';
  autoDebitGateway?: AutodebetGatewayConfig;
  autoDebitExecutionLogs?: AutodebetExecutionLog[];
  nextExecutionTime?: string;
}

export interface SedekahSubuhStats {
  currentStreakDays: number;
  longestStreakDays: number;
  totalSubuhDonated: number;
  totalDaysParticipated: number;
  totalMustahikImpacted: number;
  fajrLevelBadge: {
    title: string;
    level: number;
    icon: string;
    nextTargetDays: number;
  };
}

export interface SedekahSubuhProgramTarget {
  id: string;
  title: string;
  tagline: string;
  category: string;
  beneficiaryDesc: string;
  suggestedAmounts: number[];
  icon: string;
}

export interface CurriculumLesson {
  id: string;
  title: string;
  durationMinutes: number;
  content: string[];
  keyTakeaways: string[];
  quranHadithRef?: {
    arabic?: string;
    translation: string;
    source: string;
  };
  caseStudy?: {
    scenario: string;
    solution: string;
    ethicalPrinciple: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  scenarioContext?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  dalilSyariah: string;
}

export interface VolunteerCourseModule {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: 'etika_syariah' | 'manajemen_sosial' | 'tanggap_bencana' | 'akuntabilitas_keuangan' | 'uji_kompetensi';
  categoryLabel: string;
  level: 'Dasar' | 'Menengah' | 'Lanjutan';
  durationMinutes: number;
  xpReward: number;
  isCompetencyExam?: boolean;
  passingScorePercentage?: number;
  badgeReward?: {
    name: string;
    icon: string;
    level: 'bronze' | 'silver' | 'gold' | 'platinum';
    description: string;
  };
  icon: string;
  colorScheme: {
    badgeBg: string;
    accent: string;
    gradient: string;
  };
  overview: string;
  objectives: string[];
  lessons: CurriculumLesson[];
  quiz: QuizQuestion[];
  prerequisiteModuleId?: string;
  certificateTitle: string;
}

export interface VolunteerCourseProgress {
  moduleId: string;
  completed: boolean;
  score: number;
  completedAt?: string;
  xpEarned: number;
  certificateCode?: string;
}
