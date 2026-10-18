import { definePalette } from "./contract.js";

export const ocean = definePalette({
  id: "ocean", name: "Vesper Ocean", type: "dark",
  colors: {
    background: "#06121C", backgroundSecondary: "#091925", backgroundElevated: "#0D2230",
    foreground: "#D3E6ED", foregroundMuted: "#698794", selection: "#12384A",
    currentLine: "#091D29", border: "#163746", comment: "#5D7884",
    keyword: "#5BB9FF", function: "#45D6D0", type: "#7DDCE5", parameter: "#FF9B8C",
    string: "#9ED7B3", constant: "#A6B8FF", special: "#FF7F73", accent: "#168AAD",
    accentSecondary: "#22C7D6", error: "#FF6B6B", warning: "#F4C76B",
    info: "#4FB7E8", success: "#72D6A0"
  }
});
