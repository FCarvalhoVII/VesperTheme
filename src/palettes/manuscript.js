import { definePalette } from "./contract.js";

export const manuscript = definePalette({
  id: "manuscript", name: "Vesper Manuscript", type: "dark",
  colors: {
    background: "#1B1917", backgroundSecondary: "#211E1A", backgroundElevated: "#29251F",
    foreground: "#E8DDC4", foregroundMuted: "#978B77", selection: "#40382C",
    currentLine: "#242019", border: "#3A3329", comment: "#7F7566",
    keyword: "#C99A4A", function: "#D8B56A", type: "#E3CC9A", parameter: "#B66A5E",
    string: "#C7B377", constant: "#A86F59", special: "#8F3F4A", accent: "#C49A52",
    accentSecondary: "#7D3541", error: "#C95B5B", warning: "#D0A85C",
    info: "#A9A47E", success: "#8FA36A"
  }
});
