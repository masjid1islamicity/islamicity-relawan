import { Campaign, ImpactMilestone, VolunteerRole, DonationTransaction, NotificationItem, VolunteerProfile } from '../types';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Dapur Ummat & Logistik Siaga Banjir & Longsor Sumatera',
    slug: 'dapur-ummat-banjir-sumatera',
    category: 'bencana',
    categoryLabel: 'Tanggap Bencana',
    targetAmount: 350000000,
    currentAmount: 289450000,
    donorCount: 1420,
    volunteerCount: 48,
    targetVolunteers: 60,
    location: 'Kab. Pesisir Selatan & Padang Pariaman, Sumbar',
    partnerOrg: 'Lembaga Manajemen Infaq & Relawan Siaga Bencana',
    startDate: '2026-08-01',
    endDate: '2026-10-30',
    status: 'penyaluran',
    description: 'Penyediaan makanan siap santap 3.500 porsi/hari, obat-obatan darurat, pakaian bersih, dan evakuasi lansia serta balita korban banjir bandang di wilayah terisolir.',
    islamicValues: "Amanah Penyaluran & Ukhuwah Islamiyah (Ta'awun 'alal Birri wat Taqwa)",
    urgencyLevel: 'tinggi',
    verifiedBadges: ['Audit Syariah BAZNAS', 'Verifikasi GPS Lapangan', 'Akuntabilitas Real-time'],
    coverImage: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Siaga Bencana', 'Dapur Air', 'Evakuasi Balita', 'Sembako Darurat'],
    beneficiariesTarget: 5000,
    beneficiariesReached: 3840
  },
  {
    id: 'camp-2',
    title: 'Beasiswa Santri Yatim Dhuafa Penghafal Al-Qur’an 30 Juz',
    slug: 'beasiswa-santri-dhuafa-quran',
    category: 'pendidikan',
    categoryLabel: 'Pendidikan Islami',
    targetAmount: 200000000,
    currentAmount: 182500000,
    donorCount: 980,
    volunteerCount: 22,
    targetVolunteers: 25,
    location: 'Pesantren Tahfidz Pelosok Lebak & Sukabumi',
    partnerOrg: 'Yayasan Bina Generasi Qurani & Asosiasi Relawan Guru',
    startDate: '2026-07-15',
    endDate: '2026-11-20',
    status: 'aktif',
    description: 'Membiayai kebutuhan makan bergizi, kitab, perlengkapan belajar, dan kesehatan 120 santri yatim penghafal Al-Qur’an agar dapat menuntaskan hafalan mutqin tanpa kendala biaya.',
    islamicValues: "Shadaqah Jariyah & Memuliakan Ahlul Qur'an",
    urgencyLevel: 'sedang',
    verifiedBadges: ['Verifikasi Data Kemensos/SIMBA', 'Laporan Akademik Bulanan'],
    coverImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Tahfidz Quran', 'Yatim Dhuafa', 'Beasiswa Santri', 'Pendidikan'],
    beneficiariesTarget: 120,
    beneficiariesReached: 98
  },
  {
    id: 'camp-3',
    title: 'Wakaf Sumur Bor & Instalasi Air Bersih Desa Kekeringan',
    slug: 'wakaf-sumur-bor-kekeringan',
    category: 'wakaf',
    categoryLabel: 'Wakaf Produktif & Air',
    targetAmount: 175000000,
    currentAmount: 161200000,
    donorCount: 740,
    volunteerCount: 18,
    targetVolunteers: 20,
    location: 'Desa Tepus & Girisubo, Gunungkidul, D.I. Yogyakarta',
    partnerOrg: 'Badan Wakaf Air Ummat & Ikatan Ahli Geologi Relawan',
    startDate: '2026-06-01',
    endDate: '2026-10-15',
    status: 'penyaluran',
    description: 'Pengeboran sumur sedalam 90 meter menembus batuan karst, bak penampungan 15.000 liter, dan pipanisasi gravitasi ke 320 KK mustahik yang mengalami krisis air menahun.',
    islamicValues: "Amalan Terbaik: Memberi Sedekah Air (Afdholush Shodaqoh Saqyal Maa')",
    urgencyLevel: 'tinggi',
    verifiedBadges: ['Sertifikasi Uji Lab Air Sehat', 'Musyawarah Warga & BPD'],
    coverImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Wakaf Air', 'Sumur Bor', 'Gunungkidul', 'Air Bersih'],
    beneficiariesTarget: 1500,
    beneficiariesReached: 1280
  },
  {
    id: 'camp-4',
    title: 'Layanan Ambulans & Pengobatan Gratis Dhuafa Terpencil',
    slug: 'ambulans-kesehatan-gratis-mustahik',
    category: 'kesehatan',
    categoryLabel: 'Kesehatan Mustahik',
    targetAmount: 120000000,
    currentAmount: 94800000,
    donorCount: 520,
    volunteerCount: 30,
    targetVolunteers: 35,
    location: 'Kecamatan Cidaun & Sindangbarang, Cianjur Selatan',
    partnerOrg: 'Bulan Sabit Merah Relawan & Tim Medis Muslim Nusantara',
    startDate: '2026-08-10',
    endDate: '2026-12-31',
    status: 'aktif',
    description: 'Operasional armada mobil ambulans siaga 24 jam, pemeriksaan dokter umum, pembagian vitamin lansia, dan layanan antar jemput rujukan RSUD untuk keluarga pra-sejahtera.',
    islamicValues: "Menjaga Jiwa (Hifzhun Nafs) & Kasih Sayang Antar Mukmin",
    urgencyLevel: 'sedang',
    verifiedBadges: ['Tenaga Medis SIP Terverifikasi', 'Pelacakan GPS Ambulans'],
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ambulans Gratis', 'Layanan Medis', 'Lansia Dhuafa', 'Gawat Darurat'],
    beneficiariesTarget: 2200,
    beneficiariesReached: 1640
  },
  {
    id: 'camp-5',
    title: 'Zakat Maal Produktif Modal Usaha Gerobak Berkah Mandiri',
    slug: 'zakat-maal-modal-usaha-mandiri',
    category: 'zakat',
    categoryLabel: 'Zakat Produktif',
    targetAmount: 250000000,
    currentAmount: 215000000,
    donorCount: 890,
    volunteerCount: 16,
    targetVolunteers: 20,
    location: 'Solo Raya & Klaten, Jawa Tengah',
    partnerOrg: 'Baitul Maal wat Tamwil (BMT) Amanah Ummat',
    startDate: '2026-05-01',
    endDate: '2026-11-01',
    status: 'penyaluran',
    description: 'Transformasi Mustahik menjadi Muzaki: penyaluran zakat produktif berupa modal gerobak jualan higienis, pelatihan manajemen kas, dan pendampingan syariah tanpa riba.',
    islamicValues: 'Mengubah Mustahik Menjadi Muzaki (Tazkiyatun Nufus wal Amwal)',
    urgencyLevel: 'reguler',
    verifiedBadges: ['Survei Kelayakan 8 Asnaf', 'Pendampingan Mentor 6 Bulan'],
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Zakat Maal', 'Modal Usaha', 'Bebas Riba', 'Pemberdayaan'],
    beneficiariesTarget: 80,
    beneficiariesReached: 64
  }
];

