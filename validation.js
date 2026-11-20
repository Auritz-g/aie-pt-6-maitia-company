const citiesByCountry = {
  CO: [
    { value: "medellin", label: "Medellín" },
    { value: "bogota", label: "Bogotá" },
    { value: "cali", label: "Cali" },
  ],
  US: [
    { value: "miami", label: "Miami" },
    { value: "orlando", label: "Orlando" },
  ],
};

const locationsByCity = {
  medellin: ["Brasaland El Poblado", "Brasaland Laureles", "Brasaland Envigado", "Brasaland Sabaneta"],
  bogota: ["Brasaland Usaquén", "Brasaland Chapinero", "Brasaland Zona Rosa"],
  cali: ["Brasaland Granada", "Brasaland Ciudad Jardín", "Brasaland Unicentro"],
  miami: ["Brasaland Brickell", "Brasaland Coral Gables"],
  orlando: ["Brasaland Downtown", "Brasaland International Drive"],
};

const form = document.querySelector("#brasa-points-form");
const steps = [...form.querySelectorAll(".form-step")];
const progressItems = [...form.querySelectorAll(".progress-step")];
const progressLabel = form.querySelector(".progress-label");
const errorSummary = document.querySelector("#form-errors");
const successMessage = document.querySelector("#form-success");
const phoneCountrySelect = document.querySelector("#phone-country");
const phoneInput = document.querySelector("#phone");
const countrySelect = document.querySelector("#country");
const citySelect = document.querySelector("#city");
const locationSelect = document.querySelector("#favorite-location");
const dependentFieldsStatus = document.querySelector("#dependent-fields-status");
const otherPreferenceCheckbox = document.querySelector("#preference-other");
const otherPreferenceField = document.querySelector("#other-preference-field");
const otherPreferenceInput = document.querySelector("#other-preference");
const discoverySourceSelect = document.querySelector("#discovery-source");
const otherDiscoveryField = document.querySelector("#other-discovery-field");
const otherDiscoveryInput = document.querySelector("#other-discovery");
const summary = document.querySelector("#application-summary");
const previousButton = document.querySelector("#previous-step");
const continueButton = document.querySelector("#continue-step");
const completeButton = document.querySelector("#complete-form");
const returnToSummaryButton = document.querySelector("#return-to-summary");
let currentStep = 0;
let editingFromSummary = false;

function replaceOptions(select, placeholder, options) {
  const fragment = document.createDocumentFragment();
  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = placeholder;
  fragment.append(emptyOption);

  for (const item of options) {
    const option = document.createElement("option");
    option.value = typeof item === "string" ? item : item.value;
    option.textContent = typeof item === "string" ? item : item.label;
    fragment.append(option);
  }
  select.replaceChildren(fragment);
}

function updateLocations(announce = true) {
  const city = citySelect.value;
  const locations = locationsByCity[city] ?? [];
  replaceOptions(locationSelect, city ? "Ninguna por ahora" : "Selecciona primero país y ciudad", locations);
  locationSelect.disabled = locations.length === 0;
  if (announce) {
    dependentFieldsStatus.textContent = city
      ? `Se actualizaron las ubicaciones disponibles para ${citySelect.selectedOptions[0].textContent}.`
      : "Selecciona país y ciudad para consultar ubicaciones favoritas.";
  }
}

function updateCities() {
  const country = countrySelect.value;
  const cities = citiesByCountry[country] ?? [];
  replaceOptions(citySelect, country ? "Selecciona tu ciudad" : "Selecciona primero tu país", cities);
  citySelect.disabled = cities.length === 0;
  updateLocations(false);
  dependentFieldsStatus.textContent = country
    ? `Se actualizaron las ciudades y ubicaciones disponibles para ${countrySelect.selectedOptions[0].textContent}.`
    : "Selecciona un país para consultar ciudades y ubicaciones favoritas.";
}

countrySelect.addEventListener("change", updateCities);
citySelect.addEventListener("change", () => updateLocations());
updateCities();

function resizeTextarea(textarea) {
  textarea.style.height = "auto";
  const borderHeight = textarea.offsetHeight - textarea.clientHeight;
  const maxHeight = Number.parseFloat(getComputedStyle(textarea).maxHeight);
  const contentHeight = textarea.scrollHeight + borderHeight;
  textarea.style.height = `${Math.min(contentHeight, maxHeight)}px`;
}

otherPreferenceInput.addEventListener("input", () => resizeTextarea(otherPreferenceInput));
otherDiscoveryInput.addEventListener("input", () => resizeTextarea(otherDiscoveryInput));

function updateOtherPreferenceVisibility() {
  const isSelected = otherPreferenceCheckbox.checked;
  otherPreferenceField.hidden = !isSelected;
  otherPreferenceInput.hidden = !isSelected;
  otherPreferenceCheckbox.setAttribute("aria-expanded", String(isSelected));
  if (isSelected) resizeTextarea(otherPreferenceInput);
}

