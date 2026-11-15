import type {
  CalendarDate,
  Country,
  CountryComparison,
  Currency,
  Location,
  MenuCategory,
  MenuItem,
  PaymentMethod,
  Price,
  SaleTransaction,
  WasteReason,
  WasteRecord,
} from "../types";

const PAYMENT_METHODS: readonly PaymentMethod[] = ["Cash", "Credit card", "Debit card", "Digital wallet"];
const WASTE_REASONS: readonly WasteReason[] = ["Expired", "Cooking error", "Customer return", "Damage", "Other"];
const MENU_CATEGORIES: readonly MenuCategory[] = ["Meat", "Side", "Beverage", "Dessert", "Combo"];
const roundToTwo = (value: number): number => Math.round((value + Number.EPSILON) * 100) / 100;

export interface SalesSummary {
  transactionCount: number;
  totalRevenue: number;
  averageTicket: number | null;
  highestTicket: number | null;
  lowestTicket: number | null;
}

function requireArray<T>(value: T[], name: string): T[] {
  if (!Array.isArray(value)) throw new Error(`${name} debe ser un array.`);
  return value;
}

function requireFinite(value: number, description: string): number {
  if (!Number.isFinite(value)) throw new Error(`${description} debe ser un número finito.`);
  return value;
}

function validateDate(value: CalendarDate, functionName: string): { year: number; month: number; day: number } {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new Error(`${functionName}: la fecha debe tener formato YYYY-MM-DD.`);
  const [, y, m, d] = match;
  const year = Number(y);
  const month = Number(m);
  const day = Number(d);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new Error(`${functionName}: fecha calendario inválida "${value}".`);
  }
  return { year, month, day };
}

function localCalendarDate(timestamp: Date, timeZone: string, saleId: string, functionName: string): string {
  if (!(timestamp instanceof Date) || !Number.isFinite(timestamp.getTime())) {
    throw new Error(`${functionName}: timestamp inválido en venta ${saleId}.`);
  }
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(timestamp);
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return `${values.year}-${values.month}-${values.day}`;
  } catch {
    throw new Error(`${functionName}: zona IANA inválida "${timeZone}" de la locación asociada a venta ${saleId}.`);
  }
}

export function calculateDailyRevenue(
  sales: SaleTransaction[],
  date: CalendarDate,
  currency: Currency,
  locations: Location[],
): number {
  requireArray(sales, "calculateDailyRevenue.sales");
  requireArray(locations, "calculateDailyRevenue.locations");
  const targetDate = validateDate(date, "calculateDailyRevenue");
  const locationsById = new Map(locations.map((location) => [location.id, location]));
  const total = sales.reduce((sum, sale) => {
    const location = locationsById.get(sale.locationId);
    if (!location) throw new Error(`calculateDailyRevenue: venta ${sale.id} referencia locación inexistente ${sale.locationId}.`);
    const localDate = localCalendarDate(sale.timestamp, location.timeZone, sale.id, "calculateDailyRevenue");
    if (localDate !== date) return sum;
    return sum + requireFinite(sale.totalPrice[currency], `calculateDailyRevenue: totalPrice.${currency} de ${sale.id}`);
  }, 0);
  return roundToTwo(total);
}

