import { useEffect, useState } from "react";

interface KathmanduTime {
  time: string;
  date: string;
  age: number;
  secondsAlive: number;
}

function readKathmanduTime(): KathmanduTime {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kathmandu",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(now);
  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kathmandu",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(now);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const year = Number(values.year);
  const month = Number(values.month);
  const day = Number(values.day);
  const age = year - 2008 - (month < 7 || (month === 7 && day < 21) ? 1 : 0);
  const birthMoment = Date.UTC(2008, 6, 20, 18, 15, 0);

  return { time, date, age, secondsAlive: Math.max(0, Math.floor((now.getTime() - birthMoment) / 1000)) };
}

export function KathmanduClock() {
  const [clock, setClock] = useState<KathmanduTime>(() => readKathmanduTime());

  useEffect(() => {
    const timer = window.setInterval(() => setClock(readKathmanduTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-clock" aria-label="Current time and age in Kathmandu">
      <div className="clock-place">
        <span className="clock-dot" />
        <span>Kathmandu, Nepal</span>
      </div>
      <div className="clock-line">
        <strong>{clock.time}</strong>
        <span>{clock.date}</span>
      </div>
      <div className="age-line">
        <span>{clock.age} years</span>
        <span>{clock.secondsAlive.toLocaleString("en-US")} seconds alive</span>
      </div>
    </div>
  );
}
