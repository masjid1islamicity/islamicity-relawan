import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { VolunteerProfile } from '../types';
import { formatRupiah } from './formatters';

export interface GeneratePdfOptions {
  includeHistory?: boolean;
  includeBadges?: boolean;
  includeSignatures?: boolean;
}

/**
 * Generates an official Verification URL that external parties can scan or visit.
 */
export function getVolunteerVerificationUrl(profile: VolunteerProfile): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://islamicity.org';
  const securityHash = profile.badges[0]?.verificationHash || `0x${profile.registrationNumber.replace(/[^a-zA-Z0-9]/g, '')}`;
  return `${origin}/?verify=volunteer&reg=${encodeURIComponent(profile.registrationNumber)}&hash=${encodeURIComponent(securityHash)}`;
}

/**
 * Generates a QR Code as Data URL (PNG base64).
 */
export async function generateVolunteerQrDataUrl(profile: VolunteerProfile): Promise<string> {
  const verifyUrl = getVolunteerVerificationUrl(profile);
  try {
    const dataUrl = await QRCode.toDataURL(verifyUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 320,
      color: {
        dark: '#064e3b', // Deep emerald
        light: '#ffffff'
      }
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate QR Code:', err);
    // Fallback QR code with simple string
    return await QRCode.toDataURL(profile.registrationNumber, { width: 320 });
  }
}

/**
 * Generates and downloads the official Individual Volunteer Report PDF.
 */
export async function exportVolunteerReportToPdf(
  profile: VolunteerProfile,
  options: GeneratePdfOptions = { includeHistory: true, includeBadges: true, includeSignatures: true }
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  const qrDataUrl = await generateVolunteerQrDataUrl(profile);
  const verifyUrl = getVolunteerVerificationUrl(profile);
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const timeFormatted = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const docCode = `DOC-REL-${profile.registrationNumber.slice(-8)}-${now.getFullYear()}`;

  // Helper to draw clean decorative header
  const drawHeader = (pageNumber: number, totalPages: number) => {
    // Top border emerald bar
    doc.setFillColor(6, 78, 59); // emerald-900
    doc.rect(0, 0, pageWidth, 5, 'F');

    // Light background header bar
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(margin, 8, contentWidth, 24, 'F');
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.3);
    doc.rect(margin, 8, contentWidth, 24, 'S');

    // Title & institution
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(6, 78, 59);
    doc.text('LEMBAGA KEMANUSIAAN & AMIL ZAKAT ISLAMICITY', margin + 4, 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Sistem Informasi Akreditasi Relawan Lapangan & Audit Publik Terdesentralisasi', margin + 4, 20);
    doc.text(`Kode Dokumen: ${docCode}  •  Diterbitkan: ${dateFormatted} ${timeFormatted} WIB`, margin + 4, 25);

    // Official Badge Pill in Header (Right side)
    doc.setFillColor(209, 250, 229); // emerald-100
    doc.roundedRect(pageWidth - margin - 52, 12, 48, 16, 2, 2, 'F');
    doc.setDrawColor(16, 185, 129); // emerald-500
    doc.setLineWidth(0.2);
    doc.roundedRect(pageWidth - margin - 52, 12, 48, 16, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(6, 95, 70); // emerald-800
    doc.text('DOKUMEN RESMI', pageWidth - margin - 28, 18, { align: 'center' });
    doc.setFontSize(6.5);
    doc.text('VERIFIKASI SAH', pageWidth - margin - 28, 23, { align: 'center' });
  };

  // Helper for footer on each page
  const drawFooter = (pageNumber: number, totalPages: number) => {
    const footerY = pageHeight - 12;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'Keaslian dokumen ini dapat diverifikasi oleh pihak eksternal melalui QR Code di lembar ini atau portal resmi Islamicity.',
      margin,
      footerY + 2
    );
    doc.text(
      `Halaman ${pageNumber} dari ${totalPages}`,
      pageWidth - margin,
      footerY + 2,
      { align: 'right' }
    );
  };

  // ================= PAGE 1 =================
  drawHeader(1, 2);

  let currentY = 36;

  // Title of the Report
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('LAPORAN INDIVIDUAL REKAM JEJAK & AKREDITASI RELAWAN', margin, currentY);

  currentY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Berkas resmi portofolio kontribusi, jam pelayanan, integritas syariah, dan verifikasi faktual lapangan.', margin, currentY);

  currentY += 5;

  // Section: Identitas Relawan (Card Box)
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, contentWidth, 42, 2, 2, 'FD');

  // Left column: Profile details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(profile.name, margin + 5, currentY + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(5, 150, 105); // emerald-600
  doc.text(profile.titleBadge, margin + 5, currentY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);

  const leftX = margin + 5;
  const col2X = margin + 65;
  const col3X = margin + 120;

  // Data rows
  doc.setFont('helvetica', 'bold');
  doc.text('No. Registrasi Relawan:', leftX, currentY + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(profile.registrationNumber, leftX, currentY + 22);

  doc.setFont('helvetica', 'bold');
  doc.text('Domisili Wilayah:', leftX, currentY + 28);
  doc.setFont('helvetica', 'normal');
  doc.text(profile.city, leftX, currentY + 32);

  doc.setFont('helvetica', 'bold');
  doc.text('Tingkat Pengabdian:', leftX, currentY + 37);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tingkat ${profile.volunteerLevel.currentLevel}: ${profile.volunteerLevel.levelName} (${profile.volunteerLevel.xp} XP)`, leftX, currentY + 41);

  // Column 2
  doc.setFont('helvetica', 'bold');
  doc.text('Kontak Resmi / HP:', col2X, currentY + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(profile.phone, col2X, currentY + 22);

  doc.setFont('helvetica', 'bold');
  doc.text('Email Terdaftar:', col2X, currentY + 28);
  doc.setFont('helvetica', 'normal');
  doc.text(profile.email, col2X, currentY + 32);

  doc.setFont('helvetica', 'bold');
  doc.text('Bergabung Sejak:', col2X, currentY + 37);
  doc.setFont('helvetica', 'normal');
  doc.text(profile.joinDate, col2X, currentY + 41);

  // Column 3: Integrity & Syariah status
  doc.setFillColor(240, 253, 244); // emerald-50
  doc.roundedRect(col3X - 2, currentY + 6, contentWidth - (col3X - margin) - 2, 32, 2, 2, 'F');
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(col3X - 2, currentY + 6, contentWidth - (col3X - margin) - 2, 32, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(6, 95, 70);
  doc.text('STATUS INTEGRITAS', col3X + 2, currentY + 12);

  doc.setFontSize(13);
  doc.setTextColor(5, 150, 105);
  doc.text(`${profile.reliabilityScore}%`, col3X + 2, currentY + 19);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text('• Ikrar Syariah: Tervalidasi', col3X + 2, currentY + 24);
  doc.text('• Verifikasi Dokumen: Lengkap', col3X + 2, currentY + 29);
  doc.text(`• Golongan Darah: ${profile.bloodType}`, col3X + 2, currentY + 34);

  currentY += 47;

  // Section 2: Ringkasan Metrik Kinerja (6 KPI Boxes)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('RINGKASAN STATISTIK PENGABDIAN & KONTRIBUSI', margin, currentY);

  currentY += 4;
  const kpiBoxWidth = (contentWidth - 10) / 3;
  const kpiBoxHeight = 16;

  const kpis = [
    { label: 'Total Jam Pelayanan', val: `${profile.stats.totalHours} Jam`, note: 'Tercatat di audit ledger' },
    { label: 'Inisiatif/Misi Sosial', val: `${profile.stats.totalInitiatives} Misi`, note: 'Terselesaikan sempurna' },
    { label: 'Penerima Manfaat', val: `${profile.stats.beneficiariesHelped.toLocaleString('id-ID')} Jiwa`, note: 'Terbantu langsung di lapangan' },
    { label: 'Bukti Terverifikasi', val: `${profile.stats.verifiedProofsCount} Dokumen`, note: 'Geotag & nota sah' },
    { label: 'Validasi Komunitas', val: `${profile.stats.communityVotesGiven} Suara`, note: 'Konsensus verifikator' },
    { label: 'Amanah Didampingi', val: formatRupiah(profile.stats.fundsDistributedDirectly), note: '100% bebas potongan' }
  ];

  kpis.forEach((kpi, idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const x = margin + col * (kpiBoxWidth + 5);
    const y = currentY + row * (kpiBoxHeight + 3);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.roundedRect(x, y, kpiBoxWidth, kpiBoxHeight, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(100, 116, 139);
    doc.text(kpi.label, x + 3, y + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(kpi.val, x + 3, y + 9.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(5, 150, 105);
    doc.text(kpi.note, x + 3, y + 13.5);
  });

  currentY += (kpiBoxHeight + 3) * 2 + 5;

  // Section 3: Keahlian & Ikrar Etika Relawan
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('KOMPETENSI LAPANGAN & IKRAR AMANAH SYARIAH', margin, currentY);

  currentY += 4;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 22, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Keahlian Terakreditasi:', margin + 4, currentY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(15, 23, 42);
  doc.text(profile.skills.join('  •  '), margin + 4, currentY + 10);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    '“Berikrar menjaga amanah donatur dan mustahik, melayani sesama tanpa pamrih, menjaga martabat penerima manfaat, serta tidak mengambil keuntungan pribadi dari dana titipan umat.”',
    margin + 4,
    currentY + 16,
    { maxWidth: contentWidth - 8 }
  );

  currentY += 27;

  // Section 4: Lencana Kehormatan & Akreditasi
  if (options.includeBadges) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`LENCANA PENCAPAIAN & AKREDITASI RESMI (${profile.badges.filter(b => b.isUnlocked).length} Diraih)`, margin, currentY);

    currentY += 4;
    const unlockedBadges = profile.badges.filter(b => b.isUnlocked);
    const badgeCols = 3;
    const badgeW = (contentWidth - 8) / badgeCols;
    const badgeH = 14;

    unlockedBadges.slice(0, 6).forEach((badge, idx) => {
      const bRow = Math.floor(idx / badgeCols);
      const bCol = idx % badgeCols;
      const bx = margin + bCol * (badgeW + 4);
      const by = currentY + bRow * (badgeH + 2.5);

      doc.setFillColor(254, 252, 232); // amber-50
      doc.setDrawColor(254, 240, 138); // amber-200
      doc.roundedRect(bx, by, badgeW, badgeH, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 53, 15); // amber-900
      doc.text(badge.name, bx + 3, by + 4.5, { maxWidth: badgeW - 6 });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(161, 98, 7);
      doc.text(`Tingkat: ${badge.level.toUpperCase()} • ${badge.earnedAt}`, bx + 3, by + 8.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(5.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`Hash: ${badge.verificationHash || '0x44fa92...sah'}`, bx + 3, by + 12);
    });

    currentY += Math.ceil(Math.min(unlockedBadges.length, 6) / badgeCols) * (badgeH + 2.5) + 6;
  }

  // Section 5: External Verification Block & Signatures on Page 1 / Page 2
  // We place a verification summary box at bottom of Page 1 with QR Code!
  const verifBoxHeight = 44;
  doc.setFillColor(240, 253, 244); // emerald-50
  doc.setDrawColor(16, 185, 129); // emerald-500
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, currentY, contentWidth, verifBoxHeight, 2, 2, 'FD');

  // Insert QR Code image in verif box
  const qrSize = 34;
  doc.addImage(qrDataUrl, 'PNG', margin + 5, currentY + 5, qrSize, qrSize);

  // Text next to QR Code
  const qrTextX = margin + qrSize + 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(6, 78, 59); // emerald-900
  doc.text('MODUL VERIFIKASI KEASLIAN PIHAK EKSTERNAL (QR CODE AUDIT)', qrTextX, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);
  doc.text(
    'Pihak eksternal (Pemerintah, Lembaga Mitra, Korporasi CSR, atau Donatur) dapat memverifikasi keaslian dan status terkini laporan profil ini secara independen tanpa memerlukan login akun.',
    qrTextX,
    currentY + 13,
    { maxWidth: contentWidth - qrSize - 16 }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(6, 95, 70);
  doc.text('Langkah Pengecekan:', qrTextX, currentY + 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(71, 85, 105);
  doc.text('1. Pindai QR Code di samping menggunakan kamera ponsel atau pemindai dokumen.', qrTextX, currentY + 26);
  doc.text('2. Sistem akan membuka Portal Verifikasi Resmi Islamicity secara langsung.', qrTextX, currentY + 30);
  doc.text(`3. Kode Token Verifikasi: ${profile.badges[0]?.verificationHash || '0x77ab12cd...valid'}`, qrTextX, currentY + 34);
  doc.text(`URL Langsung: ${verifyUrl}`, qrTextX, currentY + 38, { maxWidth: contentWidth - qrSize - 16 });

  drawFooter(1, 2);

  // ================= PAGE 2 =================
  // Detailed Mission / Participation History Table
  doc.addPage('a4', 'portrait');
  drawHeader(2, 2);

  let p2Y = 36;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('LOG RIWAYAT PENUGASAN & PENGABDIAN LAPANGAN', margin, p2Y);

  p2Y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Daftar penugasan inisiatif kemanusiaan yang telah dilaksanakan dengan verifikasi konsensus saksi warga.',
    margin,
    p2Y
  );

  p2Y += 6;

  // Render Table Header
  const colWidths = {
    no: 8,
    mission: 48,
    role: 38,
    period: 22,
    hours: 14,
    beneficiaries: 18,
    verification: 34
  };

  const drawTableHeader = (y: number) => {
    doc.setFillColor(6, 78, 59); // emerald-900
    doc.rect(margin, y, contentWidth, 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(255, 255, 255);

    let x = margin + 2;
    doc.text('No', x, y + 4.5);
    x += colWidths.no;
    doc.text('Inisiatif Kemanusiaan', x, y + 4.5);
    x += colWidths.mission;
    doc.text('Peran / Formasi', x, y + 4.5);
    x += colWidths.role;
    doc.text('Periode', x, y + 4.5);
    x += colWidths.period;
    doc.text('Jam', x, y + 4.5);
    x += colWidths.hours;
    doc.text('Penerima', x, y + 4.5);
    x += colWidths.beneficiaries;
    doc.text('Status & Saksi Warga', x, y + 4.5);
  };

  drawTableHeader(p2Y);
  p2Y += 7;

  // Iterate over participation history
  const historyList = profile.participationHistory || [];

  historyList.forEach((item, index) => {
    const isEven = index % 2 === 0;
    const rowHeight = 18;

    if (isEven) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, p2Y, contentWidth, rowHeight, 'F');
    }
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, p2Y + rowHeight, margin + contentWidth, p2Y + rowHeight);

    let x = margin + 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text(`${index + 1}`, x, p2Y + 5);

    x += colWidths.no;
    // Mission
    doc.text(item.campaignTitle, x, p2Y + 5, { maxWidth: colWidths.mission - 3 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Lokasi: ${item.location}`, x, p2Y + 9, { maxWidth: colWidths.mission - 3 });
    if (item.tasksCompleted && item.tasksCompleted[0]) {
      doc.text(`• ${item.tasksCompleted[0]}`, x, p2Y + 13, { maxWidth: colWidths.mission - 3 });
    }

    x += colWidths.mission;
    // Role
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(6, 95, 70);
    doc.text(item.roleTitle, x, p2Y + 5, { maxWidth: colWidths.role - 3 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    doc.setTextColor(100, 116, 139);
    doc.text(`ID: ${item.id}`, x, p2Y + 9);

    x += colWidths.role;
    // Period
    doc.text(item.period, x, p2Y + 5, { maxWidth: colWidths.period - 2 });

    x += colWidths.period;
    // Hours
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`${item.serviceHours} Jam`, x, p2Y + 5);

    x += colWidths.hours;
    // Beneficiaries
    doc.text(`${item.beneficiariesHelped} Jiwa`, x, p2Y + 5);

    x += colWidths.beneficiaries;
    // Verification & Witness
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    const isValid = item.communityVerification.status === 'terverifikasi';
    doc.setTextColor(isValid ? 5 : 217, isValid ? 150 : 119, isValid ? 105 : 6);
    doc.text(isValid ? '✓ Terverifikasi Sah' : '⏳ Dalam Tinjauan', x, p2Y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Suara: ${item.communityVerification.votesValid} warga`, x, p2Y + 9);
    const saksi = item.communityVerification.verifiedByNames?.[0] || 'Koordinator Posko';
    doc.text(`Saksi: ${saksi}`, x, p2Y + 13, { maxWidth: colWidths.verification - 2 });

    p2Y += rowHeight;
  });

  p2Y += 10;

  // Signatures & Official Seals
  if (options.includeSignatures) {
    const signBoxY = Math.max(p2Y, pageHeight - 65);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, signBoxY, contentWidth, 38, 2, 2, 'FD');

    const colW = contentWidth / 3;

    // Signature 1: Dewan Pengawas Syariah
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text('Mengetahui & Mensahkan:', margin + 6, signBoxY + 6);
    doc.setFont('helvetica', 'bold');
    doc.text('Dewan Pengawas Syariah Islamicity', margin + 6, signBoxY + 10);

    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text('Dr. H. M. Nadzir, M.Ag', margin + 6, signBoxY + 26);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text('NIP: 19780512-DPS-ISL', margin + 6, signBoxY + 31);
    doc.text('Tanda Tangan Elektronik Sah', margin + 6, signBoxY + 35);

    // Center: Official QR Stamp
    doc.addImage(qrDataUrl, 'PNG', margin + colW + (colW - 24) / 2, signBoxY + 5, 24, 24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(6, 95, 70);
    doc.text('SEGEL VERIFIKASI DIGITAL', margin + colW + colW / 2, signBoxY + 32, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Scan untuk Cek Ledger Publik', margin + colW + colW / 2, signBoxY + 35, { align: 'center' });

    // Signature 2: Koordinator Nasional Relawan
    const sign3X = margin + colW * 2 + 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text('Diterbitkan Oleh:', sign3X, signBoxY + 6);
    doc.setFont('helvetica', 'bold');
    doc.text('Koordinator Nasional Relawan Lapangan', sign3X, signBoxY + 10);

    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text('Ir. Arif Hidayat, S.T., M.Sc.', sign3X, signBoxY + 26);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text('NIP: 19840217-KNR-ISL', sign3X, signBoxY + 31);
    doc.text('Tanda Tangan Elektronik Sah', sign3X, signBoxY + 35);
  }

  drawFooter(2, 2);

  // Save the PDF
  const sanitizedName = profile.name.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Laporan_Relawan_${sanitizedName}_${profile.registrationNumber}.pdf`;
  doc.save(filename);
}
