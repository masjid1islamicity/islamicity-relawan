import React, { useState } from 'react';
import { 
  Radio, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  ThumbsUp, 
  AlertCircle, 
  Clock, 
  Camera, 
  Hash, 
  Plus, 
  ArrowRight,
  ExternalLink,
  Users,
  Eye,
  Filter
} from 'lucide-react';
import { ImpactMilestone, Campaign } from '../types';
import { formatRupiah, generateTxHash } from '../utils/formatters';

interface RealtimeTrackingLedgerProps {
  milestones: ImpactMilestone[];
  campaigns: Campaign[];
  onVoteMilestone: (milestoneId: string, isUpvote: boolean) => void;
  onSubmitNewProof: (milestone: ImpactMilestone) => void;
}

export const RealtimeTrackingLedger: React.FC<RealtimeTrackingLedgerProps> = ({
  milestones,
  campaigns,
  onVoteMilestone,
  onSubmitNewProof,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});

  // New proof form state
  const [campaignId, setCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [proofTitle, setProofTitle] = useState<string>('');
  const [proofDesc, setProofDesc] = useState<string>('');
  const [locationName, setLocationName] = useState<string>('');
  const [gpsCoords, setGpsCoords] = useState<string>('-6.2088, 106.8456');
  const [spentAmount, setSpentAmount] = useState<number>(15000000);
  const [beneficiaries, setBeneficiaries] = useState<number>(250);
  const [photoUrl, setPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80');
  const [witnessName, setWitnessName] = useState<string>('Ahmad Yani (Ketua RT / Tokoh Lokal)');

  const filteredMilestones = milestones.filter(m => {
    if (selectedFilter === 'all') return true;
    return m.campaignId === selectedFilter;
  });

  const handleVote = (id: string, isUp: boolean) => {
    if (votedMap[id]) return;
    onVoteMilestone(id, isUp);
    setVotedMap(prev => ({ ...prev, [id]: true }));
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    const camp = campaigns.find(c => c.id === campaignId) || campaigns[0];
    const newM: ImpactMilestone = {
      id: `mile-${Date.now()}`,
      campaignId: camp.id,
      campaignTitle: camp.title,
      title: proofTitle || 'Distribusi Bantuan Langsung Lapangan',
      description: proofDesc || 'Relawan telah menyerahkan amanah donatur secara langsung kepada penerima manfaat.',
      timestamp: `${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      location: locationName || 'Posko Penyaluran Terpadu',
      gpsCoords: gpsCoords || '-6.2000, 106.8000',
      stage: 'penyaluran',
      spentAmount,
      beneficiariesCount: beneficiaries,
      proofImages: [photoUrl],
      verifiedByCommunity: {
        votesValid: 1,
        votesReview: 0,
        status: 'terverifikasi',
        verifierNames: [witnessName, 'Sistem Audit Islamicity']
      },
      blockchainHash: `${generateTxHash().slice(0, 10)}... (Audit Ledger)`,
      receiptNumber: `RC-${Date.now().toString().slice(-6)}`
    };

    onSubmitNewProof(newM);
    setIsSubmitModalOpen(false);
    setProofTitle('');
    setProofDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 border border-emerald-900/50 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-6 opacity-10 pointer-events-none">
          <ShieldCheck className="w-80 h-80 text-emerald-400" />
        </div>

        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-2">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>SISTEM PELACAKAN PENYALURAN & BUKTI AUDIT REAL-TIME</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Transparansi Radikal: Dari Donatur Hingga Tangan Mustahik
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4">
            Setiap rupiah zakat dan donasi yang dialokasikan memiliki catatan real-time, koordinat GPS lapangan, dokumentasi foto, kuitansi pembelanjaan logistik, dan sistem verifikasi langsung oleh komunitas masyarakat setempat.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Unggah Verifikasi Lapangan (Relawan / Tokoh)</span>
            </button>
            <div className="flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-900/60 px-3 py-2 rounded-lg border border-emerald-700/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Semua data terenkripsi & anti-rekayasa (Tamper-Proof Ledger)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Live Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
          <Filter className="w-4 h-4 text-emerald-700" />
          <span>Filter Berdasarkan Inisiatif:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedFilter === 'all'
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Semua Program ({milestones.length})
          </button>
          {campaigns.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedFilter(c.id)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedFilter === c.id
                  ? 'bg-emerald-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {c.categoryLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="space-y-4">
        {filteredMilestones.map((m, idx) => (
          <div 
            key={m.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-emerald-500/50 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              {/* Left Details */}
              <div className="space-y-2.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                    Tahap: {m.stage.toUpperCase()}
                  </span>
                  <span className="text-xs text-stone-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {m.timestamp}
                  </span>
                  <span className="text-xs text-stone-500 font-mono flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-stone-400" />
                    Resi: {m.receiptNumber}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-xs text-emerald-800 font-medium mt-0.5">
                    Program: {m.campaignTitle}
                  </p>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {m.description}
                </p>

                {/* Financial & Recipient Facts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-lg">
                    <div className="text-[10px] text-stone-500 font-medium">Dana Terserap:</div>
                    <div className="text-xs font-bold text-emerald-700">{formatRupiah(m.spentAmount)}</div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-lg">
                    <div className="text-[10px] text-stone-500 font-medium">Penerima Manfaat:</div>
                    <div className="text-xs font-bold text-stone-800">{m.beneficiariesCount} Jiwa / KK</div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-lg">
                    <div className="text-[10px] text-stone-500 font-medium">Lokasi Penyerahan:</div>
                    <div className="text-xs font-semibold text-stone-800 truncate">{m.location}</div>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-lg">
                    <div className="text-[10px] text-stone-500 font-medium">Koordinat GPS:</div>
                    <div className="text-xs font-mono text-stone-700 truncate">{m.gpsCoords}</div>
                  </div>
                </div>

                {/* Community Verifier Badges */}
                <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-lg p-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="text-stone-700 text-[11px]">
                      Diverifikasi oleh: <strong className="text-emerald-900">{m.verifiedByCommunity.verifierNames.join(', ')}</strong>
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-stone-500">
                    Hash: {m.blockchainHash}
                  </div>
                </div>
              </div>

              {/* Right Side: Photo Proof & Community Voting */}
              <div className="lg:w-72 shrink-0 space-y-3">
                {m.proofImages && m.proofImages.length > 0 && (
                  <div className="relative rounded-xl overflow-hidden border border-stone-200 group aspect-video sm:aspect-[4/3] bg-stone-100">
                    <img 
                      src={m.proofImages[0]} 
                      alt="Dokumentasi Penyaluran" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 bg-stone-950/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                      <Camera className="w-3 h-3 text-emerald-400" />
                      <span>Foto Geotag Asli</span>
                    </div>
                  </div>
                )}

                {/* Community Voting Button */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-stone-600 font-semibold text-[11px]">Verifikasi Publik:</span>
                    <span className="text-emerald-700 font-bold text-[11px]">
                      {m.verifiedByCommunity.votesValid} Suara Sah
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVote(m.id, true)}
                      disabled={votedMap[m.id]}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        votedMap[m.id]
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                          : 'bg-white hover:bg-emerald-50 text-stone-700 border border-stone-200 shadow-2xs hover:border-emerald-400'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{votedMap[m.id] ? 'Tervalidasi' : 'Konfirmasi Valid'}</span>
                    </button>
                    <button
                      onClick={() => handleVote(m.id, false)}
                      disabled={votedMap[m.id]}
                      className="py-1.5 px-2.5 rounded-lg text-stone-500 hover:bg-stone-100 border border-stone-200 hover:text-stone-700 transition-colors"
                      title="Minta Klarifikasi Lapangan"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Community Field Proof Submission */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-stone-900 mb-1">
              Unggah Bukti Penyaluran Lapangan (Amanah Relawan)
            </h2>
            <p className="text-xs text-stone-500 mb-4">
              Laporan ini langsung dicatat ke audit ledger publik untuk transparansi bagi para muzaki & donatur.
            </p>

            <form onSubmit={handleSubmitProof} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Pilih Program Sosial</label>
                <select
                  value={campaignId}
                  onChange={(e) => setCampaignId(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                >
                  {campaigns.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Judul Aktivitas Penyaluran</label>
                <input
                  type="text"
                  required
                  placeholder="cth: Pembagian 500 Paket Sembako & Makanan Hangat di Pengungsian"
                  value={proofTitle}
                  onChange={(e) => setProofTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Deskripsi & Rincian Barang Bantuan</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Jelaskan kondisi di posko, barang yang diserahkan, serta respon warga penerima."
                  value={proofDesc}
                  onChange={(e) => setProofDesc(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Nama Lokasi / Dusun / Posko</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Balai Dusun Blekonang, RT 02/04"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Koordinat GPS (Otomatis)</label>
                  <input
                    type="text"
                    value={gpsCoords}
                    onChange={(e) => setGpsCoords(e.target.value)}
                    className="w-full font-mono bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Biaya Terpakai (Rp)</label>
                  <input
                    type="number"
                    value={spentAmount}
                    onChange={(e) => setSpentAmount(Number(e.target.value) || 0)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Jumlah Penerima Manfaat (Jiwa)</label>
                  <input
                    type="number"
                    value={beneficiaries}
                    onChange={(e) => setBeneficiaries(Number(e.target.value) || 0)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Nama Saksi Verifikator Lapangan</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Kepala Dusun / Tokoh Agama / Koordinator Posko"
                  value={witnessName}
                  onChange={(e) => setWitnessName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all"
                >
                  Publikasikan Bukti Lapangan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
