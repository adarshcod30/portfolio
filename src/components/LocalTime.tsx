"use client";

import { useEffect, useState } from "react";

/** The current time in Jaipur, so a visitor abroad can see whether it is a sensible hour to call. */
export default function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { timeZone, hour: "2-digit", minute: "2-digit", hour12: true });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return <span suppressHydrationWarning>{now || "--:--"}</span>;
}
