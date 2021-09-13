import {completeFromList} from "@codemirror/autocomplete";
import {parser} from "./syntax.grammar";
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language";
import {styleTags, tags as t} from "@codemirror/highlight";

export const taylorLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Identifier: t.variableName,
        Boolean: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

export const taylorCompletion = taylorLanguage.data.of({
  autocomplete: completeFromList([
    {label: "def!", type: "keyword"},
    {label: "macrodef!", type: "keyword"},
    {label: "let*", type: "keyword"},
    {label: "cons", type: "function"},
    {label: "concat", type: "function"},
    {label: "str", type: "function"}
  ])
});

export function taylor() {
  return new LanguageSupport(taylorLanguage, taylorCompletion);
}


