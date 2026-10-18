import { definePalette } from "./contract.js";

export const arcane = definePalette({
  id: "arcane", name: "Vesper Arcane", type: "dark",
  colors: {
    background: "#0B0E14", backgroundSecondary: "#10141D", backgroundElevated: "#171C28",
    foreground: "#D8E0F0", foregroundMuted: "#7C86A2", selection: "#27324A",
    currentLine: "#121824", border: "#252C3D", comment: "#66708C",
    keyword: "#C792EA", function: "#82AAFF", type: "#89DDFF", parameter: "#F78C6C",
    string: "#C3E88D", constant: "#B39DDB", special: "#FF5370", accent: "#7C4DFF",
    accentSecondary: "#448AFF", error: "#FF5370", warning: "#FFCB6B",
    info: "#82AAFF", success: "#C3E88D"
  }
});
