// src/constants/colors.js

export const COLORS = {
  bg: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceAlt: "#F1F5F9",

  border: "#E2E8F0",
  borderHover: "#CBD5E1",

  accent: "#C9A84C",
  accentLight: "#E8C96B",
  accentDark: "#A07830",

  text: "#0F172A",
  textMuted: "#475569",
  textDim: "#94A3B8",

  error: "#DC2626",
  success: "#16A34A",
};

export const statusColors = {
  Active: { bg: `${COLORS.success}15`, text: COLORS.success },
  Review: { bg: `${COLORS.accent}15`, text: COLORS.accent },
  Closed: { bg: `${COLORS.textDim}15`, text: COLORS.textDim },
};