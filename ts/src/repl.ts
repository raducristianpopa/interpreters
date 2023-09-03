import { ReadStream, WriteStream } from "tty";
import readline from "readline";
import { Lexer } from "./lexer";

export class Repl {
    constructor(private _in: ReadStream, private _out: WriteStream) {}

    start(): void {
        const r = readline.createInterface({
            input: this._in,
            output: this._out,
            prompt: ">> ",
        });
        r.prompt();

        r.on("line", (input) => {
            const lexer = new Lexer(input);

            while (true) {
                const token = lexer.nextToken();
                console.log(JSON.stringify(token));
                if (token.type === "EOF") {
                    break;
                }
            }
            r.prompt();
        });

        r.on("close", () => {
            console.log("DUDUDUDUDU MAX VERSTAPPEN");
        });
    }
}
