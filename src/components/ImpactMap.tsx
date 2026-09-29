import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Layers, 
  Filter, 
  Search, 
  ExternalLink, 
  HeartHandshake, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Compass, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  ChevronRight, 
  Info,
  Calendar,
  Building2,
  Navigation
} from 'lucide-react';
import { Campaign, ImpactLocationPoint, CampaignCategory } from '../types';
import { INITIAL_IMPACT_LOCATIONS } from '../data/impactLocationsData';
import { formatRupiah, formatNumber } from '../utils/formatters';

interface ImpactMapProps {
  campaigns: Campaign[];
  onOpenDonateModal: (campaign: Campaign) => void;
  className?: string;
  initialSelectedId?: string;
}

type MapTileStyle = 'standard' | 'humanitarian' | 'satellite';

interface RegionView {
  name: string;
  island: 'all' | 'Sumatera' | 'Jawa' | 'Bali-Nusa' | 'Kalimantan' | 'Sulawesi' | 'Maluku-Papua';
  center: [number, number];
  zoom: number;
}

const REGION_PRESETS: RegionView[] = [
  { name: 'Seluruh Nusantara', island: 'all', center: [-2.5, 118.0], zoom: 5 },
  { name: 'Sumatera', island: 'Sumatera', center: [-0.9, 101.5], zoom: 6 },
  { name: 'Jawa & Banten', island: 'Jawa', center: [-7.3, 109.5], zoom: 7 },
  { name: 'Bali & Nusa Tenggara', island: 'Bali-Nusa', center: [-8.5, 116.8], zoom: 7 },
  { name: 'Kalimantan', island: 'Kalimantan', center: [-1.5, 114.5], zoom: 6 },
  { name: 'Sulawesi', island: 'Sulawesi', center: [-2.5, 120.5], zoom: 6 },
  { name: 'Maluku & Papua', island: 'Maluku-Papua', center: [-2.8, 133.5], zoom: 6 }
];

