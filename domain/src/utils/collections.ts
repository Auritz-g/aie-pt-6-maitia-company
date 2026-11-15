import type { CalendarDate, Currency, Location, MenuCategory, MenuItem, SaleTransaction } from "../types";

const CALENDAR_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseCalendarDate(value: CalendarDate, label: string): string {
  const match = CALENDAR_DATE_PATTERN.exec(value);
  if (!match) {
    throw new Error(`${label} debe tener el formato YYYY-MM-DD.`);
  }

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error(`${label} no es una fecha calendario válida: ${value}.`);
  }
  return value;
}

function getLocalDate(timestamp: Date, timeZone: string, saleId: string): string {
  if (!(timestamp instanceof Date) || !Number.isFinite(timestamp.getTime())) {
    throw new Error(`filterSalesByDateRange: timestamp inválido en venta ${saleId}.`);
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
    throw new Error(`filterSalesByDateRange: zona IANA inválida "${timeZone}" para la venta ${saleId}.`);
  }
}

export function filterSalesByLocation(sales: SaleTransaction[], locationId: string): SaleTransaction[] {
  return sales.filter((sale) => sale.locationId === locationId);
}

export function filterSalesByDateRange(
  sales: SaleTransaction[],
  startDate: CalendarDate,
  endDate: CalendarDate,
  locations: Location[],
): SaleTransaction[] {
  const start = parseCalendarDate(startDate, "startDate");
  const end = parseCalendarDate(endDate, "endDate");
  if (start > end) {
    throw new Error("filterSalesByDateRange: startDate debe ser anterior o igual a endDate.");
  }

  const locationsById = new Map(locations.map((location) => [location.id, location]));
  return sales.filter((sale) => {
    const location = locationsById.get(sale.locationId);
    if (!location) {
      throw new Error(`filterSalesByDateRange: no existe la locación ${sale.locationId} de la venta ${sale.id}.`);
    }
    const localDate = getLocalDate(sale.timestamp, location.timeZone, sale.id);
    return localDate >= start && localDate <= end;
  });
}

export function filterMenuItemsByCategory(items: MenuItem[], category: MenuCategory): MenuItem[] {
  return items.filter((item) => item.category === category);
}

export function filterActiveLocations(locations: Location[]): Location[] {
  return locations.filter((location) => location.status === "Active");
}

export function sortLocationsByCapacity(locations: Location[], order: "asc" | "desc"): Location[] {
  if (order !== "asc" && order !== "desc") throw new Error(`sortLocationsByCapacity: orden inválido "${order}".`);
  const direction = order === "asc" ? 1 : -1;
  return [...locations].sort((left, right) => direction * (left.seatingCapacity - right.seatingCapacity));
}

export function sortMenuItemsByPrice(
  items: MenuItem[],
  currency: Currency,
  order: "asc" | "desc",
): MenuItem[] {
  if (order !== "asc" && order !== "desc") throw new Error(`sortMenuItemsByPrice: orden inválido "${order}".`);
  const direction = order === "asc" ? 1 : -1;
  return [...items].sort((left, right) => direction * (left.basePrice[currency] - right.basePrice[currency]));
}