otherPreferenceCheckbox.addEventListener("change", updateOtherPreferenceVisibility);
updateOtherPreferenceVisibility();

function updateOtherDiscoveryVisibility() {
  const isSelected = discoverySourceSelect.value === "other";
  otherDiscoveryField.hidden = !isSelected;
  otherDiscoveryInput.hidden = !isSelected;
  if (isSelected) resizeTextarea(otherDiscoveryInput);
  discoverySourceSelect.setAttribute("aria-controls", "other-discovery-field");
  discoverySourceSelect.setAttribute("aria-expanded", String(isSelected));
}

discoverySourceSelect.addEventListener("change", updateOtherDiscoveryVisibility);
updateOtherDiscoveryVisibility();

const fieldRules = [
  { step: 0, field: document.querySelector("#full-name"), error: document.querySelector("#full-name-error"), isValid: (field) => field.value.trim().split(/\s+/u).filter(Boolean).length >= 2 },
  { step: 0, field: document.querySelector("#email"), error: document.querySelector("#email-error"), isValid: (field) => field.value.trim() !== "" && field.validity.valid },
  {
    step: 0,
    field: phoneCountrySelect,
    relatedFields: [phoneInput],
    error: document.querySelector("#phone-error"),
    focusInvalid: () => phoneCountrySelect.value ? phoneInput : phoneCountrySelect,
    isValid: () => ["+57", "+1"].includes(phoneCountrySelect.value)
      && /^(?:[\s().-]*\d){10}$/u.test(phoneInput.value.trim()),
  },
  {
    step: 0,
    field: document.querySelector("#birth-date"),
    error: document.querySelector("#birth-date-error"),
    isValid: (field) => {
      if (!/^\d{4}-\d{2}-\d{2}$/u.test(field.value)) return false;
      const [year, month, day] = field.value.split("-").map(Number);
      const birthDate = new Date(Date.UTC(year, month - 1, day));
      if (birthDate.getUTCFullYear() !== year || birthDate.getUTCMonth() !== month - 1 || birthDate.getUTCDate() !== day) return false;
      const today = new Date();
      let age = today.getFullYear() - year;
      if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) age -= 1;
      return age > 18;
    },
  },
  { step: 1, field: countrySelect, error: document.querySelector("#country-error"), isValid: (field) => Object.hasOwn(citiesByCountry, field.value) },
  { step: 1, field: citySelect, error: document.querySelector("#city-error"), isValid: (field) => (citiesByCountry[countrySelect.value] ?? []).some((city) => city.value === field.value) },
  {
    step: 2,
    field: discoverySourceSelect,
    error: document.querySelector("#discovery-source-error"),
    isValid: (field) => ["social", "recommendation", "walk-in", "search", "other"].includes(field.value),
  },
  { step: 3, field: document.querySelector("#demo-acknowledgement"), error: document.querySelector("#terms-error"), isValid: (field) => field.checked },
];

function updateFieldError(rule, invalid) {
  rule.error.hidden = !invalid;
  for (const field of [rule.field, ...(rule.relatedFields ?? [])]) {
    if (invalid) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }
}

function validateStep(stepIndex) {
  const rules = fieldRules.filter((rule) => rule.step === stepIndex);
  const invalidRules = rules.filter((rule) => !rule.isValid(rule.field));
  for (const rule of rules) updateFieldError(rule, invalidRules.includes(rule));
  errorSummary.hidden = invalidRules.length === 0;
  if (invalidRules.length) {
    const count = invalidRules.length;
    errorSummary.querySelector("p").textContent = `Hay ${count} ${count === 1 ? "campo que requiere" : "campos que requieren"} tu atención. Revisa los mensajes indicados.`;
    (invalidRules[0].focusInvalid?.() ?? invalidRules[0].field).focus();
    return false;
  }
  return true;
}

const stepNames = ["Información personal", "Ubicación y preferencias", "Cómo nos conociste", "Resumen y confirmaciones"];

function showStep(stepIndex, { focus = true } = {}) {
  currentStep = stepIndex;
  steps.forEach((step, index) => { step.hidden = index !== stepIndex; });
  progressItems.forEach((item, index) => {
    item.classList.toggle("is-current", index === stepIndex);
    item.classList.toggle("is-complete", index < stepIndex);
    const description = item.querySelector(".sr-only");
    const stepDescription = stepNames[index];
    description.textContent = `Paso ${index + 1} de 4: ${stepDescription}${index === stepIndex ? ", actual" : ""}`;
    if (index === stepIndex) item.setAttribute("aria-current", "step");
    else item.removeAttribute("aria-current");
  });
  progressLabel.textContent = `Paso ${stepIndex + 1} de 4: ${stepNames[stepIndex]}`;
  previousButton.hidden = stepIndex === 0 || stepIndex === 3;
  continueButton.hidden = stepIndex === 3;
  completeButton.hidden = stepIndex !== 3;
  returnToSummaryButton.hidden = !editingFromSummary;
  errorSummary.hidden = true;
  if (stepIndex === 3) renderSummary();
  if (focus) steps[stepIndex].querySelector(".form-step-heading").focus();
}

