import { SedekahSubuhProgramTarget, SedekahSubuhRecord, SedekahSubuhConfig, SedekahSubuhStats } from '../types';

export const INITIAL_SUBUH_PROGRAMS: SedekahSubuhProgramTarget[] = [
  {
    id: 'subuh-santri-sarapan',
    title: 'Sarapan Berkah Santri Yatim Penghafal Al-Qur’an',
    tagline: 'Asupan nutrisi fajar bernutrisi untuk para mujahid Qur’ani',
    category: 'pendidikan',
    beneficiaryDesc: '1 Porsi sarapan hangat bergizi (telur, susu segar, & nasi uduk/bubur ayam) seharga Rp 10.000',
    suggestedAmounts: [5000, 10000, 25000, 50000, 100000],
    icon: '🥣'
  },
  {
    id: 'subuh-dapur-ummat',
    title: 'Dapur Hangat & Roti Fajar Dhuafa Lansia & Buruh Pagi',
    tagline: 'Mengantarkan senyum hangat pejuang nafkah subuh & lansia sebatang kara',
    category: 'pangan',
    beneficiaryDesc: 'Paket teh hangat manis, roti gandum/nasi bungkus bagi pemulung, kuli panggul, & lansia subuh',
    suggestedAmounts: [5000, 15000, 30000, 60000, 120000],
    icon: '🍞'
  },
  {
    id: 'subuh-air-bersih',
    title: 'Wakaf Air Bersih Wudhu Subuh Musholla Pelosok Karst',
    tagline: 'Mengalirkan pahala jariyah setiap tetes wudhu sholat fajar jamaah dhuafa',
    category: 'wakaf',
    beneficiaryDesc: 'Pemeliharaan pompa tenaga surya & pipanisasi air jernih untuk jamaah sholat subuh di pelosok',
    suggestedAmounts: [10000, 20000, 50000, 100000, 250000],
    icon: '💧'
  },
  {
    id: 'subuh-darurat-bencana',
    title: 'Logistik Darurat & Susu Bayi Korban Bencana Pagi Hari',
    tagline: 'Kesiapsiagaan dapur umum sebelum matahari terbit di tenda pengungsian',
    category: 'bencana',
    beneficiaryDesc: 'Pasokan makanan bayi, bubur hangat balita, dan air mineral siap minum di posko bencana',
    suggestedAmounts: [10000, 25000, 50000, 100000, 200000],
    icon: '🚨'
  }
];

export const FAJAR_SCHEDULE_CITIES = [
  { city: 'Jakarta & Sekitarnya (WIB)', zone: 'WIB' as const, fajarTime: '04:35', syuruqTime: '05:48' },
  { city: 'Bandung & Jawa Barat (WIB)', zone: 'WIB' as const, fajarTime: '04:32', syuruqTime: '05:46' },
  { city: 'Semarang & Solo (WIB)', zone: 'WIB' as const, fajarTime: '04:21', syuruqTime: '05:35' },
  { city: 'Surabaya & Jatim (WIB)', zone: 'WIB' as const, fajarTime: '04:12', syuruqTime: '05:27' },
  { city: 'Medan & Sumut (WIB)', zone: 'WIB' as const, fajarTime: '04:58', syuruqTime: '06:14' },
  { city: 'Padang & Sumbar (WIB)', zone: 'WIB' as const, fajarTime: '04:54', syuruqTime: '06:08' },
  { city: 'Banjarmasin & Kalsel (WITA)', zone: 'WITA' as const, fajarTime: '05:04', syuruqTime: '06:18' },
  { city: 'Makassar & Sulsel (WITA)', zone: 'WITA' as const, fajarTime: '04:47', syuruqTime: '06:01' },
  { city: 'Denpasar & Bali (WITA)', zone: 'WITA' as const, fajarTime: '04:59', syuruqTime: '06:15' },
  { city: 'Mataram & Lombok (WITA)', zone: 'WITA' as const, fajarTime: '04:56', syuruqTime: '06:12' },
  { city: 'Ambon & Maluku (WIT)', zone: 'WIT' as const, fajarTime: '05:08', syuruqTime: '06:22' },
  { city: 'Jayapura & Papua (WIT)', zone: 'WIT' as const, fajarTime: '04:22', syuruqTime: '05:36' }
];

