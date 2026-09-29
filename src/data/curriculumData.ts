import { VolunteerCourseModule } from '../types';

export const VOLUNTEER_CURRICULUM_MODULES: VolunteerCourseModule[] = [
  {
    id: 'mod-etika-01',
    code: 'REL-ETH-01',
    title: 'Etika Beramal & Menjaga Niat Sesuai Syariah',
    subtitle: 'Menjaga Keikhlasan, Menghindari Riya’, dan Menjunjung Martabat Mustahik',
    category: 'etika_syariah',
    categoryLabel: 'Etika & Syariah',
    level: 'Dasar',
    durationMinutes: 25,
    xpReward: 250,
    badgeReward: {
      name: 'Duta Ikhlas & Adab Syariah',
      icon: 'ShieldCheck',
      level: 'gold',
      description: 'Menuntaskan pemahaman mendalam tentang keikhlasan amal, larangan menyakiti dhuafa, dan etika privasi kemanusiaan.'
    },
    icon: 'HeartHandshake',
    colorScheme: {
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      accent: 'emerald',
      gradient: 'from-emerald-900 via-teal-900 to-slate-900'
    },
    overview: 'Amal kebajikan seorang relawan tidak hanya diukur dari banyaknya bantuan fisik yang disalurkan, melainkan dari kemurnian niat semata-mata mencari ridha Allah Ta’ala serta penghormatan mulia terhadap kehormatan diri (karamah) para mustahik.',
    objectives: [
      'Memahami hakikat ikhlas dan bahaya laten riya’ (pamer) serta sum’ah (ingin didengar).',
      'Mengenali larangan al-Manna (menyebut-nyebut pemberian) dan al-Adza (menyakiti perasaan dhuafa).',
      'Menerapkan SOP etika dokumentasi penyaluran tanpa melanggar privasi dan aurat mustahik.',
      'Menjaga kerendahan hati saat berinteraksi langsung di kantong-kantong kemiskinan.'
    ],
    certificateTitle: 'Sertifikat Kompetensi Adab & Etika Relawan Syariah (Level Dasar)',
    lessons: [
      {
        id: 'les-1-1',
        title: 'Pelajaran 1: Urgensi Ikhlas & Transformasi Niat Relawan',
        durationMinutes: 8,
        content: [
          'Dalam pandangan Islam, amal kebaikan sebesar apa pun tidak bernilai di sisi Allah jika didasari motivasi mencari pujian manusia, popularitas di media sosial, atau kepentingan politis semata.',
          'Nabi Muhammad ﷺ bersabda: "Sesungguhnya setiap amalan tergantung pada niatnya, dan setiap orang akan mendapatkan apa yang ia niatkan." (HR. Bukhari & Muslim).',
          'Sebagai relawan, godaan riya’ sangat nyata, terutama ketika memakai atribut rompi relawan, berfoto di lokasi bencana, atau menerima pujian publik. Relawan wajib terus memperbarui niat (tajdidun niyyah) di awal, tengah, dan akhir penugasan.'
        ],
        keyTakeaways: [
          'Niat adalah fondasi: amalan besar bisa gugur karena riya’, amalan kecil bernilai surga karena ikhlas.',
          'Lakukan "tajdidun niyyah" (pembaharuan niat) setiap kali melangkah ke lapangan penugasan.',
          'Pujian publik adalah ujian keistiqamahan, bukan tujuan pengabdian relawan.'
        ],
        quranHadithRef: {
          arabic: 'وَمَآ أُمِرُوٓا۟ إِلَّا لِيَعْبُدُوا۟ ٱللَّهَ مُخْلِصِينَ لَهُ ٱلدِّينَ حُنَفَآءَ',
          translation: 'Padahal mereka tidak disuruh kecuali supaya menyembah Allah dengan memurnikan ketaatan kepada-Nya dalam (menjalankan) agama yang lurus...',
          source: 'QS. Al-Bayyinah: 5'
        },
        caseStudy: {
          scenario: 'Seorang relawan merasa kecewa karena namanya tidak dicantumkan dalam siaran pers media saat penyerahan bantuan korban longsor, padahal ia bekerja paling keras memikul karung beras.',
          solution: 'Sikap yang benar adalah menyadari bahwa pahala sejati ada di sisi Allah yang Maha Melihat (As-Sami’ & Al-Bashir). Mengharapkan pengakuan manusia justru merusak kemurnian pahala amal jariyah.',
          ethicalPrinciple: 'Ikhlas Beramal: Cukup Allah sebagai saksi dan pemberi ganjaran terbaik.'
        }
      },
      {
        id: 'les-1-2',
        title: 'Pelajaran 2: Menghindari Al-Manna (Menyebut-nyebut) & Al-Adza (Menyakiti Hati)',
        durationMinutes: 9,
        content: [
          'Allah Ta’ala memperingatkan dengan tegas dalam QS. Al-Baqarah ayat 264 bahwa pahala sedekah dan bantuan sosial bisa hangus seketika jika diiringi al-manna (mengungkit-ungkit jasa) dan al-adza (menyakiti perasaan penerima).',
          'Bentuk al-manna: Mengatakan kepada mustahik "Untung ada kami yang datang, kalau tidak kalian kelaparan", atau mengungkit bantuan masa lalu saat mustahik berbeda pandangan.',
          'Bentuk al-adza: Membuat mustahik menunggu berjam-jam di bawah terik matahari tanpa peneduh, membentak saat antrean berdesakan, atau memandang mereka dengan tatapan meremehkan.',
          'Para ulama menegaskan bahwa tangan yang memberi pada hakikatnya berterima kasih kepada tangan yang menerima, karena dhuafa menjadi wasilah pembersih harta dan pengangkat derajat amil di akhirat.'
        ],
        keyTakeaways: [
          'Al-Manna dan Al-Adza membatalkan pahala amal sosial secara total.',
          'Pandanglah mustahik sebagai saudara mulia yang memberi kita peluang meraih ampunan Allah.',
          'Jaga tutur kata, gestur tubuh, dan fasilitasi antrean yang bermartabat dan manusiawi.'
        ],
        quranHadithRef: {
          arabic: 'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ لَا تُبْطِلُوا۟ صَدَقَٰتِكُم بِٱلْمَنِّ وَٱلْأَذَىٰ',
          translation: 'Hai orang-orang yang beriman, janganlah kamu membatalkan (pahala) sedekahmu dengan menyebut-nyebutnya dan menyakiti (perasaan si penerima)...',
          source: 'QS. Al-Baqarah: 264'
        },
        caseStudy: {
          scenario: 'Di lokasi distribusi sembako, seorang lansia terjatuh saat antre dan berasnya sedikit tercecer. Seorang relawan berteriak: "Ibu jangan ceroboh, beras ini mahal dari uang zakat orang kaya!".',
          solution: 'Tindakan relawan tersebut termasuk al-adza yang tercela. Relawan wajib segera menolong sang ibu, membersihkan tumpahan, mengganti beras yang rusak, dan menenangkannya dengan kata-kata penuh kasih sayang.',
          ethicalPrinciple: 'Adab Melayani: Menjunjung kehormatan mustahik di atas segala prosedur mekanis.'
        }
      },
      {
        id: 'les-1-3',
        title: 'Pelajaran 3: Etika Dokumentasi Lapangan & Perlindungan Martabat Mustahik',
        durationMinutes: 8,
        content: [
          'Dokumentasi penyaluran dana publik dan zakat memang diperlukan demi akuntabilitas (syahadah). Namun, dokumentasi TIDAK BOLEH mengorbankan martabat (*karamah insaniyyah*) mustahik.',
          'Pedoman Syariah Fotografi & Video Penyaluran:',
          '1. Dilarang memotret mustahik dalam kondisi memalukan, menangis histeris meminta-minta, atau auratnya tersingkap.',
          '2. Jangan mewajibkan mustahik tersenyum paksa sambil memegang papan nama bertuliskan nominal bantuan yang mencolok.',
          '3. Khusus anak-anak yatim dan dhuafa di bawah umur, samarkan atau hindari sorotan wajah penuh (*blur/angle belakang*) demi melindungi masa depan mereka dari stigma sosial.',
          '4. Minta izin lisan/tertulis (*consent*) sebelum mengambil gambar penyerahan paket di rumah warga.'
        ],
        keyTakeaways: [
          'Tujuan foto adalah membuktikan sampainya amanah kepada donatur, bukan eksploitasi kemiskinan (poverty porn).',
          'Gunakan teknik pengambilan gambar humanis: angle sejajar, fokus pada penyerahan barang/senyum kehangatan tim.',
          'Lindungi privasi dan masa depan anak-anak mustahik dari jejak digital negatif.'
        ],
        quranHadithRef: {
          arabic: 'وَلَقَدْ كَرَّمْنَا بَنِىٓ ءَادَمَ',
          translation: 'Dan sesungguhnya telah Kami muliakan anak-anak Adam...',
          source: 'QS. Al-Isra\': 70'
        },
        caseStudy: {
          scenario: 'Tim media relawan ingin membuat thumbnail video YouTube bertuliskan "Keluarga Termiskin Menangis Memohon Nasi" dengan foto zoom wajah anak menangis.',
          solution: 'Praktik ini tergolong eksploitatif (poverty porn) dan dilarang secara syariah. Judul harus diganti menjadi edukatif dan wajah anak disamarkan, mengedepankan harapan dan empati.',
          ethicalPrinciple: 'Karamah Insaniyyah: Kemuliaan manusia tidak boleh diperjualbelikan demi klik atau sensasi.'
        }
      }
    ],
    quiz: [
      {
        id: 'q-eth-1',
        question: 'Berdasarkan QS. Al-Baqarah ayat 264, amalan sedekah dan bantuan kemanusiaan seorang relawan dapat batal pahalanya apabila diiringi dengan tindakan...',
        scenarioContext: 'Relawan bertugas membagikan 500 paket pangan ramadhan di kawasan kumuh perkotaan.',
        options: [
          'Memberikan bantuan dalam jumlah sedikit karena keterbatasan stok logistik',
          'Al-Manna (mengungkit-ungkit jasa) dan Al-Adza (menyakiti perasaan atau merendahkan mustahik)',
          'Meminta mustahik menandatangani bukti tanda terima penyaluran logistik',
          'Membagikan bantuan melalui perwakilan ketua RT setempat'
        ],
        correctOptionIndex: 1,
        explanation: 'QS. Al-Baqarah ayat 264 secara eksplisit melarang membatalkan sedekah dengan al-manna (menyebut-nyebut kebaikan) dan al-adza (menyakiti perasaan si penerima).',
        dalilSyariah: 'QS. Al-Baqarah: 264 - "Lā tubthilū shadaqātikum bil-manni wal-adzā..."'
      },
      {
        id: 'q-eth-2',
        question: 'Bagaimana adab syar’i yang paling tepat ketika relawan mendokumentasikan penyaluran bantuan kepada anak yatim atau mustahik lansia?',
        scenarioContext: 'Donatur meminta bukti foto bahwa paket nutrisi telah diterima oleh anak yatim binaan.',
        options: [
          'Menyuruh anak yatim memegang papan nominal donasi dan berlutut di depan relawan',
          'Mengambil foto jarak dekat saat mustahik sedang menangis haru tanpa izin',
          'Memotret secara humanis dan bermartabat, meminta izin, serta menyamarkan/melindungi identitas sensitif anak',
          'Menyiarkan video langsung tanpa busana pantas demi menggugah emosi warganet di media sosial'
        ],
        correctOptionIndex: 2,
        explanation: 'Dokumentasi akuntabilitas wajib menjaga martabat kemanusiaan (karamah insaniyyah, QS. Al-Isra: 70), tidak mengeksploitasi penderitaan, dan melindungi privasi anak di masa depan.',
        dalilSyariah: 'QS. Al-Isra\': 70 & Kaidah Fiqh Ad-Dhararu Yuzal (Kemudharatan harus dihilangkan).'
      },
      {
        id: 'q-eth-3',
        question: 'Jika seorang relawan merasa bangga berlebihan dan ingin diakui saat seragam relawannya dipuji oleh orang lain, tindakan tazkiyatun nafs (penyucian jiwa) apa yang dianjurkan?',
        scenarioContext: 'Relawan mendapat apresiasi luas di media lokal setelah bertugas 3 hari tanpa lelah di posko evakuasi.',
        options: [
          'Membuat status di semua akun medsos agar semakin banyak orang tahu dedikasinya',
          'Berhenti menjadi relawan selamanya karena takut dosa riya’',
          'Segera beristighfar, memperbarui niat ikhlas karena Allah, dan menyadari bahwa tenaga serta waktu adalah karunia titipan-Nya',
          'Meminta uang lelah tambahan dari koordinator posko sebagai imbalan nama baik'
        ],
        correctOptionIndex: 2,
        explanation: 'Obat dari riya’ adalah tajdidun niyyah (memperbarui niat), beristighfar, dan mengembalikan segala pujian hanya milik Allah Ta’ala (Alhamdulillah).',
        dalilSyariah: 'Hadits Riwayat Bukhari: "Innamal a’maalu bin-niyyaat..."'
      }
    ]
  },
  {
    id: 'mod-fiqh-02',
    code: 'REL-FIQ-02',
    title: 'Fiqh Pengelolaan ZISWAF & Segregasi 8 Asnaf',
    subtitle: 'Amanah Penyaluran Harta Ummat, Akad Syariah, dan Integritas Nol Gratifikasi',
    category: 'etika_syariah',
    categoryLabel: 'Fiqh ZISWAF',
    level: 'Menengah',
    durationMinutes: 30,
    xpReward: 300,
    badgeReward: {
      name: 'Faqih Pengelola ZISWAF',
      icon: 'BookOpen',
      level: 'platinum',
      description: 'Menguasai batasan hukum 8 asnaf zakat, pemisahan akad dana infak-wakaf, dan prinsip anti-ghulul.'
    },
    icon: 'BookOpen',
    colorScheme: {
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-300',
      accent: 'amber',
      gradient: 'from-amber-950 via-stone-900 to-emerald-950'
    },
    overview: 'Dana zakat memiliki ketentuan ketat langsung dari wahyu Al-Qur’an mengenai siapa saja yang berhak menerima. Relawan wajib memahami perbedaan akad Zakat (milik 8 asnaf), Infak/Sedekah (fleksibel kebajikan umum), dan Wakaf (aset produktif abadi) agar tidak terjerumus ke dalam pengalihan dana yang haram.',
    objectives: [
      'Memahami batas-batas 8 Asnaf penerima zakat sesuai QS. At-Taubah: 60.',
      'Membedakan tata kelola dana Zakat, Infak, Sedekah, dan Wakaf (ZISWAF).',
      'Mencegah praktik ghulul (pemotongan/pengurangan hak mustahik) di lapangan.',
      'Menerapkan kebijakan zero-gratifikasi bagi relawan pelaksana tugas amil.'
    ],
    certificateTitle: 'Sertifikat Tata Kelola & Fiqh Penyaluran ZISWAF (Level Menengah)',
    lessons: [
      {
        id: 'les-2-1',
        title: 'Pelajaran 1: Pemetaan 8 Asnaf Sesuai Fiqh Kontemporer',
        durationMinutes: 10,
        content: [
          'Allah Ta’ala membatasi penerima zakat secara qath’i (pasti) hanya pada 8 asnaf dalam QS. At-Taubah ayat 60: Fakir, Miskin, Amil, Mu’allaf, Riqab (pembebasan budak/penindasan), Gharimin (yang terjerat utang kebutuhan pokok), Sabilillah, dan Ibnu Sabil (musafir kehabisan bekal).',
          'Perbedaan Fakir dan Miskin: Fakir adalah orang yang tidak memiliki penghasilan sama sekali atau kurang dari 50% kecukupan dasar; Miskin memiliki penghasilan tetapi tidak mencukupi (antara 50% - 99% kebutuhan dasarnya).',
          'Dana zakat TIDAK BOLEH dialihkan untuk infrastruktur komersial umum yang dinikmati orang kaya atau non-asnaf, kecuali jika bersumber dari dana Sedekah/Infak umum atau Wakaf.'
        ],
        keyTakeaways: [
          'Zakat terikat akad kepemilikan khusus (tamlik) hanya untuk 8 golongan yang ditetapkan Allah.',
          'Penyaluran zakat wajib melewati verifikasi kelayakan (skrining mustahik) yang objektif.',
          'Infrastruktur umum non-asnaf harus dibiayai dari dana infak/wakaf, bukan zakat maal.'
        ],
        quranHadithRef: {
          arabic: '۞ إِنَّمَا ٱلصَّدَقَٰتُ لِلْفُقَرَآءِ وَٱلْمَسَٰكِينِ وَٱلْعَٰمِلِينَ عَلَيْهَا وَٱلْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِى ٱلرِّقَابِ وَٱلْغَٰرِمِينَ وَفِى سَبِيلِ ٱللَّهِ وَٱبْنِ ٱلسَّبِيلِ ۖ فَرِيضَةً مِّنَ ٱللَّهِ',
          translation: 'Sesungguhnya zakat-zakat itu, hanyalah untuk orang-orang fakir, orang-orang miskin, pengurus-pengurus zakat, para mu\'allaf yang dibujuk hatinya, untuk (memerdekakan) budak, orang-orang yang berutang, untuk jalan Allah dan untuk mereka yuang sedang dalam perjalanan, sebagai suatu ketetapan yang diwajibkan Allah...',
          source: 'QS. At-Taubah: 60'
        },
        caseStudy: {
          scenario: 'Seorang lurah meminta relawan membagikan beras zakat kepada semua warganya secara merata, termasuk PNS dan pengusaha setempat, dengan alasan menjaga keharmonisan desa.',
          solution: 'Relawan harus menolak dengan santun dan berprinsip. Jelaskan bahwa zakat adalah hak eksklusif 8 asnaf menurut syariat. Jika ada non-asnaf yang membutuhkan bantuan sosial, gunakan pos dana infak umum.',
          ethicalPrinciple: 'Amanah Tamlik: Menjaga hak asnaf tanpa kompromi tekanan sosial.'
        }
      },
      {
        id: 'les-2-2',
        title: 'Pelajaran 2: Segregasi Akad Zakat, Infak, Sedekah & Wakaf',
        durationMinutes: 10,
        content: [
          'Salah satu pelanggaran syariah terbesar dalam lembaga filantropi adalah percampuran dana (commingling of funds) yang mengakibatkan dana zakat terpakai untuk pos yang tidak semestinya.',
          'Akad Zakat: Wajib, terikat 8 asnaf, harus segera disalurkan (*fauriyyah*), tidak boleh ditimbun.',
          'Akad Infak & Sedekah: Sukarela (*thathawwu’*), fleksibel untuk segala kemaslahatan umum, operasional tanggap bencana darurat, dan bantuan kemanusiaan lintas batas.',
          'Akad Wakaf: Menahan pokok asetnya (*tahbisul ashl*) dan menyalurkan manfaatnya (*tasbilul tsamarah*). Pokok wakaf (misal: tanah sumur bor, bangunan klinik) tidak boleh dijual, dihibahkan, atau dihabiskan modalnya.'
        ],
        keyTakeaways: [
          'Segregasi dompet digital dan rekening bank sangat mutlak dalam akuntansi syariah.',
          'Dana zakat tidak boleh diendapkan berlarut-larut jika mustahik sedang membutuhkan.',
          'Aset wakaf wajib dipelihara kesinambungannya agar pahala wakif terus mengalir abadi.'
        ],
        quranHadithRef: {
          arabic: 'حَبِّسِ الأَصْلَ وَسَبِّلِ الثَّمَرَةَ',
          translation: 'Tahanlah pokoknya dan sedekahkanlah hasil (manfaat) darinya...',
          source: 'HR. Bukhari & Muslim (Hadits Wakaf Sahabat Umar bin Khattab ra)'
        },
        caseStudy: {
          scenario: 'Kekurangan dana operasional bensin ambulans relawan, seorang pengurus berniat mengambil dari kotak Zakat Fitrah.',
          solution: 'Zakat Fitrah dikhususkan untuk makanan pokok dhuafa di hari raya (*thu\'matan lil masakin*). Operasional ambulans harus dibiayai dari pos hak amil resmi atau pos infak operasional, tidak boleh memotong kuota zakat fitrah.',
          ethicalPrinciple: 'Segregasi Pos Syariah: Setiap rupiah harus disalurkan sesuai akad awal donatur.'
        }
      },
      {
        id: 'les-2-3',
        title: 'Pelajaran 3: Integritas Nol Gratifikasi & Larangan Ghulul',
        durationMinutes: 10,
        content: [
          'Nabi Muhammad ﷺ melarang keras amil atau petugas penyalur bantuan menerima hadiah dari mustahik maupun dari vendor pengadaan barang tanpa izin resmi lembaga.',
          'Rasulullah ﷺ bersabda ketika ada petugas penarik zakat yang membawa barang dan berkata "Ini untuk kalian dan ini dihadiahkan untukku": "Mengapa ia tidak duduk saja di rumah ayahnya atau rumah ibunya, lalu melihat apakah ada yang memberinya hadiah?!" (HR. Bukhari).',
          'Hadiah yang diterima petugas karena jabatannya tergolong *Ghulul* (korupsi/pengkhianatan amanah) yang akan dipertanggungjawabkan dengan berat di Padang Mahsyar.'
        ],
        keyTakeaways: [
          'Relawan dilarang menerima tip, amplop, atau hadiah pribadi dari mustahik maupun rekanan vendor.',
          'Jika mustahik bersikeras menjamu makanan ringan, nikmati dengan batas wajar persaudaraan dan laporkan secara transparan.',
          'Integritas amil dan relawan adalah pelindung keberkahan seluruh lembaga filantropi.'
        ],
        quranHadithRef: {
          arabic: 'هَدَايَا الْعُمَّالِ غُلُولٌ',
          translation: 'Hadiah yang diberikan kepada para petugas (amil) adalah bentuk ghulul (pengkhianatan/korupsi).',
          source: 'HR. Ahmad & Al-Baihaqi'
        },
        caseStudy: {
          scenario: 'Vendor penyedia 1.000 paket sembako menawarkan diskon cashback 5% uang tunai langsung ke dompet pribadi relawan pengadaan logistik sebagai ucapan terima kasih.',
          solution: 'Relawan wajib menolak cashback pribadi tersebut. Seluruh diskon atau potongan harga harus masuk ke rekening resmi lembaga untuk menambah jumlah paket bantuan bagi dhuafa.',
          ethicalPrinciple: 'Zero Gratification: Menutup celah suap dan pengkhianatan harta amanah ummat.'
        }
      }
    ],
    quiz: [
      {
        id: 'q-fiq-1',
        question: 'Siapakah golongan yang secara syariat TIDAK BERHAK menerima dana Zakat Maal berdasarkan batasan 8 asnaf dalam QS. At-Taubah ayat 60?',
        scenarioContext: 'Relawan menyeleksi 100 calon penerima manfaat program modal usaha zakat produktif.',
        options: [
          'Orang fakir yang tidak berpenghasilan dan kaum miskin dhuafa',
          'Orang kaya yang berkecukupan dan tidak masuk dalam golongan 8 asnaf',
          'Gharimin yang terlilit utang demi membeli obat medis keluarga',
          'Ibnu Sabil (musafir kehabisan bekal di perjalanan ketaatan)'
        ],
        correctOptionIndex: 1,
        explanation: 'Zakat diharamkan bagi orang kaya berkecukupan (kecuali amil yang bertugas, prajurit sabilillah, atau musafir) dan diharamkan bagi keluarga inti yang wajib dinafkahi muzakki.',
        dalilSyariah: 'QS. At-Taubah: 60 & Sabda Nabi ﷺ: "Lā tahillu ash-shadaqatu li-ghaniyyin..."'
      },
      {
        id: 'q-fiq-2',
        question: 'Mengapa hadiah pribadi yang diterima oleh relawan/amil dari vendor logistik atau mustahik saat bertugas dikategorikan sebagai "Ghulul"?',
        scenarioContext: 'Petugas lapangan ditawari bingkisan eksklusif oleh kontraktor pembuat sumur bor.',
        options: [
          'Karena hadiah tersebut pasti membuat barang bantuan rusak',
          'Karena hadiah itu diberikan terkait posisi wewenangnya, yang berpotensi memicu konflik kepentingan dan mengurangi hak dhuafa',
          'Karena Islam melarang umatnya saling memberi hadiah dalam semua situasi',
          'Karena amil tidak boleh berinteraksi dengan kontraktor lapangan'
        ],
        correctOptionIndex: 1,
        explanation: 'Hadits Nabi ﷺ "Hadāyā al-‘ummāli ghulūl" menegaskan bahwa hadiah kepada pejabat/petugas amil saat mengemban tugas publik adalah gratifikasi yang merusak objektivitas amanah.',
        dalilSyariah: 'HR. Ahmad: "Hadāyā al-‘ummāli ghulūl" (Hadiah untuk petugas adalah kecurangan).'
      },
      {
        id: 'q-fiq-3',
        question: 'Manakah pernyataan yang paling tepat mengenai perbedaan pokok hukum antara dana Sedekah/Infak dengan Aset Wakaf?',
        scenarioContext: 'Lembaga menerima donasi tanah dari donatur untuk pembangunan sarana air bersih.',
        options: [
          'Dana infak harus ditahan pokoknya, sedangkan tanah wakaf boleh dijual sewaktu-waktu',
          'Pokok aset wakaf wajib ditahan kelestariannya dan hanya manfaatnya yang disalurkan, sedangkan sedekah boleh langsung dihabiskan wujudnya',
          'Keduanya sama persis tanpa ada perbedaan hukum fikih',
          'Wakaf hanya boleh diberikan kepada kerabat dekat wakif'
        ],
        correctOptionIndex: 1,
        explanation: 'Kaidah wakaf adalah "Habbis al-ashla wa sabbil ats-tsamarah" (tahan pokoknya, sedekahkan manfaatnya). Harta wakaf tidak boleh dipindahtangankan atau dihabiskan pokoknya.',
        dalilSyariah: 'HR. Bukhari & Muslim dari Ibnu Umar ra tentang wakaf tanah Khaibar.'
      }
    ]
  },
  {
    id: 'mod-ops-03',
    code: 'REL-OPS-03',
    title: 'Manajemen Inisiatif Sosial & Tanggap Bencana Lapangan',
    subtitle: 'SOP Komando Posko, Triase Kebutuhan Darurat, dan Fiqh Ibadah di Pengungsian',
    category: 'manajemen_sosial',
    categoryLabel: 'Manajemen Sosial',
    level: 'Menengah',
    durationMinutes: 25,
    xpReward: 350,
    badgeReward: {
      name: 'Komandan Lapangan & Logistik Ummat',
      icon: 'Flame',
      level: 'gold',
      description: 'Terampil memimpin koordinasi tanggap darurat, manajemen dapur air higienis, dan fiqh rukhsah ibadah.'
    },
    icon: 'Flame',
    colorScheme: {
      badgeBg: 'bg-rose-50 text-rose-900 border-rose-300',
      accent: 'rose',
      gradient: 'from-rose-950 via-slate-900 to-emerald-950'
    },
    overview: 'Krisis bencana alam dan kedaruratan sosial menuntut kecepatan yang terukur, kepemimpinan koordinatif, dan keamanan tim relawan (*Safety First*). Modul ini membekali relawan dengan kecakapan operasional posko, pemetaan cepat kebutuhan korban, serta panduan memfasilitasi ibadah di tenda darurat.',
    objectives: [
      'Memahami struktur komando Incident Command System (ICS) relawan.',
      'Melakukan Rapid Needs Assessment (Kaji Cepat Lapangan) yang akurat.',
      'Menjalankan SOP kebersihan dapur air dan distribusi pangan bergizi.',
      'Membimbing fiqh rukhsah ibadah darurat (tayammum, sholat jamak-qashar) bagi penyintas.'
    ],
    certificateTitle: 'Sertifikat Manajemen Operasional & Tanggap Bencana (Level Menengah)',
    lessons: [
      {
        id: 'les-3-1',
        title: 'Pelajaran 1: Triase Kebutuhan Darurat & Komando Posko Relawan',
        durationMinutes: 8,
        content: [
          'Dalam fase Golden Hours (72 jam pertama pasca bencana), kekacauan koordinasi sering kali memperlambat pertolongan. Relawan harus menerapkan prinsip Single Chain of Command (Satu Komando Lapangan).',
          'Struktur Posko Inti: Koordinator Lapangan (Korlap), Divisi Logistik & Dapur Ummat, Divisi Medis & Evakuasi, Divisi Data & Verifikasi Syariah, dan Divisi Keamanan/Komunikasi.',
          'Prinsip Keselamatan Relawan (*Safety First*): Relawan yang terluka atau menjadi korban justru akan membebani operasi penyelamatan. Kenakan APD lengkap (helm, sepatu bot, pelampung, sarung tangan medis) sebelum memasuki zona merah.'
        ],
        keyTakeaways: [
          'Ikuti arahan satu komando korlap untuk mencegah tumpang-tindih distribusi bantuan.',
          'Safety First: Pastikan keselamatan diri sendiri sebelum menolong orang lain.',
          'Prioritaskan kelompok paling rentan: bayi, balita, ibu hamil, lansia, dan difabel.'
        ],
        quranHadithRef: {
          arabic: 'وَلَا تُلْقُوا۟ بِأَيْدِيكُمْ إِلَى ٱلتَّهْلُكَةِ',
          translation: '...dan janganlah kamu menjatuhkan dirimu sendiri ke dalam kebinasaan...',
          source: 'QS. Al-Baqarah: 195'
        },
        caseStudy: {
          scenario: 'Dua orang relawan nekat menyeberangi arus banjir deras tanpa pelampung demi mengantar 2 kardus mi instan ke seberang kali.',
          solution: 'Tindakan ini melanggar SOP keselamatan dan kaidah syariah QS. Al-Baqarah 195. Bantuan logistik harus menggunakan perahu karet standar SAR bersama tim terlatih, bukan tindakan nekat.',
          ethicalPrinciple: 'Hifdzun Nafs: Menjaga keselamatan jiwa relawan dan penyintas adalah kewajiban syar\'i.'
        }
      },
      {
        id: 'les-3-2',
        title: 'Pelajaran 2: Standar Dapur Ummat Halal, Higienis & Bergizi',
        durationMinutes: 9,
        content: [
          'Pangan yang disajikan kepada penyintas bencana harus memenuhi kriteria Halalan Thayyiban (halal zatnya, halal pengolahannya, dan higienis gizinya).',
          'SOP Dapur Ummat Relawan Islamicity:',
          '1. Sanitasi Air Bersih: Pisahkan air masak minum dari air cuci piring. Pastikan air mendidih sempurna.',
          '2. Waktu Konsumsi: Makanan masak basah (nasi bungkus) harus dikonsumsi maksimal 4-6 jam setelah matang agar tidak memicu keracunan massal.',
          '3. Kebutuhan Khusus: Sediakan bubur bayi, susu tanpa gula berlebih, dan makanan ramah lambung untuk balita serta lansia.'
        ],
        keyTakeaways: [
          'Penyaluran pangan wajib mengutamakan konsep Halalan Thayyiban (sehat, bersih, bergizi).',
          'Perhatikan batas waktu kedaluwarsa masakan basah di lokasi panas/lembab.',
          'Jaga higienitas juru masak dengan celemek, penutup kepala, dan pencucian tangan berkala.'
        ],
        quranHadithRef: {
          arabic: 'كُلُوا۟ مِن طَيِّبَٰتِ مَا رَزَقْنَٰكُمْ وَٱشْكُرُوا۟ لِلَّهِ',
          translation: 'Makanlah di antara rezeki yang baik-baik yang Kami berikan kepadamu dan bersyukurlah kepada Allah...',
          source: 'QS. Al-Baqarah: 172'
        },
        caseStudy: {
          scenario: 'Di posko pengungsian, seorang relawan membagikan biskuit dan susu formula yang kemasannya sudah sobek dan tanggal kadaluwarsanya lewat 1 bulan.',
          solution: 'Barang tersebut harus segera dipisahkan dan dimusnahkan. Memberikan makanan kedaluwarsa kepada penyintas yang lemah bertentangan dengan prinsip thayyib dan membahayakan kesehatan.',
          ethicalPrinciple: 'Thayyibatul Khidmat: Menyerahkan yang terbaik dan layak konsumsi kepada dhuafa.'
        }
      },
      {
        id: 'les-3-3',
        title: 'Pelajaran 3: Fiqh Ibadah di Tenda Darurat & Pengungsian',
        durationMinutes: 8,
        content: [
          'Dalam situasi bencana dan kelangkaan air, syariat Islam memberikan banyak keringanan (rukhsah) agar para penyintas dan relawan tetap dapat menunaikan sholat tepat waktu.',
          'Keringanan Bersuci: Bila air terbatas untuk minum dan memasak, wudhu digantikan dengan Tayammum menggunakan debu suci di dinding tenda atau tanah kering.',
          'Keringanan Sholat: Sholat Dzuhur dan Ashar, serta Maghrib dan Isya boleh dijamak (dikumpulkan) dan diqashar (diringkas menjadi 2 rakaat) bagi musafir relawan dan pengungsi yang memenuhi syarat safar/masyaqqah.',
          'Tugas relawan meliputi memfasilitasi arah kiblat, menyediakan sarung/mukena bersih, dan memimpin sholat berjamaah untuk memberikan ketenangan jiwa.'
        ],
        keyTakeaways: [
          'Islam adalah agama yang memudahkan: "Yuridullahu bikumul yusra wala yuridu bikumul ‘usra".',
          'Air minum diprioritaskan untuk keselamatan jiwa (*Hifdzun Nafs*); gunakan tayammum untuk bersuci.',
          'Sholat berjamaah di tenda darurat menjadi sarana *tasliyah* (penguatan batin) terhebat bagi para korban.'
        ],
        quranHadithRef: {
          arabic: 'فَلَمْ تَجِدُوا۟ مَآءً فَتَيَمَّمُوا۟ صَعِيدًا طَيِّبًا',
          translation: '...kemudian kamu tidak mendapat air, maka bertayamumlah kamu dengan tanah yang suci...',
          source: 'QS. An-Nisa\': 43'
        },
        caseStudy: {
          scenario: 'Seorang bapak korban gempa menolak sholat karena sarungnya terkena debu reruntuhan rumah dan tidak ada air wudhu.',
          solution: 'Relawan dengan santun menjelaskan bahwa debu reruntuhan tanah pada asalnya suci, dan ia dapat bertayammum serta sholat dengan pakaian yang melekat sesuai kemampuannya (fattaqullaha mastatha’tum).',
          ethicalPrinciple: 'Taisir: Menyampaikan kemudahan syariat dengan ramah di masa sulit.'
        }
      }
    ],
    quiz: [
      {
        id: 'q-ops-1',
        question: 'Ketika stok air di posko darurat bencana sangat terbatas dan hanya cukup untuk minum penyintas serta memasak susu bayi, bagaimana ketentuan fiqh thaharah bagi relawan?',
        scenarioContext: 'Relawan bertugas di pulau terpencil pasca gelombang pasang merusak sumur warga.',
        options: [
          'Tetap memaksakan diri berwudhu dengan air minum tersebut hingga habis',
          'Menghentikan sholat sampai pasokan air PDAM pulih kembali',
          'Memprioritaskan air untuk kelangsungan hidup dan beralih ke tayammum menggunakan debu suci',
          'Menggunakan air laut asin untuk memasak susu bayi'
        ],
        correctOptionIndex: 2,
        explanation: 'Kaidah syariah Hifdzun Nafs (menjaga nyawa) mengalahkan thaharah dengan air jika air terbatas. Dalam kondisi ini, syariat mewajibkan beralih ke tayammum (QS. An-Nisa: 43).',
        dalilSyariah: 'QS. An-Nisa\': 43 & Kaidah Fiqh: "Ad-Dharuratu Tubihul Mahzhurat".'
      },
      {
        id: 'q-ops-2',
        question: 'Dalam manajemen dapur ummat tanggap darurat, berapa batas waktu maksimal konsumsi makanan basah (nasi bungkus) setelah matang demi mencegah risiko keracunan?',
        scenarioContext: 'Dapur air memproduksi 1.500 porsi nasi bungkus untuk 3 desa terisolir di cuaca terik.',
        options: [
          'Maksimal 4 - 6 jam setelah matang',
          'Boleh hingga 24 jam asalkan aromanya belum terlalu asam',
          'Tidak ada batas waktu, boleh dimakan kapan saja',
          'Minimal 12 jam setelah dimasak'
        ],
        correctOptionIndex: 0,
        explanation: 'SOP pangan higienis bencana membatasi waktu konsumsi makanan basah siap santap maksimal 4-6 jam di suhu ruang tropis untuk mencegah perkembangbiakan bakteri patogen.',
        dalilSyariah: 'QS. Al-Baqarah: 168 (Makan yang halal dan thayyib) & Standar Medis Lapangan.'
      },
      {
        id: 'q-ops-3',
        question: 'Apa langkah pertama yang wajib diambil oleh tim relawan yang baru tiba di lokasi bencana sebelum membagikan logistik?',
        scenarioContext: 'Truk bantuan logistik tiba di lapangan desa yang baru terdampak gempa bumi.',
        options: [
          'Langsung melempar kardus bantuan dari atas bak truk ke arah kerumunan warga',
          'Melapor ke Korlap/Posko Terpadu, melakukan Rapid Needs Assessment (Kaji Kebutuhan), dan mengatur skema antrean tertib',
          'Mengambil foto selfie di depan rumah warga yang roboh untuk laporan sponsor',
          'Membagikan bantuan hanya kepada warga yang dikenal saja'
        ],
        correctOptionIndex: 1,
        explanation: 'Koordinasi posko dan kaji kebutuhan cepat (Rapid Needs Assessment) memastikan logistik tersalurkan secara adil, tertib, dan tidak memicu kericuhan massa.',
        dalilSyariah: 'Kaidah Fiqh: "Tasharruful Imam ‘alar Ra’iyyah Manuthun bil Mashlahah".'
      }
    ]
  },
  {
    id: 'mod-aud-04',
    code: 'REL-AUD-04',
    title: 'Akuntabilitas, Audit Syariah & Transparansi Terbuka',
    subtitle: 'Prinsip Ayat Mudayanah, Verifikasi Komunitas, dan Validasi Bukti Penyaluran',
    category: 'akuntabilitas_keuangan',
    categoryLabel: 'Akuntabilitas & Audit',
    level: 'Lanjutan',
    durationMinutes: 25,
    xpReward: 300,
    badgeReward: {
      name: 'Auditor Amanah & Ledger Publik',
      icon: 'CheckCircle2',
      level: 'platinum',
      description: 'Ahli dalam prinsip pencatatan jujur Al-Qur’an, verifikasi multisaksi komunitas, dan integritas ledger publik.'
    },
    icon: 'CheckCircle2',
    colorScheme: {
      badgeBg: 'bg-teal-50 text-teal-900 border-teal-300',
      accent: 'teal',
      gradient: 'from-teal-950 via-slate-900 to-emerald-950'
    },
    overview: 'Islam mengajarkan bahwa setiap sen harta umat yang dikelola harus dapat dipertanggungjawabkan secara transparan, baik di hadapan sesama manusia di dunia maupun di hadapan Allah Ta’ala di akhirat. Pelajari implementasi Ayat Mudayanah (ayat terpanjang Al-Qur’an) dalam audit lapangan digital.',
    objectives: [
      'Memahami landasan syariah akuntansi dalam Ayat Mudayanah (QS. Al-Baqarah: 282).',
      'Menerapkan verifikasi saksi komunitas (Syahadah bil-Qisth) pada setiap milestone.',
      'Mengumpulkan bukti nota belanja, foto geotagging GPS, dan nomor resi digital.',
      'Menghindari benturan kepentingan (conflict of interest) dalam pengadaan barang inisiatif.'
    ],
    certificateTitle: 'Sertifikat Audit Syariah & Akuntabilitas Filantropi (Level Lanjutan)',
    lessons: [
      {
        id: 'les-4-1',
        title: 'Pelajaran 1: Ayat Mudayanah & Kewajiban Pencatatan Rinci',
        durationMinutes: 9,
        content: [
          'Ayat terpanjang dalam seluruh Al-Qur’an bukanlah ayat tentang sholat atau puasa, melainkan ayat tentang pencatatan transaksi keuangan dan amanah muamalah (QS. Al-Baqarah: 282).',
          'Allah Ta’ala berfirman: "Wahai orang-orang yang beriman! Apabila kamu bermuamalah tidak secara tunai untuk waktu yang ditentukan, hendaklah kamu menuliskannya...".',
          'Prinsip Akuntansi Syariah bagi Relawan: Setiap pengeluaran, sekecil apa pun (seperti biaya parkir posko, bensin operasional, atau pembelian garam dapur umum), wajib dicatat dengan bukti struk/nota otentik. Tidak boleh ada angka perkiraan tanpa verifikasi.'
        ],
        keyTakeaways: [
          'Pencatatan keuangan adalah perintah langsung Al-Qur\'an untuk mencegah sengketa dan keraguan.',
          'Transparansi 100% adalah perisai dari tuduhan fitnah penyelewengan dana umat.',
          'Struk fisik atau e-receipt wajib disimpan dan diunggah ke ledger audit terbuka.'
        ],
        quranHadithRef: {
          arabic: 'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰٓ أَجَلٍ مُّسَمًّى فَٱكْتُبُوهُ ۚ وَلْيَكْتُب بَّيْنَكُمْ كَاتِبٌۢ بِٱلْعَدْلِ',
          translation: 'Hai orang-orang yang beriman, apabila kamu bermuamalah tidak secara tunai untuk waktu yang ditentukan, hendaklah kamu menuliskannya. Dan hendaklah seorang penulis di antara kamu menuliskannya dengan benar...',
          source: 'QS. Al-Baqarah: 282'
        },
        caseStudy: {
          scenario: 'Seorang relawan logistik membeli perlengkapan sekolah anak yatim seharga Rp 4.500.000, namun lupa meminta nota dari toko buku tradisional.',
          solution: 'Relawan wajib kembali ke toko tersebut untuk meminta nota resmi berstempel atau membuat Berita Acara Transaksi Lapangan yang ditandatangani penjual dan dua saksi relawan lainnya sebelum diserahkan ke bagian keuangan.',
          ethicalPrinciple: 'Kitabah bil-Adl: Menuliskan transaksi secara jujur dan terdokumentasi rapi.'
        }
      },
      {
        id: 'les-4-2',
        title: 'Pelajaran 2: Verifikasi Saksi Komunitas (Syahadah bil-Qisth)',
        durationMinutes: 8,
        content: [
          'Untuk menghindari manipulasi data atau "proyek fiktif", platform Islamicity menerapkan prinsip Verifikasi Komunitas Berkeadilan (Syahadah bil-Qisth).',
          'Setiap penyaluran milestone (misal: penyelesaian pengeboran sumur wakaf atau penyerahan gerobak usaha UMKM) wajib divalidasi minimal oleh perwakilan tokoh masyarakat setempat (Ketua RT, Ulama/Ustadz setempat, dan penerima manfaat langsung).',
          'Saksi bersumpah bahwa bantuan telah diterima secara utuh, sesuai spesifikasi, dan tanpa pemotongan liar.'
        ],
        keyTakeaways: [
          'Keterlibatan warga lokal sebagai saksi independen memperkuat kredibilitas laporan.',
          'Sistem voting komunitas menjamin bantuan tepat sasaran dan berdaya guna.',
          'Bukti koordinat GPS dan foto tanggal real-time mencegah manipulasi data masa lalu.'
        ],
        quranHadithRef: {
          arabic: 'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ كُونُوا۟ قَوَّٰمِينَ لِلَّهِ شُهَدَآءَ بِٱلْقِسْطِ',
          translation: 'Hai orang-orang yang beriman hendaklah kamu jadi orang-orang yang selalu menegakkan (kebenaran) karena Allah, menjadi saksi dengan adil...',
          source: 'QS. Al-Ma\'idah: 8'
        },
        caseStudy: {
          scenario: 'Sebuah kontraktor sumur bor mengklaim air sudah keluar deras, namun tokoh warga menyatakan debitnya kecil dan masih keruh berlumpur.',
          solution: 'Relawan tidak boleh menandatangani verifikasi penyelesaian hingga kontraktor membersihkan pipa dan debit air memenuhi standar minimal 2 liter/detik yang disaksikan tokoh warga.',
          ethicalPrinciple: 'Syahadah Shadiqah: Menjadi saksi kebenaran tanpa menutupi kekurangan.'
        }
      },
      {
        id: 'les-4-3',
        title: 'Pelajaran 3: Pencegahan Benturan Kepentingan (Conflict of Interest)',
        durationMinutes: 8,
        content: [
          'Benturan kepentingan terjadi ketika kepentingan pribadi, keluarga, atau bisnis relawan mempengaruhi keputusan pengadaan bantuan sosial.',
          'Contoh Benturan Kepentingan: Relawan pengadaan memilih toko sembako milik sepupunya dengan harga lebih mahal dari harga pasar normal tanpa proses perbandingan harga kompetitif.',
          'Prinsip Syariah: Relawan wajib mendeklarasikan hubungan keluarga/bisnis (disclosure) dan mengundurkan diri dari proses pengambilan keputusan pengadaan tersebut (*recusal*) untuk menjaga kesucian amanah.'
        ],
        keyTakeaways: [
          'Deklarasikan keterkaitan pribadi sebelum melakukan pengadaan barang atau jasa inisiatif.',
          'Gunakan mekanisme perbandingan minimal 3 vendor untuk mendapatkan kualitas terbaik dan harga wajar.',
          'Harta sedekah umat adalah titipan sakral yang harus dibelanjakan sehemat dan seefektif mungkin.'
        ],
        quranHadithRef: {
          arabic: 'إِنَّ ٱللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا۟ ٱلْأَمَٰنَٰتِ إِلَىٰٓ أَهْلِهَا',
          translation: 'Sesungguhnya Allah menyuruh kamu menyampaikan amanat kepada yang berhak menerimanya...',
          source: 'QS. An-Nisa\': 58'
        },
        caseStudy: {
          scenario: 'Relawan pengadaan barang butuh menyewa 3 mobil pikap logistik. Kakak kandungnya memiliki usaha rental mobil pikap.',
          solution: 'Relawan tersebut wajib memberitahu tim posko tentang hubungan keluarga tersebut, meminta penawaran harga resmi kakaknya, dan menyerahkan keputusan kepada relawan lain yang independen untuk membandingkannya dengan rental lain.',
          ethicalPrinciple: 'Bara\'ah min Syubhat: Membersihkan diri dari prasangka dan syubhat kepentingan pribadi.'
        }
      }
    ],
    quiz: [
      {
        id: 'q-aud-1',
        question: 'Ayat terpanjang dalam Al-Qur’an (QS. Al-Baqarah: 282 / Ayat Mudayanah) memberikan pedoman fundamental bagi tata kelola keuangan sosial Islam, yaitu...',
        scenarioContext: 'Relawan menyusun laporan pertanggungjawaban dana zakat tahunan.',
        options: [
          'Membelanjakan semua uang secepat mungkin tanpa perlu mencatat detailnya',
          'Kewajiban mencatat transaksi keuangan secara adil, tertulis, dan disertai saksi terpercaya',
          'Menyimpan seluruh bukti nota secara rahasia agar tidak dilihat publik',
          'Menggunakan sistem pembayaran tunai tanpa bukti kwitansi apapun'
        ],
        correctOptionIndex: 1,
        explanation: 'QS. Al-Baqarah: 282 memerintahkan penulisan transaksi muamalah dan utang-piutang oleh penulis yang adil serta dihadiri saksi demi menjaga kepastian dan mencegah perselisihan.',
        dalilSyariah: 'QS. Al-Baqarah: 282 - "...faktubūh, wal-yaktub baynakum kātibum bil-‘adl..."'
      },
      {
        id: 'q-aud-2',
        question: 'Mengapa verifikasi saksi komunitas warga setempat (Syahadah bil-Qisth) sangat penting sebelum sebuah milestone penyaluran dinyatakan selesai?',
        scenarioContext: 'Proyek renovasi atap madrasah dhuafa di pedalaman NTT.',
        options: [
          'Hanya sebagai formalitas foto bersama untuk diunggah di Instagram',
          'Untuk memastikan secara riil di lapangan bahwa spesifikasi pekerjaan telah selesai dan memberi manfaat nyata bagi mustahik',
          'Agar relawan bisa membebankan biaya makan siang kepada warga setempat',
          'Untuk menunda-nunda pencairan sisa dana operasional kontraktor'
        ],
        correctOptionIndex: 1,
        explanation: 'Verifikasi komunitas menjamin kebenaran fisik (objektif) dari laporan lapangan, sehingga dana publik tidak terserap untuk pekerjaan fiktif atau di bawah standar mutu.',
        dalilSyariah: 'QS. Al-Ma\'idah: 8 & QS. An-Nisa\': 135.'
      },
      {
        id: 'q-aud-3',
        question: 'Bagaimana tindakan berintegritas tinggi jika seorang relawan bertugas membeli beras untuk posko dan ternyata saudaranya menjual beras dengan harga termurah di kota tersebut?',
        scenarioContext: 'Relawan divisi logistik mencari suplier 2 ton beras premium.',
        options: [
          'Langsung bertransaksi diam-diam tanpa memberitahu siapapun di posko',
          'Mendeklarasikan hubungan keluarga kepada korlap/tim, melampirkan perbandingan harga dari 2 toko lain, dan membiarkan tim independen yang memutuskan',
          'Sengaja membeli di toko lain yang lebih mahal agar tidak dicurigai orang',
          'Meminta diskon beras gratis untuk konsumsi keluarga sendiri'
        ],
        correctOptionIndex: 1,
        explanation: 'Deklarasi keterkaitan (disclosure) dan menyerahkan keputusan kepada rekan independen adalah SOP baku pencegahan konflik kepentingan (conflict of interest) sesuai kaidah amanah.',
        dalilSyariah: 'QS. An-Nisa\': 58 & Kaidah: "Al-Amanatu taqtadhi at-tajarruda ‘anil hawa".'
      }
    ]
  },
  {
    id: 'mod-com-05',
    code: 'REL-COM-05',
    title: 'Komunikasi Empatis, Dakwah Bil-Hal & Resolusi Konflik',
    subtitle: 'Kaidah Tutur Kata Santun, Meredakan Kericuhan Kerumunan, dan Tasliyah Spiritual',
    category: 'manajemen_sosial',
    categoryLabel: 'Komunikasi & Konseling',
    level: 'Lanjutan',
    durationMinutes: 20,
    xpReward: 250,
    badgeReward: {
      name: 'Duta Diplomasi & Konseling Ummat',
      icon: 'Heart',
      level: 'gold',
      description: 'Menguasai seni tutur kata santun Qur’ani, resolusi damai saat antrean bantuan, dan dukungan psikososial islami.'
    },
    icon: 'Heart',
    colorScheme: {
      badgeBg: 'bg-indigo-50 text-indigo-900 border-indigo-300',
      accent: 'indigo',
      gradient: 'from-indigo-950 via-slate-900 to-emerald-950'
    },
    overview: 'Relawan sering berhadapan dengan penyintas yang sedang dilanda duka mendalam, trauma, atau emosi tegang akibat lapar dan ketidakpastian. Modul ini mengajarkan kaidah komunikasi Qur’ani (*Qawlan Layyinan, Qawlan Ma’rufan*), teknik de-eskalasi kerumunan, dan pendampingan psikososial berbasis ketauhidan.',
    objectives: [
      'Menerapkan kaidah tutur kata Al-Qur\'an (Qawlan Ma\'rufan, Qawlan Layyinan, Qawlan Sadidan).',
      'Menguasai teknik de-eskalasi ketegangan massa saat pembagian sembako.',
      'Melakukan Psychological First Aid (PFA) Islami dengan sentuhan tasliyah spiritual.',
      'Membangun dakwah bil-hal yang menghadirkan citra luhur Islam yang rahmatan lil ‘alamin.'
    ],
    certificateTitle: 'Sertifikat Komunikasi Sosial & Resolusi Lapangan (Level Lanjutan)',
    lessons: [
      {
        id: 'les-5-1',
        title: 'Pelajaran 1: Kaidah Tutur Kata Qur’ani dalam Pelayanan Mustahik',
        durationMinutes: 7,
        content: [
          'Al-Qur\'an menggariskan beberapa tingkatan komunikasi mulia yang wajib menjadi pedoman relawan saat berbicara dengan dhuafa dan penyintas bencana:',
          '1. *Qawlan Ma’rufan* (Perkataan yang pantas dan santun, QS. An-Nisa: 5): Berbicara tanpa nada menggurui atau merendahkan martabat.',
          '2. *Qawlan Layyinan* (Perkataan yang lemah lembut, QS. Thaha: 44): Menenangkan jiwa yang sedang gelisah atau marah.',
          '3. *Qawlan Maysuran* (Perkataan yang menyenangkan dan memberi harapan, QS. Al-Isra: 28): Terutama ketika stok bantuan sementara habis dan belum bisa memberi.',
          '4. *Qawlan Sadidan* (Perkataan yang benar dan jujur, QS. Al-Ahzab: 70): Tidak memberi janji palsu tentang bantuan yang belum pasti.'
        ],
        keyTakeaways: [
          'Gunakan tutur kata yang sejuk; senyuman tulus relawan adalah sedekah pertama yang diterima mustahik.',
          'Jika bantuan belum bisa dipenuhi, sampaikan dengan *qawlan maysuran* (janji yang baik tanpa nada membentak).',
          'Jangan pernah membuat janji berlebihan yang tidak dapat ditepati.'
        ],
        quranHadithRef: {
          arabic: 'وَقُولُوا۟ لِلنَّاسِ حُسْنًا',
          translation: '...dan bertuturkatalah yang baik kepada manusia...',
          source: 'QS. Al-Baqarah: 83'
        },
        caseStudy: {
          scenario: 'Paket sembako di posko habis sementara masih ada 20 warga miskin yang belum kebagian. Salah satu warga mulai marah-marah.',
          solution: 'Relawan tidak boleh membalas dengan emosi. Ucapkan salam, minta maaf dengan rendah hati (*qawlan maysuran*), catat nama dan alamat mereka dengan teliti, dan janjikan pengantaran langsung ke rumah pada kloter berikutnya.',
          ethicalPrinciple: 'Qawlan Maysuran: Menjawab kekecewaan dengan kelembutan dan solusi nyata.'
        }
      },
      {
        id: 'les-5-2',
        title: 'Pelajaran 2: Manajemen Kerumunan (Crowd Control) Tanpa Kekerasan',
        durationMinutes: 7,
        content: [
          'Kericuhan pembagian bantuan sering terjadi akibat ketidakjelasan informasi, antrean yang tidak tertata, atau ketakutan warga tidak kebagian jatah.',
          'Langkah De-eskalasi Relawan Lapangan:',
          '1. Sistem Kupon Terdata: Hindari membagikan bantuan langsung dari bak truk secara acak. Bagikan kupon ke rumah-rumah warga pada H-1.',
          '2. Penataan Jalur Satu Arah: Buat alur masuk, verifikasi data kupon, pengambilan paket, dan alur keluar yang terpisah agar tidak terjadi arus balik.',
          '3. Kursi Tunggu Lansia: Pisahkan antrean kelompok rentan (ibu menggendong bayi, lansia, difabel) di tenda tersendiri dengan tempat duduk dan air minum gratis.',
          '4. Komunikasi Terbuka: Gunakan pengeras suara dengan suara tenang dan bersahabat mengabarkan ketersediaan stok.'
        ],
        keyTakeaways: [
          'Kunci ketertiban adalah kepastian informasi: warga tenang jika tahu mereka pasti kebagian haknya.',
          'Jangan gunakan kekerasan fisik atau bentakan kasar dalam menertibkan warga.',
          'Hormati kaum lansia dan ibu hamil dengan antrean prioritas berperikemanusiaan.'
        ],
        quranHadithRef: {
          arabic: 'ٱلَّذِينَ يُنفِقُونَ فِى السَّرَّآءِ وَٱلضَّرَّآءِ وَٱلْكَٰظِمِينَ ٱلْغَيْظَ وَٱلْعَافِينَ عَنِ ٱلنَّاسِ ۗ وَٱللَّهُ يُحِبُّ ٱلْمُحْسِنِينَ',
          translation: '(yaitu) orang-orang yang menafkahkan (hartanya), baik di waktu lapang maupun sempit, dan orang-orang yang menahan amarahnya dan memaafkan (kesalahan) orang. Allah menyukai orang-orang yang berbuat kebajikan.',
          source: 'QS. Ali \'Imran: 134'
        },
        caseStudy: {
          scenario: 'Warga mulai mendesak pagar pembatas posko karena mendengar kabar angin bahwa bantuan minyak goreng akan segera habis.',
          solution: 'Koordinator posko segera berdiri di tempat yang terlihat, menggunakan megafon dengan nada tenang, memperlihatkan tumpukan kardus stok cadangan, dan menegaskan bahwa semua pemilik kupon dijamin menerima paketnya.',
          ethicalPrinciple: 'Kazhmul Ghaizh & Tabayyun: Menahan emosi dan memberikan klarifikasi menenangkan.'
        }
      },
      {
        id: 'les-5-3',
        title: 'Pelajaran 3: Pendampingan Spiritual & Tasliyah Korban Musibah',
        durationMinutes: 6,
        content: [
          'Selain bantuan sandang pangan fisik, korban musibah sangat membutuhkan pemulihan batin (*psychospiritual healing*).',
          'Konsep Tasliyah dalam Islam adalah menghibur hati yang berduka dengan mengingatkan hikmah takdir Allah, keutamaan sabar, dan kabar gembira bagi mereka yang tabah.',
          'Hindari ucapan klise yang menyalahkan korban seperti: "Ini azab karena desa kalian banyak maksiat". Ucapan seperti ini sangat melukai hati dan dilarang.',
          'Gunakan kalimat yang menumbuhkan harapan: "Allah menguji hamba-Nya yang dicintai-Nya, insya Allah kesabaran Bapak/Ibu akan diganti dengan istana di surga dan jalan keluar terbaik."'
        ],
        keyTakeaways: [
          'Dengarkan keluh kesah mereka dengan penuh empati tanpa menyela atau menghakimi.',
          'Dilarang melontarkan tuduhan "azab dosa" kepada korban yang sedang berduka.',
          'Doakan mereka secara langsung dan temani mereka dengan doa-doa mustajab para Nabi.'
        ],
        quranHadithRef: {
          arabic: 'إِنَّمَا يُوَفَّى ٱلصَّٰبِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
          translation: 'Sesungguhnya hanya orang-orang yang bersabarlah yang dicukupkan pahala mereka tanpa batas.',
          source: 'QS. Az-Zumar: 10'
        },
        caseStudy: {
          scenario: 'Seorang ibu menangis tersedu-sedu karena seluruh rumah dan ternaknya lenyap tersapu banjir lahar dingin.',
          solution: 'Relawan duduk di sampingnya, mendengarkan curahan hatinya, menyediakan air minum hangat, merangkulnya dengan kasih sayang, dan mengingatkan bahwa Allah Maha Pengasih dan kami bersama para relawan akan mendampingi beliau hingga pulih.',
          ethicalPrinciple: 'Tasliyah Rahmah: Menjadi penyejuk jiwa dan penguat asa di masa duka.'
        }
      }
    ],
    quiz: [
      {
        id: 'q-com-1',
        question: 'Ketika stok paket bantuan pangan habis sementara masih ada warga yang belum menerima dan mereka mulai kecewa, adab komunikasi Qur’ani apa yang wajib dipraktikkan oleh relawan?',
        scenarioContext: 'Relawan bertugas menjaga meja registrasi di penghujung hari.',
        options: [
          'Menyalahkan warga karena mereka datang terlambat ke posko',
          'Menerapkan "Qawlan Maysuran" (tutur kata lemah lembut penuh empati, meminta maaf, mencatat data mereka, dan menjanjikan solusi pengantaran berikutnya)',
          'Menutup tenda posko dan lari menghindar dari hadapan warga',
          'Memarahi balik warga agar mereka tahu diri'
        ],
        correctOptionIndex: 1,
        explanation: 'QS. Al-Isra: 28 memerintahkan jika kita belum dapat memberikan bantuan kepada mereka yang berhak, bertuturlah dengan qawlan maysuran (perkataan yang pantas dan melegakan hati).',
        dalilSyariah: 'QS. Al-Isra\': 28 - "Fa-qul lahum qawlam maysūrā".'
      },
      {
        id: 'q-com-2',
        question: 'Manakah ucapan yang HARAM dan TIDAK BOLEH diucapkan oleh seorang relawan saat mendampingi korban yang baru saja kehilangan sanak keluarga akibat musibah?',
        scenarioContext: 'Sesi pendampingan psikososial di tenda pengungsian darurat.',
        options: [
          '"Inna lillahi wa inna ilaihi raji’un, semoga Allah menganugerahkan ketabahan dan surga bagi almarhum"',
          '"Pasti ini azab dan kutukan Allah karena desa Bapak/Ibu banyak maksiat dan tidak beriman"',
          '"Kami para relawan akan senantiasa menemani dan membantu keluarga Ibu semampu kami"',
          '"Mari kita doakan bersama-sama agar Allah mengganti kesedihan ini dengan jalan keluar terbaik"'
        ],
        correctOptionIndex: 1,
        explanation: 'Menghakimi musibah sebagai azab kepada korban yang berduka adalah sikap sombong, su\'udzon, dan melanggar prinsip tasliyah Qur\'ani yang menjunjung empati dan kasih sayang.',
        dalilSyariah: 'HR. Muslim tentang larangan mencela dan anjuran mendoakan orang yang tertimpa musibah.'
      },
      {
        id: 'q-com-3',
        question: 'Strategi operasional apa yang paling efektif untuk mencegah terjadinya kericuhan massa saat penyaluran 1.000 paket sembako di lapangan terbuka?',
        scenarioContext: 'Persiapan distribusi akbar sembako jelang hari raya.',
        options: [
          'Membagikan bantuan langsung dari bak mobil bergerak tanpa pendataan',
          'Menggunakan sistem kupon H-1, pemisahan tenda khusus lansia/ibu hamil, jalur antrean satu arah, dan komunikasi jelas via pengeras suara',
          'Mengharuskan warga saling berebut siapa yang paling cepat sampai ke panggung',
          'Mengunci pagar posko dan membagikan bantuan di tengah malam buta'
        ],
        correctOptionIndex: 1,
        explanation: 'Sistem kupon terdata, tenda prioritas lansia/ibu hamil, dan rekayasa alur satu arah adalah standar terbaik crowd management humanis yang mencegah kepanikan dan korban terinjak.',
        dalilSyariah: 'Kaidah Fiqh: "Dar’ul Mafasid Muqaddamun ‘ala Jalbil Mashalih" (Mencegah madharat lebih diutamakan).'
      }
    ]
  },
  {
    id: 'mod-uji-kompetensi-syariah',
    code: 'REL-UKS-ADV',
    title: 'Uji Kompetensi Syariah: Asesmen Kasus & Integritas Lapangan',
    subtitle: 'Kuis Interaktif Evaluasi Skenario Kasus Dilema Nyata Lapangan Sebelum Meraih Lencana Tingkat Lanjut',
    category: 'uji_kompetensi',
    categoryLabel: 'Uji Kompetensi Syariah',
    level: 'Lanjutan',
    durationMinutes: 40,
    xpReward: 500,
    isCompetencyExam: true,
    passingScorePercentage: 75,
    badgeReward: {
      name: 'Mujahid Ijtima’i Teladan Syariah (Tingkat Lanjut)',
      icon: 'ShieldCheck',
      level: 'platinum',
      description: 'Kelulusan tertinggi Uji Kompetensi Syariah: Menguasai 8 skenario dilema lapangan tanpa kompromi, menguasai fatwa ZISWAF krisis, etika privasi dhuafa, dan tata kelola nol gratifikasi.'
    },
    icon: 'GraduationCap',
    colorScheme: {
      badgeBg: 'bg-purple-50 text-purple-900 border-purple-300',
      accent: 'purple',
      gradient: 'from-purple-950 via-stone-900 to-emerald-950'
    },
    overview: 'Uji Kompetensi Syariah adalah asesmen komprehensif berstandar Dewan Pengawas Syariah yang dirancang untuk menguji kematangan spiritual, ketajaman fikih muamalah, dan integritas etis relawan dalam menyelesaikan skenario dilema nyata di lapangan. Kelulusan ujian berbasis kasus ini (minimal skor 75%) menjadi prasyarat mutlak sebelum relawan dianugerahi Lencana Kehormatan Tingkat Lanjut (Platinum).',
    objectives: [
      'Menguji kemampuan analitis dalam memecahkan dilema dana zakat vs kebutuhan darurat korban non-asnaf saat bencana.',
      'Mengevaluasi komitmen perlindungan martabat dhuafa (anti-poverty porn) dan privasi anak yatim dalam dokumentasi media.',
      'Menegakkan integritas nol gratifikasi dan regulasi anti-ghulul saat berinteraksi dengan rekanan logistik dan aparat lokal.',
      'Menerapkan kaidah syariah Hifzhun Nafs untuk menyeimbangkan misi pertolongan kemanusiaan dengan keselamatan jiwa relawan.',
      'Menguji kepatuhan akuntansi syariah pada ayat mudayanah (QS. Al-Baqarah: 282) saat menangani transaksi darurat tanpa struk fisik.'
    ],
    certificateTitle: 'Syahadah Al-Kafa’ah Asy-Syar’iyyah (Sertifikasi Kompetensi Relawan Syariah Tingkat Lanjut)',
    lessons: [
      {
        id: 'les-uks-1',
        title: 'Pembekalan 1: Kerangka Pengambilan Keputusan Syariah saat Krisis Lapangan',
        durationMinutes: 10,
        content: [
          'Dalam situasi krisis bencana dan penyaluran di kantong-kantong kemiskinan, relawan sering dihadapkan pada situasi pelik di mana teks fikih klasik harus diterapkan dengan penuh hikmah dan ketepatan kaidah ushul fiqh.',
          '5 Kaidah Fiqh Pokok (Al-Qawa\'id Al-Fiqhiyyah Al-Khams) yang wajib dikuasai:',
          '1. "Al-Umuru bi Maqashidiha" (Setiap perkara bergantung pada niat dan tujuannya): Landasan utama kemurnian ikhlas dalam setiap tindakan penugasan relawan.',
          '2. "Al-Yaqinu La Yuzalu bisy-Syakk" (Keyakinan tidak bisa dihilangkan oleh keraguan): Menegakkan asas praduga baik, pembuktian objektif, dan audit data berbasis fakta.',
          '3. "Al-Masyaqqatu Tajlibut Taysir" (Kesulitan mendatangkan kemudahan): Memberikan kelonggaran syar\'i (rukhshah) dalam ibadah dan teknis pertolongan darurat ketika jiwa manusia terancam.',
          '4. "Adh-Dhararu Yuzal" (Segala kemudaratan harus dihilangkan): Menyelamatkan korban dari bahaya kelaparan, penyakit menular, dan cuaca ekstrem secepat mungkin.',
          '5. "Al-\'Adatu Muhakkamah" (Adat kebiasaan masyarakat setempat yang tidak bertentangan dengan syariat dapat dijadikan rujukan hukum): Menghormati kearifan lokal dalam komunikasi dakwah bil-hal.'
        ],
        keyTakeaways: [
          'Gunakan kaidah fikih sebagai panduan moral dan operasional di saat regulasi teknis belum mencakup situasi lapangan.',
          'Jangan mengambil keputusan fatal secara sepihak; libatkan musyawarah tim posko dan konsultasi Dewan Pengawas Syariah.',
          'Keringanan syariat (rukhshah) hanya berlaku sesuai kadar keterdesakannya: "Adh-Dharuratu tuqaddaru bi qadariha".'
        ],
        quranHadithRef: {
          arabic: 'يُرِيدُ ٱللَّهُ بِكُمُ ٱلْيُسْرَ وَلَا يُرِيدُ بِكُمُ ٱلْعُسْرَ',
          translation: 'Allah menghendaki kemudahan bagimu, dan tidak menghendaki kesukaran bagimu...',
          source: 'QS. Al-Baqarah: 185'
        },
        caseStudy: {
          scenario: 'Di lokasi terpencil gempa, relawan kebingungan karena makanan kaleng halal tidak memiliki label MUI namun diproduksi oleh produsen daging terpercaya di wilayah mayoritas muslim.',
          solution: 'Kaidah dasar makanan di negeri muslim adalah suci dan halal. Selama tidak ada indikasi keharaman dan di tengah darurat kelaparan, makanan tersebut boleh dikonsumsi untuk menyelamatkan jiwa pengungsi.',
          ethicalPrinciple: 'Hifzhun Nafs & Taisir: Mengutamakan keselamatan jiwa di atas keraguan tak berdasar.'
        }
      },
      {
        id: 'les-uks-2',
        title: 'Pembekalan 2: Kode Etik Amil Terpadu & Proteksi Nol Kompromi',
        durationMinutes: 12,
        content: [
          'Relawan berakreditasi tingkat lanjut memegang tanggung jawab amanah publik yang sangat tinggi. Pelanggaran kode etik dapat mencoreng kepercayaan umat terhadap seluruh gerakan filantropi Islam.',
          '4 Pilar Kode Etik Relawan Tingkat Lanjut Islamicity:',
          '1. Integritas Nol Gratifikasi: Dilarang keras menerima pemberian dalam bentuk uang tunai, komisi pengadaan, diskon pribadi, oleh-oleh berharga, atau fasilitas istimewa dari vendor mitra maupun dari mustahik.',
          '2. Perlindungan Privasi & Perlindungan Anak: Dilarang menyebarkan foto atau identitas mustahik yang sedang menangis, menderita penyakit memalukan, atau anak-anak yang bisa menjadi target perundungan sosial di kemudian hari.',
          '3. Deklarasi Benturan Kepentingan: Relawan yang memiliki ikatan keluarga atau bisnis dengan pihak ketiga wajib mendeklarasikan diri dan menarik diri (recuse) dari tim seleksi.',
          '4. Keabsahan Akad & Segregasi Dana: Setiap rupiah yang diamanahkan donatur untuk pos tertentu (Zakat Maal, Zakat Fitrah, Fidyah, Kifarat, Infak Operasional, Wakaf Tanah) harus disalurkan tepat sasaran sesuai akad asalnya.'
        ],
        keyTakeaways: [
          'Pemberian yang berkaitan dengan tugas penyaluran bantuan tergolong Ghulul (hadiah terlarang).',
          'Martabat mustahik bernilai lebih tinggi daripada popularitas konten media sosial posko.',
          'Segregasi dompet dana wajib diaudit berkala untuk menghindari tercampurnya dana zakat dengan operasional umum.'
        ],
        quranHadithRef: {
          arabic: 'هَدَايَا الْعُمَّالِ غُلُولٌ',
          translation: 'Hadiah-hadiah yang diterima para petugas (pekerja amanah) adalah bentuk ghulul (pengkhianatan/korupsi).',
          source: 'HR. Ahmad & Al-Baihaqi (Hadits Shahih)'
        },
        caseStudy: {
          scenario: 'Vendor toko material menawarkan uang komisi Rp 2.000.000 kepada relawan karena telah memilih tokonya untuk pengadaan semen pembangunan MCK darurat.',
          solution: 'Relawan menolak dengan tegas uang komisi pribadi tersebut dan meminta vendor mengubahnya menjadi potongan harga resmi (diskon) pada nota invoice sehingga menghemat anggaran dana umat.',
          ethicalPrinciple: 'Integritas Nol Ghulul: Mengalihkan komisi pribadi menjadi diskon penghematan dana sosial.'
        }
      },
      {
        id: 'les-uks-3',
        title: 'Pembekalan 3: Navigasi Uji Kasus & Prasyarat Lencana Tingkat Lanjut',
        durationMinutes: 8,
        content: [
          'Uji Kompetensi Syariah terdiri dari 8 Skenario Kasus Lapangan yang diambil dari peristiwa nyata di berbagai zona bencana dan kantong kemiskinan di Indonesia.',
          'Kriteria Kelulusan:',
          '1. Ambang Batas Kelulusan: Minimal skor 75% (menjawab benar minimal 6 dari 8 skenario kasus).',
          '2. Tiap pertanyaan menyajikan konteks situasional nyata, opsi dilematis, serta pembahasan mendalam dalil fikih.',
          '3. Relawan yang lulus akan secara otomatis dianugerahi Lencana Kehormatan "Mujahid Ijtima’i Teladan Syariah (Tingkat Lanjut)", bonus +500 XP reputasi, dan Piagam Syahadah Al-Kafa’ah bertanda tangan digital.',
          '4. Apabila belum mencapai 75%, relawan dapat meninjau kembali pembahasan fikih syariah dan mengulang ujian tanpa penalti.'
        ],
        keyTakeaways: [
          'Fokus pada nilai-nilai substansial: kejujuran, keadilan, penjagaan amanah, dan kasih sayang pada mustahik.',
          'Pilihlah jawaban yang paling menjaga syariat sekaligus memberikan kemaslahatan terluas bagi umat.',
          'Siapkan hati dan niat tulus sebelum menekan tombol "Mulai Kuis Skenario Kasus".'
        ],
        quranHadithRef: {
          arabic: 'وَٱلَّذِينَ جَٰهَدُوا۟ فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ ٱللَّهَ لَمَعَ ٱلْمُحْسِنِينَ',
          translation: 'Dan orang-orang yang berjihad untuk (mencari keridhaan) Kami, benar-benar akan Kami tunjukkan kepada mereka jalan-jalan Kami. Dan sesungguhnya Allah benar-benar beserta orang-orang yang berbuat baik.',
          source: 'QS. Al-\'Ankabut: 69'
        },
        caseStudy: {
          scenario: 'Seorang relawan gugup menghadapi ujian kasus karena takut gagal meraih lencana tingkat lanjut.',
          solution: 'Tujuan utama ujian bukanlah sekadar mengejar titel lencana, melainkan memastikan relawan memiliki bekal ilmu yang kokoh agar tidak mencelakai mustahik maupun diri sendiri saat bertugas di medan dakwah.',
          ethicalPrinciple: 'Ilmu Sebelum Beramal: "Al-\'Ilmu qablal qawli wal \'amal".'
        }
      }
    ],
    quiz: [
      {
        id: 'q-uks-1',
        question: 'Bagaimana tindakan syar’i yang paling tepat bagi relawan dalam menyalurkan bantuan makanan dan selimut darurat bagi 3 keluarga korban non-muslim?',
        scenarioContext: 'Gempa bumi meratakan sebuah desa di lereng bukit. Di posko logistik, stok makanan yang tersisa adalah 1 karung beras berlabel "Khusus Zakat Maal Asnaf Fakir Miskin", sementara kas kecil posko memiliki saldo Infak Kemanusiaan Umum sebesar Rp 2.500.000.',
        options: [
          'Menolak memberikan bantuan sama sekali kepada keluarga non-muslim karena bukan asnaf zakat muslim',
          'Menggunakan pos dana Infak Kemanusiaan Umum untuk membelanjakan sembako dan selimut bagi keluarga non-muslim tersebut, sehingga hak asnaf zakat maal tetap terjaga murni',
          'Membagikan beras zakat maal tersebut secara bebas tanpa memperdulikan ketentuan akad syariah',
          'Menyuruh keluarga non-muslim tersebut berpindah agama terlebih dahulu sebelum diberikan bantuan makanan'
        ],
        correctOptionIndex: 1,
        explanation: 'Fikih zakat membatasi zakat maal kepada 8 asnaf muslim, namun syariat Islam sangat menganjurkan membantu korban kemanusiaan tanpa membedakan agama melalui pos Infak, Sedekah, dan Hadiah (QS. Al-Mumtahanah: 8). Menggunakan pos dana infak umum menjaga ketepatan tamlik zakat sekaligus menegakkan rahmatan lil \'alamin.',
        dalilSyariah: 'QS. Al-Mumtahanah: 8 (perintah berbuat baik dan berlaku adil kepada orang non-muslim yang tidak memerangi) & Fatwa MUI tentang Penyaluran Bantuan Bencana.'
      },
      {
        id: 'q-uks-2',
        question: 'Sebagai relawan yang memahami etika syariah dan perlindungan martabat dhuafa, apa langkah tegas yang harus Anda ambil?',
        scenarioContext: 'Tim media sosial posko relawan bermaksud memproduksi video pendek viral di TikTok/Reels. Mereka mengarahkan seorang anak yatim berusia 8 tahun untuk menangis tersedu-sedu sambil memegang foto ayahnya yang wafat demi memancing simpati donatur dan menaikkan nominal donasi.',
        options: [
          'Mendukung penuh pembuatan video tersebut karena tujuannya mulia demi mengumpulkan uang donasi sebanyak-banyaknya',
          'Menghentikan proses syuting tersebut, melarang eksploitasi kesedihan anak yatim (anti-poverty porn), dan mengarahkan tim media untuk menyajikan narasi martabat, harapan, dan program pemberdayaan pendidikan',
          'Membiarkan syuting berjalan asalkan anak yatim tersebut diberi upah uang jajan tambahan',
          'Menyebarkan video tersebut ke grup WhatsApp keluarga terlebih dahulu sebelum diunggah ke publik'
        ],
        correctOptionIndex: 1,
        explanation: 'Mengeksploitasi penderitaan dhuafa dan mempermalukan anak yatim demi konten (poverty porn) bertentangan dengan firman Allah dalam QS. Ad-Dhuha: 9 ("Maka terhadap anak yatim janganlah engkau berlaku sewenang-wenang") dan QS. Al-Baqarah: 264 tentang larangan menyakiti perasaan mustahik (al-adza).',
        dalilSyariah: 'QS. Ad-Dhuha: 9, QS. Al-Baqarah: 264, dan Prinsip "Karamah Insaniyyah" (Kemuliaan Martabat Manusia).'
      },
      {
        id: 'q-uks-3',
        question: 'Bagaimana hukum dan tindakan yang wajib dilakukan oleh relawan pengadaan logistik terkait amplop uang tunai tersebut?',
        scenarioContext: 'Setelah menyelesaikan transaksi pembelian 500 karung beras posko di toko grosir rekanan, pemilik toko diam-diam menyelipkan amplop berisi uang tunai Rp 1.500.000 ke saku rompi relawan logistik sambil berbisik: "Ini sekadar uang lelah pribadi dari saya atas kerja samanya, jangan bilang siapa-siapa di posko".',
        options: [
          'Menerima amplop tersebut dengan senang hati dan menggunakannya untuk mentraktir makan malam relawan posko lainnya',
          'Menolak amplop tersebut secara tegas namun santun, menjelaskan bahwa amil/relawan dilarang menerima gratifikasi (ghulul), atau jika terlanjur diserahkan, wajib mencatatnya sebagai diskon resmi pengurangan harga beras bagi posko umat',
          'Menyimpan amplop tersebut ke rekening pribadi dan berniat menyedekahkannya nanti saat bulan Ramadhan',
          'Meminta tambahan uang tunai menjadi Rp 3.000.000 karena volume pembelian beras sangat besar'
        ],
        correctOptionIndex: 1,
        explanation: 'Nabi Muhammad ﷺ menegaskan: "Hadāyā al-‘ummāl ghulūl" (Hadiah yang diterima oleh pekerja/petugas karena jabatannya adalah korupsi/pengkhianatan amanah). Relawan dilarang menerima keuntungan pribadi dari transaksi pengadaan lembaga.',
        dalilSyariah: 'HR. Ahmad & Al-Baihaqi: "Hadāyā al-‘ummāl ghulūl", serta QS. Ali \'Imran: 161 tentang ancaman bagi pelaku ghulul.'
      },
      {
        id: 'q-uks-4',
        question: 'Sikap diplomasi dan syariah apa yang harus diambil oleh koordinator relawan menghadapi intimidasi tersebut?',
        scenarioContext: 'Seorang pejabat desa setempat mendatangi posko logistik dan menuntut 30 paket sembako zakat fitrah dibagikan kepada perangkat desa dan keluarganya yang berstatus ASN mampu. Ia mengancam akan mempersulit izin operasional posko jika permintaannya tidak dipenuhi.',
        options: [
          'Langsung menyerahkan 30 paket tersebut demi mengamankan izin posko dan menghindari konflik',
          'Menolak dengan santun berprinsip (Qawlan Layyinan wa Ma\'rufan), menjelaskan batasan 8 asnaf zakat yang ditetapkan langsung oleh Allah, serta mengundang tokoh agama independen dan Bhabinkamtibmas untuk bermusyawarah mencari solusi operasional yang sah',
          'Mengajak baku hantam dengan pejabat desa tersebut di depan para pengungsi',
          'Membongkar tenda posko dan memindahkan seluruh bantuan ke kabupaten lain tanpa pemberitahuan'
        ],
        correctOptionIndex: 1,
        explanation: 'Hak zakat adalah batasan qath\'i syariat Allah (QS. At-Taubah: 60) yang tidak boleh dialihkan kepada orang kaya karena ancaman manusia. Pendekatan dakwah bil-hikmah, pelibatan tokoh agama setempat, dan mediasi aparat berwenang adalah jalan syar\'i yang menjunjung amanah tanpa anarkisme.',
        dalilSyariah: 'QS. At-Taubah: 60 ("Faridhatan minallah"), QS. An-Nahl: 125, dan Kaidah: "La tha\'ata li makhluqin fi ma\'shiyatil Khaliq" (Tidak ada ketaatan kepada makhluk dalam bermaksiat kepada Pencipta).'
      },
      {
        id: 'q-uks-5',
        question: 'Bagaimana tinjauan fikih dan SOP keselamatan relawan terkait tindakan nekat tersebut?',
        scenarioContext: 'Banjir lahar dingin meluap deras dan jembatan penghubung desa retak 80%. Seorang relawan mendengar tangisan warga di seberang sungai dan berniat nekat berenang menyeberang sendirian tanpa pelampung, tali pengaman (safety line), dan tanpa persetujuan tim SAR.',
        options: [
          'Tindakan tersebut sangat terpuji dan wajib dicontoh oleh seluruh relawan karena menunjukkan keberanian jihad tanpa rasa takut',
          'Tindakan tersebut dilarang secara syar’i karena melanggar prinsip Hifzhun Nafs (menjaga keselamatan jiwa), menjatuhkan diri ke dalam kebinasaan (QS. Al-Baqarah: 195), dan berisiko menambah korban baru; relawan wajib berkoordinasi dengan tim SAR bertali pengaman',
          'Tindakan tersebut dibolehkan asalkan relawan membaca doa penunduk air sebelum melompat',
          'Relawan disarankan membawa kamera GoPro agar aksinya bisa disiarkan secara live di media sosial'
        ],
        correctOptionIndex: 1,
        explanation: 'Syariat Islam mewajibkan menjaga jiwa (Hifzhun Nafs) dan melarang kecerobohan yang membinasakan diri sendiri (QS. Al-Baqarah: 195). Menyelamatkan orang lain tidak boleh dilakukan dengan cara membahayakan nyawa diri sendiri tanpa perhitungan matang ("Adh-Dhararu la yuzalu bidh-dharar").',
        dalilSyariah: 'QS. Al-Baqarah: 195 ("Wala tulqu bi aydikum ilat-tahlukah") & Kaidah Fiqh: "Adh-Dhararu la yuzalu bidh-dharar".'
      },
      {
        id: 'q-uks-6',
        question: 'Bagaimana solusi pencatatan akuntansi syariah dan pembuktian audit yang sah sesuai ayat mudayanah (QS. Al-Baqarah: 282)?',
        scenarioContext: 'Di posko lereng gunung terpencil, relawan logistik membeli kayu bakar dan sayuran dari petani setempat seharga Rp 3.200.000 tunai untuk keperluan Dapur Ummat. Petani tradisional tersebut tidak memiliki cap toko, printer nota, ataupun kuitansi resmi.',
        options: [
          'Mengabaikan pencatatan karena kondisi darurat bencana dan memasukkan nominal perkiraan ke pembukuan posko',
          'Membuat Berita Acara Pembelian Lapangan (BAPL) darurat yang mencatat rincian barang, harga, ditandatangani/cap jempol petani penjual, serta disaksikan oleh minimal 2 orang relawan pendamping dan koordinator posko',
          'Membuat nota palsu dengan mencatut nama toko modern di kota kabupaten',
          'Meminta uang kembali kepada petani dan membiarkan pengungsi kelaparan tanpa masakan'
        ],
        correctOptionIndex: 1,
        explanation: 'QS. Al-Baqarah: 282 (Ayat Mudayanah) mewajibkan pencatatan transaksi secara adil disertai saksi terpercaya. Berita Acara Pembelian Lapangan (BAPL) bertanda tangan saksi adalah instrumen sah pembuktian amanah dalam audit syariah ketika nota komersial tidak tersedia.',
        dalilSyariah: 'QS. Al-Baqarah: 282 ("...faktubūh, wal-yaktub baynakum kātibum bil-‘adl...") & PSAK 109 tentang Akuntansi Zakat dan Infak/Sedekah.'
      },
      {
        id: 'q-uks-7',
        question: 'Bagaimana hukum syariat mengenai usulan meminjam sementara dana pokok wakaf untuk operasional bensin ambulans tersebut?',
        scenarioContext: 'Tim operasional relawan kehabisan saldo kas operasional untuk membeli bahan bakar ambulans gratis sebesar Rp 1.500.000. Salah seorang anggota mengusulkan: "Kita pinjam saja dulu uang pokok dari rekening Wakaf Pembangunan Sumur Bor, nanti kalau ada donasi operasional baru kita kembalikan".',
        options: [
          'Boleh meminjam dana pokok wakaf kapan saja tanpa izin karena yang penting untuk sesama urusan kemanusiaan',
          'Haram meminjam dana pokok wakaf untuk operasional habis pakai tanpa izin syar’i, karena dana wakaf terikat prinsip "Tahbisul Ashl" (menahan pokok aset) dan syarat wakif (syarthul waqif ka nashshisy syari\'); operasional harus menggunakan pos hak amil resmi atau pos infak darurat',
          'Boleh asalkan membayarnya kembali dengan tambahan bunga keuntungan',
          'Boleh meminjam asalkan ambulans tersebut diberi stiker wakaf sumur bor'
        ],
        correctOptionIndex: 1,
        explanation: 'Harta wakaf terikat hukum syariat yang sangat ketat: pokoknya ditahan untuk tujuan wakaf yang diniatkan wakif dan manfaatnya disalurkan. Mengambil pokok wakaf untuk pos operasional habis pakai adalah pelanggaran akad amanah syariat ("Syarthul waqif ka nashshisy syari\'").',
        dalilSyariah: 'Hadits Riwayat Bukhari: "Habbis al-ashla wa sabbil ats-tsamarah" & Kaidah Fiqh: "Syarthul Waqif ka Nashshisy Syari\'".'
      },
      {
        id: 'q-uks-8',
        question: 'Bagaimana adab relawan menanggapi permintaan donatur tersebut sesuai kaidah syariah?',
        scenarioContext: 'Seorang donatur besar (muzaki) yang menyumbang Rp 50.000.000 meminta koordinator posko mengirimkan foto close-up wajah seorang janda dhuafa yang sedang menangis menerima amplop zakat dengan nominal jelas, sebagai syarat agar donasi berikutnya dicairkan. Namun sang ibu dhuafa memohon agar wajahnya tidak difoto secara jelas karena malu diketahui anak-anaknya di perantauan.',
        options: [
          'Memaksa ibu dhuafa tersebut difoto wajahnya dari depan sambil memegang amplop uang demi memuaskan donatur besar',
          'Menjaga kehormatan dan kemuliaan (karamah) sang ibu dhuafa, mengambil foto dokumentasi dengan sudut pandang humanis (tampak belakang/samping/fokus penyerahan paket tanpa memperlihatkan wajah langsung), serta memberikan penjelasan bijak kepada donatur bahwa menjaga kehormatan mustahik adalah perintah Al-Qur\'an',
          'Mengedit foto orang lain dari internet untuk dikirimkan kepada donatur tersebut',
          'Membatalkan bantuan kepada sang ibu dan mengalihkan uangnya kepada orang lain yang mau difoto wajahnya'
        ],
        correctOptionIndex: 1,
        explanation: 'Menjaga kehormatan dan perasaan mustahik adalah kewajiban syar\'i (larangan al-adza, QS. Al-Baqarah: 264). Donatur yang baik wajib diedukasi bahwa akuntabilitas penyaluran dapat dibuktikan melalui Berita Acara Serah Terima (BAST), tanda tangan saksi, dan dokumentasi santun tanpa merendahkan martabat penerima.',
        dalilSyariah: 'QS. Al-Baqarah: 264 (Larangan Al-Manna dan Al-Adza) & Kaidah: "Karamatul Insan Muqaddamatun \'ala Fudhulil Mukallaf".'
      }
    ]
  }
];
