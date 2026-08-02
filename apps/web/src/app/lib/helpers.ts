export function getFormattedNumber(number: number) {
  if (!number) return "-";
  return String(number).padStart(2, "0");
}

export function getProjectDuration(start: string | null, end: string | null) {
  if (start && end) {
    return `${start}-${end}`;
  } else return `seit ${start}` || "";
  // TODO translate
  // TODO check if second is later or equal
  // if not change order
}

export function getCombinedStringWithDash(
  arrayOfStrings: (string | undefined | null)[],
) {
  return arrayOfStrings.filter(Boolean).join("-");
}