export interface AutodebetGatewayOption {
  id: 'bsi_direct' | 'gopay_token' | 'ovo_recurring' | 'shopeepay_debit' | 'card_syariah' | 'muamalat_debit';
  name: string;
  provider: string;
  badge: string;
  description: string;
  fee: string;
  minAmount: number;
  icon: string;
  syariahBasis: string;
  sampleAccount: string;
}

export const AUTODEBET_GATEWAY_OPTIONS: AutodebetGatewayOption[] = [
  {
    id: 'bsi_direct',
    name: 'BSI Direct Debit (Bank Syariah Indonesia)',
    provider: 'PT Bank Syariah Indonesia Tbk',
    badge: 'Pilihan Utama Syariah',
    description: 'Pendebetan otomatis langsung dari saldo rekening tabungan BSI (Wadiah / Mudharabah)',
    fee: 'Rp 0 (0% Gratis)',
    minAmount: 2000,
    icon: '🏦',
    syariahBasis: 'Fatwa DSN-MUI No. 112/DSN-MUI/IX/2017 (Akad Wakalah bil Ujrah 0%)',
    sampleAccount: 'BSI Tabungan Easy Wadiah - 7149••••3291'
  },
  {
    id: 'gopay_token',
    name: 'GoPay Recurring / Auto-Deduction',
    provider: 'PT Dompet Anak Bangsa (GoTo Financial)',
    badge: 'Instan 1x Otorisasi',
    description: 'Debet otomatis saldo GoPay setiap fajar tanpa perlu buka aplikasi dan ketik PIN',
    fee: 'Rp 0 (0% Gratis)',
    minAmount: 2000,
    icon: '🟢',
    syariahBasis: 'Fatwa DSN-MUI No. 116/DSN-MUI/IX/2017 (Uang Elektronik Syariah)',
    sampleAccount: 'GoPay Amanah - 0812-••••-8891'
  },
  {
    id: 'ovo_recurring',
    name: 'OVO Smart Auto-Debit',
    provider: 'PT Visionet Internasional (OVO)',
    badge: 'E-Wallet Favorit',
    description: 'Potong saldo OVO Cash otomatis saat adzan berkumandang tanpa jeda',
    fee: 'Rp 0 (0% Gratis)',
    minAmount: 5000,
    icon: '🟣',
    syariahBasis: 'Kepatuhan Syariah OJK & Fatwa DSN-MUI',
    sampleAccount: 'OVO Cash - 0857-••••-4102'
  },
  {
    id: 'shopeepay_debit',
    name: 'ShopeePay Auto-Debit Syariah',
    provider: 'PT AirPay International Indonesia',
    badge: 'Praktis & Terhubung',
    description: 'Penyaluran sedekah fajar terjadwal dari dompet ShopeePay syariah',
    fee: 'Rp 0 (0% Gratis)',
    minAmount: 2000,
    icon: '🟠',
    syariahBasis: 'Akad Wakalah Bil Infaq & Bebas Riba',
    sampleAccount: 'ShopeePay - 0813-••••-7719'
  },
  {
    id: 'card_syariah',
    name: 'Kartu Debit / Hasanah Card Syariah (Visa/Mastercard)',
    provider: 'Jaringan Perbankan Syariah Indonesia',
    badge: 'Tokenisasi PCI-DSS',
    description: 'Otorisasi token kartu debit perbankan syariah berlogo GPN / Visa / Mastercard',
    fee: 'Rp 0 (0% Gratis)',
    minAmount: 10000,
    icon: '💳',
    syariahBasis: 'Prinsip Kartu Syariah (Kafalah, Qardh, & Ijarah Bebas Bunga)',
    sampleAccount: 'Kartu Syariah - 4219 •••• •••• 9812'
  },
  {
    id: 'muamalat_debit',
    name: 'Bank Muamalat Direct Debit',
    provider: 'PT Bank Muamalat Indonesia Tbk',
    badge: 'Pelopor Bank Syariah',
    description: 'Autodebet rekening Bank Muamalat pertama di Indonesia dengan akad amanah',
    fee: 'Rp 0 (0% Gratis)',
    minAmount: 5000,
    icon: '🏛️',
    syariahBasis: 'Kepatuhan Penuh Syariah DSN-MUI & OJK',
    sampleAccount: 'Muamalat Shar-E - 1020••••5581'
  }
];