export const ImpactMap: React.FC<ImpactMapProps> = ({
  campaigns,
  onOpenDonateModal,
  className = '',
  initialSelectedId
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // States
  const [locations] = useState<ImpactLocationPoint[]>(INITIAL_IMPACT_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<ImpactLocationPoint | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tileStyle, setTileStyle] = useState<MapTileStyle>('standard');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTabSide, setActiveTabSide] = useState<'list' | 'detail'>('list');

  // Filtered locations
  const filteredLocations = locations.filter((loc) => {
    const matchCat = selectedCategory === 'all' || loc.category === selectedCategory;
    const matchType = selectedType === 'all' || loc.type === selectedType;
    const matchRegion = selectedRegion === 'all' || loc.island === selectedRegion;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = 
      !q || 
      loc.title.toLowerCase().includes(q) ||
      loc.locationName.toLowerCase().includes(q) ||
      loc.city.toLowerCase().includes(q) ||
      loc.province.toLowerCase().includes(q) ||
      loc.campaignTitle.toLowerCase().includes(q);

    return matchCat && matchType && matchRegion && matchSearch;
  });

  // Calculate high-level aggregates
  const totalBeneficiaries = locations.reduce((sum, l) => sum + l.beneficiariesReached, 0);
  const totalVolunteers = locations.reduce((sum, l) => sum + l.volunteersOnSite, 0);
  const totalFundsSpent = locations.reduce((sum, l) => sum + (l.fundsSpent || 0), 0);
  const activeProvincesCount = new Set(locations.map(l => l.province)).size;

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Map Instance
    const map = L.map(mapContainerRef.current, {
      center: [-2.5, 118.0],
      zoom: 5,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false
    });

    // Custom Zoom control in top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Initial Tile Layer
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayer = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> kontributor | Islamicity Amanah GIS',
      maxZoom: 19
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Layer Group for markers
    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;
    mapInstanceRef.current = map;

    // Initial resize trigger
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer when tileStyle changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '&copy; OpenStreetMap kontributor | Islamicity GIS';

    if (tileStyle === 'humanitarian') {
      url = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap kontributor, Humanitarian OpenStreetMap Team';
    } else if (tileStyle === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    }

    const newLayer = L.tileLayer(url, {
      attribution,
      maxZoom: 18
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  }, [tileStyle]);

  // Helper to get marker color & icon by category
  const getCategoryTheme = (category: CampaignCategory, type: string) => {
    switch (category) {
      case 'bencana':
        return {
          bg: '#dc2626',
          border: '#991b1b',
          glow: 'rgba(220, 38, 38, 0.4)',
          symbol: '🚨',
          label: 'Tanggap Bencana'
        };
      case 'wakaf':
        return {
          bg: '#0284c7',
          border: '#0369a1',
          glow: 'rgba(2, 132, 199, 0.4)',
          symbol: '💧',
          label: 'Wakaf Air'
        };
      case 'pendidikan':
        return {
          bg: '#d97706',
          border: '#b45309',
          glow: 'rgba(217, 119, 6, 0.4)',
          symbol: '📖',
          label: 'Pendidikan'
        };
      case 'kesehatan':
        return {
          bg: '#e11d48',
          border: '#be123c',
          glow: 'rgba(225, 29, 72, 0.4)',
          symbol: '🚑',
          label: 'Kesehatan'
        };
      case 'zakat':
      default:
        return {
          bg: '#059669',
          border: '#047857',
          glow: 'rgba(5, 150, 105, 0.4)',
          symbol: '🌾',
          label: 'Zakat Produktif'
        };
    }
  };

  // Re-render markers whenever filteredLocations or selectedLocation changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    filteredLocations.forEach((loc) => {
      const theme = getCategoryTheme(loc.category, loc.type);
      const isSelected = selectedLocation?.id === loc.id;
      const isOngoing = loc.status === 'penyaluran' || loc.status === 'siaga';

      // Custom HTML Marker using L.divIcon
      const markerHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group select-none transition-transform duration-200 ${isSelected ? 'scale-125 z-50' : 'hover:scale-115'}">
          ${isOngoing ? `
            <span class="absolute w-8 h-8 rounded-full animate-ping opacity-60 pointer-events-none" style="background-color: ${theme.bg};"></span>
          ` : ''}
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg border-2" 
               style="background-color: ${theme.bg}; border-color: ${isSelected ? '#fef08a' : '#ffffff'}; box-shadow: 0 4px 12px ${theme.glow};">
            <span>${theme.symbol}</span>
          </div>
          ${isSelected ? `
            <div class="absolute -bottom-1.5 w-2.5 h-2.5 rotate-45 border-r-2 border-b-2" style="background-color: ${theme.bg}; border-color: #fef08a;"></div>
          ` : ''}
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-map-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const marker = L.marker(loc.coordinates, { icon: customIcon });

      // Build rich Popup HTML
      const popupHtml = `
        <div style="font-family: inherit; font-size: 12px; line-height: 1.4; max-width: 250px; color: #1c1917;">
          <div style="font-weight: 800; font-size: 13px; color: #064e3b; margin-bottom: 2px;">${loc.title}</div>
          <div style="font-size: 10px; color: #78716c; margin-bottom: 6px;">📍 ${loc.locationName}, ${loc.city}</div>
          <div style="display: flex; gap: 4px; margin-bottom: 6px;">
            <span style="background: #ecfdf5; color: #065f46; font-weight: 700; font-size: 9px; padding: 2px 6px; border-radius: 4px; border: 1px solid #a7f3d0;">
              ${loc.categoryLabel}
            </span>
            <span style="background: #f5f5f4; color: #44403c; font-size: 9px; padding: 2px 6px; border-radius: 4px;">
              ${loc.statusLabel}
            </span>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px; margin-bottom: 6px; font-size: 10px;">
            <div>👥 <strong>${formatNumber(loc.beneficiariesReached)}</strong> Mustahik Terbantu</div>
            <div>🤝 <strong>${loc.volunteersOnSite}</strong> Relawan Siaga</div>
            ${loc.fundsSpent ? `<div>💰 <strong>${formatRupiah(loc.fundsSpent)}</strong> Telah Tersalurkan</div>` : ''}
          </div>
          <div style="font-size: 9px; color: #059669; font-weight: 600;">
            ✓ ${loc.auditHash || 'Terverifikasi Komunitas'}
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      // On marker click
      marker.on('click', () => {
        setSelectedLocation(loc);
        setActiveTabSide('detail');
        map.flyTo(loc.coordinates, Math.max(map.getZoom(), 10), {
          duration: 0.8
        });
      });

      marker.addTo(markersGroup);
    });

    // Handle auto-select if initialSelectedId is passed
    if (initialSelectedId && !selectedLocation) {
      const match = locations.find(l => l.id === initialSelectedId);
      if (match) {
        setSelectedLocation(match);
        map.flyTo(match.coordinates, 10, { duration: 1 });
      }
    }
  }, [filteredLocations, selectedLocation, initialSelectedId]);

  // Handler to fly to a location
  const handleSelectLocation = (loc: ImpactLocationPoint) => {
    setSelectedLocation(loc);
    setActiveTabSide('detail');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(loc.coordinates, 12, {
        duration: 1
      });
    }
  };

  // Quick jump to region
  const handleJumpToRegion = (preset: RegionView) => {
    setSelectedRegion(preset.island);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(preset.center, preset.zoom, {
        duration: 1.2
      });
    }
  };

  // Reset to Nusantara
  const handleResetMap = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedRegion('all');
    setSearchQuery('');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([-2.5, 118.0], 5, {
        duration: 1
      });
    }
  };

  // Find linked campaign
  const linkedCampaign = campaigns.find(c => c.id === selectedLocation?.campaignId) || campaigns[0];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header & Impact Summary Bar */}
      <div className="bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 rounded-2xl border border-emerald-800/40 p-5 sm:p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 -top-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-600/50 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
              <span>Sistem Pemantauan Geografis & Titik Penyaluran Nasional</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Peta Dampak Kemanusiaan & Persebaran Amanah Nusantara
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Jelajahi titik penyaluran zakat, dapur siaga bencana, pengeboran wakaf air bersih, dan posko relawan medis secara real-time dengan verifikasi koordinat GPS terbuka.
            </p>
          </div>

          {/* Quick Metrics KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs shrink-0">
            <div className="bg-stone-800/70 border border-stone-700/60 p-3 rounded-xl backdrop-blur-xs">
              <div className="text-[10px] text-stone-400 font-medium">Titik Terpetakan</div>
              <div className="text-base font-extrabold text-emerald-400">{locations.length} Lokasi</div>
              <div className="text-[9px] text-stone-400 mt-0.5">{activeProvincesCount} Provinsi</div>
            </div>

            <div className="bg-stone-800/70 border border-stone-700/60 p-3 rounded-xl backdrop-blur-xs">
              <div className="text-[10px] text-stone-400 font-medium">Penerima Manfaat</div>
              <div className="text-base font-extrabold text-amber-300">{formatNumber(totalBeneficiaries)}+</div>
              <div className="text-[9px] text-emerald-400 mt-0.5">Jiwa Terbantu</div>
            </div>

            <div className="bg-stone-800/70 border border-stone-700/60 p-3 rounded-xl backdrop-blur-xs">
              <div className="text-[10px] text-stone-400 font-medium">Relawan Siaga</div>
              <div className="text-base font-extrabold text-white">{totalVolunteers} Jiwa</div>
              <div className="text-[9px] text-teal-300 mt-0.5">Di Garis Depan</div>
            </div>

            <div className="bg-stone-800/70 border border-stone-700/60 p-3 rounded-xl backdrop-blur-xs">
              <div className="text-[10px] text-stone-400 font-medium">Dana Penyaluran</div>
              <div className="text-base font-extrabold text-emerald-400">{formatRupiah(totalFundsSpent)}</div>
              <div className="text-[9px] text-stone-400 mt-0.5">Bebas Potongan (0%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Stage */}
      <div className={`bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-3 z-50 flex flex-col' : 'relative'}`}>
        {/* Top Control Bar: Filters & Search */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Cari lokasi, kota, atau nama inisiatif..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-stone-800 pl-9 pr-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 font-medium shadow-2xs"
            />
          </div>

          {/* Quick Island / Region Jump Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            <span className="text-[11px] font-bold text-stone-500 shrink-0 flex items-center gap-1 mr-1">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>Wilayah:</span>
            </span>
            {REGION_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleJumpToRegion(preset)}
                className={`px-2.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRegion === preset.island
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Map Layer Style & Fullscreen Controls */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            {/* Tile Layer Selector */}
            <div className="flex items-center bg-white rounded-xl border border-stone-200 p-0.5 shadow-2xs">
              <button
                onClick={() => setTileStyle('standard')}
                className={`px-2 py-1 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
                  tileStyle === 'standard' ? 'bg-stone-800 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Peta Standar OpenStreetMap"
              >
                Standar
              </button>
              <button
                onClick={() => setTileStyle('humanitarian')}
                className={`px-2 py-1 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
                  tileStyle === 'humanitarian' ? 'bg-stone-800 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Peta Kemanusiaan HOT OSM"
              >
                Relief
              </button>
              <button
                onClick={() => setTileStyle('satellite')}
                className={`px-2 py-1 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
                  tileStyle === 'satellite' ? 'bg-stone-800 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Citra Satelit Esri World"
              >
                Satelit
              </button>
            </div>

            {/* Reset View Button */}
            <button
              onClick={handleResetMap}
              className="p-2 bg-white hover:bg-stone-100 text-stone-700 rounded-xl border border-stone-200 transition-colors shadow-2xs cursor-pointer"
              title="Reset Tampilan ke Seluruh Indonesia"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => {
                setIsFullscreen(!isFullscreen);
                setTimeout(() => {
                  mapInstanceRef.current?.invalidateSize();
                }, 200);
              }}
              className="p-2 bg-white hover:bg-stone-100 text-stone-700 rounded-xl border border-stone-200 transition-colors shadow-2xs cursor-pointer"
              title={isFullscreen ? 'Kecilkan Peta' : 'Perbesar Peta Layar Penuh'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Secondary Filter Bar: Category & Point Type */}
        <div className="px-4 py-2.5 bg-stone-100/70 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-stone-500 mr-1">Program:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-stone-800 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              Semua ({locations.length})
            </button>
            <button
              onClick={() => setSelectedCategory('bencana')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'bencana'
                  ? 'bg-red-700 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>🚨</span> Tanggap Bencana
            </button>
            <button
              onClick={() => setSelectedCategory('wakaf')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'wakaf'
                  ? 'bg-sky-700 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>💧</span> Wakaf Air Bersih
            </button>
            <button
              onClick={() => setSelectedCategory('zakat')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'zakat'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>🌾</span> Zakat & Pangan
            </button>
            <button
              onClick={() => setSelectedCategory('kesehatan')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'kesehatan'
                  ? 'bg-rose-700 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>🚑</span> Kesehatan Mustahik
            </button>
            <button
              onClick={() => setSelectedCategory('pendidikan')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'pendidikan'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>📖</span> Pendidikan & Tahfidz
            </button>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-stone-500 font-bold mr-1">Tipe:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white border border-stone-300 rounded-lg px-2.5 py-1 font-semibold text-stone-700 outline-none cursor-pointer focus:border-emerald-600"
            >
              <option value="all">Semua Titik Operasional</option>
              <option value="distribution_point">Titik Penyaluran Bantuan</option>
              <option value="volunteer_post">Posko Lapangan & Medis</option>
            </select>
          </div>
        </div>

        {/* Split View Container: Leaflet Canvas + Side Drawer */}
        <div className="flex flex-col lg:flex-row relative flex-1 min-h-[500px]">
          {/* Map View Canvas */}
          <div className="flex-1 relative min-h-[420px] lg:min-h-[540px]">
            <div 
              ref={mapContainerRef} 
              className="w-full h-full min-h-[420px] lg:min-h-[540px]"
              style={{ minHeight: isFullscreen ? 'calc(100vh - 170px)' : '540px' }}
            />

            {/* Map Legend Overlay (Bottom Left) */}
            <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-stone-200 shadow-lg text-[11px] space-y-2 pointer-events-auto max-w-[240px]">
              <div className="font-bold text-stone-900 flex items-center justify-between border-b border-stone-100 pb-1">
                <span>Legenda Simbol Peta</span>
                <span className="text-[10px] text-emerald-700 font-semibold">{filteredLocations.length} Titik</span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-stone-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
                  <span>Bencana (🚨)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0" />
                  <span>Wakaf Air (💧)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>Zakat/Pangan (🌾)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                  <span>Kesehatan (🚑)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Pendidikan (📖)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-emerald-500 bg-emerald-100 animate-pulse shrink-0" />
                  <span>Sedang Aktif</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Drawer: List of Locations or Inspection Detail */}
          <div className="w-full lg:w-96 bg-stone-50 border-t lg:border-t-0 lg:border-l border-stone-200 flex flex-col max-h-[540px] overflow-hidden">
            {/* Side Tabs Header */}
            <div className="p-3 bg-white border-b border-stone-200 flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTabSide('list')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTabSide === 'list'
                      ? 'bg-stone-800 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Daftar Titik ({filteredLocations.length})
                </button>
                <button
                  onClick={() => setActiveTabSide('detail')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTabSide === 'detail'
                      ? 'bg-stone-800 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                  disabled={!selectedLocation}
                >
                  Rincian Lokasi {selectedLocation ? '✓' : ''}
                </button>
              </div>

              {selectedLocation && activeTabSide === 'detail' && (
                <button
                  onClick={() => setActiveTabSide('list')}
                  className="text-stone-400 hover:text-stone-700 text-[11px] font-medium"
                >
                  Kembali ke Daftar
                </button>
              )}
            </div>

            {/* Tab 1: Scrollable List of Filtered Locations */}
            {activeTabSide === 'list' && (
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                {filteredLocations.length === 0 ? (
                  <div className="p-8 text-center text-stone-500 space-y-2">
                    <AlertCircle className="w-8 h-8 mx-auto text-stone-300" />
                    <p className="font-bold text-sm">Tidak ada titik yang cocok</p>
                    <p className="text-xs">Coba sesuaikan kata kunci pencarian atau ubah filter kategori/wilayah.</p>
                    <button
                      onClick={handleResetMap}
                      className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
                    >
                      Reset Filter
                    </button>
                  </div>
                ) : (
                  filteredLocations.map((loc) => {
                    const isSelected = selectedLocation?.id === loc.id;
                    const theme = getCategoryTheme(loc.category, loc.type);

                    return (
                      <div
                        key={loc.id}
                        onClick={() => handleSelectLocation(loc)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer text-xs space-y-2 ${
                          isSelected
                            ? 'bg-emerald-50/80 border-emerald-500 shadow-sm ring-1 ring-emerald-500/50'
                            : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-2xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{theme.symbol}</span>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wide text-stone-500">
                                {loc.province} • {loc.island}
                              </span>
                              <h4 className="font-extrabold text-stone-900 leading-snug line-clamp-1">
                                {loc.title}
                              </h4>
                            </div>
                          </div>
                          <span 
                            className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0"
                            style={{ backgroundColor: `${theme.bg}15`, color: theme.bg }}
                          >
                            {loc.statusLabel}
                          </span>
                        </div>

                        <p className="text-[11px] text-stone-600 line-clamp-1">
                          📍 {loc.locationName}
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-100">
                          <div>
                            👥 <strong>{formatNumber(loc.beneficiariesReached)}</strong> Mustahik
                          </div>
                          <div>
                            🤝 <strong>{loc.volunteersOnSite}</strong> Relawan
                          </div>
                          <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                            Fokus <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Tab 2: Selected Location Detailed Inspection Panel */}
            {activeTabSide === 'detail' && selectedLocation && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {/* Photo Header & Status */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src={selectedLocation.imageUrl}
                    alt={selectedLocation.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <span className="bg-stone-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {selectedLocation.categoryLabel}
                    </span>
                    <span className="bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {selectedLocation.statusLabel}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-stone-950/80 backdrop-blur-xs text-stone-200 text-[10px] p-1.5 rounded-lg flex items-center justify-between">
                    <span>📍 GPS: {selectedLocation.coordinates.join(', ')}</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedLocation.coordinates[0]},${selectedLocation.coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-0.5"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Title & Organization */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-stone-900 text-sm leading-snug">
                    {selectedLocation.title}
                  </h3>
                  <div className="text-[11px] text-stone-500">
                    Mitra Pelaksana: <strong>{selectedLocation.partnerOrg || 'Konsorsium Relawan Islamicity'}</strong>
                  </div>
                  <div className="text-[11px] text-stone-600">
                    Alamat Lapangan: <strong>{selectedLocation.locationName}, {selectedLocation.city}, {selectedLocation.province}</strong>
                  </div>
                </div>

                {/* KPI Metrics Box */}
                <div className="grid grid-cols-2 gap-2 bg-stone-100/80 p-3 rounded-xl border border-stone-200">
                  <div>
                    <div className="text-[10px] text-stone-500">Penerima Manfaat</div>
                    <div className="font-bold text-stone-900 text-sm">
                      {formatNumber(selectedLocation.beneficiariesReached)} Mustahik
                    </div>
                    <div className="text-[9px] text-stone-400">
                      Target: {formatNumber(selectedLocation.beneficiariesTarget)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-stone-500">Relawan Bertugas</div>
                    <div className="font-bold text-stone-900 text-sm">
                      {selectedLocation.volunteersOnSite} Jiwa Siaga
                    </div>
                    <div className="text-[9px] text-emerald-600 font-semibold">
                      Terakreditasi Syariah
                    </div>
                  </div>

                  {selectedLocation.fundsSpent && (
                    <div className="col-span-2 pt-2 border-t border-stone-200/80">
                      <div className="text-[10px] text-stone-500">Alokasi Dana Penyaluran</div>
                      <div className="font-extrabold text-emerald-800 text-sm">
                        {formatRupiah(selectedLocation.fundsSpent)}
                      </div>
                      <div className="text-[9px] text-stone-400">
                        100% tersalurkan langsung tanpa potongan
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-stone-700">Ringkasan Operasional:</div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {selectedLocation.description}
                  </p>
                </div>

                {/* Items Distributed */}
                {selectedLocation.itemsDistributed && (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-stone-700">Bantuan yang Disalurkan:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedLocation.itemsDistributed.map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-white border border-stone-200 text-stone-700 text-[10px] font-medium px-2 py-0.5 rounded-md shadow-2xs"
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification Audit Log */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Integritas Audit & Verifikasi Lapangan</span>
                  </div>
                  <div className="text-[10px] text-emerald-800">
                    Saksi / Verifikator: <strong>{selectedLocation.verifiedBy}</strong>
                  </div>
                  <div className="text-[9px] text-emerald-700 font-mono">
                    Hash: {selectedLocation.auditHash || '0x8f9c2a...e71d (Valid)'}
                  </div>
                  <div className="text-[9px] text-stone-500 pt-0.5">
                    Update: {selectedLocation.latestUpdate}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => onOpenDonateModal(linkedCampaign)}
                    className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <HeartHandshake className="w-4 h-4 text-emerald-200" />
                    <span>Salurkan Bantuan ke Program Ini</span>
                  </button>

                  <button
                    onClick={() => {
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.flyTo(selectedLocation.coordinates, 14, { duration: 1 });
                      }
                    }}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs py-2 rounded-xl border border-stone-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Zoom Maksimal ke Koordinat</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
