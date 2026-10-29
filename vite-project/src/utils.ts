export function fmtDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
export function fmtShort(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
  });
}
export function isUpcoming(d: string) {
  return new Date(d + "T12:00:00") >= new Date(new Date().toDateString());
}
