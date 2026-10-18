import assert from "node:assert/strict";
import test from "node:test";
import { palettes } from "../src/palettes/index.js";
import { requiredColorRoles } from "../src/palettes/contract.js";
import { buildTheme } from "../src/build/generate-themes.js";

test("every registered palette fulfills the same color contract", () => {
  for (const palette of palettes) assert.deepEqual(Object.keys(palette.colors).sort(), [...requiredColorRoles].sort());
});

test("generated themes preserve semantic highlighting behavior", () => {
  for (const palette of palettes) {
    const theme = buildTheme(palette);
    assert.equal(theme.semanticHighlighting, true);
    assert.deepEqual(theme.semanticTokenColors.parameter, { foreground: palette.colors.parameter, italic: true });
    assert.deepEqual(theme.semanticTokenColors.comment, { foreground: palette.colors.comment, italic: true });
    assert.equal(theme.semanticTokenColors.function, palette.colors.function);
    assert.equal(theme.semanticTokenColors.type, palette.colors.type);
  }
});

test("italics are selective in TextMate rules", () => {
  for (const palette of palettes) {
    const rules = Object.fromEntries(buildTheme(palette).tokenColors.map((rule) => [rule.name, rule.settings]));
    assert.equal(rules.Comments.fontStyle, "italic");
    assert.equal(rules.Parameters.fontStyle, "italic");
    assert.equal(rules["Control flow and behavior"].fontStyle, "italic");
    assert.equal(rules["Functions and methods"].fontStyle, "");
    assert.equal(rules["Classes and types"].fontStyle, "");
    assert.equal(rules.Strings.fontStyle, "");
  }
});

test("workbench includes a complete ANSI palette and bracket colors", () => {
  const colors = buildTheme(palettes[0]).colors;
  const ansiKeys = Object.keys(colors).filter((key) => key.startsWith("terminal.ansi"));
  const bracketKeys = Object.keys(colors).filter((key) => /^editorBracketHighlight\.foreground\d$/.test(key));
  assert.equal(ansiKeys.length, 16);
  assert.equal(bracketKeys.length, 6);
});
