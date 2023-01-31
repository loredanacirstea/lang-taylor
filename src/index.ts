import {completeFromList} from "@codemirror/autocomplete";
import {parser} from "./syntax.grammar";
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language";
import {styleTags, tags as t} from "@lezer/highlight";

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
        VariableName: t.variableName,
        Boolean: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        Number: t.number,
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        "def! macrodef! let* fn*": t.definitionKeyword,
        "quote mquote mquote-noparens quasiquoteexpand quasiquote macroexpand eval": t.keyword,
        "try* catch* do if and or undefined?": t.controlKeyword,
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

const taylorCompletion = (autocompleteList: any) => taylorLanguage.data.of({
  autocomplete: completeFromList(autocompleteList || [
    {label: "def!", type: "function"},
    {label: "macrodef!", type: "function"},
    {label: "let*", type: "function"},
    {label: "cons", type: "function"},
    {label: "concat", type: "function"},
    {label: "str", type: "function"}
  ])
});

export function taylor(autocompleteList = []) {
  return new LanguageSupport(taylorLanguage, taylorCompletion(autocompleteList));
}