function selectedText(select) {
  return select.value ? select.selectedOptions[0].textContent : "Sin respuesta";
}

function checkedPreferenceLabels() {
  return [...form.querySelectorAll("input[name='dietaryPreferences']:checked")]
    .map((input) => input.closest("label").querySelector("span").textContent.trim());
}

const summaryItems = [
  { label: "Nombre completo", control: "full-name", step: 0, value: () => form.elements.fullName.value.trim() || "Sin respuesta" },
  { label: "Email", control: "email", step: 0, value: () => form.elements.email.value.trim() || "Sin respuesta" },
  {
    label: "Teléfono",
    control: "phone",
    step: 0,
    value: () => [phoneCountrySelect.value, phoneInput.value.trim()].filter(Boolean).join(" ") || "Sin respuesta",
  },
  { label: "Fecha de nacimiento", control: "birth-date", step: 0, value: () => form.elements.birthDate.value || "Sin respuesta" },
  { label: "País", control: "country", step: 1, value: () => selectedText(countrySelect) },
  { label: "Ciudad", control: "city", step: 1, value: () => selectedText(citySelect) },
  { label: "Ubicación favorita", control: "favorite-location", step: 1, value: () => selectedText(locationSelect) },
  { label: "Preferencias alimentarias", control: "preference-other", step: 1, value: () => checkedPreferenceLabels().join(", ") || "Sin respuesta" },
  { label: "Detalle de otra preferencia", control: "other-preference", step: 1, value: () => otherPreferenceInput.value.trim() || "Sin detalle", isVisible: () => otherPreferenceCheckbox.checked },
  { label: "Cómo nos conociste", control: "discovery-source", step: 2, value: () => selectedText(discoverySourceSelect) },
  { label: "Detalle de cómo nos conociste", control: "other-discovery", step: 2, value: () => otherDiscoveryInput.value.trim() || "Sin detalle", isVisible: () => discoverySourceSelect.value === "other" },
];

function renderSummary() {
  const list = document.createElement("dl");
  list.className = "summary-list";
  for (const item of summaryItems.filter((entry) => !entry.isVisible || entry.isVisible())) {
    const row = document.createElement("div");
    row.className = "summary-item";
    const term = document.createElement("dt");
    term.textContent = item.label;
    const definition = document.createElement("dd");
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "summary-edit";
    editButton.dataset.editControl = item.control;
    editButton.dataset.editStep = String(item.step);
    editButton.setAttribute("aria-label", `Editar ${item.label}`);
    const value = document.createElement("span");
    value.textContent = item.value();
    editButton.append(value);
    const affordance = document.createElement("span");
    affordance.className = "summary-edit-label";
    affordance.textContent = "Editar";
    editButton.append(affordance);
    definition.append(editButton);
    row.append(term, definition);
    list.append(row);
  }

  const confirmationItems = [
    {
      label: "Confirmación de demostración (obligatoria)",
      value: form.elements.demoAcknowledgement.checked ? "Sí, confirmada" : "Pendiente",
    },
    {
      label: "Ofertas por email (opcional)",
      value: form.elements.emailOffers.checked ? "Sí, quiero recibir ofertas" : "No, no quiero recibir ofertas",
    },
  ];

  for (const item of confirmationItems) {
    const row = document.createElement("div");
    row.className = "summary-item";
    const term = document.createElement("dt");
    term.textContent = item.label;
    const definition = document.createElement("dd");
    definition.textContent = item.value;
    row.append(term, definition);
    list.append(row);
  }

  summary.replaceChildren(list);
}

continueButton.addEventListener("click", () => {
  if (!validateStep(currentStep)) return;
  showStep(currentStep + 1);
});

previousButton.addEventListener("click", () => showStep(currentStep - 1));

summary.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-control]");
  if (!editButton) return;
  editingFromSummary = true;
  const targetStep = Number(editButton.dataset.editStep);
  showStep(targetStep);
  const targetControl = document.getElementById(editButton.dataset.editControl);
  (targetControl.disabled ? countrySelect : targetControl).focus();
});

returnToSummaryButton.addEventListener("click", () => {
  editingFromSummary = false;
  showStep(3);
});

form.addEventListener("input", () => {
  if (currentStep === 3) renderSummary();
});
form.addEventListener("change", () => {
  if (currentStep === 3) renderSummary();
});

showStep(0, { focus: false });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (currentStep !== 3 || !validateStep(3)) return;
  errorSummary.hidden = true;
  successMessage.hidden = false;
  successMessage.focus();
  completeButton.disabled = true;
  form.dispatchEvent(new CustomEvent("brasa:validated"));
});
