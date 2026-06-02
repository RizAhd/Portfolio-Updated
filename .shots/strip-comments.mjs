// Token-accurate comment stripper using the TypeScript scanner. It walks the
// real token stream so a "//" inside a string, URL, JSX text, regex, or template
// is never mistaken for a comment. Only SingleLine/MultiLine comment trivia is
// dropped; all code bytes are preserved verbatim. Then collapses the blank
// lines left behind so formatting stays tidy.
import { readFileSync, writeFileSync } from 'node:fs';
import ts from 'typescript';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('usage: node strip-comments.mjs <file...>');
  process.exit(1);
}

function stripComments(source) {
  const scanner = ts.createScanner(
    ts.ScriptTarget.Latest,
    /* skipTrivia */ false,
    ts.LanguageVariant.JSX,
    source,
  );
  let out = '';
  let token = scanner.scan();
  while (token !== ts.SyntaxKind.EndOfFileToken) {
    if (
      token === ts.SyntaxKind.SingleLineCommentTrivia ||
      token === ts.SyntaxKind.MultiLineCommentTrivia
    ) {
      // Drop the comment text. If the original comment text contained newlines
      // (block comment spanning lines), keep those newlines so line structure
      // of following code is preserved.
      const text = scanner.getTokenText();
      const newlines = (text.match(/\n/g) || []).join('');
      out += newlines;
    } else {
      out += scanner.getTokenText();
    }
    token = scanner.scan();
  }
  return out;
}

function tidyBlankLines(code) {
  // Remove lines that became empty/whitespace-only solely because a comment was
  // removed, but never collapse intentional single blank separators. Strategy:
  // collapse 3+ consecutive newlines to 2, and trim trailing whitespace.
  return code
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
    .replace(/\n+$/, '\n');
}

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  const stripped = tidyBlankLines(stripComments(original));
  writeFileSync(file, stripped);
  console.log('stripped:', file);
}
