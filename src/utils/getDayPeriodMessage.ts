export default function getDayPeriodMessage(hours: number) {
  if (hours >= 18) return "Boa Noite";
  if (hours >= 12) return "Boa Tarde";
  return "Bom Dia";
}
