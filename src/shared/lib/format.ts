export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatRelativeLabel(value: string) {
  const date = new Date(value);
  return date.toLocaleDateString("es-EC", {
    month: "long",
    day: "numeric",
  });
}
