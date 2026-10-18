import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { palettes } from "../src/palettes/index.js";
import { requiredColorRoles } from "../src/palettes/contract.js";

const hexColor = /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/;
const requiredThemeProperties = ["name", "type", "semanticHighlighting", "colors", "tokenColors", "semanticTokenColors"];
const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const contributions = packageJson.contributes?.themes ?? [];

assert.equal(contributions.length, palettes.length, "package.json must register every palette exactly once");

function validateColorTree(value, location) {
  if (typeof value === "string" && value.startsWith("#")) {
    assert.match(value, hexColor, `Malformed color at ${location}: ${value}`);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => validateColorTree(item, `${location}[${index}]`));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => validateColorTree(item, `${location}.${key}`));
  }
}

for (const palette of palettes) {
  assert.match(palette.id, /^[a-z][a-z0-9-]*$/, `Invalid palette id: ${palette.id}`);
  assert.ok(palette.name.startsWith("Vesper "), `Invalid palette name: ${palette.name}`);
  assert.equal(palette.type, "dark", `${palette.name} must currently be a dark theme`);
  for (const role of requiredColorRoles) {
    assert.ok(Object.hasOwn(palette.colors, role), `${palette.name} is missing palette role: ${role}`);
    assert.match(palette.colors[role], /^#[0-9A-Fa-f]{6}$/, `${palette.name}.${role} is not a six-digit hex color`);
  }
  const extraRoles = Object.keys(palette.colors).filter((role) => !requiredColorRoles.includes(role));
  assert.deepEqual(extraRoles, [], `${palette.name} has undeclared palette roles`);

  const file = path.resolve(`themes/vesper-${palette.id}-color-theme.json`);
  const expectedPath = `./themes/vesper-${palette.id}-color-theme.json`;
  const registration = contributions.find((theme) => theme.label === palette.name);
  assert.ok(registration, `${palette.name} is not registered in package.json`);
  assert.equal(registration.uiTheme, "vs-dark", `${palette.name} must use vs-dark`);
  assert.equal(registration.path, expectedPath, `${palette.name} has the wrong generated theme path`);
  const theme = JSON.parse(await readFile(file, "utf8"));
  for (const property of requiredThemeProperties) assert.ok(Object.hasOwn(theme, property), `${file} is missing ${property}`);
  assert.equal(theme.name, palette.name);
  assert.equal(theme.semanticHighlighting, true);
  assert.ok(Object.keys(theme.colors).length > 0, `${theme.name} has no workbench colors`);
  assert.ok(theme.tokenColors.length > 0, `${theme.name} has no TextMate rules`);
  assert.ok(Object.keys(theme.semanticTokenColors).length > 0, `${theme.name} has no semantic token rules`);
  validateColorTree(theme, theme.name);
}

console.log(`Validated ${palettes.length} palettes and ${palettes.length} generated themes.`);