export function calculateLocationMargin(
  sales: SaleTransaction[],
  menuItems: MenuItem[],
  locationId: string,
  currency: Currency,
): number {
  requireArray(sales, "calculateLocationMargin.sales");
  requireArray(menuItems, "calculateLocationMargin.menuItems");
  const locationSales = sales.filter((sale) => sale.locationId === locationId);
  const revenue = locationSales.reduce((sum, sale) => sum + requireFinite(sale.totalPrice[currency], `calculateLocationMargin: venta ${sale.id}`), 0);
  if (revenue === 0) throw new Error(`calculateLocationMargin: ingreso total cero para ${locationId}; se requieren ventas con ingreso positivo.`);

  const menuById = new Map(menuItems.map((item) => [item.id, item]));
  const ingredientCost = locationSales.reduce((sum, sale) => {
    const item = menuById.get(sale.itemId);
    if (!item) throw new Error(`calculateLocationMargin: venta ${sale.id} referencia itemId inexistente ${sale.itemId}.`);
    const unitCost = requireFinite(item.ingredientCost[currency], `calculateLocationMargin: ingredientCost.${currency} de ${item.id}`);
    return sum + unitCost * requireFinite(sale.quantity, `calculateLocationMargin: quantity de ${sale.id}`);
  }, 0);
  return roundToTwo(((revenue - ingredientCost) / revenue) * 100);
}

export function calculateWasteCost(wasteRecords: WasteRecord[], locationId: string, currency: Currency): number {
  requireArray(wasteRecords, "calculateWasteCost.wasteRecords");
  const total = wasteRecords
    .filter((record) => record.locationId === locationId)
    .reduce((sum, record) => sum + requireFinite(record.cost[currency], `calculateWasteCost: cost.${currency} de ${record.id}`), 0);
  return roundToTwo(total);
}

export function convertCurrency(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
  requireFinite(amount, "convertCurrency: amount");
  if (fromCurrency === toCurrency) return amount;
  return roundToTwo(fromCurrency === "USD" ? amount * 4000 : amount / 4000);
}

export function scoreLocationPerformance(
  location: Location,
  sales: SaleTransaction[],
  wasteRecords: WasteRecord[],
  menuItems: MenuItem[],
  asOfDate: CalendarDate,
): number {
  if (typeof location !== "object" || location === null) {
    throw new Error("scoreLocationPerformance: location debe ser un objeto válido.");
  }
  requireArray(sales, "scoreLocationPerformance.sales");
  requireArray(wasteRecords, "scoreLocationPerformance.wasteRecords");
  requireArray(menuItems, "scoreLocationPerformance.menuItems");
  const { year, month, day } = validateDate(asOfDate, "scoreLocationPerformance");
  const start = Date.UTC(location.openingYear, 0, 1);
  const end = Date.UTC(year, month - 1, day);
  if (end < start) throw new Error(`scoreLocationPerformance: asOfDate ${asOfDate} es anterior al año de apertura ${location.openingYear} de ${location.id}.`);
  const elapsedDays = Math.floor((end - start) / 86_400_000) + 1;

  const locationSales = sales.filter((sale) => sale.locationId === location.id);
  const revenueUSD = locationSales.reduce((sum, sale) => sum + requireFinite(sale.totalPrice.USD, `scoreLocationPerformance: venta ${sale.id}`), 0);
  if (revenueUSD === 0) throw new Error(`scoreLocationPerformance: ingreso USD cero para ${location.id}; no se pueden calcular desperdicio y margen.`);
  if (!Number.isFinite(location.seatingCapacity) || location.seatingCapacity <= 0) {
    throw new Error(`scoreLocationPerformance: seatingCapacity inválida en locación ${location.id}.`);
  }

  const revenueScore = Math.min(40, ((revenueUSD / elapsedDays) / 1000) * 40);
  const seatEfficiencyScore = Math.min(30, (locationSales.length / location.seatingCapacity) * 30);
  const wasteUSD = calculateWasteCost(wasteRecords, location.id, "USD");
  const wastePercentage = (wasteUSD / revenueUSD) * 100;
  const wasteScore = Math.max(0, 20 - wastePercentage * 2);
  const margin = calculateLocationMargin(locationSales, menuItems, location.id, "USD");
  const marginScore = Math.max(0, Math.min(10, margin / 10));
  const score = roundToTwo(revenueScore + seatEfficiencyScore + wasteScore + marginScore);
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    throw new Error(`scoreLocationPerformance: resultado fuera del rango 0–100 para ${location.id}.`);
  }
  return score;
}

