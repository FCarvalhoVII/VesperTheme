# Contributing to Vesper Theme

Thank you for helping improve Vesper. Keep changes semantic, restrained, and consistent across variants.

## Source layout

- `src/palettes/` contains declarative colors and the required role contract.
- `src/syntax/` contains shared TextMate and semantic-token rules.
- `src/ui/` maps palette roles to VS Code workbench colors.
- `src/build/` combines those sources into distributable themes.
- `themes/` contains generated JSON committed for extension publishing.
- `scripts/` and `test/` contain structural validation and behavior tests.

Do not edit files in `themes/` directly. Change their source and regenerate them.

## Changing semantic rules

Edit `src/syntax/token-colors.js` for grammar-based TextMate behavior or `src/syntax/semantic-tokens.js` for language-server tokens. Prefer general scopes over language-specific rules. If a narrow fix is unavoidable, give it a descriptive name and document the grammar limitation in the pull request.

Preserve selective italics: parameters, comments, and reliably scoped behavioral keywords may be italic; functions, types, strings, and ordinary variables should remain upright.

## Changing or adding a palette

For an existing palette, edit only its module in `src/palettes/`. For a new palette, create a module with every role declared by `src/palettes/contract.js`, register it in `src/palettes/index.js`, add it to `package.json`, and document it in the README. Never copy the syntax or UI rule sets into a palette.

## Build and validation

```bash
npm ci
npm run build
npm run validate
npm test
```

`npm test` checks that committed generated files match the source. Commit generated theme changes together with source changes.

## Manual testing in VS Code

1. Open the repository in VS Code and press `F5`.
2. Select each Vesper variant in the Extension Development Host.
3. Inspect files in JavaScript/TypeScript and JSX/TSX, JSON, HTML/CSS/SCSS, Python, Go, Rust, Java, C/C++, C#, PHP, Ruby, YAML, TOML, Markdown, Bash, and SQL.
4. Confirm variables remain neutral; functions, types, parameters, strings, constants, and comments remain distinct; and italics are selective.
5. Inspect the terminal, command palette, tabs, sidebar, panels, diagnostics, diffs, Git decorations, brackets, minimap, notifications, and hover widgets.
6. Use **Developer: Inspect Editor Tokens and Scopes** when a token does not receive the expected role.

## Pull requests

Explain the semantic reason for highlighting changes, include before/after screenshots for visual changes when possible, and keep unrelated palette changes out of the same pull request.
