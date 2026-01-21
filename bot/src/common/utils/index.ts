export const htmlFormatter = (html: string) => {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

export const parseMatchAddingTransaction = (match: string) => {
  const [amount, category, ...notes] = match.split(" ");
  const description = notes.join(" ");

  return { amount: Number(amount), category, description };
};

export const formatAmount = (amount: number) => {
  return amount.toLocaleString("uz-UZ", { style: "currency", currency: "UZS" });
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const compareDays = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
