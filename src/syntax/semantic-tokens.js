export function createSemanticTokenColors(c) {
  return {
    variable: c.foreground,
    "variable.readonly": c.constant,
    parameter: { foreground: c.parameter, italic: true },
    property: c.foreground,
    "property.readonly": c.constant,
    function: c.function,
    method: c.function,
    class: c.type,
    interface: c.type,
    struct: c.type,
    enum: c.type,
    enumMember: c.constant,
    type: c.type,
    typeParameter: c.type,
    namespace: c.type,
    decorator: c.special,
    macro: c.special,
    keyword: c.keyword,
    string: c.string,
    number: c.constant,
    regexp: c.special,
    operator: c.keyword,
    comment: { foreground: c.comment, italic: true }
  };
}
