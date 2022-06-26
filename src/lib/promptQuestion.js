import readline from 'readline';
import { promisify } from 'util';

const consoleInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const prompQuestion = promisify(consoleInterface.question).bind(
    consoleInterface
);

export const closeInterface = () => consoleInterface.close();
