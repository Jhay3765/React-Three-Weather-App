// Determines if a given time (in ISO format) falls within the day period defined by sunrise and sunset times in a specific timezone.
export default function isDayAt(
  timeISO: string,
  sunriseClock: string,
  sunsetClock: string,
  tz: string
): 0 | 1 {
  const toTz = (d: Date) =>
    new Date(d.toLocaleString("en-US", { timeZone: tz }));

  const parseClock = (clock: string, base: Date) => {
    // "hh:mm AM/PM"
    const [hms, ampm] = clock.split(" ");
    let [h, m] = hms.split(":").map(Number);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      h,
      m,
      0
    );
  };

  const local = toTz(new Date(timeISO));
  const sr = parseClock(sunriseClock, local);
  const ss = parseClock(sunsetClock, local);
  return local >= sr && local < ss ? 1 : 0;
}
