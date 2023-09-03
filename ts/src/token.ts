export const TOKEN_TYPE = {
    ILLEGAL: "ILLEGAL",
    EOF: "EOF",

    IDENT: "IDENT",
    INT: "INT",

    ASSIGN: "=",
    PLUS: "+",
    MINUS: "-",
    BANG: "!",
    ASTERISK: "*",
    SLASH: "/",
    LT: "<",
    GT: ">",
    EQ: "==",
    NOT_EQ: "!=",

    COMMA: ",",
    SEMICOLON: ";",

    LPAREN: "(",
    RPAREN: ")",
    LBRACE: "{",
    RBRACE: "}",

    FUNCTION: "FUNCTION",
    LET: "LET",
    TRUE: "TRUE",
    FALSE: "FALSE",
    IF: "IF",
    ELSE: "ELSE",
    RETURN: "RETURN",
} as const;
export type TOKEN_TYPE = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

export class Token {
    constructor(public type: TOKEN_TYPE, public literal: string) {}

    public static lookupIdentifier(identifier: string): TOKEN_TYPE {
        return KEYWORDS[identifier] ?? TOKEN_TYPE.IDENT;
    }
}

export const KEYWORDS: Record<string, TOKEN_TYPE> = {
    fn: TOKEN_TYPE.FUNCTION,
    let: TOKEN_TYPE.LET,
    true: TOKEN_TYPE.TRUE,
    false: TOKEN_TYPE.FALSE,
    if: TOKEN_TYPE.IF,
    else: TOKEN_TYPE.ELSE,
    return: TOKEN_TYPE.RETURN,
};
