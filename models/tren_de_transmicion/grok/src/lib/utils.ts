import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtMm(n: number, digits = 2) {
  const v = Number.isInteger(n) ? n.toFixed(0) : n.toFixed(digits);
  return `${v} mm`;
}

export function fmtNm(n: number, digits = 1) {
  return `${n.toFixed(digits)} N·m`;
}

export function fmtN(n: number) {
  return `${Math.round(n)} N`;
}

export function fmtRpm(n: number) {
  return `${Math.round(n)} rpm`;
}

export function fmtMPa(n: number) {
  return `${n.toFixed(0)} MPa`;
}
