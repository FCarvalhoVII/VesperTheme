import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";
import { palettes } from "../palettes/index.js";
import { createTokenColors } from "../syntax/token-colors.js";
import { createSemanticTokenColors } from "../syntax/semantic-tokens.js";
import { createWorkbenchColors } from "../ui/workbench-colors.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const themesDirectory = path.join(projectRoot, "themes");

export function buildTheme(palette) {
  const colors = new Proxy(palette.colors, {
    get(target, role) {
      if (typeof role === "string" && !Object.hasOwn(target, role)) {
        throw new Error(`${palette.name} generator referenced undefined palette role: ${role}`);
      }
      return target[role];
    }
  });
  return {
    name: palette.name,
    type: palette.type,
    semanticHighlighting: true,
    colors: createWorkbenchColors(colors),
    tokenColors: createTokenColors(colors),
    semanticTokenColors: createSemanticTokenColors(colors)
  };
}

export function serializeTheme(palette) {
  return `${JSON.stringify(buildTheme(palette), null, 2)}\n`;
}

export async function generateThemes({ check = false } = {}) {
  await mkdir(themesDirectory, { recursive: true });
  const stale = [];

  for (const palette of palettes) {
    const file = path.join(themesDirectory, `vesper-${palette.id}-color-theme.json`);
    const output = serializeTheme(palette);
    if (check) {
      const current = await readFile(file, "utf8").catch(() => "");
      if (current !== output) stale.push(path.relative(projectRoot, file));
    } else {
      await writeFile(file, output, "utf8");
      console.log(`Generated ${path.relative(projectRoot, file)}`);
    }
  }

  if (stale.length > 0) {
    throw new Error(`Generated themes are out of date:\n${stale.map((file) => `- ${file}`).join("\n")}\nRun npm run build.`);
  }
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  generateThemes({ check: process.argv.includes("--check") }).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