export const INITIAL_SUBUH_CONFIG: SedekahSubuhConfig = {
  enabled: true,
  reminderTiming: 'adzan',
  reminderTimeStr: '04:35',
  timeZone: 'WIB',
  city: 'Jakarta & Sekitarnya (WIB)',
  soundAlert: true,
  channel: 'push',
  routineAutoDebit: true,
  routineAmount: 10000,
  routineTargetProgramId: 'subuh-santri-sarapan',
  routineHajat: 'Kelancaran Rezeki Halal & Bebas Hutang',
  personalDoa: 'Ya Allah, berkahilah rezeki keluargaku, sembuhkanlah orang tuaku, dan lapangkanlah pintu rezeki yang halal lagi thoyyib.',
  autoDebitTiming: 'adzan_subuh',
  autoDebitStatus: 'active',
  autoDebitGateway: {
    gatewayId: 'bsi_direct',
    gatewayName: 'BSI Direct Debit (Bank Syariah Indonesia)',
    accountIdentifier: 'BSI Tabungan Easy Wadiah - 7149••••3291',
    mandateStatus: 'active',
    mandateNumber: 'MND-BSI-2026-88192',
    dailyLimit: 50000,
    registeredDate: '01 September 2026',
    expiryDate: '31 Desember 2027',
    isSyariahCertified: true,
    akadWakalahAgreed: true
  },
  nextExecutionTime: 'Besok Fajar, 04:35 WIB (Tepat Adzan Subuh)',
  autoDebitExecutionLogs: [
    {
      id: 'adb-log-03',
      date: '2026-09-18',
      time: '04:35 WIB',
      amount: 10000,
      programTitle: 'Sarapan Berkah Santri Yatim Penghafal Al-Qur’an',
      gatewayName: 'BSI Direct Debit',
      gatewayRefNumber: 'BSI-TXN-20260918-043511',
      receiptNumber: 'SBS-20260918-0435-01',
      status: 'sukses',
      notes: 'Autodebet fajar otomatis berhasil tanpa jeda saat adzan subuh Jakarta.'
    },
    {
      id: 'adb-log-02',
      date: '2026-09-17',
      time: '04:35 WIB',
      amount: 10000,
      programTitle: 'Sarapan Berkah Santri Yatim Penghafal Al-Qur’an',
      gatewayName: 'BSI Direct Debit',
      gatewayRefNumber: 'BSI-TXN-20260917-043509',
      receiptNumber: 'SBS-20260917-0435-02',
      status: 'sukses',
      notes: 'Autodebet fajar harian rutin.'
    },
    {
      id: 'adb-log-01',
      date: '2026-09-16',
      time: '04:35 WIB',
      amount: 10000,
      programTitle: 'Sarapan Berkah Santri Yatim Penghafal Al-Qur’an',
      gatewayName: 'BSI Direct Debit',
      gatewayRefNumber: 'BSI-TXN-20260916-043508',
      receiptNumber: 'SBS-20260916-0435-03',
      status: 'sukses',
      notes: 'Autodebet fajar harian rutin perdana.'
    }
  ]
};

