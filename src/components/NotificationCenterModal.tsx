import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Smartphone, 
  Mail, 
  Radio, 
  Check, 
  Send, 
  CheckCircle2, 
  Clock, 
  Shield, 
  ExternalLink,
  Sunrise 
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onTriggerTestNotification: (channel: 'push' | 'sms' | 'email') => void;
  onNavigateTab: (tab: string) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onTriggerTestNotification,
  onNavigateTab,
}) => {
  const [filterChannel, setFilterChannel] = useState<'all' | 'push' | 'sms' | 'email'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter(n => {
    if (filterChannel === 'all') return true;
    return n.channel === filterChannel;
  });

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
        <div className="flex items-center gap-3 mb-4 border-b border-stone-100 pb-3">
          <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Bell className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Pusat Notifikasi Otomatis Multi-Kanal
            </h2>
            <p className="text-xs text-stone-500">
              Push Notifikasi Instan • SMS & WhatsApp Ponsel • Laporan Email Berkala
            </p>
          </div>
        </div>

        {/* Channel Filters & Mark All Read */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setFilterChannel('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterChannel === 'all' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600'
              }`}
            >
              Semua ({notifications.length})
            </button>
            <button
              onClick={() => setFilterChannel('push')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                filterChannel === 'push' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600'
              }`}
            >
              <Radio className="w-3 h-3 text-emerald-600" />
              Push
            </button>
            <button
              onClick={() => setFilterChannel('sms')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                filterChannel === 'sms' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600'
              }`}
            >
              <Smartphone className="w-3 h-3 text-blue-600" />
              SMS/WA
            </button>
            <button
              onClick={() => setFilterChannel('email')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                filterChannel === 'email' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600'
              }`}
            >
              <Mail className="w-3 h-3 text-purple-600" />
              Email
            </button>
          </div>

          <button
            onClick={onMarkAllRead}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
          >
            Tandai Dibaca
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-2.5 mb-5 max-h-72 overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-xs">
              Belum ada notifikasi pada saluran ini.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  item.read
                    ? 'bg-stone-50/60 border-stone-200/80 text-stone-600'
                    : 'bg-emerald-50/50 border-emerald-200 text-stone-800 font-medium'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    {item.channel === 'push' && <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />}
                    {item.channel === 'sms' && <Smartphone className="w-3.5 h-3.5 text-blue-600" />}
                    {item.channel === 'email' && <Mail className="w-3.5 h-3.5 text-purple-600" />}
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[10px] text-stone-400 whitespace-nowrap">{item.timeAgo}</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {item.message}
                </p>
                {item.linkToTab && (
                  <div className="mt-2 pt-1 border-t border-stone-100 flex justify-end">
                    <button
                      onClick={() => {
                        onNavigateTab(item.linkToTab!);
                        onClose();
                      }}
                      className="text-[11px] text-emerald-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Buka Pelacakan Detail</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Sedekah Subuh Quick Link */}
        <div className="bg-gradient-to-r from-indigo-950 to-emerald-950 text-white rounded-xl p-3 text-xs mb-4 flex items-center justify-between gap-3 border border-amber-400/30">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-amber-400 text-stone-950 font-bold flex items-center justify-center shrink-0">
              🌅
            </span>
            <div>
              <div className="font-bold text-amber-300 text-xs flex items-center gap-1">
                <Sunrise className="w-3.5 h-3.5 text-amber-400" />
                <span>Pengingat Fajar Harian (Sedekah Subuh)</span>
              </div>
              <p className="text-[11px] text-stone-300">
                Panggilan fajar, jadwal sholat kota Anda, dan doa dua malaikat.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onNavigateTab('sedekah-subuh');
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shrink-0 transition-all cursor-pointer"
          >
            Atur Fajar
          </button>
        </div>

        {/* Test Notification Simulator */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-xs">
          <div className="font-bold text-stone-800 mb-1 flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-emerald-700" />
            <span>Simulasi Uji Kirim Notifikasi Otomatis:</span>
          </div>
          <p className="text-[11px] text-stone-500 mb-3">
            Uji coba penerimaan sinyal pembaruan status penyaluran bantuan seketika:
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onTriggerTestNotification('push')}
              className="p-2 rounded-lg bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50 text-stone-800 font-semibold text-center transition-all"
            >
              Uji Push Alert
            </button>
            <button
              onClick={() => onTriggerTestNotification('sms')}
              className="p-2 rounded-lg bg-white border border-stone-200 hover:border-blue-500 hover:bg-blue-50 text-stone-800 font-semibold text-center transition-all"
            >
              Uji SMS/WA
            </button>
            <button
              onClick={() => onTriggerTestNotification('email')}
              className="p-2 rounded-lg bg-white border border-stone-200 hover:border-purple-500 hover:bg-purple-50 text-stone-800 font-semibold text-center transition-all"
            >
              Uji Email Laporan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
