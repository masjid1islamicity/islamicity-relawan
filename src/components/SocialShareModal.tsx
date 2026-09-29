import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  MessageSquare, 
  Twitter, 
  Facebook, 
  Send, 
  Instagram, 
  QrCode, 
  Heart,
  Sparkles,
  Download
} from 'lucide-react';
import { Campaign } from '../types';
import { formatRupiah } from '../utils/formatters';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | null;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  campaign,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !campaign) return null;

  const currentUrl = window.location.href;
  const shareTitle = `Ayo Berjamaah Membantu: ${campaign.title}`;
  const shareText = `Bismillah. Mari bersama ringankan duka saudara kita melalui program "${campaign.title}" di Islamicity Relawan. Dana terkelola 100% amanah, transparan, dan dapat dilacak real-time hingga tangan penerima manfaat.\n\nSalurkan kepedulian Anda sekarang:\n${currentUrl}\n\n"Perumpamaan orang-orang yang beriman dalam hal saling mengasihi bagaikan satu tubuh..." (HR. Bukhari-Muslim)`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareTitle}\n\n${currentUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  const handleShareTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}&hashtags=IslamicityRelawan,SedekahJariyah,ZakatTransparan,Kemanusiaan`;
    window.open(tweetUrl, '_blank');
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(fbUrl, '_blank');
  };

  const handleShareTelegram = () => {
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`;
    window.open(tgUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-stone-100 pb-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Share2 className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Perluas Jangkauan Kebaikan (Syiar Organik)
            </h2>
            <p className="text-xs text-stone-500">
              "Barangsiapa menunjukkan kebaikan, baginya pahala seperti yang melakukannya." (HR. Muslim)
            </p>
          </div>
        </div>

        {/* Campaign Visual Preview Card */}
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-3.5 mb-5 flex gap-3 items-center">
          <img
            src={campaign.coverImage}
            alt={campaign.title}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-lg object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
              {campaign.categoryLabel}
            </span>
            <h4 className="text-xs font-bold text-stone-900 mt-1 line-clamp-2">
              {campaign.title}
            </h4>
            <div className="text-[11px] text-stone-600 mt-1">
              Terkumpul: <strong className="text-emerald-700">{formatRupiah(campaign.currentAmount)}</strong>
            </div>
          </div>
        </div>

        {/* Quick Social Channels */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-stone-700 mb-2">
            Pilih Kanal Media Sosial & Pesan Instan
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {/* WhatsApp */}
            <button
              onClick={handleShareWhatsApp}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-all font-semibold"
            >
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            {/* Twitter / X */}
            <button
              onClick={handleShareTwitter}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 transition-all font-semibold"
            >
              <Twitter className="w-5 h-5 text-stone-800" />
              <span>X / Twitter</span>
            </button>

            {/* Telegram */}
            <button
              onClick={handleShareTelegram}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 transition-all font-semibold"
            >
              <Send className="w-5 h-5 text-sky-600" />
              <span>Telegram</span>
            </button>

            {/* Facebook */}
            <button
              onClick={handleShareFacebook}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 transition-all font-semibold"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Copy Link Direct Input */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            Salin Tautan Kampanye
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-600 select-all font-mono"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin' : 'Salin'}</span>
            </button>
          </div>
        </div>

        {/* Shareable Story Card Mockup Preview */}
        <div className="bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-xl p-4 text-xs space-y-3 shadow-inner">
          <div className="flex items-center justify-between text-emerald-300">
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Kartu Syiar Digital Islamicity</span>
            </div>
            <span className="text-[10px] font-mono">Scan & Donasi</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-lg border border-white/10 flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] text-emerald-200 font-semibold">{campaign.title}</div>
              <div className="text-[10px] text-stone-300 mt-0.5">
                Target: {formatRupiah(campaign.targetAmount)} • Terverifikasi Komunitas
              </div>
            </div>
            <div className="w-12 h-12 bg-white rounded-md p-1 shrink-0 flex items-center justify-center">
              <QrCode className="w-10 h-10 text-stone-900" />
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