export const INITIAL_MILESTONES: ImpactMilestone[] = [
  {
    id: 'mile-101',
    campaignId: 'camp-1',
    campaignTitle: 'Dapur Ummat & Logistik Siaga Banjir & Longsor Sumatera',
    title: 'Distribusi 1.200 Paket Makanan Hangat & Air Mineral ke Nagari Barung-Barung Balantai',
    description: 'Relawan menembus jalur lumpur dengan perahu karet dan motor trail untuk menyalurkan makanan siap santap higienis dan paket popok balita.',
    timestamp: '2026-09-16 14:30 WIB',
    location: 'Posko Siaga Nagari Barung, Pesisir Selatan',
    gpsCoords: '-1.3412, 100.5823',
    stage: 'penyaluran',
    spentAmount: 36000000,
    beneficiariesCount: 1200,
    proofImages: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80'
    ],
    verifiedByCommunity: {
      votesValid: 38,
      votesReview: 1,
      status: 'terverifikasi',
      verifierNames: ['Ust. Fauzi Rahman (Tokoh Adat)', 'dr. Siti Rahma (Relawan Medis)', 'Ahmad Zaki (Koordinator Lapangan)']
    },
    blockchainHash: '0x8f9c2a...e71d (Tamper-Proof Audit Hash)',
    receiptNumber: 'RC-SUMBAR-2026-0916'
  },
  {
    id: 'mile-102',
    campaignId: 'camp-3',
    campaignTitle: 'Wakaf Sumur Bor & Instalasi Air Bersih Desa Kekeringan',
    title: 'Pengeboran Mencapai Kedalaman 82 Meter & Uji Debit Air Bersih 2.4 Liter/Detik',
    description: 'Alhamdulillah air tawar melimpah berhasil ditemukan di lapisan akuifer karst. Dilanjutkan instalasi pompa submersible tenaga surya 1.5 HP.',
    timestamp: '2026-09-15 11:15 WIB',
    location: 'Dusun Blekonang, Tepus, Gunungkidul',
    gpsCoords: '-8.1294, 110.6381',
    stage: 'pengadaan',
    spentAmount: 52000000,
    beneficiariesCount: 780,
    proofImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80'
    ],
    verifiedByCommunity: {
      votesValid: 42,
      votesReview: 0,
      status: 'terverifikasi',
      verifierNames: ['Bpk. Suryanto (Ketua RW 04)', 'Ir. Wahyu Hidayat (Relawan Ahli Geohidrologi)', 'Hj. Mardiyah (Muzaki Pengawas)']
    },
    blockchainHash: '0x3d41fe...a90b (Tamper-Proof Audit Hash)',
    receiptNumber: 'RC-WAKAF-2026-0915'
  },
  {
    id: 'mile-103',
    campaignId: 'camp-5',
    campaignTitle: 'Zakat Maal Produktif Modal Usaha Gerobak Berkah Mandiri',
    title: 'Penyerahan 15 Unit Gerobak Berkah & Modal Awal Rp 3.000.000 per Mustahik Asnaf Miskin',
    description: 'Mustahik pedagang kaki lima menerima etalase dagang higienis, bimbingan pencatatan kas harian dan akad qardhul hasan syariah.',
    timestamp: '2026-09-14 09:45 WIB',
    location: 'Halaman Masjid Agung Solo, Surakarta',
    gpsCoords: '-7.5755, 110.8243',
    stage: 'penyaluran',
    spentAmount: 48000000,
    beneficiariesCount: 15,
    proofImages: [
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80'
    ],
    verifiedByCommunity: {
      votesValid: 29,
      votesReview: 0,
      status: 'terverifikasi',
      verifierNames: ['K.H. Syamsul Huda (Dewan Pengawas Syariah)', 'Tri Wibowo (Asosiasi Pedagang)']
    },
    blockchainHash: '0x11ab44...cc89 (Tamper-Proof Audit Hash)',
    receiptNumber: 'RC-ZAKAT-2026-0914'
  }
];

