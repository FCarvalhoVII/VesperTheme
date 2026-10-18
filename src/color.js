function channels(hex) {
  return [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
}

export function mix(first, second, amount = 0.5) {
  const a = channels(first);
  const b = channels(second);
  const values = a.map((value, index) => Math.round(value + (b[index] - value) * amount));
  return `#${values.map((value) => value.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

export function alpha(hex, opacity) {
  return `${hex}${Math.round(opacity * 255).toString(16).padStart(2, "0").toUpperCase()}`;
}
