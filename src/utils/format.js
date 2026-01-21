export function formatPriceAMD(v) {
  if (v == null) return "";
  try {
    return new Intl.NumberFormat("hy-AM").format(v) + " դր";
  } catch {
    return String(v) + " դր";
  }
}
