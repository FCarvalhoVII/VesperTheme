import { definePalette } from "./contract.js";

export const nordic = definePalette({
  id: "nordic", name: "Vesper Nordic", type: "dark",
  colors: {
    background: "#0A1018", backgroundSecondary: "#0D1520", backgroundElevated: "#121D2A",
    foreground: "#DCEAF2", foregroundMuted: "#708695", selection: "#1B3445",
    currentLine: "#0F1924", border: "#20303D", comment: "#607787",
    keyword: "#7DD3FC", function: "#A5F3FC", type: "#BAE6FD", parameter: "#93C5FD",
    string: "#C4E6D4", constant: "#CBD5FF", special: "#67E8F9", accent: "#38BDF8",
    accentSecondary: "#22D3EE", error: "#F87171", warning: "#FACC7A",
    info: "#38BDF8", success: "#86CFA5"
  }
});
