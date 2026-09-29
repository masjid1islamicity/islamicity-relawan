export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

export const GOLD_PRICE_PER_GRAM = 1350000; // Harga emas standar BAZNAS per gram
export const NISAB_GOLD_GRAMS = 85;
export const NISAB_ZAKAT_MAAL = GOLD_PRICE_PER_GRAM * NISAB_GOLD_GRAMS; // Rp 114.750.000

export const ZAKAT_FITRAH_PER_SOUL = 45000; // Standar beras 2.5 kg / 3.5 liter di Jabodetabek & sekitarnya

export function calculateZakatMaal(totalAssets: number, totalDebts: number = 0): {
  netWealth: number;
  nisab: number;
  isEligible: boolean;
  zakatDue: number;
} {
  const netWealth = Math.max(0, totalAssets - totalDebts);
  const isEligible = netWealth >= NISAB_ZAKAT_MAAL;
  const zakatDue = isEligible ? Math.round(netWealth * 0.025) : 0;
  return {
    netWealth,
    nisab: NISAB_ZAKAT_MAAL,
    isEligible,
    zakatDue
  };
}

export function generateTxHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 20; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export function generateReceiptNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `BSZ-${dateStr}-${randomSuffix}`;
}
