# CodeMirror 6 taylor language package

 * Rewrite the grammar in `src/syntax.grammar` to cover your language. See the [Lezer system guide](https://lezer.codemirror.net/docs/guide/#writing-a-grammar) for information on this file format.

 * Adjust the metadata in `src/index.ts` to work with your new grammar.

 * Adjust the grammar tests in `test/cases.txt`.

 * Build (`npm run prepare`) and test (`npm test`).

 * Rewrite this readme file.

 * Optionally add a license.

 * Publish. If you want to use a `@codemirror/lang-...` package name, open an [issue](https://github.com/codemirror/codemirror.next/issues) to ask for npm publish rights for that name.