export const INITIAL_SUBUH_RECORDS: SedekahSubuhRecord[] = [
  {
    id: 'subuh-rec-14',
    date: '2026-09-18',
    time: '04:35 WIB',
    amount: 10000,
    programTitle: 'Sarapan Berkah Santri Yatim Penghafal Al-Qur’an',
    programCategory: 'pendidikan',
    doaNiat: 'Bismillah sedekah subuh otomatis untuk kelancaran rezeki halal & perlindungan keluarga.',
    hajatType: 'Kelancaran Rezeki Halal & Bebas Hutang',
    status: 'sukses',
    receiptNumber: 'SBS-20260918-0435-01',
    beneficiaryImpact: '1 Porsi sarapan bergizi santri tahfidz tersalurkan otomatis',
    blessingStreakDay: 14,
    paymentMethod: 'BSI Direct Debit',
    isAutoDebit: true,
    gatewayRef: 'BSI-TXN-20260918-043511'
  },
  {
    id: 'subuh-rec-13',
    date: '2026-09-17',
    time: '04:35 WIB',
    amount: 10000,
    programTitle: 'Sarapan Berkah Santri Yatim Penghafal Al-Qur’an',
    programCategory: 'pendidikan',
    doaNiat: 'Bismillah sedekah subuh otomatis untuk kelancaran rezeki halal & perlindungan keluarga.',
    hajatType: 'Kelancaran Rezeki Halal & Bebas Hutang',
    status: 'sukses',
    receiptNumber: 'SBS-20260917-0435-02',
    beneficiaryImpact: '1 Porsi sarapan bergizi santri tahfidz tersalurkan otomatis',
    blessingStreakDay: 13,
    paymentMethod: 'BSI Direct Debit',
    isAutoDebit: true,
    gatewayRef: 'BSI-TXN-20260917-043509'
  },
  {
    id: 'subuh-rec-12b',
    date: '2026-09-16',
    time: '04:35 WIB',
    amount: 10000,
    programTitle: 'Sarapan Berkah Santri Yatim Penghafal Al-Qur’an',
    programCategory: 'pendidikan',
    doaNiat: 'Bismillah sedekah subuh otomatis untuk kelancaran rezeki halal & perlindungan keluarga.',
    hajatType: 'Kelancaran Rezeki Halal & Bebas Hutang',
    status: 'sukses',
    receiptNumber: 'SBS-20260916-0435-03',
    beneficiaryImpact: '1 Porsi sarapan bergizi santri tahfidz tersalurkan otomatis',
    blessingStreakDay: 12,
    paymentMethod: 'BSI Direct Debit',
    isAutoDebit: true,
    gatewayRef: 'BSI-TXN-20260916-043508'
  },
  {
    id: 'subuh-rec-13',
    date: '2026-09-17',
    time: '04:39 WIB',
    amount: 15000,
    programTitle: 'Dapur Hangat & Roti Fajar Dhuafa Lansia',
    programCategory: 'pangan',
    doaNiat: 'Semoga Allah mengampuni dosa kedua orang tua kami dan mengangkat penyakit ibunda.',
    hajatType: 'Kesembuhan Orang Tua',
    status: 'sukses',
    receiptNumber: 'SBS-20260917-0439-842',
    beneficiaryImpact: 'Paket teh hangat & sarapan 2 lansia sebatang kara',
    blessingStreakDay: 13,
    paymentMethod: 'GoPay Amanah'
  },
  {
    id: 'subuh-rec-12',
    date: '2026-09-16',
    time: '04:45 WIB',
    amount: 50000,
    programTitle: 'Wakaf Air Bersih Wudhu Subuh Musholla Pelosok',
    programCategory: 'wakaf',
    doaNiat: 'Pahala sedekah ini dihadiahkan untuk almarhum ayahanda tercinta.',
    hajatType: 'Wakaf Jariyah Orang Tua Wafat',
    status: 'sukses',
    receiptNumber: 'SBS-20260916-0445-711',
    beneficiaryImpact: 'Pasokan air wudhu 50 liter jamaah subuh desa karst',
    blessingStreakDay: 12,
    paymentMethod: 'BSI Virtual Account'
  },
  {
    id: 'subuh-rec-11',
    date: '2026-09-15',
    time: '04:36 WIB',
    amount: 10000,
    programTitle: 'Sarapan Berkah Santri Yatim Penghafal Al-Qur’an',
    programCategory: 'pendidikan',
    doaNiat: 'Ya Rabb, mudahkanlah urusan pekerjaan dan jadikan anak-anak kami sholeh & sholehah.',
    hajatType: 'Anak Shalih & Karir Berkah',
    status: 'sukses',
    receiptNumber: 'SBS-20260915-0436-630',
    beneficiaryImpact: '1 Paket sarapan telur & susu santri yatim',
    blessingStreakDay: 11,
    paymentMethod: 'QRIS Syariah'
  },
  {
    id: 'subuh-rec-10',
    date: '2026-09-14',
    time: '04:40 WIB',
    amount: 25000,
    programTitle: 'Logistik Darurat & Susu Bayi Korban Bencana Pagi',
    programCategory: 'bencana',
    doaNiat: 'Perlindungan dari bala dan musibah untuk negeri tercinta.',
    hajatType: 'Tolak Bala & Keselamatan',
    status: 'sukses',
    receiptNumber: 'SBS-20260914-0440-502',
    beneficiaryImpact: '1 Kaleng susu bayi & bubur hangat di posko bencana',
    blessingStreakDay: 10,
    paymentMethod: 'ShopeePay Syariah'
  },
  {
    id: 'subuh-rec-9',
    date: '2026-09-13',
    time: '04:38 WIB',
    amount: 10000,
    programTitle: 'Sarapan Berkah Santri Yatim Penghafal Al-Qur’an',
    programCategory: 'pendidikan',
    doaNiat: 'Bismillah fajar penuh berkah.',
    hajatType: 'Rezeki & Berkah Keluarga',
    status: 'sukses',
    receiptNumber: 'SBS-20260913-0438-419',
    beneficiaryImpact: '1 Porsi sarapan bergizi santri',
    blessingStreakDay: 9,
    paymentMethod: 'QRIS Syariah'
  },
  {
    id: 'subuh-rec-8',
    date: '2026-09-12',
    time: '04:47 WIB',
    amount: 10000,
    programTitle: 'Dapur Hangat & Roti Fajar Dhuafa Lansia',
    programCategory: 'pangan',
    doaNiat: 'Semoga diberikan hati yang lapang dan istiqomah dalam kebaikan.',
    hajatType: 'Ketenangan Hati & Hidayah',
    status: 'sukses',
    receiptNumber: 'SBS-20260912-0447-388',
    beneficiaryImpact: 'Sarapan pagi 1 lansia dhuafa',
    blessingStreakDay: 8,
    paymentMethod: 'QRIS Syariah'
  }
];

