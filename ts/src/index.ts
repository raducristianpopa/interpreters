import { Repl } from "./repl";
import os from "os";

const repl = new Repl(process.stdin, process.stdout);
const user = os.userInfo().username;

console.log(`Hello ${user}! This a Monkey programming language REPL!`);
console.log("Feel free to type in commands:");

repl.start();
