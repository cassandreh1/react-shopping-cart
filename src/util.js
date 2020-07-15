export default function formatCurrency(number) {
  return `$${Number(number.toFixed(2)).toLocaleString()} `;
}