export const INITIAL_ROLES: VolunteerRole[] = [
  {
    id: 'role-1',
    campaignId: 'camp-1',
    roleTitle: 'Relawan Distribusi Dapur Air & Evakuasi Perahu Karet',
    skillsNeeded: ['Kebugaran Fisik', 'Bisa Berenang', 'Pertolongan Pertama (P3K)', 'Kerjasama Tim'],
    slotsNeeded: 20,
    slotsFilled: 16,
    location: 'Pesisir Selatan & Padang Pariaman',
    dateRange: '18 - 25 Sept 2026',
    timeCommitment: 'Shift 6 Jam / Hari (Konsumsi & Transportasi Ditanggung)',
    dutySummary: 'Membantu pengemasan nasi bungkus higienis dan mengantar paket menggunakan perahu karet ke posko desa terisolir.',
    ethicsPledge: 'Menjunjung tinggi kehormatan penerima bantuan, bersikap santun, dan menjaga amanah titipan donatur.'
  },
  {
    id: 'role-2',
    campaignId: 'camp-4',
    roleTitle: 'Relawan Perawat & Asisten Dokter Posko Keliling',
    skillsNeeded: ['Lulusan Keperawatan/Kebidanan/Kedokteran', 'Cek Tekanan Darah & GDS', 'Empati Tinggi'],
    slotsNeeded: 10,
    slotsFilled: 7,
    location: 'Cianjur Selatan (Puskesmas Cidaun)',
    dateRange: '20 - 27 Sept 2026',
    timeCommitment: 'Sabtu & Ahad (Weekend Camp Medis)',
    dutySummary: 'Melakukan skrining tensi darah, gula darah, membagikan vitamin kepada lansia, dan mendampingi dokter spesialis.',
    ethicsPledge: 'Ikhlas melayani mustahik tanpa membeda-bedakan latar belakang sosial.'
  },
  {
    id: 'role-3',
    campaignId: 'camp-2',
    roleTitle: 'Mentor Relawan Literasi & Karakter Santri Tahfidz',
    skillsNeeded: ['Mengajar Al-Qur’an/Tajwid', 'Bahasa Arab Dasar', 'Public Speaking Ramah Anak'],
    slotsNeeded: 8,
    slotsFilled: 5,
    location: 'Lebak, Banten (Hybrid / On-site)',
    dateRange: 'Mulai 25 Sept 2026 (Berkelanjutan)',
    timeCommitment: '4 Jam / Pekan',
    dutySummary: 'Membimbing motivasi menghafal Al-Qur’an, memberikan pelajaran inspirasi sains islami, dan mengajar Bahasa Inggris ringan.',
    ethicsPledge: 'Menjadi teladan akhlak mulia bagi generasi penerus bangsa.'
  }
];

