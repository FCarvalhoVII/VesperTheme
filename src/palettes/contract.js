export const requiredColorRoles = [
  "background", "backgroundSecondary", "backgroundElevated",
  "foreground", "foregroundMuted", "selection", "currentLine", "border",
  "comment", "keyword", "function", "type", "parameter", "string",
  "constant", "special", "accent", "accentSecondary", "error", "warning",
  "info", "success"
];

export function definePalette(palette) {
  return Object.freeze({ ...palette, colors: Object.freeze({ ...palette.colors }) });
}
