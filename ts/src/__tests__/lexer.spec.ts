import { describe, expect, test } from "bun:test";
import { TOKEN_TYPE } from "../token";
import { Lexer } from "../lexer";

describe("Lexer", (): void => {
    test("nextToken - first sample", (): void => {
        const input = "=+(){},;";

        const tokens = [
            TOKEN_TYPE.ASSIGN,
            TOKEN_TYPE.PLUS,
            TOKEN_TYPE.LPAREN,
            TOKEN_TYPE.RPAREN,
            TOKEN_TYPE.LBRACE,
            TOKEN_TYPE.RBRACE,
            TOKEN_TYPE.COMMA,
            TOKEN_TYPE.SEMICOLON,
        ];

        const lexer = new Lexer(input);

        for (const token of tokens) {
            expect(lexer.nextToken().type).toBe(token);
        }
    });

    test("nextToken - second sample", (): void => {
        const input = `let five = 5;
            let ten = 10;

            let add = fn(x, y) {
                x + y;
            };

            let result = add(five, ten);`;

        const lexer = new Lexer(input);

        const tokens = [
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "five" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "ten" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "add" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.FUNCTION, literal: "fn" },
            { type: TOKEN_TYPE.LPAREN, literal: "(" },
            { type: TOKEN_TYPE.IDENT, literal: "x" },
            { type: TOKEN_TYPE.COMMA, literal: "," },
            { type: TOKEN_TYPE.IDENT, literal: "y" },
            { type: TOKEN_TYPE.RPAREN, literal: ")" },
            { type: TOKEN_TYPE.LBRACE, literal: "{" },
            { type: TOKEN_TYPE.IDENT, literal: "x" },
            { type: TOKEN_TYPE.PLUS, literal: "+" },
            { type: TOKEN_TYPE.IDENT, literal: "y" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.RBRACE, literal: "}" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "result" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.IDENT, literal: "add" },
            { type: TOKEN_TYPE.LPAREN, literal: "(" },
            { type: TOKEN_TYPE.IDENT, literal: "five" },
            { type: TOKEN_TYPE.COMMA, literal: "," },
            { type: TOKEN_TYPE.IDENT, literal: "ten" },
            { type: TOKEN_TYPE.RPAREN, literal: ")" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.EOF, literal: "" },
        ];

        for (const token of tokens) {
            expect(lexer.nextToken()).toEqual(token);
        }
    });

    test("nextToken - third sample", (): void => {
        const input = `let five = 5;
            let ten = 10;

            let add = fn(x, y) {
                x + y;
            };

            let result = add(five, ten);

            !-/*5;
            5 < 10 > 5;
            `;

        const lexer = new Lexer(input);

        const tokens = [
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "five" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "ten" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "add" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.FUNCTION, literal: "fn" },
            { type: TOKEN_TYPE.LPAREN, literal: "(" },
            { type: TOKEN_TYPE.IDENT, literal: "x" },
            { type: TOKEN_TYPE.COMMA, literal: "," },
            { type: TOKEN_TYPE.IDENT, literal: "y" },
            { type: TOKEN_TYPE.RPAREN, literal: ")" },
            { type: TOKEN_TYPE.LBRACE, literal: "{" },
            { type: TOKEN_TYPE.IDENT, literal: "x" },
            { type: TOKEN_TYPE.PLUS, literal: "+" },
            { type: TOKEN_TYPE.IDENT, literal: "y" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.RBRACE, literal: "}" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "result" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.IDENT, literal: "add" },
            { type: TOKEN_TYPE.LPAREN, literal: "(" },
            { type: TOKEN_TYPE.IDENT, literal: "five" },
            { type: TOKEN_TYPE.COMMA, literal: "," },
            { type: TOKEN_TYPE.IDENT, literal: "ten" },
            { type: TOKEN_TYPE.RPAREN, literal: ")" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.BANG, literal: "!" },
            { type: TOKEN_TYPE.MINUS, literal: "-" },
            { type: TOKEN_TYPE.SLASH, literal: "/" },
            { type: TOKEN_TYPE.ASTERISK, literal: "*" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.LT, literal: "<" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.GT, literal: ">" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.EOF, literal: "" },
        ];

        for (const token of tokens) {
            expect(lexer.nextToken()).toEqual(token);
        }
    });

    test("nextToken - fourth sample", (): void => {
        const input = `let five = 5;
            let ten = 10;

            let add = fn(x, y) {
                x + y;
            };

            let result = add(five, ten);

            !-/*5;
            5 < 10 > 5;

            if (5 < 10) {
                return true;
            } else {
                return false;
            }`;

        const lexer = new Lexer(input);

        const tokens = [
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "five" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "ten" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "add" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.FUNCTION, literal: "fn" },
            { type: TOKEN_TYPE.LPAREN, literal: "(" },
            { type: TOKEN_TYPE.IDENT, literal: "x" },
            { type: TOKEN_TYPE.COMMA, literal: "," },
            { type: TOKEN_TYPE.IDENT, literal: "y" },
            { type: TOKEN_TYPE.RPAREN, literal: ")" },
            { type: TOKEN_TYPE.LBRACE, literal: "{" },
            { type: TOKEN_TYPE.IDENT, literal: "x" },
            { type: TOKEN_TYPE.PLUS, literal: "+" },
            { type: TOKEN_TYPE.IDENT, literal: "y" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.RBRACE, literal: "}" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "result" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.IDENT, literal: "add" },
            { type: TOKEN_TYPE.LPAREN, literal: "(" },
            { type: TOKEN_TYPE.IDENT, literal: "five" },
            { type: TOKEN_TYPE.COMMA, literal: "," },
            { type: TOKEN_TYPE.IDENT, literal: "ten" },
            { type: TOKEN_TYPE.RPAREN, literal: ")" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.BANG, literal: "!" },
            { type: TOKEN_TYPE.MINUS, literal: "-" },
            { type: TOKEN_TYPE.SLASH, literal: "/" },
            { type: TOKEN_TYPE.ASTERISK, literal: "*" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.LT, literal: "<" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.GT, literal: ">" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.IF, literal: "if" },
            { type: TOKEN_TYPE.LPAREN, literal: "(" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.LT, literal: "<" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.RPAREN, literal: ")" },
            { type: TOKEN_TYPE.LBRACE, literal: "{" },
            { type: TOKEN_TYPE.RETURN, literal: "return" },
            { type: TOKEN_TYPE.TRUE, literal: "true" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.RBRACE, literal: "}" },
            { type: TOKEN_TYPE.ELSE, literal: "else" },
            { type: TOKEN_TYPE.LBRACE, literal: "{" },
            { type: TOKEN_TYPE.RETURN, literal: "return" },
            { type: TOKEN_TYPE.FALSE, literal: "false" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.RBRACE, literal: "}" },
            { type: TOKEN_TYPE.EOF, literal: "" },
        ];

        for (const token of tokens) {
            expect(lexer.nextToken()).toEqual(token);
        }
    });

    test("nextToken - fifth sample", (): void => {
        const input = `let five = 5;
       let ten = 10;

       let add = fn(x, y) {
           x + y;
       };

       let result = add(five, ten);

       !-/*5;
       5 < 10 > 5;

       if (5 < 10) {
           return true;
       } else {
           return false;
       }

       10 == 10;
       10 != 9;
       `;

        const lexer = new Lexer(input);

        const tokens = [
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "five" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "ten" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "add" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.FUNCTION, literal: "fn" },
            { type: TOKEN_TYPE.LPAREN, literal: "(" },
            { type: TOKEN_TYPE.IDENT, literal: "x" },
            { type: TOKEN_TYPE.COMMA, literal: "," },
            { type: TOKEN_TYPE.IDENT, literal: "y" },
            { type: TOKEN_TYPE.RPAREN, literal: ")" },
            { type: TOKEN_TYPE.LBRACE, literal: "{" },
            { type: TOKEN_TYPE.IDENT, literal: "x" },
            { type: TOKEN_TYPE.PLUS, literal: "+" },
            { type: TOKEN_TYPE.IDENT, literal: "y" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.RBRACE, literal: "}" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.LET, literal: "let" },
            { type: TOKEN_TYPE.IDENT, literal: "result" },
            { type: TOKEN_TYPE.ASSIGN, literal: "=" },
            { type: TOKEN_TYPE.IDENT, literal: "add" },
            { type: TOKEN_TYPE.LPAREN, literal: "(" },
            { type: TOKEN_TYPE.IDENT, literal: "five" },
            { type: TOKEN_TYPE.COMMA, literal: "," },
            { type: TOKEN_TYPE.IDENT, literal: "ten" },
            { type: TOKEN_TYPE.RPAREN, literal: ")" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.BANG, literal: "!" },
            { type: TOKEN_TYPE.MINUS, literal: "-" },
            { type: TOKEN_TYPE.SLASH, literal: "/" },
            { type: TOKEN_TYPE.ASTERISK, literal: "*" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.LT, literal: "<" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.GT, literal: ">" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.IF, literal: "if" },
            { type: TOKEN_TYPE.LPAREN, literal: "(" },
            { type: TOKEN_TYPE.INT, literal: "5" },
            { type: TOKEN_TYPE.LT, literal: "<" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.RPAREN, literal: ")" },
            { type: TOKEN_TYPE.LBRACE, literal: "{" },
            { type: TOKEN_TYPE.RETURN, literal: "return" },
            { type: TOKEN_TYPE.TRUE, literal: "true" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.RBRACE, literal: "}" },
            { type: TOKEN_TYPE.ELSE, literal: "else" },
            { type: TOKEN_TYPE.LBRACE, literal: "{" },
            { type: TOKEN_TYPE.RETURN, literal: "return" },
            { type: TOKEN_TYPE.FALSE, literal: "false" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.RBRACE, literal: "}" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.EQ, literal: "==" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.INT, literal: "10" },
            { type: TOKEN_TYPE.NOT_EQ, literal: "!=" },
            { type: TOKEN_TYPE.INT, literal: "9" },
            { type: TOKEN_TYPE.SEMICOLON, literal: ";" },
            { type: TOKEN_TYPE.EOF, literal: "" },
        ];

        for (const token of tokens) {
            expect(lexer.nextToken()).toEqual(token);
        }
    });
});