export const INITIAL_TRANSACTIONS: DonationTransaction[] = [
  {
    id: 'trx-1001',
    receiptNumber: 'BSZ-202609-0091',
    campaignId: 'camp-1',
    campaignTitle: 'Dapur Ummat & Logistik Siaga Banjir & Longsor Sumatera',
    donorName: 'H. Muhammad Arifin',
    donorEmail: 'arifin.muhammad@gmail.com',
    donorPhone: '081288992341',
    isAnonymous: false,
    donationType: 'zakat_maal',
    amount: 2500000,
    adminFee: 0,
    totalPaid: 2500000,
    paymentMethod: 'qris',
    paymentStatus: 'tersalurkan',
    doaOrNotes: 'Semoga menjadi pembersih harta dan meringankan beban saudara-saudara kita di Sumbar.',
    timestamp: '2026-09-16 16:20:12',
    taxDeductible: true,
    txHash: '0x94f01b7a2d4838e8ac',
    notificationLog: {
      smsSent: true,
      smsTime: '2026-09-16 16:20:15',
      pushSent: true,
      pushTime: '2026-09-16 16:20:13',
      emailSent: true,
      emailTime: '2026-09-16 16:20:18'
    }
  },
  {
    id: 'trx-1002',
    receiptNumber: 'BSZ-202609-0092',
    campaignId: 'camp-3',
    campaignTitle: 'Wakaf Sumur Bor & Instalasi Air Bersih Desa Kekeringan',
    donorName: 'Hamba Allah',
    donorEmail: 'masjid1.islamicity@gmail.com',
    donorPhone: '081399881122',
    isAnonymous: true,
    donationType: 'wakaf',
    amount: 1000000,
    adminFee: 0,
    totalPaid: 1000000,
    paymentMethod: 'bsi_va',
    paymentStatus: 'tersalurkan',
    doaOrNotes: 'Pahala diniatkan untuk almarhumah ibunda tercinta.',
    timestamp: '2026-09-16 17:05:44',
    taxDeductible: true,
    txHash: '0x71ba92c45ee901fa12',
    notificationLog: {
      smsSent: true,
      smsTime: '2026-09-16 17:05:47',
      pushSent: true,
      pushTime: '2026-09-16 17:05:45',
      emailSent: true,
      emailTime: '2026-09-16 17:05:50'
    }
  },
  {
    id: 'trx-1003',
    receiptNumber: 'BSZ-202609-0093',
    campaignId: 'camp-5',
    campaignTitle: 'Zakat Maal Produktif Modal Usaha Gerobak Berkah Mandiri',
    donorName: 'Dr. Hj. Nurul Fadhilah',
    donorEmail: 'nurul.fadhilah@fk-alumni.ac.id',
    donorPhone: '085712345678',
    isAnonymous: false,
    donationType: 'zakat_maal',
    amount: 5000000,
    adminFee: 0,
    totalPaid: 5000000,
    paymentMethod: 'gopay',
    paymentStatus: 'tersalurkan',
    doaOrNotes: 'Semoga mustahik penerima lekas mandiri dan usahanya diberkahi Allah SWT.',
    timestamp: '2026-09-17 08:14:02',
    taxDeductible: true,
    txHash: '0x33cb82ef998022a101',
    notificationLog: {
      smsSent: true,
      smsTime: '2026-09-17 08:14:05',
      pushSent: true,
      pushTime: '2026-09-17 08:14:03',
      emailSent: true,
      emailTime: '2026-09-17 08:14:10'
    }
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'penyaluran',
    title: 'Penyaluran Berhasil: Dapur Ummat Nagari Barung',
    message: 'Donasi Anda telah disalurkan menjadi 1.200 porsi makanan hangat bagi korban banjir bandang di Kab. Pesisir Selatan.',
    timeAgo: '10 menit lalu',
    timestamp: '2026-09-17 08:45 WIB',
    read: false,
    channel: 'push',
    linkToTab: 'tracking'
  },
  {
    id: 'notif-2',
    type: 'donasi',
    title: 'Pembayaran Zakat Maal Digital Berhasil Terenkripsi',
    message: 'Resi Resmi BSZ-202609-0093 sebesar Rp 5.000.000 telah diterbitkan dan tercatat di buku kas transparan.',
    timeAgo: '45 menit lalu',
    timestamp: '2026-09-17 08:14 WIB',
    read: false,
    channel: 'sms',
    linkToTab: 'history'
  },
  {
    id: 'notif-3',
    type: 'verifikasi',
    title: 'Verifikasi Komunitas Disetujui: Sumur Bor Blekonang',
    message: '38 Warga & Tokoh Masyarakat telah memvalidasi debit air 2.4 L/detik untuk sumur bor wakaf Gunungkidul.',
    timeAgo: '2 jam lalu',
    timestamp: '2026-09-17 06:50 WIB',
    read: true,
    channel: 'email',
    linkToTab: 'tracking'
  },
  {
    id: 'notif-4',
    type: 'laporan',
    title: 'Laporan Akuntabilitas Mingguan Pekan ke-3 September Telah Terbit',
    message: 'Ringkasan audit arus kas, 48 relawan bertugas, dan efisiensi penyaluran 98.6% dapat diunduh.',
    timeAgo: '1 hari lalu',
    timestamp: '2026-09-16 10:00 WIB',
    read: true,
    channel: 'email',
    linkToTab: 'analytics'
  }
];