export function rankLocationsByPerformance(
  locations: Location[],
  sales: SaleTransaction[],
  wasteRecords: WasteRecord[],
  menuItems: MenuItem[],
  asOfDate: CalendarDate,
): Array<{ location: Location; score: number }> {
  requireArray(locations, "rankLocationsByPerformance.locations");
  const scored = locations
    .filter((location) => location.status === "Active")
    .map((location) => {
      try {
        return { location, score: scoreLocationPerformance(location, sales, wasteRecords, menuItems, asOfDate) };
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`rankLocationsByPerformance: no se pudo puntuar ${location.id}: ${reason}`);
      }
    });
  return scored.sort((left, right) => right.score - left.score || left.location.id.localeCompare(right.location.id));
}

export function countSalesByPaymentMethod(sales: SaleTransaction[]): Record<PaymentMethod, number> {
  requireArray(sales, "countSalesByPaymentMethod.sales");
  const counts: Record<PaymentMethod, number> = {
    Cash: 0,
    "Credit card": 0,
    "Debit card": 0,
    "Digital wallet": 0,
  };
  for (const sale of sales) {
    if (!PAYMENT_METHODS.includes(sale.paymentMethod)) {
      throw new Error(`countSalesByPaymentMethod: método de pago inválido en venta ${sale.id}.`);
    }
    counts[sale.paymentMethod] += 1;
  }
  return counts;
}

export function calculateAverageTicket(sales: SaleTransaction[], currency: Currency): number {
  requireArray(sales, "calculateAverageTicket.sales");
  if (sales.length === 0) throw new Error("calculateAverageTicket: se requiere al menos una venta para calcular el promedio.");
  const total = sales.reduce((sum, sale) => sum + requireFinite(sale.totalPrice[currency], `calculateAverageTicket: venta ${sale.id}`), 0);
  return roundToTwo(total / sales.length);
}

export function findTopSellingItems(
  sales: SaleTransaction[],
  menuItems: MenuItem[],
  topN: number,
): Array<{ item: MenuItem; totalSold: number }> {
  requireArray(sales, "findTopSellingItems.sales");
  requireArray(menuItems, "findTopSellingItems.menuItems");
  if (!Number.isInteger(topN) || topN < 0) throw new Error("findTopSellingItems: topN debe ser un entero no negativo.");
  if (topN === 0) return [];
  const menuById = new Map(menuItems.map((item) => [item.id, item]));
  const totals = new Map<string, { totalSold: number; firstIndex: number }>();
  sales.forEach((sale, index) => {
    const item = menuById.get(sale.itemId);
    if (!item) throw new Error(`findTopSellingItems: venta ${sale.id} referencia itemId inexistente ${sale.itemId}.`);
    requireFinite(sale.quantity, `findTopSellingItems: quantity de ${sale.id}`);
    const aggregate = totals.get(sale.itemId);
    if (aggregate) aggregate.totalSold += sale.quantity;
    else totals.set(sale.itemId, { totalSold: sale.quantity, firstIndex: index });
  });
  return [...totals.entries()]
    .sort((left, right) => right[1].totalSold - left[1].totalSold || left[1].firstIndex - right[1].firstIndex)
    .slice(0, topN)
    .map(([itemId, aggregate]) => ({ item: menuById.get(itemId)!, totalSold: aggregate.totalSold }));
}

export function groupWasteByReason(wasteRecords: WasteRecord[]): Record<WasteReason, WasteRecord[]> {
  requireArray(wasteRecords, "groupWasteByReason.wasteRecords");
  const groups: Record<WasteReason, WasteRecord[]> = {
    Expired: [],
    "Cooking error": [],
    "Customer return": [],
    Damage: [],
    Other: [],
  };
  for (const record of wasteRecords) {
    if (!WASTE_REASONS.includes(record.reason)) {
      throw new Error(`groupWasteByReason: razón inválida en registro ${record.id}.`);
    }
    groups[record.reason].push(record);
  }
  return groups;
}