export const INITIAL_SUBUH_STATS: SedekahSubuhStats = {
  currentStreakDays: 14,
  longestStreakDays: 21,
  totalSubuhDonated: 385000,
  totalDaysParticipated: 28,
  totalMustahikImpacted: 42,
  fajrLevelBadge: {
    title: 'Mujahid Fajar Istiqomah',
    level: 3,
    icon: '🌅',
    nextTargetDays: 20
  }
};

export const SUBUH_HAJAT_TEMPLATES = [
  'Kelancaran Rezeki Halal & Bebas Hutang',
  'Kesembuhan Orang Tua / Keluarga yang Sakit',
  'Anak Shalih & Shalihah Penghafal Al-Qur’an',
  'Kemudahan Urusan Usaha / Pekerjaan Hari Ini',
  'Ketenangan Rumah Tangga & Sakinah',
  'Sedekah Jariyah Mengalir untuk Almarhum/ah',
  'Hajat Khusus & Tolak Bala'
];

export const FAJAR_HADITH = {
  arabic: 'مَا مِنْ يَوْمٍ يُصْبِحُ الْعِبَادُ فِيهِ إِلَّا مَلَكَانِ يَنْزِلَانِ فَيَقُولُ أَحَدُهُمَا: اللَّهُمَّ أَعْطِ مُنْفِقًا خَلَفًا، وَيَقُولُ الْآخَرُ: اللَّهُمَّ أَعْطِ مُمْسِكًا تَلَفًا',
  translation: 'Tidak ada satu subuh pun yang dialami hamba-hamba Allah kecuali turun kepada mereka dua malaikat. Salah satu di antara keduanya berdoa: "Ya Allah, berikanlah ganti (keberkahan yang berlipat ganda) bagi orang yang berinfak." Sedangkan malaikat yang satunya lagi berdoa: "Ya Allah, berikanlah kebinasaan/kebangkrutan bagi orang yang menahan hartanya (bakhil)."',
  narrator: 'Hadits Shahih Bukhari No. 1442 & Muslim No. 1010'
};
