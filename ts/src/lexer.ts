import { Token, TOKEN_TYPE } from "./token";

export class Lexer {
    private position: number = 0;
    private readPosition: number = 0;
    private ch!: string;

    constructor(private input: string) {
        this.readChar();
    }

    public nextToken(): Token {
        let token: Token;

        this.consumeWhitespace();

        switch (this.ch) {
            case "=":
                if (this.peek() === "=") {
                    const currentCh = this.ch;
                    this.readChar();
                    token = new Token(TOKEN_TYPE.EQ, currentCh + this.ch);
                } else {
                    token = new Token(TOKEN_TYPE.ASSIGN, this.ch);
                }
                break;
            case "+":
                token = new Token(TOKEN_TYPE.PLUS, this.ch);
                break;
            case "-":
                token = new Token(TOKEN_TYPE.MINUS, this.ch);
                break;
            case "!":
                if (this.peek() === "=") {
                    const currentCh = this.ch;
                    this.readChar();
                    token = new Token(TOKEN_TYPE.NOT_EQ, currentCh + this.ch);
                } else {
                    token = new Token(TOKEN_TYPE.BANG, this.ch);
                }
                break;
            case "/":
                token = new Token(TOKEN_TYPE.SLASH, this.ch);
                break;
            case "*":
                token = new Token(TOKEN_TYPE.ASTERISK, this.ch);
                break;
            case "<":
                token = new Token(TOKEN_TYPE.LT, this.ch);
                break;
            case ">":
                token = new Token(TOKEN_TYPE.GT, this.ch);
                break;
            case ";":
                token = new Token(TOKEN_TYPE.SEMICOLON, this.ch);
                break;
            case "(":
                token = new Token(TOKEN_TYPE.LPAREN, this.ch);
                break;
            case ")":
                token = new Token(TOKEN_TYPE.RPAREN, this.ch);
                break;
            case "{":
                token = new Token(TOKEN_TYPE.LBRACE, this.ch);
                break;
            case "}":
                token = new Token(TOKEN_TYPE.RBRACE, this.ch);
                break;
            case ",":
                token = new Token(TOKEN_TYPE.COMMA, this.ch);
                break;
            case "\0":
                token = new Token(TOKEN_TYPE.EOF, "");
                break;
            default:
                if (this.isLetter(this.ch)) {
                    const literal = this.readIdentifier();
                    const type = Token.lookupIdentifier(literal);
                    token = new Token(type, literal);
                    return token;
                } else if (this.isDigit(this.ch)) {
                    token = new Token(TOKEN_TYPE.INT, this.readNumber());
                    return token;
                } else {
                    token = new Token(TOKEN_TYPE.ILLEGAL, this.ch);
                }
        }

        this.readChar();
        return token;
    }

    private readChar(): void {
        if (this.readPosition >= this.input.length) {
            this.ch = "\0";
        } else {
            this.ch = this.input[this.readPosition];
        }
        this.position = this.readPosition;
        this.readPosition += 1;
    }

    private readNumber(): string {
        const position = this.position;
        while (this.isDigit(this.ch)) {
            this.readChar();
        }
        return this.input.slice(position, this.position);
    }

    private readIdentifier(): string {
        const position = this.position;
        while (this.isLetter(this.ch)) {
            this.readChar();
        }
        return this.input.slice(position, this.position);
    }

    private consumeWhitespace(): void {
        while (
            this.ch === " " ||
            this.ch === "\t" ||
            this.ch === "\n" ||
            this.ch === "\r"
        ) {
            this.readChar();
        }
    }

    private peek(): string {
        if (this.readPosition >= this.input.length) {
            return "\0";
        } else {
            return this.input[this.readPosition];
        }
    }

    private isLetter(ch: string): boolean {
        return /^[a-zA-Z_]/.test(ch);
    }

    private isDigit(ch: string): boolean {
        return /^[0-9]/.test(ch);
    }
}
