export function formatPercent(percent: number) {
  return (percent * 100).toFixed(2).replace(".", ",") + `%`;
}
