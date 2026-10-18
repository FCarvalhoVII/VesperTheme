# Vesper Theme

![Vesper Theme banner](assets/banner.png)

Vesper Theme is a family of dark Visual Studio Code themes built around semantic clarity, restrained color, and comfortable long-session readability. Every variant uses the same highlighting system and changes only its palette and atmosphere.

> Colors communicate semantic category, while italics communicate selected behavioral or contextual distinctions.

## Available themes

- **Vesper Arcane** — obsidian surfaces, mystical purple, and electric blue.
- **Vesper Manuscript** — charcoal, parchment, antique gold, and restrained wine red.
- **Vesper Nordic** — a calm arctic night with cold blues and ice-white text.
- **Vesper Ocean** — deep navy, turquoise, cyan, and focused coral contrast.

## Screenshots

Screenshots will be added here after the first Marketplace release.

## Design philosophy

Vesper assigns color by meaning instead of trying to make every token unique. Keywords describe language structure, functions identify executable symbols, types identify structural symbols, parameters identify inputs, strings identify text, constants identify literal values, and comments remain subordinate to code. Ordinary variables and properties stay close to the foreground color.

Italics are deliberately limited to comments, parameters, and control-flow or behavioral keywords where a language grammar provides reliable scopes. Functions, classes, types, strings, and ordinary variables are not italicized by default. Semantic tokens refine the TextMate fallback without changing these roles.

The shared rules are designed for JavaScript, TypeScript, JSX/TSX, JSON, HTML, CSS/SCSS, Python, Go, Rust, Java, C/C++, C#, PHP, Ruby, YAML, TOML, Markdown, Bash, and SQL. Exact tokenization depends on the installed language grammar and language server.

## Palette previews

### Vesper Arcane

| Role | Color |
|---|---|
| Background | `#0B0E14` |
| Foreground | `#D8E0F0` |
| Keyword | `#C792EA` |
| Function | `#82AAFF` |
| Type | `#89DDFF` |
| Parameter | `#F78C6C` |
| String | `#C3E88D` |
| Constant | `#B39DDB` |
| Comment | `#66708C` |
| Special | `#FF5370` |

### Vesper Manuscript

| Role | Color |
|---|---|
| Background | `#1B1917` |
| Foreground | `#E8DDC4` |
| Keyword | `#C99A4A` |
| Function | `#D8B56A` |
| Type | `#E3CC9A` |
| Parameter | `#B66A5E` |
| String | `#C7B377` |
| Constant | `#A86F59` |
| Comment | `#7F7566` |
| Special | `#8F3F4A` |

### Vesper Nordic

| Role | Color |
|---|---|
| Background | `#0A1018` |
| Foreground | `#DCEAF2` |
| Keyword | `#7DD3FC` |
| Function | `#A5F3FC` |
| Type | `#BAE6FD` |
| Parameter | `#93C5FD` |
| String | `#C4E6D4` |
| Constant | `#CBD5FF` |
| Comment | `#607787` |
| Special | `#67E8F9` |

### Vesper Ocean

| Role | Color |
|---|---|
| Background | `#06121C` |
| Foreground | `#D3E6ED` |
| Keyword | `#5BB9FF` |
| Function | `#45D6D0` |
| Type | `#7DDCE5` |
| Parameter | `#FF9B8C` |
| String | `#9ED7B3` |
| Constant | `#A6B8FF` |
| Comment | `#5D7884` |
| Special | `#FF7F73` |

## Installation

For local use, clone the repository, run `npm install`, open the folder in VS Code, and press `F5` to launch an Extension Development Host. In that window, run **Preferences: Color Theme** and choose a Vesper variant.

To create an installable VSIX, install the VS Code Extension Manager or let npm fetch it through:

```bash
npm run package
```

## Development

Node.js 20 or newer is recommended.

```bash
npm install
npm run build
npm run validate
npm test
```

Use `npm run dev` while editing source files to rebuild when a change is detected. Generated files under `themes/` are publishing artifacts; do not edit them directly.

The build pipeline is intentionally small:

```text
palette + shared workbench colors + shared TextMate rules + shared semantic tokens
  -> generated VS Code theme JSON
```

### Adding a palette

1. Copy one declarative module in `src/palettes/` and provide every role from `src/palettes/contract.js`.
2. Export and register it in `src/palettes/index.js`.
3. Add its generated theme path to `contributes.themes` in `package.json`.
4. Run `npm run build`, `npm run validate`, and `npm test`.
5. Document the variant and its palette here.

No syntax or workbench rules need to be copied. Validation fails when a registered palette omits a role, uses malformed colors, or its generated file is stale.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the source layout, testing workflow, and manual VS Code review checklist. Issues and focused pull requests are welcome.

## License

Vesper Theme is available under the [MIT License](LICENSE).