export function countMenuItemsByCategory(items: MenuItem[]): Record<MenuCategory, number> {
  requireArray(items, "countMenuItemsByCategory.items");
  const counts: Record<MenuCategory, number> = {
    Meat: 0,
    Side: 0,
    Beverage: 0,
    Dessert: 0,
    Combo: 0,
  };
  for (const item of items) {
    if (!MENU_CATEGORIES.includes(item.category)) {
      throw new Error(`countMenuItemsByCategory: categoría inválida en ítem ${item.id}.`);
    }
    counts[item.category] += 1;
  }
  return counts;
}

export function summarizeSales(sales: SaleTransaction[], currency: Currency): SalesSummary {
  requireArray(sales, "summarizeSales.sales");
  if (sales.length === 0) {
    return {
      transactionCount: 0,
      totalRevenue: 0,
      averageTicket: null,
      highestTicket: null,
      lowestTicket: null,
    };
  }
  let totalRevenue = 0;
  let highestTicket = -Infinity;
  let lowestTicket = Infinity;
  for (const sale of sales) {
    const amount = requireFinite(sale.totalPrice[currency], `summarizeSales: totalPrice.${currency} de ${sale.id}`);
    totalRevenue += amount;
    highestTicket = Math.max(highestTicket, amount);
    lowestTicket = Math.min(lowestTicket, amount);
  }
  return {
    transactionCount: sales.length,
    totalRevenue: roundToTwo(totalRevenue),
    averageTicket: roundToTwo(totalRevenue / sales.length),
    highestTicket: roundToTwo(highestTicket),
    lowestTicket: roundToTwo(lowestTicket),
  };
}

export function calculateCountryComparison(
  sales: SaleTransaction[],
  locations: Location[],
  _menuItems: MenuItem[],
): CountryComparison {
  requireArray(sales, "calculateCountryComparison.sales");
  requireArray(locations, "calculateCountryComparison.locations");
  requireArray(_menuItems, "calculateCountryComparison.menuItems");
  const countries: Country[] = ["Colombia", "USA"];
  const locationsById = new Map(locations.map((location) => [location.id, location]));
  for (const sale of sales) {
    if (!locationsById.has(sale.locationId)) {
      throw new Error(`calculateCountryComparison: venta ${sale.id} referencia locación inexistente ${sale.locationId}.`);
    }
  }

  const result = {} as CountryComparison;
  for (const country of countries) {
    const countryLocations = locations.filter((location) => location.country === country);
    const activeLocations = countryLocations.filter((location) => location.status === "Active");
    if (activeLocations.length === 0) {
      throw new Error(`calculateCountryComparison: ${country} no tiene locaciones activas para calcular averageRevenuePerLocation.`);
    }

    const countryLocationIds = new Set(countryLocations.map((location) => location.id));
    const countrySales = sales.filter((sale) => countryLocationIds.has(sale.locationId));
    const totalRevenue: Price = {
      USD: roundToTwo(countrySales.reduce((sum, sale) => sum + requireFinite(sale.totalPrice.USD, `calculateCountryComparison: venta ${sale.id}`), 0)),
      COP: roundToTwo(countrySales.reduce((sum, sale) => sum + requireFinite(sale.totalPrice.COP, `calculateCountryComparison: venta ${sale.id}`), 0)),
    };
    result[country] = {
      totalLocations: activeLocations.length,
      totalRevenue,
      averageRevenuePerLocation: {
        USD: roundToTwo(totalRevenue.USD / activeLocations.length),
        COP: roundToTwo(totalRevenue.COP / activeLocations.length),
      },
      totalSales: countrySales.length,
      inactiveLocations: countryLocations
        .filter((location) => location.status !== "Active")
        .map((location) => ({ id: location.id, status: location.status as Exclude<Location["status"], "Active"> })),
    };
  }
  return result;
}