export const INITIAL_VOLUNTEER_PROFILES: VolunteerProfile[] = [
  {
    id: 'vol-1',
    registrationNumber: 'IR-REL-2026-08819',
    name: 'Ahmad Fauzi, S.Kep',
    titleBadge: 'Relawan Siaga Medis & Koordinator Lapangan',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    email: 'ahmad.fauzi@relawan-islamicity.id',
    phone: '0812-7744-9912',
    city: 'Padang / Jakarta Selatan',
    joinDate: '12 Januari 2025',
    bloodType: 'O (Rhesus +)',
    emergencyContact: 'Ibu Rina Marlina (Istri) - 0812-3344-5566',
    skills: [
      'Pertolongan Pertama (P3K)',
      'Triage Medis Lapangan',
      'Manajemen Dapur Ummat & Logistik',
      'Evakuasi Air & SAR Ringan',
      'Audit Syariah Lapangan'
    ],
    bio: 'Perawat profesional dengan niat tulus berkhidmat untuk ummat. Siaga diterjunkan pada fase tanggap darurat bencana, pendampingan posko lansia dhuafa, dan pencatatan verifikasi penyaluran terbuka demi mengharap ridha Allah Ta’ala.',
    syariahPledgeSigned: true,
    kycVerified: true,
    reliabilityScore: 99.4,
    volunteerLevel: {
      currentLevel: 4,
      levelName: 'Murabbi Relawan Lapangan',
      xp: 2850,
      nextLevelXp: 3500
    },
    stats: {
      totalHours: 158,
      totalInitiatives: 9,
      beneficiariesHelped: 1940,
      verifiedProofsCount: 14,
      communityVotesGiven: 46,
      fundsDistributedDirectly: 195000000
    },
    badges: [
      {
        id: 'badge-1',
        name: 'Duta Amanah Terverifikasi',
        category: 'amanah',
        level: 'platinum',
        icon: 'ShieldCheck',
        description: 'Verifikasi identitas KTP/KYC lengkap, menandatangani ikrar amanah syariah, dan bebas pelanggaran kode etik relawan.',
        earnedAt: '15 Januari 2025',
        isUnlocked: true,
        criteria: 'KYC 100% & Ikrar Syariah Diteken',
        verificationHash: '0x88f2a1...bc77'
      },
      {
        id: 'badge-2',
        name: 'Pahlawan Tanggap Bencana',
        category: 'bencana',
        level: 'gold',
        icon: 'Flame',
        description: 'Telah mengabdi lebih dari 50 jam di zona tanggap darurat bencana alam, mendistribusikan logistik dan evakuasi penyintas.',
        earnedAt: '24 Mei 2025',
        isUnlocked: true,
        criteria: '≥50 Jam di Inisiatif Kebencanaan',
        verificationHash: '0x992b41...da10'
      },
      {
        id: 'badge-3',
        name: 'Husada Ummat & Paramedis Siaga',
        category: 'medis',
        level: 'gold',
        icon: 'HeartPulse',
        description: 'Memberikan penanganan medis pertama, skrining kesehatan lansia, dan suplai obat darurat bagi mustahik dhuafa.',
        earnedAt: '14 Agustus 2025',
        isUnlocked: true,
        criteria: '≥300 Penerima Manfaat Layanan Medis',
        verificationHash: '0xcc8931...fe44'
      },
      {
        id: 'badge-4',
        name: 'Verifikator Audit Komunitas',
        category: 'verifikasi',
        level: 'gold',
        icon: 'CheckCircle2',
        description: 'Telah memvalidasi lebih dari 40 dokumentasi milestone penyaluran lapangan bersama tokoh masyarakat setempat.',
        earnedAt: '02 September 2026',
        isUnlocked: true,
        criteria: '≥40 Verifikasi Suara Komunitas Sah',
        verificationHash: '0x11ab90...ef22'
      },
      {
        id: 'badge-5',
        name: 'Pejuang Fajar Logistik',
        category: 'kehormatan',
        level: 'silver',
        icon: 'Sun',
        description: 'Kesiapsiagaan tinggi bergerak sebelum subuh untuk mengemas dan mengantarkan bantuan logistik sarapan mustahik.',
        earnedAt: '12 September 2026',
        isUnlocked: true,
        criteria: 'Distribusi Logistik Waktu Subuh ≥5 Kali',
        verificationHash: '0x55dc12...aa09'
      },
      {
        id: 'badge-6',
        name: 'Sahabat Generasi Qur’ani',
        category: 'pendidikan',
        level: 'silver',
        icon: 'BookOpen',
        description: 'Membimbing motivasi menghafal Al-Qur’an dan literasi sains ramah anak bagi santri yatim dhuafa.',
        earnedAt: '16 September 2026',
        isUnlocked: true,
        criteria: '≥20 Jam Pendampingan Santri',
        verificationHash: '0x77aa44...88cc'
      },
      {
        id: 'badge-7',
        name: 'Duta Wakaf Produktif Berkelanjutan',
        category: 'amanah',
        level: 'gold',
        icon: 'Sprout',
        description: 'Mendampingi 5 mustahik UMKM binaan zakat produktif hingga mandiri secara finansial dan spiritual.',
        isUnlocked: false,
        criteria: 'Dampingi 5 Mustahik Zakat Produktif (Saat ini: 3/5)',
        verificationHash: 'Dalam Proses'
      },
      {
        id: 'badge-adv-syariah',
        name: 'Mujahid Ijtima’i Teladan Syariah (Tingkat Lanjut)',
        category: 'kehormatan',
        level: 'platinum',
        icon: 'ShieldCheck',
        description: 'Akreditasi tertinggi Dewan Pengawas Syariah: Lulus 100% Uji Kompetensi Syariah berbasis 8 skenario kasus dilema lapangan, fatwa krisis, dan etika nol gratifikasi.',
        isUnlocked: false,
        criteria: 'Lulus Uji Kompetensi Syariah Berbasis Skenario (Skor ≥75%)',
        verificationHash: 'Ujian Tersedia di Kurikulum'
      }
    ],
    participationHistory: [
      {
        id: 'part-1',
        campaignId: 'camp-1',
        campaignTitle: 'Dapur Ummat & Logistik Siaga Banjir & Longsor Sumatera',
        roleTitle: 'Relawan Distribusi Dapur Air & Evakuasi Perahu Karet',
        period: '14 - 17 Sept 2026',
        serviceHours: 24,
        location: 'Kab. Pesisir Selatan & Padang Pariaman, Sumbar',
        gpsCoords: '-1.3412, 100.5823',
        status: 'selesai',
        beneficiariesHelped: 1200,
        tasksCompleted: [
          'Pengemasan 1.200 porsi makanan hangat dan distribusi via perahu karet',
          'Triage pertolongan pertama pada 18 warga terdampak luka lecet dan demam',
          'Penyerahan bukti kuitansi belanja logistik beras & telur ke sistem audit'
        ],
        photoUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
        communityVerification: {
          status: 'terverifikasi',
          votesValid: 54,
          votesReview: 0,
          verifiedByNames: [
            'Bpk. Suryanto (Ketua RW 04)',
            'Ust. Zulkifli (Koordinator Posko Nagari)',
            'Dewan Audit Syariah BAZNAS'
          ],
          linkedMilestoneId: 'mile-101',
          blockchainHash: '0x94f01b...88ab (Verified)'
        },
        testimonialOrFeedback: 'Mas Ahmad Fauzi dan tim relawan bergerak cepat menembus genangan lumpur 1.5 meter, sangat santun terhadap para lansia di pengungsian.'
      },
      {
        id: 'part-2',
        campaignId: 'camp-4',
        campaignTitle: 'Layanan Ambulans Tanggap Darurat & Klinik Gratis Dhuafa',
        roleTitle: 'Relawan Perawat & Asisten Dokter Posko Keliling',
        period: '05 - 08 Sept 2026',
        serviceHours: 18,
        location: 'Cianjur Selatan (Puskesmas Cidaun & Posko Desa)',
        gpsCoords: '-7.4812, 107.1342',
        status: 'selesai',
        beneficiariesHelped: 340,
        tasksCompleted: [
          'Pemeriksaan tekanan darah dan gula darah sewaktu bagi 120 lansia',
          'Distribusi paket multivitamin dan pendampingan dokter spesialis',
          'Edukasi sanitasi air bersih pasca gempa susulan'
        ],
        photoUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
        communityVerification: {
          status: 'terverifikasi',
          votesValid: 42,
          votesReview: 0,
          verifiedByNames: ['dr. Hendra (Puskesmas Cidaun)', 'Hj. Aminah (Kader Posyandu Lansia)'],
          blockchainHash: '0x43da19...91c1 (Verified)'
        },
        testimonialOrFeedback: 'Layanan medis gratis sangat meringankan para dhuafa yang tidak sanggup membayar ongkos ojek ke RS kabupaten.'
      },
      {
        id: 'part-3',
        campaignId: 'camp-3',
        campaignTitle: 'Wakaf Sumur Bor & Instalasi Air Bersih Desa Kekeringan',
        roleTitle: 'Koordinator Verifikasi Logistik Lapangan',
        period: '22 - 25 Agustus 2026',
        serviceHours: 20,
        location: 'Dusun Blekonang, Tepus, Kab. Gunungkidul, DIY',
        gpsCoords: '-8.1204, 110.6541',
        status: 'selesai',
        beneficiariesHelped: 280,
        tasksCompleted: [
          'Pengawasan uji geolistrik dan instalasi pipa HDPE sepanjang 1.2 KM',
          'Pencatatan serah terima toren 5.000 liter bersama pamong kalurahan',
          'Verifikasi geotag dan pengunggahan nota material ke sistem audit ledger'
        ],
        photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80',
        communityVerification: {
          status: 'terverifikasi',
          votesValid: 42,
          votesReview: 0,
          verifiedByNames: [
            'Bpk. Suryanto (Ketua RW 04)',
            'Ir. Wahyu Hidayat (Relawan Ahli Geohidrologi)',
            'Hj. Mardiyah (Muzaki Pengawas)'
          ],
          linkedMilestoneId: 'mile-102',
          blockchainHash: '0x3d41fe...a90b (Verified)'
        },
        testimonialOrFeedback: 'Sumur bor telah mengeluarkan debit air 2.4 liter/detik jernih dan manis, warga sangat bersyukur atas pendampingan relawan.'
      },
      {
        id: 'part-4',
        campaignId: 'camp-1',
        campaignTitle: 'Dapur Ummat & Logistik Siaga Banjir & Longsor Sumatera',
        roleTitle: 'Koordinator Tim Distribusi Sembako Tahap III',
        period: '18 - 25 Sept 2026',
        serviceHours: 12,
        location: 'Nagari Barung & Tarusan, Pesisir Selatan',
        gpsCoords: '-1.3500, 100.5900',
        status: 'bertugas',
        beneficiariesHelped: 120,
        tasksCompleted: [
          'Pengorganisasian 16 relawan baru asal universitas mitra',
          'Penyusunan jadwal shift dapur air & posko logistik siaga 24 jam'
        ],
        photoUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
        communityVerification: {
          status: 'dalam_tinjauan',
          votesValid: 18,
          votesReview: 0,
          verifiedByNames: ['Koordinator Posko BPBD', 'Perwakilan Warga RW 02'],
          blockchainHash: '0x882afe...fe12 (Pending Final Sign-off)'
        }
      }
    ]
  },
  {
    id: 'vol-2',
    registrationNumber: 'IR-REL-2026-09024',
    name: 'Siti Nur Aisyah, S.Pd',
    titleBadge: 'Relawan Literasi & Psikososial Anak Dhuafa',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    email: 'aisyah.nur@relawan-islamicity.id',
    phone: '0858-1122-3344',
    city: 'Serang, Banten',
    joinDate: '01 Maret 2025',
    bloodType: 'A (Rhesus +)',
    emergencyContact: 'Drs. H. Sulaiman (Ayah) - 0813-8899-7766',
    skills: [
      'Pendampingan Psikososial & Trauma Healing',
      'Pengajaran Al-Qur’an & Tajwid Ceria',
      'Storytelling Karakter Islami',
      'Manajemen Kelas Santri Dhuafa'
    ],
    bio: 'Pendidik yang berfokus memulihkan senyum anak-anak penyintas bencana serta mendampingi santri yatim dhuafa agar percaya diri dan berakhlakul karimah.',
    syariahPledgeSigned: true,
    kycVerified: true,
    reliabilityScore: 98.8,
    volunteerLevel: {
      currentLevel: 3,
      levelName: 'Relawan Muda Berprestasi',
      xp: 1920,
      nextLevelXp: 2500
    },
    stats: {
      totalHours: 94,
      totalInitiatives: 6,
      beneficiariesHelped: 780,
      verifiedProofsCount: 8,
      communityVotesGiven: 28,
      fundsDistributedDirectly: 62000000
    },
    badges: [
      {
        id: 'badge-201',
        name: 'Duta Amanah Terverifikasi',
        category: 'amanah',
        level: 'platinum',
        icon: 'ShieldCheck',
        description: 'Verifikasi identitas KTP/KYC lengkap, menandatangani ikrar amanah syariah, dan berdedikasi tinggi.',
        earnedAt: '03 Maret 2025',
        isUnlocked: true,
        criteria: 'KYC 100% & Ikrar Syariah Diteken',
        verificationHash: '0x12bb99...77aa'
      },
      {
        id: 'badge-202',
        name: 'Sahabat Generasi Qur’ani',
        category: 'pendidikan',
        level: 'gold',
        icon: 'BookOpen',
        description: 'Telah mendampingi santri penghafal Qur’an lebih dari 50 jam kegiatan literasi.',
        earnedAt: '10 Juli 2025',
        isUnlocked: true,
        criteria: '≥50 Jam Pendampingan Santri',
        verificationHash: '0x33dd11...88ff'
      },
      {
        id: 'badge-203',
        name: 'Trauma Healing Cilik',
        category: 'kehormatan',
        level: 'silver',
        icon: 'Sparkles',
        description: 'Mengadakan sesi dongeng, mewarnai, dan motivasi keceriaan bagi 200+ anak penyintas bencana.',
        earnedAt: '20 Agustus 2025',
        isUnlocked: true,
        criteria: '≥200 Anak Penyintas Terbimbing',
        verificationHash: '0x88ee22...99dd'
      }
    ],
    participationHistory: [
      {
        id: 'part-201',
        campaignId: 'camp-2',
        campaignTitle: 'Beasiswa Santri Yatim Tahfidz & Fasilitas Belajar Quran',
        roleTitle: 'Mentor Relawan Literasi & Karakter Santri Tahfidz',
        period: 'Juni - September 2026',
        serviceHours: 42,
        location: 'Pesantren Tahfidz Baitul Qur’an, Banten',
        gpsCoords: '-6.4212, 106.1245',
        status: 'selesai',
        beneficiariesHelped: 120,
        tasksCompleted: [
          'Bimbingan tajwid makharijul huruf untuk 40 santri yatim',
          'Sesi kelas inspirasi sains islami dan motivasi adab',
          'Penyaluran mushaf Al-Qur’an wakaf dan paket seragam santri'
        ],
        photoUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
        communityVerification: {
          status: 'terverifikasi',
          votesValid: 36,
          votesReview: 0,
          verifiedByNames: ['K.H. Ahmad Dahlan (Pimpinan Ponpes)', 'Ustazah Fatimah (Kepala Madrasah)'],
          blockchainHash: '0x712a88...c102 (Verified)'
        },
        testimonialOrFeedback: 'Santri-santri menjadi sangat antusias belajar dan hafalan Al-Qur’an mereka meningkat signifikan.'
      }
    ]
  }
];
