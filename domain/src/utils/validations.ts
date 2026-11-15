import type {
  Country,
  Location,
  LocationStatus,
  MenuCategory,
  MenuItem,
  MenuItemStatus,
  PaymentMethod,
  Price,
  SaleTransaction,
  ValidationResult,
} from "../types";

const MENU_CATEGORIES: MenuCategory[] = ["Meat", "Side", "Beverage", "Dessert", "Combo"];
const MENU_STATUSES: MenuItemStatus[] = ["Active", "Seasonal", "Discontinued"];
const PAYMENT_METHODS: PaymentMethod[] = ["Cash", "Credit card", "Debit card", "Digital wallet"];
const COUNTRIES: Country[] = ["Colombia", "USA"];
const LOCATION_STATUSES: LocationStatus[] = ["Active", "Temporarily closed", "Under renovation"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function nonEmptyString(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function positiveFinite(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function appendPriceErrors(errors: string[], value: unknown, field: string): void {
  if (!isRecord(value)) {
    errors.push(`${field} debe contener importes USD y COP.`);
    return;
  }
  for (const currency of ["USD", "COP"] as const) {
    if (!positiveFinite(value[currency])) errors.push(`${field}.${currency} debe ser un número finito mayor que 0.`);
  }
}

function result(errors: string[]): ValidationResult {
  return { valid: errors.length === 0, errors };
}

export function validateMenuItem(item: MenuItem): ValidationResult {
  const errors: string[] = [];
  if (!isRecord(item)) return result(["item debe ser un objeto válido."]);
  if (!nonEmptyString(item.id)) errors.push("id no debe estar vacío.");
  if (!nonEmptyString(item.name)) errors.push("name no debe estar vacío ni contener solo espacios.");
  if (!MENU_CATEGORIES.includes(item.category)) errors.push("category no pertenece a los valores permitidos.");
  if (!MENU_STATUSES.includes(item.status)) errors.push("status no pertenece a los valores permitidos.");
  appendPriceErrors(errors, item.basePrice, "basePrice");
  appendPriceErrors(errors, item.ingredientCost, "ingredientCost");

  if (typeof item.prepTimeMinutes !== "number" || !Number.isFinite(item.prepTimeMinutes) || item.prepTimeMinutes <= 0 || item.prepTimeMinutes > 60) {
    errors.push("prepTimeMinutes debe ser finito, mayor que 0 y menor o igual a 60.");
  }
  if (typeof item.isAvailableInColombia !== "boolean") errors.push("isAvailableInColombia debe ser booleano.");
  if (typeof item.isAvailableInUSA !== "boolean") errors.push("isAvailableInUSA debe ser booleano.");
  if (item.isAvailableInColombia !== true && item.isAvailableInUSA !== true) errors.push("El ítem debe estar disponible en al menos un país.");
  if (!Array.isArray(item.allergens)) errors.push("allergens debe ser un array de cadenas no vacías.");
  else item.allergens.forEach((allergen, index) => {
    if (!nonEmptyString(allergen)) errors.push(`allergens[${index}] debe ser una cadena no vacía.`);
  });
  return result(errors);
}

export function validateSaleTransaction(sale: SaleTransaction): ValidationResult {
  const errors: string[] = [];
  if (!isRecord(sale)) return result(["sale debe ser un objeto válido."]);
  for (const field of ["id", "locationId", "itemId", "waiterName"] as const) {
    if (!nonEmptyString(sale[field])) errors.push(`${field} no debe estar vacío.`);
  }
  if (!positiveFinite(sale.quantity)) errors.push("quantity debe ser un número finito mayor que 0.");
  appendPriceErrors(errors, sale.totalPrice, "totalPrice");
  if (!PAYMENT_METHODS.includes(sale.paymentMethod)) errors.push("paymentMethod no pertenece a los valores permitidos.");
  if (!(sale.timestamp instanceof Date) || !Number.isFinite(sale.timestamp.getTime())) errors.push("timestamp debe ser un Date válido.");
  return result(errors);
}

export function validateLocation(location: Location, referenceDate: Date): ValidationResult {
  const errors: string[] = [];
  if (!isRecord(location)) return result(["location debe ser un objeto válido."]);
  if (!(referenceDate instanceof Date) || !Number.isFinite(referenceDate.getTime())) {
    errors.push("referenceDate debe ser un Date válido para validar openingYear.");
  }
  for (const field of ["id", "name", "city", "manager"] as const) {
    if (!nonEmptyString(location[field])) errors.push(`${field} no debe estar vacío.`);
  }
  if (!COUNTRIES.includes(location.country)) errors.push("country no pertenece a los valores permitidos.");
  if (!LOCATION_STATUSES.includes(location.status)) errors.push("status no pertenece a los valores permitidos.");
  const currentYear = referenceDate instanceof Date && Number.isFinite(referenceDate.getTime())
    ? referenceDate.getFullYear()
    : NaN;
  if (!Number.isInteger(location.openingYear) || location.openingYear < 2008 || location.openingYear > currentYear) {
    errors.push(`openingYear debe ser un entero entre 2008 y el año de referencia (${currentYear}).`);
  }
  for (const field of ["seatingCapacity", "staffCount"] as const) {
    if (typeof location[field] !== "number" || !Number.isFinite(location[field]) || !Number.isInteger(location[field]) || location[field] <= 0) {
      errors.push(`${field} debe ser un entero finito mayor que 0.`);
    }
  }
  appendPriceErrors(errors, location.monthlyRentCost, "monthlyRentCost");
  appendPriceErrors(errors, location.averageMonthlyUtilities, "averageMonthlyUtilities");
  if (!nonEmptyString(location.timeZone)) errors.push("timeZone debe ser un identificador IANA no vacío.");
  else {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: location.timeZone }).format(new Date(0));
    } catch {
      errors.push(`timeZone debe ser un identificador IANA reconocido: ${location.timeZone}.`);
    }
  }
  return result(errors);
}
